import { useState, useEffect } from "react";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { ExpenseCategories } from "@/components/ExpenseCategories";
import { AIChat } from "@/components/AIChat";
import { Settings } from "@/components/Settings";
import { ExpenseReport } from "@/components/ExpenseReport";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AboutSection } from "@/components/AboutSection";
import { FeatureRequest } from "@/components/FeatureRequest";

export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("home");
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(() => {
    const saved = localStorage.getItem("budgeteer-monthly-income");
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem("budgeteer-expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("budgeteer-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("budgeteer-expenses", JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("budgeteer-expenses", JSON.stringify(updatedExpenses));
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("budgeteer-api-key", key);
  };

  const handleTabChange = (tab: string, initialPrompt?: string) => {
    setActiveTab(tab);
    if (initialPrompt) {
      setAiInitialPrompt(initialPrompt);
    } else {
      setAiInitialPrompt("");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard expenses={expenses} onTabChange={handleTabChange} />;
      case "expenses":
        return (
          <div className="h-full flex bg-background">
            <div className="w-1/2 p-6 border-r border-border">
              <ExpenseTracker
                expenses={expenses}
                onAddExpense={addExpense}
                onDeleteExpense={deleteExpense}
              />
            </div>
            <div className="w-1/2 p-6">
              <ExpenseCategories
                expenses={expenses}
                onDeleteExpense={deleteExpense}
              />
            </div>
          </div>
        );
      case "report":
        return (
          <div className="h-full p-6 overflow-auto bg-background">
            <ExpenseReport expenses={expenses} />
          </div>
        );
      case "ai-chat":
        return (
          <div className="h-full p-6 overflow-auto bg-background">
            <AIChat expenses={expenses} apiKey={apiKey} initialPrompt={aiInitialPrompt} />
          </div>
        );
      case "settings":
        return (
          <div className="h-full p-6 overflow-auto bg-background">
            <Settings apiKey={apiKey} onSaveApiKey={saveApiKey} />
          </div>
        );
      case "feature":
        return <FeatureRequest />;
      case "about":
        return <AboutSection />;
      default:
        return <Dashboard expenses={expenses} onTabChange={handleTabChange} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="budgeteer-theme">
      <div className="h-screen bg-background flex overflow-hidden terminal-style">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="flex-1 bg-background overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;