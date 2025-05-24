import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Key, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const Settings = ({ apiKey, onSaveApiKey }: SettingsProps) => {
  const [newApiKey, setNewApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onSaveApiKey(newApiKey);
    toast({
      title: "Settings Saved",
      description: "Your API key has been saved successfully.",
    });
  };

  const clearData = () => {
    if (confirm("Are you sure you want to clear all expense data? This action cannot be undone.")) {
      localStorage.removeItem("budgeteer-expenses");
      localStorage.removeItem("budgeteer-api-key");
      onSaveApiKey("");
      setNewApiKey("");
      toast({
        title: "Data Cleared",
        description: "All expense data has been cleared.",
      });
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 terminal-style">
      <Card className="overflow-hidden bg-card border-border shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-muted">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <SettingsIcon className="h-5 w-5 text-primary" />
            Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Configure your Budgeteer preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2 text-foreground">
                <Key className="h-4 w-4" />
                Google Gemini API Key
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    placeholder="Enter your Google Gemini API key"
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    className="minimal-input pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <Button onClick={handleSave} className="minimal-button">Save</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-card border-border shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-muted">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Data Management
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your expense data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Button variant="destructive" onClick={clearData} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Clear All Data
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            This will permanently delete all your expense data.
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-card border-border shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-muted">
          <CardTitle className="text-foreground">About Budgeteer</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Budgeteer is an AI-powered expense tracking application that helps you manage your finances intelligently.
            Track your expenses, get AI insights, and make better financial decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
