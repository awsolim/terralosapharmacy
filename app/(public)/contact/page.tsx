import { ContactForm } from "@/app/(public)/contact/contact-form";
import { FormInfoSidebar } from "@/components/layout/form-info-sidebar";
import { PageHeroLabels } from "@/components/layout/page-hero-labels";
import { getPublicContent } from "@/lib/content";

// Optional: set this to a public image path such as "/images/storefront.jpg".
const heroBackgroundImage = "/images/stockcontact.jpg";

export default async function ContactPage() {
  const content = await getPublicContent();

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_54%,#4f9b82_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        {heroBackgroundImage ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          />
        ) : null}
        <div className="relative mx-auto w-full max-w-[88rem]">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">
            Talk to Us.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
            Questions about prescriptions, services, or visiting the pharmacy? Send us a message and our team will get back to you as soon as possible
          </p>
        </div>
      </section>
      <PageHeroLabels labels={["address", "call-refill"]} settings={content.settings} />

      <div className="mx-auto grid w-full max-w-[88rem] items-start gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[24rem_minmax(0,1fr)] lg:px-8">
        <div className="lg:order-first">
          <FormInfoSidebar hours={content.hours} settings={content.settings} />
        </div>

        <section className="self-start rounded-[28px] border border-border/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(31,45,38,0.1)] sm:p-8">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              We will review your message and contact you if follow-up is
              needed.
            </p>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
