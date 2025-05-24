import { Mail, Instagram, Linkedin, Globe } from "lucide-react";

export const AboutSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center terminal-style">
      <div className="max-w-xl w-full mx-auto bg-card border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-foreground">About Budgeteer</h1>
        <p className="text-muted-foreground mb-6">
          Budgeteer is an AI-powered expense tracking application that helps you manage your finances intelligently.<br />
          Track your expenses, get AI insights, and make better financial decisions effortlessly.
        </p>
        <p className="mb-8">
          Made by <span className="font-semibold">Apoorv Mane</span> 🚀
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4 justify-center mb-2">
            <a href="mailto:apoorvmane@gmail.com" target="_blank" rel="noopener noreferrer" className="minimal-button flex items-center gap-2 px-4 py-2"><Mail className="h-5 w-5" /> Mail</a>
            <a href="https://www.instagram.com/thefloatin_cloud/profilecard/?igsh=MThjbmhjMDd4NnI3Yw==" target="_blank" rel="noopener noreferrer" className="minimal-button flex items-center gap-2 px-4 py-2"><Instagram className="h-5 w-5" /> Instagram</a>
          </div>
          <div className="flex gap-4 justify-center">
            <a href="https://www.linkedin.com/in/apoorvmane?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="minimal-button flex items-center gap-2 px-4 py-2"><Linkedin className="h-5 w-5" /> LinkedIn</a>
            <a href="https://apoorv-m.netlify.app" target="_blank" rel="noopener noreferrer" className="minimal-button flex items-center gap-2 px-4 py-2"><Globe className="h-5 w-5" /> Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};
