import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { formatDateTime, getAdminOverview } from "@/lib/admin-requests";

export default async function AdminDashboardPage() {
  const overview = await getAdminOverview();
  const dashboardCards = [
    {
      title: "New refill requests",
      value: overview.counts.newRefills,
      href: "/admin/refills?status=new",
    },
    {
      title: "In-review refills",
      value: overview.counts.inReviewRefills,
      href: "/admin/refills?status=in_review",
    },
    {
      title: "New contact messages",
      value: overview.counts.newMessages,
      href: "/admin/messages?status=new",
    },
    {
      title: "Website content",
      value: "Later",
      href: "/admin/content",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/75 bg-[linear-gradient(135deg,var(--surface),var(--sage))] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
          Admin dashboard
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Staff workspace
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          Monitor refill requests and contact messages submitted through the
          public website.
        </p>
      </section>

      {overview.error ? (
        <div className="rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]">
          {overview.error}
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2">
        {dashboardCards.map((card) => (
          <Link
            className="block rounded-[30px] focus:outline-none focus:ring-2 focus:ring-ring"
            href={card.href}
            key={card.title}
          >
            <Card className="h-full" padding="lg">
              <p className="text-4xl font-bold text-awning">{card.value}</p>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {card.title}
              </h2>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Card padding="lg">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Recent refill requests
            </h2>
            <Link className="text-sm font-bold text-awning" href="/admin/refills">
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {overview.recentRefills.length > 0 ? (
              overview.recentRefills.map((request) => (
                <Link
                  className="rounded-[18px] border border-border/70 bg-white/70 p-4 transition hover:bg-white"
                  href={`/admin/refills/${request.id}`}
                  key={request.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-foreground">
                        {request.first_name} {request.last_name}
                      </p>
                      <p className="text-sm text-muted">{request.phone}</p>
                    </div>
                    <StatusPill status={request.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {formatDateTime(request.created_at)}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-muted">
                No refill requests yet.
              </p>
            )}
          </div>
        </Card>

        <Card padding="lg">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Recent contact messages
            </h2>
            <Link className="text-sm font-bold text-awning" href="/admin/messages">
              View all
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {overview.recentMessages.length > 0 ? (
              overview.recentMessages.map((message) => (
                <Link
                  className="rounded-[18px] border border-border/70 bg-white/70 p-4 transition hover:bg-white"
                  href={`/admin/messages/${message.id}`}
                  key={message.id}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-foreground">{message.name}</p>
                      <p className="text-sm text-muted">{message.phone}</p>
                    </div>
                    <StatusPill status={message.status} />
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {formatDateTime(message.created_at)}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-7 text-muted">
                No contact messages yet.
              </p>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
