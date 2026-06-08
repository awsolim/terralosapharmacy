import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ImagePanel } from "@/components/ui/image-panel";
import {
  formatDay,
  formatPublicHour,
  getPublicContent,
  settingsAddress,
  textOrFallback,
} from "@/lib/content";

export default async function LocationPage() {
  const content = await getPublicContent();
  const page = content.pages.get("location");
  const phoneHref = content.settings.phone?.replace(/[^\d+]/g, "") ?? "";

  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="Location"
        title={textOrFallback(page?.title, "Find Terra Losa Pharmacy.")}
        subtitle={textOrFallback(
          page?.subtitle,
          "Visit Terra Losa Pharmacy in Edmonton or contact the team before you come in.",
        )}
      />

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Card padding="md">
            <Badge variant="blue">Address</Badge>
            <p className="mt-4 text-lg font-semibold text-foreground">
              {settingsAddress(content.settings)}
            </p>
          </Card>
          <Card padding="md">
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <div className="mt-3 space-y-1 text-sm leading-7 text-muted">
              <p>Phone {content.settings.phone}</p>
              <p>Fax {content.settings.fax}</p>
              <p>{content.settings.email}</p>
            </div>
          </Card>
          <Card padding="md">
            <h2 className="text-lg font-semibold text-foreground">Hours</h2>
            <dl className="mt-3 grid gap-1.5 text-sm text-muted">
              {content.hours.map((hour) => (
                <div className="grid grid-cols-[1fr_auto] gap-3" key={hour.id}>
                  <dt>{formatDay(hour.day_of_week)}</dt>
                  <dd className="font-semibold text-foreground">
                    {formatPublicHour(hour)}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>

        <div className="space-y-4">
          <ImagePanel
            alt="Exterior storefront of Terra Losa Pharmacy"
            fallbackLabel="Storefront photo"
            fallbackNote="Add a real exterior photo so patients can recognize the pharmacy before they arrive."
            minHeightClassName="min-h-[360px]"
            src="/images/storefront.jpg"
          />
          <Card className="flex min-h-80 items-center justify-center bg-blue-gray/78" padding="lg">
            <div className="text-center">
              <Badge variant="blue">Map placeholder</Badge>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
                A real embedded map or linked map preview can be added once the
                pharmacy address is finalized.
              </p>
            </div>
          </Card>
          <Card className="bg-primary-soft/70 shadow-none" padding="md">
            <h2 className="text-lg font-semibold text-foreground">
              Parking and accessibility
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Placeholder note. Add parking, entrance, transit, and
              accessibility details before launch.
            </p>
          </Card>
          <div className="flex flex-wrap gap-3">
            <a
              className={buttonStyles({ variant: "primary", size: "lg" })}
              href={`tel:${phoneHref}`}
            >
              Call pharmacy
            </a>
            <Link
              className={buttonStyles({ variant: "outline", size: "lg" })}
              href="/refill"
            >
              Refill prescription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
