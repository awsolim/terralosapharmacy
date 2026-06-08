"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { pharmacyContact, siteNavItems } from "@/lib/site";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function PublicNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = siteNavItems.filter((item) => item.href !== "/contact");
  const mobileNavItems = siteNavItems.filter(
    (item) => item.href !== "/contact" && item.href !== "/refill",
  );

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-surface/92 shadow-[0_12px_34px_rgba(31,45,38,0.07)] backdrop-blur-xl">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-6 2xl:px-10">
        <div>
          <div className="flex items-center gap-4 xl:gap-6">
            <Link
              href="/"
              className="group inline-flex min-w-0 shrink-0 items-center gap-2 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-ring sm:gap-3"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-white shadow-sm ring-1 ring-border sm:size-14 sm:rounded-[16px]">
                <Image
                  alt=""
                  className="object-contain p-1.5"
                  fill
                  sizes="56px"
                  src="/images/logo.jpg"
                />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block max-w-[calc(100vw-11.5rem)] whitespace-nowrap text-[clamp(1rem,4.25vw,1.75rem)] font-extrabold text-foreground sm:hidden">
                  Terra Losa
                  <span className="block leading-none">Pharmacy</span>
                </span>
                <span className="hidden whitespace-nowrap text-[clamp(1rem,4.25vw,1.75rem)] font-extrabold text-foreground sm:block lg:text-xl xl:text-2xl">
                  Terra Losa Pharmacy
                </span>
              </span>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-between gap-4 lg:flex xl:gap-6">
              <nav aria-label="Primary navigation" className="min-w-0 flex-1">
                <ul className="flex flex-nowrap items-center justify-center gap-1.5 xl:gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "inline-flex min-h-10 items-center whitespace-nowrap px-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring xl:px-3.5",
                            isActive
                              ? "text-storefront-green"
                              : "text-muted hover:text-primary",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
                <a
                  className="hidden min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-blue-gray/70 px-3.5 py-2 text-sm font-bold text-awning ring-1 ring-white/70 transition hover:bg-white xl:inline-flex"
                  href={`tel:${pharmacyContact.phoneHref}`}
                >
                  <PhoneIcon />
                  {pharmacyContact.phone}
                </a>
                <Link
                  className={buttonStyles({
                    variant: "outline",
                    size: "sm",
                    className: "shrink-0",
                  })}
                  href="/contact"
                >
                  Contact
                </Link>
                <Link
                  className={buttonStyles({
                    variant: "primary",
                    size: "sm",
                    className: "shrink-0",
                  })}
                  href="/refill"
                >
                  Refill prescription
                </Link>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <Link
                className={buttonStyles({
                  variant: "primary",
                  size: "sm",
                  className: "hidden min-[430px]:inline-flex",
                })}
                href="/refill"
                onClick={() => setIsOpen(false)}
              >
                Refill
              </Link>
              <button
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/70 text-primary shadow-sm ring-1 ring-border/40 focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={() => setIsOpen((current) => !current)}
                type="button"
              >
                <span className="grid gap-1.5">
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>

          {isOpen ? (
            <nav aria-label="Mobile navigation" className="mt-4 lg:hidden">
              <ul className="grid gap-2 border-t border-border/50 pt-4">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center px-1 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-ring",
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-awning",
                        )}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    className={buttonStyles({
                      variant: "outline",
                      size: "lg",
                      className: "w-full",
                    })}
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
