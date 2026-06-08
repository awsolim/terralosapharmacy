import Image from "next/image";
import type { ServiceTile } from "@/lib/services";

type ServiceGridProps = {
  services: ServiceTile[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article
          className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/18 bg-primary shadow-[0_22px_64px_rgba(3,43,48,0.2)] ring-1 ring-white/18"
          key={service.title}
        >
          <Image
            alt={service.imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
            src={service.image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,29,31,0.02),rgba(4,29,31,0.08)_50%,rgba(4,29,31,0.22))]" />
          <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-[7.5rem] flex-col justify-center border-t border-white/70 bg-[#fbf7ee]/96 px-4 py-4 text-foreground shadow-[0_-14px_34px_rgba(3,43,48,0.08)] backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(115,191,67,0.72),rgba(14,106,120,0.66),rgba(189,200,203,0.52))]" />
            <h3 className="whitespace-nowrap text-[clamp(1.15rem,1.45vw,1.5rem)] font-extrabold leading-tight">
              {service.title}
            </h3>
            <p className="mt-2 overflow-hidden text-sm font-semibold leading-6 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {service.shortLine}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
