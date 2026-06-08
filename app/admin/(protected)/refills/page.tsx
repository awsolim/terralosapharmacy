import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/ui/status-pill";
import {
  formatDateTime,
  formatFulfillment,
  getRefillRequests,
  refillStatuses,
  statusLabels,
  type AdminSearchParams,
} from "@/lib/admin-requests";

export default async function AdminRefillsPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  const result = await getRefillRequests(await searchParams);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
          Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Refill Requests
        </h1>
        <form className="mt-6 grid gap-3 lg:grid-cols-[1fr_15rem_auto]">
          <Input
            defaultValue={result.search}
            id="refill-search"
            label="Search"
            name="q"
            placeholder="Name, phone, Rx number, medication"
          />
          <div className="space-y-2.5">
            <label
              className="block text-sm font-semibold text-foreground"
              htmlFor="refill-status"
            >
              Status
            </label>
            <select
              className="min-h-14 w-full rounded-[18px] border border-white/70 bg-white/80 px-5 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_24px_rgba(31,45,38,0.06)] outline outline-1 outline-border/60 transition focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
              defaultValue={result.status}
              id="refill-status"
              name="status"
            >
              <option value="">All statuses</option>
              {refillStatuses.map((status) => (
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
            <Link className="text-sm font-bold text-awning" href="/admin/refills">
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
            {result.items.map((request) => (
              <Link
                className="grid gap-4 p-5 transition hover:bg-white/75 xl:grid-cols-[1.05fr_0.9fr_0.8fr_0.75fr_auto]"
                href={`/admin/refills/${request.id}`}
                key={request.id}
              >
                <div>
                  <p className="font-bold text-foreground">
                    {request.first_name} {request.last_name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{request.phone}</p>
                </div>
                <div className="text-sm leading-6 text-muted">
                  <p>Rx: {request.prescription_number || "Not provided"}</p>
                  <p>Medication: {request.medication_name || "Not provided"}</p>
                </div>
                <div className="text-sm leading-6 text-muted">
                  <p>{formatFulfillment(request.fulfillment_preference)}</p>
                  <p>
                    {request.attachmentCount > 0
                      ? `${request.attachmentCount} attachment${
                          request.attachmentCount === 1 ? "" : "s"
                        }`
                      : "No attachments"}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {formatDateTime(request.created_at)}
                </p>
                <StatusPill className="self-start" status={request.status} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-sm leading-7 text-muted">
            No refill requests match the current filters.
          </div>
        )}
      </section>
    </div>
  );
}
