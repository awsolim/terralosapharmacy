import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { buttonStyles } from "@/components/ui/button";
import { ServiceGrid } from "@/components/ui/service-grid";
import { getPublicContent, textOrFallback } from "@/lib/content";

const reviews = [
  {
    name: "Sarah M.",
    date: "March 2025",
    quote:
      "The team took time to explain my medication and made the whole refill process easy.",
  },
  {
    name: "James T.",
    date: "January 2025",
    quote:
      "I came in with a question and left with clear next steps. Friendly, practical, and fast.",
  },
  {
    name: "Linda K.",
    date: "February 2025",
    quote:
      "The packaging and delivery support made managing medications much less stressful for our family.",
  },
];

const ribbonItems = [
  ["prescribing", "Prescribing authority"],
  ["delivery", "Free delivery"],
  ["walkin", "No appointment needed"],
  ["licensed", "ACP licensed pharmacy"],
  ["review", "Medication reviews"],
];

// Temporary mobile hero tuning values. Lock these after final DevTools adjustment.
const heroMobileImageStyle = {
  "--hero-mobile-image-x": "0px",
  "--hero-mobile-image-y": "-74px",
  "--hero-mobile-image-scale": "1",
} as CSSProperties;

const heroMobileContentStyle = {
  "--hero-mobile-content-x": "0px",
  "--hero-mobile-content-y": "152px",
} as CSSProperties;

const heroMobileFrameStyle = {
  "--hero-mobile-min-height": "560px",
} as CSSProperties;

function AboutIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5 21a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function RefillIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 3h8l1 4H7l1-4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7 7h10v13H7V7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 13h4M12 11v4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function FactIcon({ type }: { type: string }) {
  const common = {
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  if (type === "delivery") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
        <path d="M3 7h11v10H3V7Z" {...common} />
        <path d="M14 10h3l4 4v3h-7v-7Z" {...common} />
        <path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" {...common} />
      </svg>
    );
  }

  if (type === "walkin") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
        <path d="M9 21V8a3 3 0 0 1 6 0v13" {...common} />
        <path d="M5 21h14M9 11h6M12 5v1" {...common} />
      </svg>
    );
  }

  if (type === "licensed") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
        <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" {...common} />
        <path d="m9 12 2 2 4-5" {...common} />
      </svg>
    );
  }

  if (type === "review") {
    return (
      <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
        <path d="M8 4h8l1 4H7l1-4Z" {...common} />
        <path d="M7 8h10v12H7V8Z" {...common} />
        <path d="M10 12h4M10 16h4" {...common} />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 3v18M5 12h14" {...common} />
      <path d="M7 7a5 5 0 0 1 10 0c0 3-5 5-5 5s-5-2-5-5Z" {...common} />
    </svg>
  );
}

function renderHeroTitle(title: string) {
  const parts = title.split(/(\bcare\b|\bhome\b)/i);

  return parts.map((part, index) => {
    const normalized = part.toLowerCase();

    if (normalized === "care") {
      return (
        <span className="text-awning" key={`${part}-${index}`}>
          {part}
        </span>
      );
    }

    if (normalized === "home") {
      return (
        <span className="text-storefront-green" key={`${part}-${index}`}>
          {part}
        </span>
      );
    }

    return part;
  });
}

function renderMobileHeroTitle(title: string) {
  const normalized = title.trim().toLowerCase();

  if (normalized === "personal pharmacy care, close to home.") {
    return (
      <>
        Personal pharmacy{" "}
        <span className="text-awning/90">care</span>,
        <br />
        close to home.
      </>
    );
  }

  return renderHeroTitle(title);
}

export default async function HomePage() {
  const content = await getPublicContent();
  const hero = content.sections.get("hero");
  const localCare = content.sections.get("local_care");
  const servicesIntro = content.sections.get("services_intro");
  const patientInfo = content.sections.get("patient_info_callout");
  const finalCta = content.sections.get("final_cta");
  const heroTitle = textOrFallback(
    hero?.title,
    "Personal pharmacy care, close to home.",
  );

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border/70 bg-[#fbf7ee]">
        <div className="absolute inset-x-0 top-0 z-10 h-3 bg-[linear-gradient(90deg,var(--storefront-green),var(--awning),#d8dde0)]" />
        <div
          className="absolute inset-x-0 bottom-0 top-3 lg:hidden"
          data-hero-mobile-image-tuner
          style={heroMobileImageStyle}
        >
          <Image
            alt=""
            className="object-cover object-center [transform:translate(var(--hero-mobile-image-x),var(--hero-mobile-image-y))_scale(var(--hero-mobile-image-scale))] [transform-origin:center]"
            fill
            priority
            sizes="100vw"
            src="/images/storefrontmobile-faded.png"
            unoptimized
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 top-3 hidden lg:block">
          <Image
            alt="Exterior storefront of Terra Losa Pharmacy"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/images/storefrontweb.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,238,0.12),rgba(251,247,238,0.58)_42%,rgba(251,247,238,0.18)_78%,rgba(251,247,238,0.04))]" />
        </div>

        <div
          className="relative grid min-h-[var(--hero-mobile-min-height)] w-full px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-16 lg:min-h-[clamp(500px,58vw,620px)] lg:px-[clamp(3rem,6vw,5rem)] lg:py-[clamp(3.5rem,6vw,5.5rem)]"
          data-hero-mobile-frame-tuner
          style={heroMobileFrameStyle}
        >
          <div
            className="relative max-w-[34rem] self-start py-0 [transform:translate(var(--hero-mobile-content-x),var(--hero-mobile-content-y))] sm:self-center lg:max-w-[42rem] lg:translate-x-0 lg:translate-y-0 lg:py-0 lg:[transform:none]"
            data-hero-mobile-content-tuner
            style={heroMobileContentStyle}
          >
            <h1 className="max-w-[42rem] font-sans text-[clamp(2.35rem,8vw,3.35rem)] font-extrabold leading-[1] text-foreground drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] sm:text-[clamp(2.75rem,7vw,4.4rem)] lg:text-[clamp(4rem,5vw,5.25rem)]">
              <span className="lg:hidden">{renderMobileHeroTitle(heroTitle)}</span>
              <span className="hidden lg:inline">{renderHeroTitle(heroTitle)}</span>
            </h1>
            <p className="mt-4 max-w-[29rem] text-base font-semibold leading-7 text-[#3f4944] sm:text-lg sm:leading-8 lg:max-w-xl lg:font-normal lg:text-muted">
              {textOrFallback(
                hero?.subtitle,
                "Refills, prescribing support, and medication questions handled by a team you can reach.",
              )}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link
                href={textOrFallback(hero?.button_href, "/refill")}
                className={buttonStyles({
                  variant: "primary",
                  size: "md",
                  className:
                    "w-full gap-2 whitespace-nowrap !rounded-[10px] px-3 text-sm sm:w-auto sm:px-5 lg:min-h-12 lg:gap-2 lg:px-6 lg:text-base lg:[&_svg]:size-5",
                })}
              >
                <RefillIcon />
                {textOrFallback(hero?.button_label, "Refill prescription")}
              </Link>
              <Link
                href="/about"
                className={buttonStyles({
                  variant: "secondary",
                  size: "md",
                  className:
                    "w-full gap-2 !rounded-[10px] px-2 text-sm sm:w-auto sm:px-5 lg:min-h-12 lg:gap-2 lg:px-6 lg:text-base lg:[&_svg]:size-5",
                })}
              >
                <AboutIcon />
                {textOrFallback(hero?.secondary_button_label, "About us")}
              </Link>
            </div>
          </div>
        </div>

        {content.settings.homepage_announcement ? (
          <div className="relative bg-surface px-5 py-4 text-center text-sm font-bold text-awning shadow-sm">
            {content.settings.homepage_announcement}
          </div>
        ) : null}

        <div className="relative bg-[linear-gradient(90deg,var(--storefront-green),var(--awning),#bdc8cb)] px-5 py-4 text-white shadow-[0_-18px_50px_rgba(14,106,120,0.12)] sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-2 text-sm font-bold sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:text-base">
            {ribbonItems.map(([icon, item]) => (
              <p
                className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3.5 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/18"
                key={item}
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/22">
                  <FactIcon type={icon} />
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background px-5 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[82rem] gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[340px] overflow-hidden rounded-[30px] shadow-[0_28px_80px_rgba(31,45,38,0.14)] ring-1 ring-border/50 sm:min-h-[400px] lg:min-h-[clamp(400px,36vw,500px)]">
            <Image
              alt="Terra Losa Pharmacy staff helping a patient"
              className="object-cover object-[50%_34%]"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              src="/images/interior-staff.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,64,72,0.22)_78%,rgba(14,106,120,0.42))]" />
            <div className="absolute inset-x-0 bottom-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(115,191,67,0.5),rgba(14,106,120,0.34)_42%,transparent_72%)] px-7 pb-7 pt-20">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(3,43,48,0.36)]">
                {textOrFallback(localCare?.eyebrow, "Alberta Pharmacy Prescribing")}
              </p>
            </div>
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight text-foreground">
              {textOrFallback(localCare?.title, "Skip the Doctor's Office. Walk Right In.")}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              {textOrFallback(
                localCare?.subtitle,
                "Pharmacist prescribing can help with common concerns when care is appropriate and available.",
              )}
            </p>
            <div className="mt-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
                Conditions we treat
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 min-[440px]:grid-cols-2">
                {content.conditions.map((condition) => (
                  <div
                    className="min-w-0 rounded-[16px] border border-border/70 bg-white/78 p-3 shadow-sm"
                    key={condition.id}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-primary-soft text-primary">
                        <CheckIcon />
                      </span>
                      <div>
                        <h3 className="break-words text-sm font-bold leading-snug text-foreground sm:text-lg">
                          {condition.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_48%,#6eaa4a_100%)] px-5 py-[clamp(3.5rem,6vw,5rem)] text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[82rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/74">
              {textOrFallback(servicesIntro?.eyebrow, "Services")}
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.05] text-white lg:whitespace-nowrap">
              {textOrFallback(servicesIntro?.title, "Everything You Need, Under One Roof")}
            </h2>
            {servicesIntro?.subtitle ? (
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/82">
                {servicesIntro.subtitle}
              </p>
            ) : null}
          </div>
          <div className="mt-7">
            <ServiceGrid services={content.featuredServices} />
          </div>
          <div className="mt-8 text-center">
            <Link
              className="inline-flex text-base font-bold text-white underline decoration-white/35 underline-offset-8 transition hover:text-white/82"
              href="/services"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-blue-gray/70 px-5 py-[clamp(3.5rem,6vw,5rem)] sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[82rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Hear what our patients say
            </p>
            <div className="flex justify-center gap-1 text-4xl text-[#f0c747]">
              {"★★★★★".split("").map((star, index) => (
                <span key={`${star}-${index}`}>{star}</span>
              ))}
            </div>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,4vw,4.25rem)] font-semibold leading-tight text-foreground">
              4.9 stars on Google
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Placeholder reviews for now. Real Google reviews can be connected
              later when the production content is ready.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                className="relative min-h-60 rounded-[24px] border border-border/70 bg-white/88 p-6 shadow-[0_20px_56px_rgba(31,45,38,0.1)]"
                key={review.name}
              >
                <p className="text-2xl tracking-[0.08em] text-[#f0c747]">
                  ★★★★★
                </p>
                <p className="mt-6 text-lg font-semibold leading-8 text-foreground">
                  &quot;{review.quote}&quot;
                </p>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="mt-1 text-sm text-muted">{review.date}</p>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft font-bold text-primary">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              className="inline-flex text-base font-bold text-awning underline decoration-awning/30 underline-offset-8 transition hover:text-primary"
              href="#"
            >
              See all reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="relative isolate w-full overflow-hidden px-5 py-[clamp(3.5rem,7vw,5.5rem)] text-white sm:px-6 lg:px-8">
        <Image
          alt=""
          className="object-cover object-[50%_45%]"
          fill
          sizes="100vw"
          src="/images/stocksafety.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,64,72,0.92),rgba(14,106,120,0.72)_46%,rgba(7,63,70,0.42))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_80%,rgba(115,191,67,0.34),transparent_36%)]" />
        <div className="relative mx-auto flex min-h-[clamp(300px,34vw,400px)] w-full max-w-[82rem] items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">
              {textOrFallback(patientInfo?.eyebrow, "Patient & regulatory information")}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.5vw,4.25rem)] font-semibold leading-tight">
              {textOrFallback(patientInfo?.title, "Patient & Regulatory Information")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/84 sm:text-lg">
              {textOrFallback(
                patientInfo?.subtitle,
                "Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.",
              )}
            </p>
            <Link
              className={buttonStyles({
                variant: "outline",
                size: "md",
                className:
                  "mt-8 !rounded-[10px] bg-white !text-awning hover:bg-blue-gray hover:!text-awning",
              })}
              href={textOrFallback(patientInfo?.button_href, "/patient-information")}
            >
              {textOrFallback(patientInfo?.button_label, "View patient information")}
            </Link>
          </div>
        </div>
      </section>

      {finalCta?.is_active !== false ? (
        <section className="w-full bg-surface px-5 py-[clamp(3rem,5vw,4rem)] sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[82rem] flex-col gap-5 rounded-[24px] border border-border/70 bg-white/82 p-6 shadow-[var(--shadow-soft)] sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
                {textOrFallback(finalCta?.eyebrow, "Need help today?")}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(2rem,3vw,3rem)] font-semibold text-foreground">
                {textOrFallback(finalCta?.title, "Personal pharmacy care, close to home.")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                {textOrFallback(
                  finalCta?.subtitle ?? finalCta?.body,
                  "Call or send a request and the Terra Losa Pharmacy team will help with the next step.",
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className={buttonStyles({ variant: "primary", size: "md" })}
                href={textOrFallback(finalCta?.button_href, "/refill")}
              >
                {textOrFallback(finalCta?.button_label, "Refill prescription")}
              </Link>
              {finalCta?.secondary_button_href ? (
                <Link
                  className={buttonStyles({ variant: "outline", size: "md" })}
                  href={finalCta.secondary_button_href}
                >
                  {textOrFallback(finalCta.secondary_button_label, "Contact us")}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
