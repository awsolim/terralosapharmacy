import type { PlaceholderPageContent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUploadBox } from "@/components/ui/file-upload-box";
import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import Link from "next/link";

type PlaceholderPageProps = PlaceholderPageContent & {
  tone?: "public" | "admin";
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  tone = "public",
}: PlaceholderPageProps) {
  const isAdmin = tone === "admin";

  return (
    <section>
      <PageHeader eyebrow={eyebrow} subtitle={description} title={title} />

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.72fr]">
        <Card className={isAdmin ? "bg-surface-strong" : undefined} padding="lg">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={isAdmin ? "blue" : "teal"}>
              {isAdmin ? "Admin placeholder" : "Public placeholder"}
            </Badge>
            <StatusPill status={isAdmin ? "archived" : "new"} />
          </div>
          <h2 className="mt-6 text-xl font-semibold text-foreground">
            Component-ready page shell
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            This route has the shared layout, spacing, color system, and
            placeholder content needed before final content and workflows are
            introduced.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className={buttonStyles({ variant: "primary", size: "md" })}
              href={isAdmin ? "/admin" : "/contact"}
            >
              {isAdmin ? "Back to dashboard" : "Contact pharmacy"}
            </Link>
            <Link
              className={buttonStyles({ variant: "outline", size: "md" })}
              href="/refill"
            >
              Refill route
            </Link>
          </div>
        </Card>

        <Card className="bg-primary-soft/70 shadow-none" padding="md">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            Foundation scope
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            No backend services, authentication, or live submissions are wired
            on this page.
          </p>
          {!isAdmin ? <FileUploadBox className="mt-6" /> : null}
        </Card>
      </div>
    </section>
  );
}
