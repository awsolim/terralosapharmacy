import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  formatDay,
  formatPublicHour,
  settingsAddress,
  type BusinessHour,
  type EditablePharmacySettings,
} from "@/lib/content";

function googleMapsEmbedUrl(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const iframeSrc = value.match(/\bsrc=["']([^"']+)["']/i)?.[1];
  const raw = iframeSrc ?? value;

  try {
    const url = new URL(raw);
    const isGoogleMaps =
      (url.hostname === "www.google.com" || url.hostname === "maps.google.com") &&
      url.pathname.startsWith("/maps/");

    return isGoogleMaps ? url.toString() : null;
  } catch {
    return null;
  }
}

export function FormInfoSidebar({
  hours,
  settings,
}: {
  hours: BusinessHour[];
  settings: EditablePharmacySettings;
}) {
  const mapEmbedUrl = googleMapsEmbedUrl(settings.google_maps_embed_url);

  return (
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
        <div className="space-y-4 p-6 text-sm leading-7 text-muted">
          <div>
            <h2 className="text-lg font-bold text-foreground">Location</h2>
            <p className="mt-2">{settingsAddress(settings)}</p>
          </div>
          <div className="grid gap-1">
            <p>
              <span className="font-semibold text-foreground">Phone:</span>{" "}
              {settings.phone}
            </p>
            <p>
              <span className="font-semibold text-foreground">Fax:</span>{" "}
              {settings.fax}
            </p>
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              {settings.email}
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-0" padding="none">
        {mapEmbedUrl ? (
          <iframe
            className="h-80 w-full border-0 sm:h-96 lg:h-[22rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapEmbedUrl}
            title="Terra Losa Pharmacy map"
          />
        ) : (
          <div className="flex min-h-80 items-center justify-center bg-blue-gray/78 p-6 text-center">
            <p className="max-w-sm text-sm leading-7 text-muted">
              Add a Google Maps embed URL in the admin pharmacy info to show
              the live map here.
            </p>
          </div>
        )}
      </Card>

      <Card padding="md">
        <h2 className="text-lg font-semibold text-foreground">Hours</h2>
        <dl className="mt-4 grid gap-2 text-sm">
          {hours.map((hour) => (
            <div className="grid grid-cols-[1fr_auto] gap-4" key={hour.id}>
              <dt className="text-muted">{formatDay(hour.day_of_week)}</dt>
              <dd className="font-bold text-foreground">
                {formatPublicHour(hour)}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="bg-primary-soft/90" padding="md">
        <h2 className="text-lg font-semibold text-foreground">Follow us</h2>
        <p className="mt-3 text-sm leading-7 text-muted">
          Follow Terra Losa Pharmacy on Facebook for pharmacy updates and
          community news.
        </p>
        <a
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#4267B2] px-5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(66,103,178,0.22)] transition hover:bg-[#365899]"
          href="https://www.facebook.com/"
          rel="noreferrer"
          target="_blank"
        >
          Follow on Facebook
        </a>
      </Card>
    </aside>
  );
}
