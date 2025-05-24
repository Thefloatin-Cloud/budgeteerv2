import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IncomeDialogProps {
  onComplete: (income: number) => void;
}

export const IncomeDialog = ({ onComplete }: IncomeDialogProps) => {
  const [income, setIncome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeValue = parseFloat(income);
    if (!isNaN(incomeValue) && incomeValue >= 0) {
      onComplete(incomeValue);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-[90%] max-w-md animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">Welcome to Budgeteer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="income" className="text-sm text-muted-foreground">
                What is your monthly recurring income?
              </label>
              <Input
                id="income"
                type="number"
                placeholder="Enter amount"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="minimal-input"
                required
                min="0"
                step="0.01"
              />
            </div>
            <Button type="submit" className="w-full minimal-button">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};