import Image from "next/image";
import { pharmacyContact } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { RefillForm } from "@/app/(public)/refill/refill-form";
import { getPublicContent, textOrFallback } from "@/lib/content";

const weeklyHours = [
  ["Monday", "9 AM - 6 PM"],
  ["Tuesday", "9 AM - 6 PM"],
  ["Wednesday", "9 AM - 6 PM"],
  ["Thursday", "9 AM - 6 PM"],
  ["Friday", "9 AM - 6 PM"],
  ["Saturday", "10 AM - 3 PM"],
  ["Sunday", "Closed"],
];

export default async function RefillPage() {
  const content = await getPublicContent();
  const page = content.pages.get("refill");

  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,#0e6a78_0%,#4f9b82_58%,#8bc452_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-[72rem]">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
              {textOrFallback(page?.eyebrow, "Refill prescription")}
            </p>
            <h1 className="mt-4 text-[clamp(3rem,5vw,5.25rem)] font-extrabold leading-[1.02] lg:whitespace-nowrap">
              {textOrFallback(page?.hero_title ?? page?.title, "Request a Prescription Refill.")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              {textOrFallback(
                page?.hero_subtitle ?? page?.subtitle,
                "Send the details the pharmacy team needs to review your request. This is not a confirmation that the prescription is ready.",
              )}
            </p>
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
                alt="Terra Losa Pharmacy storefront"
                className="object-contain"
                fill
                sizes="(min-width: 1024px) 25rem, 100vw"
                src="/images/storefront.jpg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground">
                Terra Losa Pharmacy
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
              For urgent needs, call the pharmacy
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
