import Link from "next/link";
import { notFound } from "next/navigation";
import {
  archiveRefillRequestAction,
  updateRefillRequestAction,
} from "@/lib/admin-actions";
import {
  formatDate,
  formatDateTime,
  formatFulfillment,
  getRefillRequestDetail,
  refillStatuses,
  statusLabels,
} from "@/lib/admin-requests";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";

export default async function RefillRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getRefillRequestDetail(id);

  if (!result.request && !result.error) {
    notFound();
  }

  if (!result.request) {
    return (
      <div className="rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]">
        {result.error}
      </div>
    );
  }

  const request = result.request;

  return (
    <div className="space-y-6">
      <Link className="text-sm font-bold text-awning" href="/admin/refills">
        Back to refill requests
      </Link>

      <section className="rounded-[28px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Refill request
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {request.first_name} {request.last_name}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              Submitted {formatDateTime(request.created_at)}
            </p>
          </div>
          <StatusPill status={request.status} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_24rem]">
        <section className="rounded-[24px] border border-white/75 bg-surface/88 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Request details
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <Detail label="Date of birth" value={formatDate(request.date_of_birth)} />
            <Detail label="Phone" value={request.phone} />
            <Detail label="Email" value={request.email || "Not provided"} />
            <Detail
              label="Fulfillment"
              value={formatFulfillment(request.fulfillment_preference)}
            />
            <Detail
              label="Prescription number"
              value={request.prescription_number || "Not provided"}
            />
            <Detail
              label="Medication"
              value={request.medication_name || "Not provided"}
            />
            <Detail
              label="Consent"
              value={request.consent_given ? "Consent provided" : "Missing"}
            />
          </dl>
          <div className="mt-6">
            <Detail label="Patient notes" value={request.notes || "No notes provided"} />
          </div>
        </section>

        <section className="rounded-[24px] border border-white/75 bg-surface/88 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Actions
          </h2>
          <form action={updateRefillRequestAction} className="mt-5 grid gap-4">
            <input name="id" type="hidden" value={request.id} />
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-foreground"
                htmlFor="status"
              >
                Status
              </label>
              <select
                className="min-h-12 w-full rounded-[16px] border border-white/70 bg-white/80 px-4 text-base text-foreground outline outline-1 outline-border/60 focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={request.status}
                id="status"
                name="status"
              >
                {refillStatuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-foreground"
                htmlFor="internal_notes"
              >
                Internal notes
              </label>
              <textarea
                className="min-h-36 w-full rounded-[18px] border border-white/70 bg-white/80 px-4 py-3 text-base text-foreground outline outline-1 outline-border/60 focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={request.internal_notes ?? ""}
                id="internal_notes"
                name="internal_notes"
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
          <form action={archiveRefillRequestAction} className="mt-3">
            <input name="id" type="hidden" value={request.id} />
            <Button className="w-full" type="submit" variant="outline">
              Archive request
            </Button>
          </form>
        </section>
      </div>

      <section className="rounded-[24px] border border-white/75 bg-surface/88 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          Attached files
        </h2>
        <div className="mt-5 grid gap-3">
          {result.files.length > 0 ? (
            result.files.map((file) => (
              <div
                className="flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-border/70 bg-white/70 p-4"
                key={file.id}
              >
                <div>
                  <p className="font-bold text-foreground">{file.file_name}</p>
                  <p className="text-sm text-muted">
                    {file.file_type} · {Math.ceil(file.file_size / 1024)} KB
                  </p>
                </div>
                {file.signedUrl ? (
                  <a
                    className="text-sm font-bold text-awning underline underline-offset-4"
                    href={file.signedUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View or download
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-muted">
                    Link unavailable
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm leading-7 text-muted">
              No files were attached to this refill request.
            </p>
          )}
        </div>
      </section>
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
