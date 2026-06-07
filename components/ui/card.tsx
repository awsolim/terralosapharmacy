import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "aside" | "div" | "section";
  padding?: "none" | "sm" | "md" | "lg";
};

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  as: Component = "div",
  className,
  padding = "md",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-[30px] border border-white/75 bg-surface/88 shadow-[var(--shadow-soft)] ring-1 ring-border/45 backdrop-blur transition-all duration-200 hover:shadow-[0_28px_80px_rgba(31,45,38,0.13)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/90",
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
