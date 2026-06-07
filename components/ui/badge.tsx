import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "teal" | "sage" | "blue" | "neutral";

const variants: Record<BadgeVariant, string> = {
  teal: "bg-primary-soft text-primary ring-primary/10",
  sage: "bg-sage text-[#516d5c] ring-[#cad8ce]",
  blue: "bg-blue-gray text-[#435d68] ring-[#c9d5da]",
  neutral: "bg-surface-strong text-muted ring-border",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "teal", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full px-3.5 text-xs font-semibold uppercase tracking-[0.12em] ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
