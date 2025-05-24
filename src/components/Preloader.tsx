import { cn } from "@/lib/utils";

export const Preloader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-300", className)}>
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-2 border-primary/20"></div>
        <div className="absolute left-0 top-0 h-16 w-16 animate-[spin_1s_linear_infinite] rounded-full border-2 border-transparent border-t-primary"></div>
        <div className="absolute left-0 top-0 h-16 w-16 animate-[spin_2s_linear_infinite] rounded-full border-2 border-transparent border-l-primary/40"></div>
      </div>
    </div>
  );
};