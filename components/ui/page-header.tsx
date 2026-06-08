import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("max-w-4xl py-12 sm:py-16", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-4xl font-extrabold leading-[1.02] text-foreground sm:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-xl">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
