import type { NavItem, PlaceholderPageContent } from "@/types";

export const siteNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Refill", href: "/refill" },
  { label: "Patient Information", href: "/patient-information" },
  { label: "Contact", href: "/contact" },
  { label: "Location", href: "/location" },
];

export const pharmacyContact = {
  name: "Tera Losa Pharmacy",
  address: "Placeholder address, Edmonton, AB",
  phone: "(587) 462-1500",
  phoneHref: "+15874621500",
  fax: "(780) 000-0001",
  email: "hello@terralosapharmacy.ca",
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
      "Send a non-urgent pharmacy message securely to Tera Losa Pharmacy.",
  },
  about: {
    eyebrow: "About",
    title: "Independent pharmacy care with a local point of view.",
    description:
      "This page will tell the Tera Losa Pharmacy story, introduce the team, and explain the care philosophy.",
  },
  location: {
    eyebrow: "Location",
    title: "Find Tera Losa Pharmacy.",
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
    title: "Admin login placeholder.",
    description:
      "Authentication will be added in a later phase. This page only reserves the login route.",
  },
  dashboard: {
    eyebrow: "Admin dashboard",
    title: "Dashboard placeholder.",
    description:
      "Future internal summaries for refills, transfers, messages, and content management will start here.",
  },
  refills: {
    eyebrow: "Admin",
    title: "Refill requests placeholder.",
    description:
      "This route is reserved for reviewing future Supabase-backed refill requests.",
  },
  transfers: {
    eyebrow: "Admin",
    title: "Transfer requests placeholder.",
    description:
      "This route is reserved for reviewing future prescription transfer requests.",
  },
  messages: {
    eyebrow: "Admin",
    title: "Messages placeholder.",
    description:
      "This route is reserved for future patient contact messages and workflow status.",
  },
  content: {
    eyebrow: "Admin",
    title: "Content management placeholder.",
    description:
      "This route is reserved for future editable site content and pharmacy announcements.",
  },
} satisfies Record<string, PlaceholderPageContent>;
