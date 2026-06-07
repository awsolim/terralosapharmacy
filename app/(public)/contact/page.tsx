import Image from "next/image";
import { pharmacyContact } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/app/(public)/contact/contact-form";

const weeklyHours = [
  ["Monday", "9 AM - 6 PM"],
  ["Tuesday", "9 AM - 6 PM"],
  ["Wednesday", "9 AM - 6 PM"],
  ["Thursday", "9 AM - 6 PM"],
  ["Friday", "9 AM - 6 PM"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

export default function ContactPage() {
  return (
    <div className="bg-background">
      <section className="bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_54%,#4f9b82_100%)] px-5 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">
            Send a general message.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
            Use this page for non-urgent pharmacy questions. For urgent or
            time-sensitive requests, call the pharmacy directly.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[88rem] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[24rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-5 lg:order-first">
          <Card className="overflow-hidden p-0" padding="none">
            <div className="relative h-80 bg-[#f7f4ec] sm:h-96 lg:h-[22rem]">
              <Image
                alt="Tera Losa Pharmacy storefront"
                className="object-contain"
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                src="/images/storefront.jpg"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-bold text-foreground">Location</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {pharmacyContact.address}
              </p>
            </div>
          </Card>
          <Card
            className="border-transparent bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_58%,#4f9b82_100%)] text-white ring-0"
            padding="md"
          >
            <h2 className="text-xl font-bold">Phone</h2>
            <p className="mt-4 text-3xl font-extrabold">
              {pharmacyContact.phone}
            </p>
            <p className="mt-2 text-sm text-white/76">
              Fax {pharmacyContact.fax}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/84">
              Call for urgent pharmacy needs or time-sensitive prescription
              questions.
            </p>
          </Card>
          <Card padding="md">
            <h2 className="text-lg font-semibold text-foreground">Hours</h2>
            <dl className="mt-4 grid gap-2 text-sm">
              {weeklyHours.map(([day, hours]) => (
                <div className="grid grid-cols-[1fr_auto] gap-4" key={day}>
                  <dt className="text-muted">{day}</dt>
                  <dd className="font-bold text-foreground">{hours}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="bg-primary-soft/90" padding="md">
            <h2 className="text-lg font-semibold text-foreground">
              Follow us
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Follow Tera Losa Pharmacy on Facebook for pharmacy updates and
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

        <section className="rounded-[28px] border border-border/70 bg-white/92 p-5 shadow-[0_24px_70px_rgba(31,45,38,0.1)] sm:p-8">
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
