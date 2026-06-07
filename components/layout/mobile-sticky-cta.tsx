import Link from "next/link";
import { pharmacyContact } from "@/lib/site";
import { buttonStyles } from "@/components/ui/button";

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/70 bg-surface/88 px-4 py-3 shadow-[0_-16px_36px_rgba(31,45,38,0.12)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          className={buttonStyles({
            variant: "outline",
            size: "sm",
            className: "gap-2",
          })}
          href={`tel:${pharmacyContact.phoneHref}`}
        >
          <PhoneIcon />
          {pharmacyContact.phone}
        </a>
        <Link
          className={buttonStyles({ variant: "primary", size: "sm" })}
          href="/contact"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
