import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/admin-auth";
import { pharmacyContact } from "@/lib/site";
import { serviceTiles, serviceImageBySlug } from "@/lib/services";

export type SitePageContent = {
  id: string;
  slug: string;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  body: string | null;
  meta_title: string | null;
  meta_description: string | null;
  updated_at: string;
};

export type HomepageSection = {
  id: string;
  section_key: string;
  eyebrow: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  button_label: string | null;
  button_href: string | null;
  secondary_button_label: string | null;
  secondary_button_href: string | null;
  is_active: boolean;
  display_order: number;
  updated_at: string;
};

export type Condition = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  short_description: string | null;
  long_description: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type AboutValue = {
  id: string;
  value_key: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type RegulatoryDocument = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  document_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type EditableService = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  long_description: string | null;
  checklist_items: string | null;
  icon_name: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PublicService = EditableService & {
  image: string;
  imageAlt: string;
};

export type EditablePharmacySettings = {
  id: string;
  pharmacy_name: string;
  phone: string | null;
  fax: string | null;
  email: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  google_maps_url: string | null;
  google_maps_embed_url: string | null;
  homepage_announcement: string | null;
  delivery_note: string | null;
  updated_at: string;
};

export type BusinessHour = {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  display_order: number;
  updated_at: string;
};

export const fallbackHomepageSections: Record<string, Partial<HomepageSection>> = {
  final_cta: {
    button_href: "/refill",
    button_label: "Refill prescription",
    eyebrow: "Need help today?",
    title: "Personal pharmacy care, close to home.",
    body: "Call or send a request and the Terra Losa Pharmacy team will help with the next step.",
  },
  hero: {
    button_href: "/refill",
    button_label: "Refill prescription",
    secondary_button_href: "/about",
    secondary_button_label: "About us",
    subtitle: "Refills, prescribing support, and medication questions handled by a team you can reach.",
    title: "Personal pharmacy care, close to home.",
  },
  local_care: {
    eyebrow: "Alberta Pharmacy Prescribing",
    subtitle: "Pharmacist prescribing can help with common concerns when care is appropriate and available.",
    title: "Skip the Doctor's Office. Walk Right In.",
  },
  patient_info_callout: {
    button_href: "/patient-information",
    button_label: "View patient information",
    eyebrow: "Patient & regulatory information",
    subtitle:
      "Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.",
    title: "Patient & Regulatory Information",
  },
  services_intro: {
    eyebrow: "Services",
    title: "Everything You Need, Under One Roof",
  },
};

export const fallbackPages: Record<string, Partial<SitePageContent>> = {
  about: {
    eyebrow: "About",
    body:
      "Terra Losa Pharmacy was created for nearby Edmonton patients and families who want pharmacy care that feels clear, personal, and easy to reach.\n\nThe team is focused on practical everyday support: refills, medication questions, product guidance, prescribing conversations when appropriate, and a familiar place to call when the next step is not obvious.",
    hero_subtitle:
      "Terra Losa Pharmacy serves nearby Edmonton patients and families with clear, grounded support.",
    hero_title: "A local pharmacy built around practical care.",
    subtitle:
      "Terra Losa Pharmacy serves the surrounding Edmonton area with clear, grounded pharmacy support.",
    title: "A local pharmacy built around practical care.",
  },
  location: {
    eyebrow: "Location",
    subtitle: "Visit Terra Losa Pharmacy in Edmonton or contact the team before you come in.",
    title: "Find Terra Losa Pharmacy.",
  },
  "patient-info": {
    eyebrow: "Patient & regulatory information",
    hero_subtitle:
      "Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.",
    hero_title: "Patient & Regulatory Information",
    subtitle: "Pharmacy information in one place.",
    title: "Patient & Regulatory Information",
  },
  privacy: {
    eyebrow: "Privacy",
    subtitle:
      "A simple notice for the current website foundation. A final legal privacy policy should be reviewed before launch.",
    title: "Website intake and privacy notice.",
  },
  refill: {
    eyebrow: "Refill prescription",
    hero_subtitle:
      "Send the details the pharmacy team needs to review your request. This is not a confirmation that the prescription is ready.",
    hero_title: "Request a Prescription Refill.",
    meta_description: "Request a prescription refill online with Terra Losa Pharmacy.",
    meta_title: "Refill Prescription",
    subtitle:
      "Send the details the pharmacy team needs to review your request. This is not a confirmation that the prescription is ready.",
    title: "Request a Prescription Refill.",
  },
  services: {
    eyebrow: "Services",
    subtitle:
      "A visual overview of common pharmacy services and support available through Terra Losa Pharmacy.",
    title: "Everything You Need, Under One Roof",
  },
};

export const fallbackConditions = [
  "Cold sores",
  "Allergies",
  "Minor skin concerns",
  "Prescription renewals",
  "Pink eye",
  "Hay fever",
  "Oral thrush",
  "Insect bites",
  "Acne",
  "Shingles",
  "Impetigo",
  "Hemorrhoids",
].map((name, index) => ({
  category: "Minor ailments",
  id: `fallback-${index}`,
  is_active: true,
  long_description: null,
  name,
  short_description: null,
  slug: name.toLowerCase().replaceAll(" ", "-"),
  display_order: index + 1,
  created_at: "",
  updated_at: "",
}));

export const fallbackAboutValues: AboutValue[] = [
  {
    created_at: "",
    description:
      "Patients should be able to understand their next step without sorting through complicated language.",
    display_order: 1,
    icon_name: "heart",
    id: "fallback-clear-answers",
    is_active: true,
    title: "Clear answers",
    updated_at: "",
    value_key: "clear-answers",
  },
  {
    created_at: "",
    description:
      "Terra Losa Pharmacy is built around the practical needs of nearby Edmonton patients and families.",
    display_order: 2,
    icon_name: "roots",
    id: "fallback-local-care",
    is_active: true,
    title: "Local care",
    updated_at: "",
    value_key: "local-care",
  },
  {
    created_at: "",
    description:
      "Prescription help, medication questions, and health product guidance should feel approachable.",
    display_order: 3,
    icon_name: "support",
    id: "fallback-everyday-support",
    is_active: true,
    title: "Everyday support",
    updated_at: "",
    value_key: "everyday-support",
  },
  {
    created_at: "",
    description:
      "Care should balance warmth with careful pharmacy judgment and patient privacy.",
    display_order: 4,
    icon_name: "shield",
    id: "fallback-clinical-confidence",
    is_active: true,
    title: "Clinical confidence",
    updated_at: "",
    value_key: "clinical-confidence",
  },
];

export const fallbackDocuments: RegulatoryDocument[] = [
  {
    category: "Licensing & Pharmacy Information",
    created_at: "",
    description: "Current licensing and registration information for Terra Losa Pharmacy.",
    display_order: 1,
    document_url: null,
    id: "fallback-license",
    is_active: true,
    title: "Pharmacy license",
    updated_at: "",
  },
  {
    category: "Patient Concerns",
    created_at: "",
    description: "How to raise a concern or ask about pharmacy care.",
    display_order: 2,
    document_url: null,
    id: "fallback-concerns",
    is_active: true,
    title: "Patient concerns",
    updated_at: "",
  },
  {
    category: "Privacy & Information Practices",
    created_at: "",
    description: "Plain-language information about privacy and patient records.",
    display_order: 3,
    document_url: null,
    id: "fallback-privacy",
    is_active: true,
    title: "Privacy information",
    updated_at: "",
  },
  {
    category: "Professional Standards",
    created_at: "",
    description: "Professional standards and expectations for pharmacy care.",
    display_order: 4,
    document_url: null,
    id: "fallback-standards",
    is_active: true,
    title: "Professional standards",
    updated_at: "",
  },
];

const fallbackHours: BusinessHour[] = [
  ["monday", "09:00", "18:00", false, 1],
  ["tuesday", "09:00", "18:00", false, 2],
  ["wednesday", "09:00", "18:00", false, 3],
  ["thursday", "09:00", "18:00", false, 4],
  ["friday", "09:00", "18:00", false, 5],
  ["saturday", "10:00", "15:00", false, 6],
  ["sunday", null, null, true, 7],
].map(([day, open, close, closed, order]) => ({
  close_time: close as string | null,
  day_of_week: day as string,
  display_order: order as number,
  id: `fallback-${day}`,
  is_closed: closed as boolean,
  open_time: open as string | null,
  updated_at: "",
}));

function fallbackSettings(): EditablePharmacySettings {
  return {
    address_line_1: pharmacyContact.address,
    address_line_2: null,
    city: "Edmonton",
    delivery_note: "Ask us about delivery availability for your area.",
    email: pharmacyContact.email,
    fax: pharmacyContact.fax,
    google_maps_embed_url: null,
    google_maps_url: null,
    homepage_announcement: null,
    id: "fallback-settings",
    pharmacy_name: pharmacyContact.name,
    phone: pharmacyContact.phone,
    postal_code: null,
    province: "AB",
    updated_at: "",
  };
}

export function textOrFallback(value: string | null | undefined, fallback = "") {
  return value && value.trim() ? value : fallback;
}

export function formatPublicHour(hour: BusinessHour) {
  if (hour.is_closed) {
    return "Closed";
  }

  if (!hour.open_time || !hour.close_time) {
    return "Call for hours";
  }

  return `${formatTime(hour.open_time)} - ${formatTime(hour.close_time)}`;
}

function formatTime(value: string) {
  const [hourPart, minutePart] = value.split(":");
  const hour = Number.parseInt(hourPart, 10);
  const minute = Number.parseInt(minutePart, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return minute === 0
    ? `${displayHour} ${period}`
    : `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function formatDay(day: string) {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export function settingsAddress(settings: EditablePharmacySettings) {
  return [
    settings.address_line_1,
    settings.address_line_2,
    settings.city,
    settings.province,
    settings.postal_code,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function getPublicContent() {
  noStore();
  const supabase = createServerSupabaseClient();
  const [sections, pages, services, conditions, aboutValues, documents, settings, hours] =
    await Promise.all([
      supabase
        .from("homepage_sections")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase.from("site_pages").select("*"),
      supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .neq("slug", "prescription-transfers")
        .order("display_order", { ascending: true }),
      supabase
        .from("conditions")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("about_values")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("regulatory_documents")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true }),
      supabase.from("pharmacy_settings").select("*").limit(1).maybeSingle(),
      supabase
        .from("business_hours")
        .select("*")
        .order("display_order", { ascending: true }),
    ]);

  const sectionMap = new Map<string, Partial<HomepageSection>>(
    Object.entries(fallbackHomepageSections),
  );
  for (const section of (sections.data ?? []) as HomepageSection[]) {
    sectionMap.set(section.section_key, section);
  }

  const pageMap = new Map<string, Partial<SitePageContent>>(
    Object.entries(fallbackPages),
  );
  for (const page of (pages.data ?? []) as SitePageContent[]) {
    pageMap.set(page.slug, { ...fallbackPages[page.slug], ...page });
  }

  const serviceRecords = ((services.data ?? []) as EditableService[]).map((service) => {
    const image = serviceImageBySlug[service.slug] ?? serviceTiles[0];
    return {
      ...service,
      image: image.image,
      imageAlt: image.imageAlt,
    };
  });

  const serviceTilesFromRecords = serviceRecords.map((service) => ({
    details: service.long_description ?? service.short_description ?? "",
    image: service.image,
    imageAlt: service.imageAlt,
    shortLine: service.short_description ?? "",
    title: service.title,
  }));

  const featuredServiceTiles = serviceRecords
    .filter((service) => service.is_featured)
    .map((service) => ({
      details: service.long_description ?? service.short_description ?? "",
      image: service.image,
      imageAlt: service.imageAlt,
      shortLine: service.short_description ?? "",
      title: service.title,
    }));

  return {
    aboutValues:
      aboutValues.data && aboutValues.data.length > 0
        ? ((aboutValues.data ?? []) as AboutValue[])
        : fallbackAboutValues,
    conditions:
      conditions.data && conditions.data.length > 0
        ? ((conditions.data ?? []) as Condition[])
        : fallbackConditions,
    documents:
      documents.data && documents.data.length > 0
        ? ((documents.data ?? []) as RegulatoryDocument[])
        : fallbackDocuments,
    hours:
      hours.data && hours.data.length > 0
        ? ((hours.data ?? []) as BusinessHour[])
        : fallbackHours,
    pages: pageMap,
    sections: sectionMap,
    featuredServices:
      featuredServiceTiles.length > 0
        ? featuredServiceTiles
        : serviceTiles.slice(0, 6),
    serviceRecords,
    services: serviceTilesFromRecords.length > 0 ? serviceTilesFromRecords : serviceTiles,
    settings: (settings.data as EditablePharmacySettings | null) ?? fallbackSettings(),
  };
}

export async function getAdminContentData() {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();
  const [sections, pages, services, conditions, aboutValues, documents, settings, hours] =
    await Promise.all([
      supabase.from("homepage_sections").select("*").order("display_order"),
      supabase.from("site_pages").select("*").order("slug"),
      supabase
        .from("services")
        .select("*")
        .neq("slug", "prescription-transfers")
        .order("display_order"),
      supabase.from("conditions").select("*").order("display_order"),
      supabase.from("about_values").select("*").order("display_order"),
      supabase.from("regulatory_documents").select("*").order("display_order"),
      supabase.from("pharmacy_settings").select("*").limit(1).maybeSingle(),
      supabase.from("business_hours").select("*").order("display_order"),
    ]);

  return {
    aboutValues: (aboutValues.data ?? []) as AboutValue[],
    conditions: (conditions.data ?? []) as Condition[],
    documents: (documents.data ?? []) as RegulatoryDocument[],
    error:
      sections.error ||
      pages.error ||
      services.error ||
      conditions.error ||
      aboutValues.error ||
      documents.error ||
      settings.error ||
      hours.error
        ? "Some content could not be loaded. Confirm the CMS SQL migration has been run."
        : "",
    hours: ((hours.data && hours.data.length > 0 ? hours.data : fallbackHours) ??
      []) as BusinessHour[],
    pages: (pages.data ?? []) as SitePageContent[],
    sections: (sections.data ?? []) as HomepageSection[],
    services: (services.data ?? []) as EditableService[],
    settings: (settings.data as EditablePharmacySettings | null) ?? fallbackSettings(),
  };
}
