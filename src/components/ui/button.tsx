import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[var(--accent)] text-[#080c10] font-bold hover:brightness-110 shadow-md shadow-teal-500/20",
      outline: "border border-[var(--border)] bg-transparent text-[var(--text)] hover:border-[var(--accent)] hover:bg-teal-500/10 hover:text-[var(--accent)]",
      ghost: "hover:bg-teal-500/10 hover:text-[var(--accent)] text-[var(--muted)]",
      secondary: "bg-[var(--bg3)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--card)]",
      accent: "bg-orange-500 text-white font-bold hover:bg-orange-600 shadow-md shadow-orange-500/20",
    };

    const sizes = {
      default: "h-10 px-5 py-2 text-xs",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-sm",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
