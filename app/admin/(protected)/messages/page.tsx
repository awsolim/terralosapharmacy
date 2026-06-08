import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import {
  contactStatuses,
  formatDateTime,
  formatReason,
  getContactMessages,
  statusLabels,
  type AdminSearchParams,
} from "@/lib/admin-requests";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  const result = await getContactMessages(await searchParams);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
          Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Contact Messages
        </h1>
        <form className="mt-6 grid gap-3 lg:grid-cols-[1fr_15rem_auto]">
          <Input
            defaultValue={result.search}
            id="message-search"
            label="Search"
            name="q"
            placeholder="Name, phone, email, reason, message"
          />
          <div className="space-y-2.5">
            <label
              className="block text-sm font-semibold text-foreground"
              htmlFor="message-status"
            >
              Status
            </label>
            <select
              className="min-h-14 w-full rounded-[18px] border border-white/70 bg-white/80 px-5 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(31,45,38,0.06)] outline outline-1 outline-border/60 transition focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
              defaultValue={result.status}
              id="message-status"
              name="status"
            >
              <option value="">All statuses</option>
              {contactStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="w-full lg:w-auto" type="submit">
              Filter
            </Button>
            <Link className="text-sm font-bold text-awning" href="/admin/messages">
              Clear
            </Link>
          </div>
        </form>
      </section>

      {result.error ? (
        <div className="rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]">
          {result.error}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-[24px] border border-white/75 bg-surface/88 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
        {result.items.length > 0 ? (
          <div className="divide-y divide-border/70">
            {result.items.map((message) => (
              <Link
                className="grid gap-4 p-5 transition hover:bg-white/75 xl:grid-cols-[0.8fr_0.85fr_1.1fr_0.75fr_auto]"
                href={`/admin/messages/${message.id}`}
                key={message.id}
              >
                <div>
                  <p className="font-bold text-foreground">{message.name}</p>
                  <p className="mt-1 text-sm text-muted">{message.phone}</p>
                  <p className="text-sm text-muted">
                    {message.email || "No email"}
                  </p>
                </div>
                <p className="text-sm font-semibold text-awning">
                  {formatReason(message.reason)}
                </p>
                <p className="line-clamp-2 text-sm leading-6 text-muted">
                  {message.message}
                </p>
                <p className="text-sm text-muted">
                  {formatDateTime(message.created_at)}
                </p>
                <StatusPill className="self-start" status={message.status} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-sm leading-7 text-muted">
            No contact messages match the current filters.
          </div>
        )}
      </section>
    </div>
  );
}
