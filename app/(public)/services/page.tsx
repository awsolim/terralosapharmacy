import { PageHeader } from "@/components/ui/page-header";
import { ServiceGrid } from "@/components/ui/service-grid";
import { serviceTiles } from "@/lib/services";

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-[88rem] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHeader
        eyebrow="Services"
        title="Everything You Need, Under One Roof"
        subtitle="A visual overview of common pharmacy services and support available through Tera Losa Pharmacy."
      />

      <section className="rounded-[34px] bg-[linear-gradient(135deg,#073f46_0%,#0e6a78_48%,#6eaa4a_100%)] p-4 shadow-[0_30px_90px_rgba(3,43,48,0.22)] sm:p-6 lg:p-8">
        <ServiceGrid services={serviceTiles} />
      </section>

      <p className="mt-6 rounded-[22px] border border-border/70 bg-white/74 px-5 py-4 text-sm font-semibold leading-7 text-muted shadow-sm">
        Service availability can vary. Call the pharmacy to confirm details.
      </p>
    </div>
  );
}
