import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

const documents = [
  {
    title: "Pharmacy license",
    description: "Placeholder for current licensing and registration documents.",
    action: "View PDF",
  },
  {
    title: "Code of ethics",
    description: "Placeholder for professional standards and ethical practice.",
    action: "View PDF",
  },
  {
    title: "Privacy policy",
    description: "Placeholder for how patient information is collected and protected.",
    action: "Read policy",
  },
  {
    title: "Patient concerns",
    description: "Placeholder for complaint, concern, and resolution information.",
    action: "View PDF",
  },
  {
    title: "Patient records",
    description: "Placeholder for requesting access to pharmacy records.",
    action: "View PDF",
  },
  {
    title: "Prescription safety",
    description: "Placeholder for safe medication handling and patient guidance.",
    action: "View PDF",
  },
];

export default function PatientInformationPage() {
  return (
    <div>
      <section className="relative isolate min-h-[520px] overflow-hidden px-5 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <Image
          alt=""
          className="object-cover object-[50%_45%]"
          fill
          priority
          sizes="100vw"
          src="/images/stocksafety.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,64,72,0.94),rgba(14,106,120,0.78)_48%,rgba(7,63,70,0.36))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,rgba(115,191,67,0.34),transparent_34%)]" />
        <div className="relative mx-auto flex min-h-[360px] w-full max-w-[88rem] items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">
              Patient &amp; regulatory information
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight sm:text-7xl">
              Clear documents. Clear expectations.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
              Find placeholder documents for pharmacy licensing, privacy,
              professional standards, and patient concerns. Final PDFs can be
              connected later when production content is ready.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Documents
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
              Pharmacy information in one place.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
              These cards are placeholders for future PDF viewing or downloads.
              No real document storage is connected in this phase.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((document) => (
              <article
                className="rounded-[24px] border border-border/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(31,45,38,0.09)]"
                key={document.title}
              >
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-awning">
                  Placeholder PDF
                </p>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-foreground">
                  {document.title}
                </h3>
                <p className="mt-3 min-h-14 text-sm leading-7 text-muted">
                  {document.description}
                </p>
                <a
                  className={buttonStyles({
                    variant: "outline",
                    size: "sm",
                    className: "mt-6 pointer-events-none opacity-80",
                  })}
                  href="#"
                  aria-disabled="true"
                >
                  {document.action}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              className="inline-flex text-base font-bold text-awning underline decoration-awning/30 underline-offset-8 transition hover:text-primary"
              href="/contact"
            >
              Contact the pharmacy with questions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
