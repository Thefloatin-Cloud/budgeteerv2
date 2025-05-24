import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Preloader } from "@/components/Preloader";
import { IncomeDialog } from "@/components/IncomeDialog";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [hasSetIncome, setHasSetIncome] = useState(() => {
    return localStorage.getItem("budgeteer-monthly-income") !== null;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasSetIncome) {
        setShowIncomeDialog(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [hasSetIncome]);

  const handleIncomeSubmit = (income: number) => {
    localStorage.setItem("budgeteer-monthly-income", income.toString());
    setHasSetIncome(true);
    setShowIncomeDialog(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Preloader className={isLoading ? "opacity-100" : "opacity-0 pointer-events-none"} />
        {showIncomeDialog && <IncomeDialog onComplete={handleIncomeSubmit} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;