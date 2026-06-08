import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import type {
  ContactMessage,
  ContactStatus,
  RefillRequest,
  RefillStatus,
  RequestFile,
} from "@/types/database";

export const refillStatuses: RefillStatus[] = [
  "new",
  "in_review",
  "waiting_for_patient",
  "completed",
  "archived",
];

export const contactStatuses: ContactStatus[] = ["new", "read", "archived"];

export const statusLabels: Record<RefillStatus | ContactStatus, string> = {
  new: "New",
  in_review: "In review",
  waiting_for_patient: "Waiting for patient",
  completed: "Completed",
  read: "Read",
  archived: "Archived",
};

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function formatFulfillment(value: RefillRequest["fulfillment_preference"]) {
  const labels: Record<RefillRequest["fulfillment_preference"], string> = {
    pickup: "Pickup",
    delivery: "Delivery",
    not_sure: "Not sure",
  };

  return labels[value];
}

export function formatReason(value: string) {
  const labels: Record<string, string> = {
    delivery_question: "Delivery question",
    general_question: "General question",
    hours_location: "Hours or location",
    other: "Other",
    prescription_question: "Prescription question",
  };

  return labels[value] ?? value;
}

export type RefillListItem = RefillRequest & {
  attachmentCount: number;
};

export type AdminSearchParams = {
  q?: string | string[];
  status?: string | string[];
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSearch(value: string | string[] | undefined) {
  return getParam(value)?.trim() ?? "";
}

function normalizeRefillStatus(value: string | string[] | undefined) {
  const status = getParam(value);
  return status && refillStatuses.includes(status as RefillStatus)
    ? (status as RefillStatus)
    : "";
}

function normalizeContactStatus(value: string | string[] | undefined) {
  const status = getParam(value);
  return status && contactStatuses.includes(status as ContactStatus)
    ? (status as ContactStatus)
    : "";
}

export async function getAdminOverview() {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();

  const [
    newRefills,
    inReviewRefills,
    newMessages,
    recentRefills,
    recentMessages,
  ] = await Promise.all([
    supabase
      .from("refill_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("refill_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "in_review"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("refill_requests")
      .select("id, first_name, last_name, phone, status, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("contact_messages")
      .select("id, name, phone, status, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  return {
    counts: {
      inReviewRefills: inReviewRefills.count ?? 0,
      newMessages: newMessages.count ?? 0,
      newRefills: newRefills.count ?? 0,
    },
    error:
      newRefills.error ||
      inReviewRefills.error ||
      newMessages.error ||
      recentRefills.error ||
      recentMessages.error
        ? "Admin overview could not be loaded."
        : "",
    recentMessages: (recentMessages.data ?? []) as Pick<
      ContactMessage,
      "id" | "name" | "phone" | "status" | "created_at"
    >[],
    recentRefills: (recentRefills.data ?? []) as Pick<
      RefillRequest,
      "id" | "first_name" | "last_name" | "phone" | "status" | "created_at"
    >[],
  };
}

export async function getRefillRequests(params: AdminSearchParams) {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();
  const search = normalizeSearch(params.q);
  const status = normalizeRefillStatus(params.status);

  let query = supabase
    .from("refill_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    const escaped = search.replaceAll("%", "\\%").replaceAll(",", "\\,");
    query = query.or(
      `first_name.ilike.%${escaped}%,last_name.ilike.%${escaped}%,phone.ilike.%${escaped}%,prescription_number.ilike.%${escaped}%,medication_name.ilike.%${escaped}%`,
    );
  }

  const { data, error } = await query;

  if (error) {
    return { error: "Refill requests could not be loaded.", items: [], search, status };
  }

  const requests = (data ?? []) as RefillRequest[];
  const ids = requests.map((request) => request.id);
  const attachmentCounts = new Map<string, number>();

  if (ids.length > 0) {
    const { data: files } = await supabase
      .from("request_files")
      .select("request_id")
      .eq("request_type", "refill")
      .in("request_id", ids);

    for (const file of files ?? []) {
      const requestId = String(file.request_id);
      attachmentCounts.set(requestId, (attachmentCounts.get(requestId) ?? 0) + 1);
    }
  }

  return {
    error: "",
    items: requests.map((request) => ({
      ...request,
      attachmentCount: attachmentCounts.get(request.id) ?? 0,
    })),
    search,
    status,
  };
}

export async function getRefillRequestDetail(id: string) {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();

  const [{ data: request, error }, { data: files, error: filesError }] =
    await Promise.all([
      supabase.from("refill_requests").select("*").eq("id", id).maybeSingle(),
      supabase
        .from("request_files")
        .select("*")
        .eq("request_type", "refill")
        .eq("request_id", id)
        .order("created_at", { ascending: true }),
    ]);

  if (error || filesError || !request) {
    return {
      error: "Refill request could not be loaded.",
      files: [],
      request: null,
    };
  }

  const signedFiles = await Promise.all(
    ((files ?? []) as RequestFile[]).map(async (file) => {
      const { data: signed } = await supabase.storage
        .from("prescription-uploads")
        .createSignedUrl(file.file_path, 60 * 10, {
          download: file.file_name,
        });

      return {
        ...file,
        signedUrl: signed?.signedUrl ?? "",
      };
    }),
  );

  return {
    error: "",
    files: signedFiles,
    request: request as RefillRequest,
  };
}

export async function getContactMessages(params: AdminSearchParams) {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();
  const search = normalizeSearch(params.q);
  const status = normalizeContactStatus(params.status);

  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (search) {
    const escaped = search.replaceAll("%", "\\%").replaceAll(",", "\\,");
    query = query.or(
      `name.ilike.%${escaped}%,phone.ilike.%${escaped}%,email.ilike.%${escaped}%,reason.ilike.%${escaped}%,message.ilike.%${escaped}%`,
    );
  }

  const { data, error } = await query;

  return {
    error: error ? "Contact messages could not be loaded." : "",
    items: (data ?? []) as ContactMessage[],
    search,
    status,
  };
}

export async function getContactMessageDetail(id: string) {
  await requireAdminSession();
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return {
      error: "Contact message could not be loaded.",
      message: null,
    };
  }

  return {
    error: "",
    message: data as ContactMessage,
  };
}
