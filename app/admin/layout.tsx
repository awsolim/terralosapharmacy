import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonStyles } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <Container className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-3 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <span className="flex size-10 items-center justify-center rounded-[8px] bg-primary text-sm font-semibold text-white">
              TL
            </span>
            <span className="text-sm font-semibold text-foreground">
              Tera Losa Admin
            </span>
          </Link>
          <Link
            href="/"
            className={buttonStyles({ variant: "ghost", size: "sm" })}
          >
            Public site
          </Link>
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
