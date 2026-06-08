import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { getPublicContent, textOrFallback } from "@/lib/content";

function ValueIcon({ type }: { type: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  if (type === "roots") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M12 21v-8" />
        <path d="M8 17c-3 0-5-2-5-5 3 0 5 2 5 5Z" />
        <path d="M16 17c3 0 5-2 5-5-3 0-5 2-5 5Z" />
        <path d="M12 13c-3-2-4-5-2-9 3 2 4 5 2 9Z" />
        <path d="M12 13c3-2 4-5 2-9-3 2-4 5-2 9Z" />
      </svg>
    );
  }

  if (type === "support") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M4 12a8 8 0 0 1 16 0" />
        <path d="M4 12v4a2 2 0 0 0 2 2h2v-6H4Z" />
        <path d="M20 12v4a2 2 0 0 1-2 2h-2v-6h4Z" />
        <path d="M9 20h6" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
      <path d="M19 14c1.5-1.5 3-3.3 3-5.6A5.4 5.4 0 0 0 16.6 3c-1.4 0-2.8.6-3.6 1.7A4.8 4.8 0 0 0 9.4 3 5.4 5.4 0 0 0 4 8.4c0 2.3 1.5 4.1 3 5.6l5 5 7-5Z" />
    </svg>
  );
}

export default async function AboutPage() {
  const content = await getPublicContent();
  const page = content.pages.get("about");
  const values = content.aboutValues;

  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,#0e6a78_0%,#4f9b82_58%,#8bc452_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
            {textOrFallback(page?.eyebrow, "About")}
          </p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,5vw,5.25rem)] font-extrabold leading-[1.02]">
            {textOrFallback(
              page?.hero_title ?? page?.title,
              "A local pharmacy built around practical care.",
            )}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/86">
            {textOrFallback(
              page?.hero_subtitle ?? page?.subtitle,
              "Terra Losa Pharmacy serves the surrounding Edmonton area with clear, grounded pharmacy support.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-[#d9f5ef] px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid w-full max-w-[78rem] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] bg-white/70 shadow-[var(--shadow-soft)] ring-1 ring-white/80 sm:min-h-[430px]">
            <Image
              alt="Terra Losa Pharmacy team inside the pharmacy"
              className="object-cover object-center"
              fill
              sizes="(min-width: 1024px) 38rem, 100vw"
              src="/images/interior-staff.jpg"
            />
          </div>
          <div>
            <Badge variant="sage">Who We Are</Badge>
            <h2 className="mt-5 font-serif text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-tight text-foreground">
              Our Story
            </h2>
            <div className="mt-5 whitespace-pre-line text-base leading-8 text-foreground/80">
              {textOrFallback(
                page?.body,
                "Terra Losa Pharmacy is being built around practical, personal pharmacy care for nearby Edmonton patients and families.\n\nOur goal is simple: make it easier to ask questions, request refills, understand medication options, and know when to call. Care should feel clear, accessible, and close to home.",
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[78rem]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              What we stand for
            </p>
            <h2 className="mt-3 font-serif text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-tight text-foreground">
              Our Values
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {values.map((value, index) => (
              <article
                className="rounded-[22px] border border-awning/15 bg-[linear-gradient(135deg,#e5f7f2,#f8fff4)] p-5 shadow-[0_18px_48px_rgba(31,45,38,0.08)] ring-1 ring-white/80"
                key={value.title}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-white text-awning shadow-sm ring-1 ring-awning/12">
                    <ValueIcon type={value.icon_name ?? "heart"} />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                    {value.description ? (
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {value.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div
                  className="mt-5 h-1 rounded-full bg-[linear-gradient(90deg,var(--storefront-green),var(--awning))]"
                  style={{ opacity: 0.35 + index * 0.1 }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-awning px-5 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[78rem] flex-col gap-5 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight">
              Come meet the Terra Losa Pharmacy team.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82">
              We would be happy to help with refills, medication questions, and
               next steps for your pharmacy care.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className:
                  "bg-white !text-awning hover:bg-blue-gray hover:!text-awning",
              })}
              href="/contact"
            >
              Contact us
            </Link>
            <Link
              className={buttonStyles({
                variant: "outline",
                size: "md",
              })}
              href="/location"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
