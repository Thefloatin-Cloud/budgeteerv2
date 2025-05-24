import { Home, DollarSign, MessageSquare, Settings as SettingsIcon, BarChart3, Lightbulb, Info } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <text x="4" y="19" fontSize="18" fontFamily="Arial, sans-serif">₹</text>
  </svg>
);

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const topNavigation = [
    { id: "home", icon: Home, label: "home" },
    { id: "expenses", icon: RupeeIcon, label: "expenses" },
    { id: "report", icon: BarChart3, label: "reports" },
    { id: "ai-chat", icon: MessageSquare, label: "ai chat" },
  ];

  const bottomNavigation = [
    { id: "settings", icon: SettingsIcon, label: "settings" },
    { id: "feature", icon: Lightbulb, label: "feature-request" },
    // Removed the 'updates' icon
    { id: "about", icon: Info, label: "about" },
  ];

  const handleClick = (id: string) => {
    if (topNavigation.find(item => item.id === id)) {
      onTabChange(id);
    } else {
      onTabChange(id);
    }
  };

  return (
    <div className="w-20 bg-sidebar-background border-r h-full flex flex-col py-6">
      <div className="px-4 mb-8 flex items-center justify-center">
        <img src="/circle-logo.png" alt="Logo" className="h-8 w-8" />
      </div>

      <nav className="flex-1 flex flex-col items-center space-y-4 px-3">
        {topNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-sidebar-ring ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => handleClick(item.id)}
              title={item.label}
              tabIndex={0}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col items-center space-y-4 px-3 mt-8">
        {bottomNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-sidebar-ring ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => handleClick(item.id)}
              title={item.label}
              tabIndex={0}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
