import type { NavItem, PlaceholderPageContent } from "@/types";

export const siteNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Refill", href: "/refill" },
  { label: "Patient Info", href: "/patient-information" },
  { label: "Contact", href: "/contact" },
];

export const pharmacyContact = {
  name: "Terra Losa Pharmacy",
  address: "17314 99 Ave NW, Edmonton, AB, T5T 5L5",
  phone: "(587) 462-1500",
  phoneHref: "+15874621500",
  fax: "(587) 462-1700",
  email: "terralosapharmacy@gmail.com",
  hours: "Monday to Friday, 9:00 AM - 6:00 PM",
  shortHours: "Mon-Fri, 9 AM - 6 PM",
};

export const publicPages = {
  services: {
    eyebrow: "Services",
    title: "Pharmacy care shaped around the neighborhood.",
    description:
      "A future overview of prescription services, clinical support, vaccines, medication reviews, and everyday health products.",
  },
  refill: {
    eyebrow: "Prescription refill",
    title: "A simple refill request experience is coming soon.",
    description:
      "This page will later connect to a secure refill workflow. For now, it establishes the route and visual foundation.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Reach the pharmacy team.",
    description:
      "Send a non-urgent pharmacy message securely to Terra Losa Pharmacy.",
  },
  about: {
    eyebrow: "About",
    title: "Independent pharmacy care with a local point of view.",
    description:
      "This page will tell the Terra Losa Pharmacy story, introduce the team, and explain the care philosophy.",
  },
  location: {
    eyebrow: "Location",
    title: "Find Terra Losa Pharmacy.",
    description:
      "A future map, parking notes, accessibility details, and hours will be placed here.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy information placeholder.",
    description:
      "This route is reserved for pharmacy privacy practices and policy content before launch.",
  },
} satisfies Record<string, PlaceholderPageContent>;

export const adminPages = {
  login: {
    eyebrow: "Admin",
    title: "Admin login.",
    description: "Secure staff login for Terra Losa Pharmacy.",
  },
  dashboard: {
    eyebrow: "Admin dashboard",
    title: "Staff workspace.",
    description:
      "Future internal summaries for refills, messages, and content management will start here.",
  },
  refills: {
    eyebrow: "Admin",
    title: "Refill Requests",
    description: "Request management will be added in the next phase.",
  },
  messages: {
    eyebrow: "Admin",
    title: "Contact Messages",
    description: "Message management will be added in the next phase.",
  },
  content: {
    eyebrow: "Admin",
    title: "Website Content",
    description: "Editable website content will be added later.",
  },
} satisfies Record<string, PlaceholderPageContent>;
