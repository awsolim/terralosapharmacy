import Link from "next/link";
import { notFound } from "next/navigation";
import { updateContactMessageStatusAction } from "@/lib/admin-actions";
import {
  formatDateTime,
  formatReason,
  getContactMessageDetail,
} from "@/lib/admin-requests";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

export default async function ContactMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getContactMessageDetail(id);

  if (!result.message && !result.error) {
    notFound();
  }

  if (!result.message) {
    return (
      <div className="rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]">
        {result.error}
      </div>
    );
  }

  const message = result.message;

  return (
    <div className="space-y-6">
      <Link className="text-sm font-bold text-awning" href="/admin/messages">
        Back to contact messages
      </Link>

      <section className="rounded-[28px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Contact message
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {message.name}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Submitted {formatDateTime(message.created_at)}
            </p>
          </div>
          <StatusPill status={message.status} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <section className="rounded-[24px] border border-white/75 bg-surface/88 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Message details
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Detail label="Phone" value={message.phone} />
            <Detail label="Email" value={message.email || "Not provided"} />
            <Detail label="Reason" value={formatReason(message.reason)} />
            <Detail label="Status" value={message.status} />
          </dl>
          <div className="mt-6">
            <Detail label="Message" value={message.message} />
          </div>
        </section>

        <section className="rounded-[24px] border border-white/75 bg-surface/88 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Actions
          </h2>
          <div className="mt-5 grid gap-3">
            <form action={updateContactMessageStatusAction}>
              <input name="id" type="hidden" value={message.id} />
              <input name="status" type="hidden" value="read" />
              <Button className="w-full" type="submit">
                Mark as read
              </Button>
            </form>
            <form action={updateContactMessageStatusAction}>
              <input name="id" type="hidden" value={message.id} />
              <input name="status" type="hidden" value="archived" />
              <Button className="w-full" type="submit" variant="outline">
                Archive message
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-wrap text-base font-semibold leading-7 text-foreground">
        {value}
      </dd>
    </div>
  );
}
