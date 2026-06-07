import Link from "next/link";
import Image from "next/image";
import { pharmacyContact } from "@/lib/site";
import { Container } from "@/components/layout/container";

const weeklyHours = [
  ["Monday", "9 AM - 6 PM"],
  ["Tuesday", "9 AM - 6 PM"],
  ["Wednesday", "9 AM - 6 PM"],
  ["Thursday", "9 AM - 6 PM"],
  ["Friday", "9 AM - 6 PM"],
  ["Saturday", "10 AM - 3 PM"],
  ["Sunday", "Closed"],
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-[linear-gradient(115deg,#fbf7ee,#e7eeee_58%,#edf6e7)] pb-24 text-foreground md:pb-0">
      <div className="h-4 bg-[linear-gradient(90deg,var(--storefront-green),var(--awning),#bdc8cb)]" />
      <Container className="py-12 sm:py-16" size="wide">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex size-12 overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-border">
                <Image alt="" className="object-contain p-1.5" fill sizes="48px" src="/images/logo.jpg" />
              </span>
              <div>
                <p className="font-serif text-2xl font-semibold">
                  {pharmacyContact.name}
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">
                  Tera Losa prescription care
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md font-serif text-3xl font-semibold leading-tight text-foreground">
              Personal pharmacy care, close to home.
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              A local team for refills, prescribing support, and medication
              questions.
            </p>
            <Link
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#4267B2] px-6 text-sm font-bold text-white shadow-[0_16px_42px_rgba(66,103,178,0.22)] transition hover:bg-[#365899]"
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
              <p>{pharmacyContact.address}</p>
              <p>{pharmacyContact.phone}</p>
              <p>Fax {pharmacyContact.fax}</p>
              <p>{pharmacyContact.email}</p>
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">Hours</h2>
            <dl className="mt-4 grid gap-1.5 text-sm text-muted">
              {weeklyHours.map(([day, hours]) => (
                <div className="grid grid-cols-[1fr_auto] gap-3" key={day}>
                  <dt>{day}</dt>
                  <dd className="font-semibold text-foreground">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-awning">Pages</h2>
            <div className="mt-4 grid gap-2 text-sm text-muted">
              <Link className="hover:text-awning" href="/services">Services</Link>
              <Link className="hover:text-awning" href="/refill">Refill</Link>
              <Link className="hover:text-awning" href="/patient-information">Patient Information</Link>
              <Link className="hover:text-awning" href="/contact">Contact</Link>
              <Link className="hover:text-awning" href="/location">Location</Link>
              <Link className="hover:text-awning" href="/privacy">
                Privacy
              </Link>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-border/70 pt-6 text-sm text-muted">
          Copyright {new Date().getFullYear()} Tera Losa Pharmacy. All content
          is placeholder until launch.
        </p>
      </Container>
    </footer>
  );
}
