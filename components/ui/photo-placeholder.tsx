import { cn } from "@/lib/utils";

type PhotoPlaceholderProps = {
  className?: string;
  label: string;
  note: string;
  minHeightClassName?: string;
};

export function PhotoPlaceholder({
  className,
  label,
  minHeightClassName = "min-h-72",
  note,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(220,236,229,0.88),rgba(255,250,241,0.74))] shadow-[var(--shadow-soft)] ring-1 ring-border/50",
        minHeightClassName,
        className,
      )}
    >
      <div className="absolute -left-10 top-8 h-32 w-56 rotate-[-18deg] rounded-full bg-white/38" />
      <div className="absolute bottom-8 right-8 h-16 w-40 rotate-[14deg] rounded-full border border-white/70 bg-primary-soft/70" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/90" />
      <div className={cn("relative flex flex-col justify-end p-7 sm:p-8", minHeightClassName)}>
        <span className="w-fit rounded-full bg-white/72 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary shadow-sm ring-1 ring-white/80">
          Future photo
        </span>
        <h3 className="mt-5 text-3xl font-extrabold leading-tight text-foreground">
          {label}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted">{note}</p>
      </div>
    </div>
  );
}
