import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/pages/Index";
import React, { useRef, useEffect } from "react";

interface AIChatProps {
  expenses: Expense[];
  apiKey: string;
  initialPrompt?: string;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}

export const AIChat = ({ expenses, apiKey, initialPrompt }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Send initial prompt if provided
  useState(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      // Automatically send the initial prompt
      setTimeout(() => sendMessage(initialPrompt), 100);
    }
  });

  const generateExpenseContext = () => {
    if (expenses.length === 0) {
      return "No expenses have been recorded yet.";
    }

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const recentExpenses = expenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    return `
Expense Summary:
- Total expenses: $${totalSpent.toFixed(2)}
- Number of transactions: ${expenses.length}
- Categories breakdown: ${JSON.stringify(categories, null, 2)}
- Recent expenses: ${JSON.stringify(recentExpenses, null, 2)}
`;
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please set your Google Gemini API key in Settings first.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      role: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Gideon, a helpful financial assistant for Budgeteer, an expense tracking app. You help users analyze their spending patterns, provide budgeting advice, and answer questions about their expenses. Always identify yourself as Gideon when introducing yourself.

Current user's expense data:
${generateExpenseContext()}

User question: ${textToSend}

Be helpful, concise, and provide actionable financial advice. If asked about expenses, refer to the actual data provided above.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.candidates[0].content.parts[0].text,
        role: "assistant",
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <Card className="h-[600px] flex flex-col overflow-hidden bg-card border-border shadow-sm terminal-style">
      <CardHeader className="bg-muted">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="h-5 w-5 text-primary" />
          Gideon - Financial Assistant
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Ask me anything about your expenses, budgeting, or financial advice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 p-4 border-0 min-h-0">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8 animate-fade-in">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation with Gideon, your AI assistant!</p>
              <p className="text-sm mt-2">
                Try asking: "Give me a report on my spending" or "How can I reduce my expenses?"
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-2">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 animate-fade-in ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.role === "assistant" && (
                    <div className="bg-accent p-2 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted border border-border text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.role === "user" ? "text-primary-foreground" : "text-muted-foreground"
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="bg-accent p-2 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 animate-pulse">
                  <div className="bg-accent p-2 rounded-full">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="bg-muted p-4 rounded-lg shadow-sm max-w-[80%] border border-border">
                    <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-border rounded w-1/2"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t border-border bg-muted sticky bottom-0 z-10">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask Gideon about your expenses..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="minimal-input flex-1 resize-none"
              rows={2}
            />
            <Button onClick={() => sendMessage()} disabled={isLoading} className="minimal-button self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
