import Link from "next/link";
import { pharmacyContact } from "@/lib/site";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ImagePanel } from "@/components/ui/image-panel";
import { buttonStyles } from "@/components/ui/button";

const values = [
  {
    title: "Clear answers",
    description:
      "Patients should be able to understand their next step without sorting through complicated language.",
  },
  {
    title: "Local care",
    description:
      "Tera Losa Pharmacy is being built around the practical needs of nearby Edmonton patients and families.",
  },
  {
    title: "Everyday support",
    description:
      "Prescription help, medication questions, and health product guidance should feel approachable.",
  },
];

const dailyHours = [
  ["Monday", "9 AM - 6 PM"],
  ["Tuesday", "9 AM - 6 PM"],
  ["Wednesday", "9 AM - 6 PM"],
  ["Thursday", "9 AM - 6 PM"],
  ["Friday", "9 AM - 6 PM"],
  ["Saturday", "10 AM - 3 PM"],
  ["Sunday", "Closed"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="About"
        title="A local pharmacy built around practical care."
        subtitle="Tera Losa Pharmacy serves the surrounding Edmonton area with clear, grounded pharmacy support."
      />

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <ImagePanel
          alt="Tera Losa Pharmacy staff inside the pharmacy"
          fallbackLabel="Staff or pharmacy counter photo"
          fallbackNote="Use a real team, counter, or consultation-area photo here."
          imageClassName="object-[50%_42%]"
          minHeightClassName="min-h-[420px]"
          src="/images/interior-staff.jpg"
        />
        <Card className="bg-[linear-gradient(135deg,var(--sage),#fffaf1)]" padding="lg">
          <Badge variant="sage">Community pharmacy</Badge>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground">
            Personal, not complicated.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            The website is designed to make common pharmacy tasks easier:
            requesting refills, starting transfers, finding contact details, and
            knowing when to call.
          </p>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {values.map((value) => (
          <Card key={value.title} padding="md">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {value.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {value.description}
            </p>
          </Card>
        ))}
      </div>

      <section className="mt-10 grid gap-6 rounded-[34px] border border-white/80 bg-[linear-gradient(115deg,#fbf7ee,#e7eeee_58%,#edf6e7)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
        <div>
          <h2 className="font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl">
            Hours
          </h2>
          <p className="mt-4 max-w-sm text-base font-semibold leading-8 text-awning">
            Daily pharmacy hours for visits, prescription pickup, and practical
            pharmacy questions.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Link
              className={buttonStyles({
                variant: "secondary",
                size: "lg",
                className: "w-full gap-2",
              })}
              href="/location"
            >
              Visit us
            </Link>
            <a
              className={buttonStyles({
                variant: "primary",
                size: "lg",
                className: "w-full gap-2",
              })}
              href={`tel:${pharmacyContact.phoneHref}`}
            >
              Call us
            </a>
          </div>
        </div>

        <dl className="grid gap-2 rounded-[28px] bg-white/78 p-5 ring-1 ring-white/80 sm:p-6">
          {dailyHours.map(([day, hours]) => (
            <div
              className="grid grid-cols-[1fr_auto] gap-4 border-b border-border/65 py-3 last:border-b-0"
              key={day}
            >
              <dt className="text-base font-semibold text-muted">{day}</dt>
              <dd className="text-right text-base font-bold text-foreground">
                {hours}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
