"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Refill requests", href: "/admin/refills" },
  { label: "Contact messages", href: "/admin/messages" },
  { label: "Content & settings", href: "/admin/content" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation" className="mt-4">
      <ul className="grid gap-1.5">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-[14px] px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-ring",
                  isActive
                    ? "bg-awning text-white shadow-[0_12px_26px_rgba(14,106,120,0.18)]"
                    : "text-foreground hover:bg-primary-soft hover:text-primary",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
