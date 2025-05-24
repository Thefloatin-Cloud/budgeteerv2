import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, BarChart3, FileText, Save, StickyNote, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/pages/Index";

interface DashboardProps {
  expenses: Expense[];
  onTabChange: (tab: string, initialPrompt?: string) => void;
}

export const Dashboard = ({ expenses, onTabChange }: DashboardProps) => {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedNoteText = localStorage.getItem("budgeteer-note");
    if (savedNoteText) {
      setSavedNote(savedNoteText);
    }
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem("budgeteer-note", note);
    setSavedNote(note);
    setNote("");
    setIsEditingNote(false);
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully!",
    });
  };

  const handleEditNote = () => {
    setNote(savedNote);
    setIsEditingNote(true);
  };

  const quickActions = [
    {
      label: "New expense",
      icon: Plus,
      color: "bg-accent hover:bg-muted text-accent-foreground",
      action: () => onTabChange("expenses")
    },
    {
      label: "Check expenses",
      icon: FileText,
      color: "bg-accent hover:bg-muted text-accent-foreground",
      action: () => onTabChange("expenses")
    },
    {
      label: "Create report",
      icon: BarChart3,
      color: "bg-accent hover:bg-muted text-accent-foreground",
      action: () => onTabChange("ai-chat", "Give me a detailed report on my expenses including spending patterns, top categories, and financial recommendations.")
    }
  ];

  const totalBalance = 5430;
  const income = 3200;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="h-full p-4 bg-background overflow-hidden terminal-style">
      <div className="max-w-7xl mx-auto h-full">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalBalance.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Income</p>
                  <p className="text-2xl font-bold text-green-400">₹{income.toLocaleString()}</p>
                  <p className="text-sm text-green-400 mt-1">↑ 1,120.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-400">₹{totalExpenses.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)]">
          {/* Notes Section */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-primary" />
                Personal Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 h-[calc(100%-80px)] overflow-hidden">
              {!isEditingNote && savedNote ? (
                <div
                  onClick={handleEditNote}
                  className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-accent transition-colors min-h-[100px] group overflow-y-auto max-h-[200px]"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-foreground whitespace-pre-wrap">{savedNote}</p>
                    <Edit className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <Textarea
                    placeholder="Add your personal finance notes, reminders, or goals here..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="minimal-input resize-none flex-1 min-h-[100px]"
                  />
                  <Button
                    onClick={handleSaveNote}
                    className="minimal-button w-full mt-3"
                    disabled={!note.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-hidden">
              {expenses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No expenses recorded yet.</p>
                  <Button
                    onClick={() => onTabChange("expenses")}
                    className="minimal-button"
                  >
                    Add your first expense
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 h-full overflow-y-auto">
                  {expenses.slice(-5).reverse().map((expense) => (
                    <div
                      key={expense.id}
                      className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                    >
                      <div>
                        <p className="font-medium text-foreground">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">{expense.category}</p>
                      </div>
                      <span className="font-semibold text-foreground">₹{expense.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-hidden">
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      onClick={action.action}
                      className={`${action.color} justify-start h-12 transition-all hover:scale-105`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Spending Overview */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-foreground">Spending Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center h-[calc(100%-80px)]">
              {expenses.length === 0 ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No spending data available yet.</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground mb-2">
                    ₹{totalExpenses.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground mb-4">Total spent this period</p>
                  <p className="text-lg text-foreground">
                    {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
