import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { buttonStyles } from "@/components/ui/button";
import { ServiceGrid } from "@/components/ui/service-grid";
import { serviceTiles } from "@/lib/services";

const conditions = [
  "Cold sores",
  "Allergies",
  "Minor skin concerns",
  "Prescription renewals",
  "Pink eye",
  "Hay fever",
  "Oral thrush",
  "Insect bites",
  "Acne",
  "Shingles",
  "Impetigo",
  "Hemorrhoids",
];

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
  "--hero-mobile-image-y": "-105px",
  "--hero-mobile-image-scale": "1",
} as CSSProperties;

const heroMobileContentStyle = {
  "--hero-mobile-content-x": "6px",
  "--hero-mobile-content-y": "129px",
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

export default function HomePage() {
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
            alt="Exterior storefront of Tera Losa Pharmacy"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            src="/images/storefrontweb.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,238,0.12),rgba(251,247,238,0.58)_42%,rgba(251,247,238,0.18)_78%,rgba(251,247,238,0.04))]" />
        </div>

        <div
          className="relative grid min-h-[var(--hero-mobile-min-height)] w-full px-5 pb-8 pt-32 sm:px-8 sm:pb-16 sm:pt-20 lg:min-h-[680px] lg:px-14 lg:pt-20 xl:px-20 xl:pb-20"
          data-hero-mobile-frame-tuner
          style={heroMobileFrameStyle}
        >
          <div
            className="max-w-[38rem] self-start py-0 [transform:translate(var(--hero-mobile-content-x),var(--hero-mobile-content-y))] sm:self-center lg:max-w-[44rem] lg:translate-x-0 lg:translate-y-0 lg:py-10 lg:[transform:none]"
            data-hero-mobile-content-tuner
            style={heroMobileContentStyle}
          >
            <h1 className="max-w-[38rem] font-sans text-4xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:max-w-[44rem] lg:text-8xl">
              Personal pharmacy{" "}
              <span className="text-awning lg:text-storefront-green">care</span>, close to{" "}
              <span className="text-awning">home</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-xl sm:leading-9">
              Refills, prescribing support, and medication questions handled by
              a team you can reach.
            </p>

            <div className="mt-6 grid grid-cols-[0.82fr_1.18fr] gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/about"
                className={buttonStyles({
                  variant: "secondary",
                  size: "md",
                  className:
                    "w-full gap-2 !rounded-[10px] px-2 text-sm sm:w-auto sm:px-5 lg:min-h-24 lg:gap-4 lg:px-16 lg:text-2xl lg:[&_svg]:size-8",
                })}
              >
                <AboutIcon />
                About us
              </Link>
              <Link
                href="/refill"
                className={buttonStyles({
                  variant: "primary",
                  size: "md",
                  className:
                    "w-full gap-2 whitespace-nowrap !rounded-[10px] px-3 text-sm sm:w-auto sm:px-5 lg:min-h-24 lg:gap-4 lg:px-16 lg:text-2xl lg:[&_svg]:size-8",
                })}
              >
                <RefillIcon />
                Refill prescription
              </Link>
            </div>
          </div>
        </div>

        <div className="relative bg-[linear-gradient(90deg,var(--storefront-green),var(--awning),#bdc8cb)] px-5 py-6 text-white shadow-[0_-18px_50px_rgba(14,106,120,0.12)] sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-3 text-base font-bold sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:text-lg">
            {ribbonItems.map(([icon, item]) => (
              <p
                className="inline-flex items-center gap-3 rounded-full bg-white/14 px-4 py-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/18"
                key={item}
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/22">
                  <FactIcon type={icon} />
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-background px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid w-full max-w-[88rem] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[460px] overflow-hidden rounded-[30px] shadow-[0_28px_80px_rgba(31,45,38,0.14)] ring-1 ring-border/50 lg:min-h-[560px]">
            <Image
              alt="Tera Losa Pharmacy staff helping a patient"
              className="object-cover object-[50%_34%]"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              src="/images/interior-staff.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,64,72,0.22)_78%,rgba(14,106,120,0.42))]" />
            <div className="absolute inset-x-0 bottom-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(115,191,67,0.5),rgba(14,106,120,0.34)_42%,transparent_72%)] px-7 pb-7 pt-20">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_2px_12px_rgba(3,43,48,0.36)]">
                Alberta Pharmacy Prescribing
              </p>
            </div>
          </div>
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              Skip the Doctor&apos;s Office.{" "}
              <span className="text-awning">Walk Right In.</span>
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              Pharmacist prescribing can help with common concerns when care is
              appropriate and available.
            </p>
            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
                Conditions we treat
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 min-[440px]:grid-cols-2">
                {conditions.map((condition) => (
                  <div
                    className="min-w-0 rounded-[16px] border border-border/70 bg-white/78 p-3 shadow-sm"
                    key={condition}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-primary-soft text-primary">
                        <CheckIcon />
                      </span>
                      <div>
                        <h3 className="break-words text-sm font-bold leading-snug text-foreground sm:text-lg">
                          {condition}
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

      <section className="w-full bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_48%,#6eaa4a_100%)] px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/74">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.05] text-white sm:text-5xl lg:whitespace-nowrap">
              Everything You Need, Under One Roof
            </h2>
          </div>
          <div className="mt-8">
            <ServiceGrid services={serviceTiles} />
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

      <section className="w-full bg-blue-gray/70 px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Hear what our patients say
            </p>
            <div className="flex justify-center gap-1 text-4xl text-[#f0c747]">
              {"★★★★★".split("").map((star, index) => (
                <span key={`${star}-${index}`}>{star}</span>
              ))}
            </div>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              4.9 stars on Google
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              Placeholder reviews for now. Real Google reviews can be connected
              later when the production content is ready.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                className="relative min-h-72 rounded-[28px] border border-border/70 bg-white/88 p-7 shadow-[0_20px_56px_rgba(31,45,38,0.1)]"
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

      <section className="relative isolate min-h-[460px] w-full overflow-hidden px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <Image
          alt=""
          className="object-cover object-[50%_45%]"
          fill
          sizes="100vw"
          src="/images/stocksafety.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,64,72,0.92),rgba(14,106,120,0.72)_46%,rgba(7,63,70,0.42))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_80%,rgba(115,191,67,0.34),transparent_36%)]" />
        <div className="relative mx-auto flex min-h-[330px] w-full max-w-[88rem] items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">
              Patient &amp; regulatory information
            </p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              Transparency patients can trust.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/84 sm:text-lg">
              View pharmacy documents, privacy policies, licensing details, and
              patient concern information in one clear place.
            </p>
            <div className="mt-6 grid max-w-xl gap-3 text-sm font-semibold text-white/90 sm:grid-cols-3">
              <p>Recognized pharmacy authority</p>
              <p>Confidentiality comes first</p>
              <p>Your information stays protected</p>
            </div>
            <Link
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className:
                  "mt-8 !rounded-[10px] bg-white !text-awning hover:bg-blue-gray hover:!text-awning",
              })}
              href="/patient-information"
            >
              View patient information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
