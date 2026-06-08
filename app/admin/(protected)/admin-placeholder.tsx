type AdminPlaceholderProps = {
  title: string;
  text: string;
};

export function AdminPlaceholder({ text, title }: AdminPlaceholderProps) {
  return (
    <section className="rounded-[28px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
        Admin
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{text}</p>
    </section>
  );
}
