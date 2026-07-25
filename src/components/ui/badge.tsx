import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ variant = "default", style, className, ...props }: BadgeProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "999px",
    padding: "2px 10px",
    fontSize: "11px",
    fontFamily: "var(--font-mono)",
    fontWeight: 600,
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    ...(variant === "outline"
      ? { background: "transparent", border: "1px solid currentColor" }
      : { background: "var(--accent)", color: "#080c10", border: "none" }),
    ...style,
  };
  return <span style={base} {...props} />;
}
