import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import {
  formatDay,
  formatPublicHour,
  getPublicContent,
  settingsAddress,
} from "@/lib/content";

export async function Footer() {
  const content = await getPublicContent();

  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(115deg,#fbf7ee,#e7eeee_58%,#edf6e7)] pb-24 text-foreground md:pb-0">
      <div className="h-3 bg-[linear-gradient(90deg,var(--storefront-green),var(--awning),#bdc8cb)]" />
      <Container className="py-9 sm:py-12" size="wide">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex size-12 overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-border">
                <Image alt="" className="object-contain p-1.5" fill sizes="48px" src="/images/logo.jpg" />
              </span>
              <div>
                <p className="text-2xl font-extrabold">
                  {content.settings.pharmacy_name}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">
                  Terra Losa prescription care
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-xl font-extrabold leading-tight text-foreground">
              Personal care, close to home.
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              A local team for prescribing support, and medication
              questions.
            </p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#4267B2] px-5 text-sm font-bold text-white shadow-[0_16px_42px_rgba(66,103,178,0.22)] transition hover:bg-[#365899]"
              href="https://www.facebook.com/"
              rel="noreferrer"
              target="_blank"
            >
              Follow us on Facebook
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">Contact</h2>
            <address className="mt-4 space-y-1 not-italic text-sm leading-7 text-muted">
              <p>{settingsAddress(content.settings)}</p>
              <p>{content.settings.phone}</p>
              <p>Fax {content.settings.fax}</p>
              <p>{content.settings.email}</p>
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">Hours</h2>
            <dl className="mt-4 grid gap-1.5 text-sm text-muted">
              {content.hours.map((hour) => (
                <div className="grid grid-cols-[1fr_auto] gap-3" key={hour.id}>
                  <dt>{formatDay(hour.day_of_week)}</dt>
                  <dd className="font-semibold text-foreground">
                    {formatPublicHour(hour)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">Pages</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted">
              <Link className="hover:text-awning" href="/services">Services</Link>
              <Link className="hover:text-awning" href="/refill">Refill</Link>
              <Link className="hover:text-awning" href="/patient-information">Patient & Regulatory Information</Link>
              <Link className="hover:text-awning" href="/contact">Contact</Link>
              <Link className="hover:text-awning" href="/privacy">
                Privacy
              </Link>
            </div>
          </nav>
        </div>

        <p className="mt-8 border-t border-border/70 pt-5 text-sm text-muted">
          Copyright {new Date().getFullYear()} Terra Losa Pharmacy. All content
          is placeholder until launch.
        </p>
      </Container>
    </footer>
  );
}
