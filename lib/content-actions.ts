"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const publicPaths = [
  "/",
  "/about",
  "/services",
  "/patient-information",
  "/patient-info",
  "/privacy",
  "/admin/content",
];

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function googleMapsEmbedUrl(formData: FormData) {
  const raw = text(formData, "google_maps_embed_url");
  if (!raw) {
    return null;
  }

  const iframeSrc = raw.match(/\bsrc=["']([^"']+)["']/i)?.[1];
  const value = iframeSrc ?? raw;

  try {
    const url = new URL(value);
    const isGoogleMaps =
      (url.hostname === "www.google.com" || url.hostname === "maps.google.com") &&
      url.pathname.startsWith("/maps/");

    return isGoogleMaps ? url.toString() : null;
  } catch {
    return null;
  }
}

function requiredText(formData: FormData, key: string) {
  return text(formData, key) ?? "";
}

function intValue(formData: FormData, key: string, fallback = 0) {
  const raw = text(formData, key);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateContent() {
  for (const path of publicPaths) {
    revalidatePath(path);
  }
}

export async function updateHomepageSectionAction(formData: FormData) {
  await requireAdminSession();
  const id = requiredText(formData, "id");
  if (!id) return;

  await createAdminSupabaseClient()
    .from("homepage_sections")
    .update({
      body: text(formData, "body"),
      button_href: text(formData, "button_href"),
      button_label: text(formData, "button_label"),
      display_order: intValue(formData, "display_order"),
      eyebrow: text(formData, "eyebrow"),
      is_active: checked(formData, "is_active"),
      secondary_button_href: text(formData, "secondary_button_href"),
      secondary_button_label: text(formData, "secondary_button_label"),
      subtitle: text(formData, "subtitle"),
      title: text(formData, "title"),
    })
    .eq("id", id);

  revalidateContent();
}

export async function updateSitePageAction(formData: FormData) {
  await requireAdminSession();
  const id = requiredText(formData, "id");
  if (!id) return;

  await createAdminSupabaseClient()
    .from("site_pages")
    .update({
      body: text(formData, "body"),
      eyebrow: text(formData, "eyebrow"),
      hero_subtitle: text(formData, "hero_subtitle"),
      hero_title: text(formData, "hero_title"),
      meta_description: text(formData, "meta_description"),
      meta_title: text(formData, "meta_title"),
      subtitle: text(formData, "subtitle"),
      title: text(formData, "title"),
    })
    .eq("id", id);

  revalidateContent();
}

export async function updatePharmacySettingsAction(formData: FormData) {
  await requireAdminSession();
  const id = requiredText(formData, "id");
  if (!id || id === "fallback-settings") return;

  await createAdminSupabaseClient()
    .from("pharmacy_settings")
    .update({
      address_line_1: text(formData, "address_line_1"),
      address_line_2: text(formData, "address_line_2"),
      city: text(formData, "city"),
      delivery_note: text(formData, "delivery_note"),
      email: text(formData, "email"),
      fax: text(formData, "fax"),
      google_maps_embed_url: googleMapsEmbedUrl(formData),
      google_maps_url: text(formData, "google_maps_url"),
      homepage_announcement: text(formData, "homepage_announcement"),
      pharmacy_name: requiredText(formData, "pharmacy_name") || "Terra Losa Pharmacy",
      phone: text(formData, "phone"),
      postal_code: text(formData, "postal_code"),
      province: text(formData, "province"),
    })
    .eq("id", id);

  revalidateContent();
}

export async function updateBusinessHourAction(formData: FormData) {
  await requireAdminSession();
  const id = requiredText(formData, "id");
  if (!id || id.startsWith("fallback-")) return;

  await createAdminSupabaseClient()
    .from("business_hours")
    .update({
      close_time: text(formData, "close_time"),
      display_order: intValue(formData, "display_order"),
      is_closed: checked(formData, "is_closed"),
      open_time: text(formData, "open_time"),
    })
    .eq("id", id);

  revalidateContent();
}

export async function upsertServiceAction(formData: FormData) {
  await requireAdminSession();
  const id = text(formData, "id");
  const title = requiredText(formData, "title");
  if (!title) return;
  const description = text(formData, "description");
  const payload = {
    description,
    display_order: intValue(formData, "display_order", 100),
    checklist_items: text(formData, "checklist_items"),
    icon_name: text(formData, "icon_name"),
    is_active: checked(formData, "is_active"),
    is_featured: checked(formData, "is_featured"),
    long_description: text(formData, "long_description"),
    short_description: description,
    slug: text(formData, "slug") || slugify(title),
    title,
  };
  const supabase = createAdminSupabaseClient();
  if (id) {
    await supabase.from("services").update(payload).eq("id", id);
  } else {
    await supabase.from("services").insert(payload);
  }
  revalidateContent();
}

export async function upsertConditionAction(formData: FormData) {
  await requireAdminSession();
  const id = text(formData, "id");
  const name = requiredText(formData, "name");
  if (!name) return;
  const payload = {
    category: text(formData, "category"),
    display_order: intValue(formData, "display_order", 100),
    is_active: checked(formData, "is_active"),
    long_description: text(formData, "long_description"),
    short_description: text(formData, "short_description"),
    slug: text(formData, "slug") || slugify(name),
    name,
  };
  const supabase = createAdminSupabaseClient();
  if (id) {
    await supabase.from("conditions").update(payload).eq("id", id);
  } else {
    await supabase.from("conditions").insert(payload);
  }
  revalidateContent();
}

export async function upsertAboutValueAction(formData: FormData) {
  await requireAdminSession();
  const id = text(formData, "id");
  const title = requiredText(formData, "title");
  if (!title) return;
  const payload = {
    description: text(formData, "description"),
    display_order: intValue(formData, "display_order", 100),
    icon_name: text(formData, "icon_name"),
    is_active: checked(formData, "is_active"),
    title,
    value_key: text(formData, "value_key") || slugify(title),
  };
  const supabase = createAdminSupabaseClient();
  if (id) {
    await supabase.from("about_values").update(payload).eq("id", id);
  } else {
    await supabase.from("about_values").insert(payload);
  }
  revalidateContent();
}

export async function upsertDocumentAction(formData: FormData) {
  await requireAdminSession();
  const id = text(formData, "id");
  const title = requiredText(formData, "title");
  const category = requiredText(formData, "category");
  if (!title || !category) return;
  const payload = {
    category,
    description: text(formData, "description"),
    display_order: intValue(formData, "display_order", 100),
    document_url: text(formData, "document_url"),
    is_active: checked(formData, "is_active"),
    title,
  };
  const supabase = createAdminSupabaseClient();
  if (id) {
    await supabase.from("regulatory_documents").update(payload).eq("id", id);
  } else {
    await supabase.from("regulatory_documents").insert(payload);
  }
  revalidateContent();
}
