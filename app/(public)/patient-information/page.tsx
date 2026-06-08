import Image from "next/image";
import Link from "next/link";
import { PageHeroLabels } from "@/components/layout/page-hero-labels";
import { buttonStyles } from "@/components/ui/button";
import { getPublicContent, textOrFallback } from "@/lib/content";

const documentCategories = [
  "Licensing & Pharmacy Information",
  "Patient Concerns",
  "Privacy & Information Practices",
  "Professional Standards",
];

export default async function PatientInformationPage() {
  const content = await getPublicContent();
  const page = content.pages.get("patient-info");

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
            <h1 className="mt-4 text-5xl font-extrabold leading-tight sm:text-7xl">
              {textOrFallback(page?.hero_title, "Patient & Regulatory Information")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
              {textOrFallback(
                page?.hero_subtitle,
                "Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.",
              )}
            </p>
          </div>
        </div>
      </section>
      <PageHeroLabels labels={["address", "call-refill"]} settings={content.settings} />

      <section className="w-full bg-background px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
              Documents
            </p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              {textOrFallback(page?.subtitle, "Pharmacy information in one place.")}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
              {textOrFallback(
                page?.body,
                "Review active pharmacy documents and resources. Some documents may link to external PDFs or official resources.",
              )}
            </p>
          </div>

          <div className="mt-10 grid gap-8">
            {documentCategories.map((category) => {
              const documents = content.documents.filter(
                (document) => document.category === category,
              );

              return (
                <section key={category}>
                  <h3 className="text-3xl font-extrabold text-foreground">
                    {category}
                  </h3>
                  <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {documents.length > 0 ? (
                      documents.map((document) => (
                        <article
                          className="rounded-[24px] border border-border/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(31,45,38,0.09)]"
                          key={document.id}
                        >
                          <p className="text-sm font-bold uppercase tracking-[0.14em] text-awning">
                            {document.category}
                          </p>
                          <h4 className="mt-4 text-2xl font-extrabold text-foreground">
                            {document.title}
                          </h4>
                          <p className="mt-3 min-h-14 text-sm leading-7 text-muted">
                            {document.description}
                          </p>
                          {document.document_url ? (
                            <a
                              className={buttonStyles({
                                variant: "outline",
                                size: "sm",
                                className: "mt-6",
                              })}
                              href={document.document_url}
                            >
                              View document
                            </a>
                          ) : null}
                        </article>
                      ))
                    ) : (
                      <p className="rounded-[18px] bg-white/70 p-5 text-sm leading-7 text-muted">
                        No active documents are listed in this category yet.
                      </p>
                    )}
                  </div>
                </section>
              );
            })}
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
