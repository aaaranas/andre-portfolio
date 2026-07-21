import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "success" | "orange";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500/20",
    secondary: "border-transparent bg-slate-800 text-slate-300 border border-slate-700/60",
    outline: "border-slate-700/80 text-slate-300 bg-transparent",
    accent: "border-teal-400/40 bg-teal-400/10 text-teal-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
