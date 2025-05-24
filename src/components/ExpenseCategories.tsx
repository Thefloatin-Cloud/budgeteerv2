import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Calendar, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Expense } from "@/pages/Index";

interface ExpenseCategoriesProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseCategories = ({ expenses, onDeleteExpense }: ExpenseCategoriesProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  // Get recent expenses (last 10)
  const recentExpenses = expenses
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  // Get daily expenses
  const dailyExpenses = expenses.filter(expense => expense.date === selectedDate);

  // Get monthly expenses
  const monthlyExpenses = expenses.filter(expense =>
    expense.date.startsWith(selectedMonth)
  );

  // Get yearly expenses
  const yearlyExpenses = expenses.filter(expense =>
    expense.date.startsWith(selectedYear)
  );

  // Get unique dates, months, and years for filters
  const availableDates = [...new Set(expenses.map(e => e.date))].sort().reverse();
  const availableMonths = [...new Set(expenses.map(e => e.date.slice(0, 7)))].sort().reverse();
  const availableYears = [...new Set(expenses.map(e => e.date.slice(0, 4)))].sort().reverse();

  const ExpenseTable = ({ expenseList, showDateFilter = false, filterType = "" }: {
    expenseList: Expense[],
    showDateFilter?: boolean,
    filterType?: string
  }) => {
    const total = expenseList.reduce((sum, expense) => sum + expense.amount, 0);

    return (
      <div className="space-y-4">
        {showDateFilter && (
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-primary" />
            {filterType === "daily" && (
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="minimal-input px-3 py-2"
              >
                {availableDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            )}
            {filterType === "monthly" && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="minimal-input px-3 py-2"
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {new Date(month + "-01").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </option>
                ))}
              </select>
            )}
            {filterType === "yearly" && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="minimal-input px-3 py-2"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">
              Total: ₹{total.toFixed(2)}
            </span>
          </div>
          <span className="text-muted-foreground">
            {expenseList.length} expense{expenseList.length !== 1 ? 's' : ''}
          </span>
        </div>

        {expenseList.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No expenses found for this period.
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-foreground">Date</TableHead>
                  <TableHead className="text-foreground">Description</TableHead>
                  <TableHead className="text-foreground">Category</TableHead>
                  <TableHead className="text-foreground">Amount</TableHead>
                  <TableHead className="text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseList.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted transition-colors border-border">
                    <TableCell className="text-foreground">{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-foreground">{expense.description}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-accent rounded-md text-sm text-accent-foreground">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">₹{expense.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteExpense(expense.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground transition-colors border-border"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full terminal-style">
      <Tabs defaultValue="recent" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="recent" className="flex items-center gap-2 text-muted-foreground data-[state=active]:text-foreground">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-2 text-muted-foreground data-[state=active]:text-foreground">
            <Calendar className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2 text-muted-foreground data-[state=active]:text-foreground">
            <TrendingUp className="h-4 w-4" />
            Monthly
          </TabsTrigger>
          <TabsTrigger value="yearly" className="flex items-center gap-2 text-muted-foreground data-[state=active]:text-foreground">
            <DollarSign className="h-4 w-4" />
            Yearly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="flex-1 mt-6">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenseList={recentExpenses} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="flex-1 mt-6">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Daily Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenseList={dailyExpenses} showDateFilter={true} filterType="daily" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="flex-1 mt-6">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenseList={monthlyExpenses} showDateFilter={true} filterType="monthly" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yearly" className="flex-1 mt-6">
          <Card className="bg-card border-border h-full">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Yearly Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenseList={yearlyExpenses} showDateFilter={true} filterType="yearly" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
