import { useState } from "react";
import { Lightbulb, Send } from "lucide-react";

export const FeatureRequest = () => {
  const [message, setMessage] = useState("");

  const handleRequest = async () => {
    if (message.trim().length === 0) return;
    try {
        const response = await fetch('https://formspree.io/f/manogywe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                _replyto: 'apoorvmane001@gmail.com',
            }),
        });
        if (response.ok) {
            alert('Feature request sent successfully!');
            setMessage('');
        } else {
            alert('Failed to send feature request.');
        }
    } catch (error) {
        alert('An error occurred while sending the feature request.');
    }
};

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 terminal-style">
      <div className="max-w-md w-full bg-card border-border rounded-xl p-8 shadow-sm flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center gap-2 mb-4">
          <Lightbulb className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Request a Feature</h2>
          <p className="text-muted-foreground text-sm">Have an idea? Let me know what would make Budgeteer even better!</p>
        </div>
        <textarea
          className="minimal-input w-full h-28 resize-none mb-2"
          placeholder="Describe your feature request..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="minimal-button flex items-center gap-2 w-full justify-center"
          disabled={!message.trim()}
          onClick={handleRequest}
        >
          <Send className="h-4 w-4" />
          Send Request
        </button>
      </div>
    </div>
  );
};
