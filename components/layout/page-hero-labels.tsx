import type { EditablePharmacySettings } from "@/lib/content";

type HeroLabelKey =
  | "same-day-refill"
  | "free-delivery"
  | "google-rating"
  | "call-refill"
  | "address"
  | "prescribing";

type PageHeroLabelsProps = {
  labels: HeroLabelKey[];
  settings: EditablePharmacySettings;
};

function HeroLabelIcon({ type }: { type: HeroLabelKey }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: "2",
  };

  if (type === "free-delivery") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  }

  if (type === "google-rating") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
      </svg>
    );
  }

  if (type === "call-refill") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
      </svg>
    );
  }

  if (type === "address") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
        <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  if (type === "prescribing") {
    return (
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
        <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function labelText(type: HeroLabelKey, settings: EditablePharmacySettings) {
  if (type === "same-day-refill") return "Same day refill for most items";
  if (type === "free-delivery") return "Free delivery available";
  if (type === "google-rating") return "4.9 stars on Google";
  if (type === "call-refill") return `Call to refill by phone ${settings.phone ?? ""}`.trim();
  if (type === "address") return settings.address_line_1 ?? "17314 99 Ave NW";
  return "Alberta pharmacist prescribing";
}

export function PageHeroLabels({ labels, settings }: PageHeroLabelsProps) {
  if (labels.length === 0) return null;

  return (
    <div className="border-y border-storefront-green/20 bg-[linear-gradient(90deg,#eff9e9_0%,#dff3d5_48%,#eef8e7_100%)] px-5 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[88rem] flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-extrabold text-primary">
        {labels.map((label) => (
          <span className="inline-flex items-center gap-2.5" key={label}>
            <span className="flex size-8 items-center justify-center rounded-[9px] bg-white/75 text-storefront-green shadow-sm ring-1 ring-storefront-green/15">
              <HeroLabelIcon type={label} />
            </span>
            {labelText(label, settings)}
          </span>
        ))}
      </div>
    </div>
  );
}
