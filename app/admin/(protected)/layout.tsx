import type { ReactNode } from "react";
import Link from "next/link";
import { AdminNav } from "@/app/admin/(protected)/admin-nav";
import { LogoutButton } from "@/app/admin/(protected)/logout-button";
import { requireAdminSession } from "@/lib/admin-auth";
import { buttonStyles } from "@/components/ui/button";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireAdminSession();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/70 bg-surface/94 shadow-[0_16px_40px_rgba(31,45,38,0.07)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 w-full max-w-[90rem] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-3 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <span className="flex size-11 items-center justify-center rounded-[12px] bg-primary text-sm font-bold text-white shadow-[var(--shadow-button)]">
              TL
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold uppercase tracking-[0.14em] text-awning">
                Staff admin
              </span>
              <span className="block font-serif text-xl font-semibold text-foreground">
                Terra Losa Pharmacy
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className={buttonStyles({ variant: "ghost", size: "sm" })}
            >
              Public site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[90rem] gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[17rem_1fr] lg:px-8 lg:py-8">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-[24px] border border-white/75 bg-surface/88 p-4 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
            <div className="rounded-[18px] bg-primary-soft/70 p-4">
              <p className="text-sm font-bold text-foreground">
                {admin.profile.full_name}
              </p>
              <p className="mt-1 break-all text-xs font-semibold text-muted">
                {admin.email}
              </p>
              <p className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-awning ring-1 ring-border/60">
                {admin.profile.role}
              </p>
            </div>
            <AdminNav />
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
