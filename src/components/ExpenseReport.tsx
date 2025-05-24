
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, TrendingDown } from "lucide-react";
import type { Expense } from "@/pages/Index";

interface ExpenseReportProps {
  expenses: Expense[];
}

export const ExpenseReport = ({ expenses }: ExpenseReportProps) => {
  if (expenses.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50 text-gray-400 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400">No expenses to analyze yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Start adding expenses to see your financial insights here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate category breakdown
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryBreakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Calculate monthly trend
  const monthlyData = expenses.reduce((acc, expense) => {
    const monthKey = expense.date.substring(0, 7); // YYYY-MM
    acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedMonths = Object.entries(monthlyData).sort(([a], [b]) => a.localeCompare(b));
  const currentMonth = sortedMonths[sortedMonths.length - 1];
  const previousMonth = sortedMonths[sortedMonths.length - 2];
  
  const monthlyTrend = previousMonth 
    ? ((currentMonth[1] - previousMonth[1]) / previousMonth[1]) * 100
    : 0;

  // Calculate average daily spending
  const uniqueDays = new Set(expenses.map(e => e.date)).size;
  const dailyAverage = totalExpenses / Math.max(uniqueDays, 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              {expenses.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">₹{dailyAverage.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              Across {uniqueDays} days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.abs(monthlyTrend).toFixed(1)}%
              </div>
              {monthlyTrend >= 0 ? (
                <TrendingUp className="h-4 w-4 text-red-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <PieChart className="h-5 w-5" />
            Top Categories
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Your biggest spending categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedCategories.map(([category, amount], index) => {
              const percentage = (amount / totalExpenses) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">#{index + 1}</div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{category}</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {percentage.toFixed(1)}% of total
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">₹{amount.toFixed(2)}</p>
                    <div className="font-semibold text-gray-900 dark:text-white">₹{amount.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {sortedMonths.length > 1 && (
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <BarChart3 className="h-5 w-5" />
              Monthly Breakdown
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Your spending over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sortedMonths.map(([month, amount]) => (
                <div key={month} className="flex items-center justify-between py-2">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {new Date(month + "-01").toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">₹{amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
