import Image from "next/image";
import { PageHeroLabels } from "@/components/layout/page-hero-labels";
import { ServiceGrid } from "@/components/ui/service-grid";
import { getPublicContent, textOrFallback, type PublicService } from "@/lib/content";

// Optional: set this to a public image path such as "/images/stockmedicine.jpg".
const heroBackgroundImage = "/images/stockmedicine.jpg";

function ServiceIcon({ label, iconName }: { label: string; iconName?: string | null }) {
  const iconKey = `${iconName ?? ""} ${label}`.toLowerCase();
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  let icon = (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
      <path d="M6 3h12v18H6z" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
      <path d="M9 15h3" />
    </svg>
  );

  if (iconKey.includes("refill") || iconKey.includes("renewal")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M7 7h9a4 4 0 0 1 0 8H8" />
        <path d="m10 4-3 3 3 3" />
        <path d="M7 17h10" />
        <path d="M7 21h7" />
      </svg>
    );
  } else if (iconKey.includes("review")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M9 3h6l1 2h3v16H5V5h3l1-2Z" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
        <path d="m8 8 1 1 2-2" />
      </svg>
    );
  } else if (iconKey.includes("pack") || iconKey.includes("blister")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M4 7h16v10H4z" />
        <path d="M8 7v10" />
        <path d="M16 7v10" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    );
  } else if (iconKey.includes("delivery")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  } else if (iconKey.includes("vaccine") || iconKey.includes("injection")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="m18 3 3 3" />
        <path d="m12 9 3-3 3 3-9 9H6v-3l6-6Z" />
        <path d="m8 13 3 3" />
      </svg>
    );
  } else if (iconKey.includes("prescribing") || iconKey.includes("ailment")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M12 3v18" />
        <path d="M5 12h14" />
        <path d="M7 5h10v14H7z" />
      </svg>
    );
  } else if (iconKey.includes("medication") || iconKey.includes("medicine")) {
    icon = (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" {...common}>
        <path d="M10 21 3 14a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 0l7 7" />
        <path d="m7 10 7 7" />
        <path d="M14 21h7" />
      </svg>
    );
  }

  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#e5f7f2,#f8fff4)] text-awning shadow-sm ring-1 ring-awning/12">
      {icon}
    </span>
  );
}

function splitServiceBody(service: PublicService) {
  const raw = service.long_description || "";
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const checklist = service.checklist_items
    ? service.checklist_items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : lines
        .filter((line) => line.startsWith("- "))
        .map((line) => line.slice(2));
  const description =
    service.description ||
    service.short_description ||
    lines.filter((line) => !line.startsWith("- ")).join(" ") ||
    "";

  return { checklist, description };
}

function CheckCircleIcon() {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#dff4ec,#f1fbeb)] text-storefront-green ring-1 ring-storefront-green/18">
      <svg
        aria-hidden="true"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
        viewBox="0 0 24 24"
      >
        <path d="m6 12 4 4 8-8" />
      </svg>
    </span>
  );
}

function ServiceDetailRow({
  index,
  service,
}: {
  index: number;
  service: PublicService;
}) {
  const isReversed = index % 2 === 1;
  const { checklist, description } = splitServiceBody(service);

  return (
    <article className="grid gap-8 py-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-12">
      <div
        className={
          isReversed
            ? "relative"
            : "relative lg:order-2"
        }
      >
        <div className="relative min-h-[280px] overflow-hidden rounded-[26px] shadow-[0_26px_78px_rgba(15,106,92,0.24)] ring-1 ring-border/45 lg:min-h-[360px]">
          <Image
            alt={service.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 44rem, 100vw"
            src={service.image}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[46%] bg-[radial-gradient(circle_at_28%_100%,rgba(139,196,82,0.72),transparent_42%),radial-gradient(circle_at_72%_96%,rgba(14,106,120,0.62),transparent_48%),linear-gradient(0deg,rgba(255,255,255,0.86),rgba(255,255,255,0.08)_72%,transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(90deg,rgba(139,196,82,0.52),rgba(14,106,120,0.42),rgba(216,221,224,0.34))] blur-2xl"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 -bottom-6 h-20 rounded-full bg-[radial-gradient(circle,rgba(139,196,82,0.5),rgba(14,106,120,0.28)_48%,transparent_75%)] blur-2xl"
        />
      </div>
      <div className={isReversed ? "lg:order-2" : "lg:order-1"}>
        <div>
          <div className="flex items-center gap-4">
            <ServiceIcon iconName={service.icon_name} label={service.title} />
            <h2 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              {service.title}
            </h2>
          </div>
          <p className="mt-5 text-base leading-8 text-muted">{description}</p>
          {checklist.length > 0 ? (
            <ul className="ml-3 mt-5 grid gap-2.5 text-sm font-semibold text-foreground">
              {checklist.map((item) => (
                <li className="flex items-start gap-2.5" key={item}>
                  <CheckCircleIcon />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default async function ServicesPage() {
  const content = await getPublicContent();
  const page = content.pages.get("services");

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
          <div className="max-w-[82rem]">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
              {textOrFallback(page?.eyebrow, "Services")}
            </p>
            <h1 className="mt-4 text-[clamp(3rem,5vw,5.25rem)] font-extrabold leading-[1.02] lg:whitespace-nowrap">
              {textOrFallback(page?.hero_title ?? page?.title, "Everything You Need, Under One Roof")}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/86">
              {textOrFallback(
                page?.hero_subtitle ?? page?.subtitle,
                "A visual overview of common pharmacy services and support available through Terra Losa Pharmacy.",
              )}
            </p>
          </div>
        </div>
      </section>
      <PageHeroLabels
        labels={["google-rating", "free-delivery", "prescribing", "call-refill"]}
        settings={content.settings}
      />

      <div className="mx-auto w-full max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto mb-8 max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
            Everything we offer
          </p>
          <h4 className="mt-3 text-3xl font-extrabold leading-tight text-foreground">
            Your Complete Health Partner
          </h4>
          <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
            From refills to prescribing support, Terra Losa Pharmacy
            keeps everyday care clear, local, and easy to reach.
          </p>
        </section>

        <section className="grid gap-6">
          {content.serviceRecords.length > 0 ? (
            content.serviceRecords.map((service, index) => (
              <ServiceDetailRow index={index} key={service.id} service={service} />
            ))
          ) : (
            <div className="rounded-[34px] bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_48%,#6eaa4a_100%)] p-4 shadow-[0_30px_90px_rgba(3,43,48,0.22)] sm:p-6 lg:p-8">
              <ServiceGrid services={content.services} />
            </div>
          )}
        </section>

        <p className="mt-6 rounded-[22px] border border-border/70 bg-white/74 px-5 py-4 text-sm font-semibold leading-7 text-muted shadow-sm">
          Service availability can vary. Call the pharmacy to confirm details.
        </p>

        <section className="mt-10 rounded-[30px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Conditions treated
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Conditions we can help with
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Eligibility and availability can vary. Call the pharmacy to confirm.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.conditions.map((condition) => (
                <article
                  className="overflow-hidden rounded-[18px] border border-awning/12 bg-[#eaf7f2] p-4 shadow-sm"
                  key={condition.id}
                >
                <span className="mb-4 block h-1.5 w-14 rounded-full bg-awning/45" />
                <h3 className="text-lg font-bold text-foreground">{condition.name}</h3>
                {condition.short_description ? (
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {condition.short_description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
