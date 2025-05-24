import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/pages/Index";

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, "id" | "createdAt">) => void;
  onDeleteExpense: (id: string) => void;
}

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Groceries",
  "Other"
];

export const ExpenseTracker = ({ expenses, onAddExpense }: ExpenseTrackerProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onAddExpense({
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    // Reset form
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);

    toast({
      title: "Success",
      description: "Expense added successfully!",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="h-full flex flex-col bg-background p-4 terminal-style">
      <Card className="bg-card border-border shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Plus className="h-5 w-5 text-primary" />
            Add New Expense
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Track your daily expenses with ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-foreground">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="minimal-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="minimal-input">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-popover-foreground hover:bg-accent">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="minimal-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="minimal-input"
                />
              </div>
            </div>

            <Button type="submit" className="minimal-button w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-sm flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground">Quick Summary</CardTitle>
          <CardDescription className="text-muted-foreground">
            Total: ₹{totalExpenses.toFixed(2)} • {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground h-full flex items-center justify-center">
              <div>
                <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p>No expenses added yet. Start tracking your spending!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto h-full">
              {expenses
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((expense) => (
                  <div
                    key={expense.id}
                    className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                  >
                    <div>
                      <p className="text-foreground font-medium">{expense.description}</p>
                      <p className="text-muted-foreground text-sm">{expense.category}</p>
                    </div>
                    <span className="text-foreground font-semibold">₹{expense.amount.toFixed(2)}</span>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
