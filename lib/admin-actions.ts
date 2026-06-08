"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  contactStatuses,
  refillStatuses,
} from "@/lib/admin-requests";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { ContactStatus, RefillStatus } from "@/types/database";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function updateRefillRequestAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");
  const status = getString(formData, "status") as RefillStatus;
  const internalNotes = getString(formData, "internal_notes").trim() || null;

  if (!id || !refillStatuses.includes(status)) {
    redirect("/admin/refills");
  }

  const supabase = createAdminSupabaseClient();
  await supabase
    .from("refill_requests")
    .update({ internal_notes: internalNotes, status })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/refills");
  revalidatePath(`/admin/refills/${id}`);
}

export async function archiveRefillRequestAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");

  if (!id) {
    redirect("/admin/refills");
  }

  const supabase = createAdminSupabaseClient();
  await supabase.from("refill_requests").update({ status: "archived" }).eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/refills");
  revalidatePath(`/admin/refills/${id}`);
}

export async function updateContactMessageStatusAction(formData: FormData) {
  await requireAdminSession();
  const id = getString(formData, "id");
  const status = getString(formData, "status") as ContactStatus;

  if (!id || !contactStatuses.includes(status)) {
    redirect("/admin/messages");
  }

  const supabase = createAdminSupabaseClient();
  await supabase.from("contact_messages").update({ status }).eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
}
