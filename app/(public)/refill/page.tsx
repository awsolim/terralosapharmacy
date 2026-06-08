import { RefillForm } from "@/app/(public)/refill/refill-form";
import { FormInfoSidebar } from "@/components/layout/form-info-sidebar";
import { PageHeroLabels } from "@/components/layout/page-hero-labels";
import { getPublicContent, textOrFallback } from "@/lib/content";

// Optional: set this to a public image path such as "/images/storefront.jpg".
const heroBackgroundImage = "/images/stockshelf.jpg";

export default async function RefillPage() {
  const content = await getPublicContent();
  const page = content.pages.get("refill");

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0e6a78_0%,#4f9b82_58%,#8bc452_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        {heroBackgroundImage ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          />
        ) : null}
        <div className="relative mx-auto w-full max-w-[88rem]">
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
      <PageHeroLabels
        labels={["same-day-refill", "free-delivery", "call-refill"]}
        settings={content.settings}
      />

      <div className="mx-auto grid w-full max-w-[88rem] items-start gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8">
        <section className="self-start rounded-[28px] border border-border/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(31,45,38,0.1)] sm:p-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Online Refill Request
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Complete the form below and attach a file if it
              helps the pharmacy identify your request.
            </p>
          </div>
          <RefillForm />
        </section>

        <FormInfoSidebar hours={content.hours} settings={content.settings} />
      </div>
    </div>
  );
}
