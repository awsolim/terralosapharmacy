import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-storefront-green text-white shadow-[0_14px_28px_rgba(115,191,67,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-[#5ca83b]/30 hover:-translate-y-0.5 hover:bg-[#82c84d] hover:text-white hover:shadow-[0_18px_34px_rgba(115,191,67,0.28)] active:translate-y-0",
  secondary:
    "bg-awning text-white shadow-[0_14px_30px_rgba(14,106,120,0.18),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-[#0d5964]/25 hover:-translate-y-0.5 hover:bg-[#127887]",
  outline:
    "border border-awning/20 bg-surface/82 text-awning shadow-[0_10px_24px_rgba(31,45,38,0.06),inset_0_1px_0_rgba(255,255,255,0.86)] backdrop-blur hover:-translate-y-0.5 hover:border-awning/35 hover:bg-white",
  ghost: "text-primary hover:bg-primary-soft/80",
  
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      type={type}
      {...props}
    />
  );
}
