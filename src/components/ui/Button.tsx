import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-interactive active-press focus:outline-none focus:ring-2 focus:ring-[var(--muted)] focus:ring-offset-2 disabled:opacity-50 disabled:active:transform-none";
  const variants = {
    primary:
      "bg-[var(--foreground)] text-white hover:opacity-90",
    secondary:
      "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--border)]",
    ghost:
      "text-[var(--foreground)] hover:bg-[var(--border)]",
    gradient:
      "gradient-accent text-white hover:opacity-90",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
