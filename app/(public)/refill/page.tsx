import Image from "next/image";
import { pharmacyContact } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { RefillForm } from "@/app/(public)/refill/refill-form";

const refillHighlights = [
  "Secure pharmacy review",
  "Optional prescription upload",
  "Call for urgent needs",
];

const weeklyHours = [
  ["Monday", "9 AM - 6 PM"],
  ["Tuesday", "9 AM - 6 PM"],
  ["Wednesday", "9 AM - 6 PM"],
  ["Thursday", "9 AM - 6 PM"],
  ["Friday", "9 AM - 6 PM"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

export default function RefillPage() {
  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,#0e6a78_0%,#4f9b82_58%,#8bc452_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
              Refill prescription
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">
              Request a prescription refill.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              Send the details the pharmacy team needs to review your request.
              This is not a confirmation that the prescription is ready.
            </p>
          </div>
          <div className="grid gap-3 text-sm font-bold sm:grid-cols-3 lg:min-w-[34rem]">
            {refillHighlights.map((item) => (
              <p
                className="rounded-full bg-white/16 px-4 py-3 text-center ring-1 ring-white/22"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[88rem] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8">
        <section className="rounded-[28px] border border-border/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(31,45,38,0.1)] sm:p-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Online refill request
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Complete the form below and attach a prescription photo if it
              helps the pharmacy identify your request.
            </p>
          </div>
          <RefillForm />
        </section>

        <aside className="space-y-5">
          <Card className="overflow-hidden p-0" padding="none">
            <div className="relative h-80 bg-[#f7f4ec] sm:h-96 lg:h-[22rem]">
              <Image
                alt="Tera Losa Pharmacy storefront"
                className="object-contain"
                fill
                sizes="(min-width: 1024px) 25rem, 100vw"
                src="/images/storefront.jpg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground">
                Tera Losa Pharmacy
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {pharmacyContact.address}
              </p>
            </div>
          </Card>
          <Card
            className="border-transparent bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_58%,#4f9b82_100%)] text-white ring-0"
            padding="md"
          >
            <h2 className="text-xl font-bold">Prefer to call?</h2>
            <p className="mt-3 text-sm leading-7 text-white/84">
              For urgent or same-day prescription needs, call the pharmacy
              directly.
            </p>
            <a
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-5 text-base font-bold text-awning"
              href={`tel:${pharmacyContact.phoneHref}`}
            >
              {pharmacyContact.phone}
            </a>
          </Card>
          <Card padding="md">
            <h2 className="text-lg font-semibold text-foreground">
              Pharmacy hours
            </h2>
            <dl className="mt-4 grid gap-2 text-sm">
              {weeklyHours.map(([day, hours]) => (
                <div className="grid grid-cols-[1fr_auto] gap-4" key={day}>
                  <dt className="text-muted">{day}</dt>
                  <dd className="font-bold text-foreground">{hours}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </aside>
      </div>
    </div>
  );
}
