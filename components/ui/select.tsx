import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  helperText?: string;
  errorText?: string;
  label?: ReactNode;
};

export function Select({
  className,
  helperText,
  errorText,
  id,
  label,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2.5">
      {label ? (
        <label className="block text-sm font-semibold text-foreground" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <select
        aria-describedby={helperText || errorText ? `${id}-description` : undefined}
        aria-invalid={errorText ? true : undefined}
        className={cn(
          "min-h-14 w-full appearance-none rounded-[18px] border border-white/70 bg-white/80 px-5 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(31,45,38,0.06)] outline outline-1 outline-border/60 transition focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:bg-primary-soft/50 disabled:text-muted",
          errorText && "border-[#b94a48] focus:border-[#b94a48] focus:ring-[#e6b8b6]",
          className,
        )}
        id={id}
        {...props}
      >
        {children}
      </select>
      {helperText || errorText ? (
        <p
          className={cn("text-sm leading-6", errorText ? "text-[#9f3432]" : "text-muted")}
          id={`${id}-description`}
        >
          {errorText ?? helperText}
        </p>
      ) : null}
    </div>
  );
}
