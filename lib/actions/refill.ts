"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { FormState } from "@/lib/actions/form-state";
import {
  getFile,
  getString,
} from "@/lib/actions/form-state";
import {
  uploadPrescriptionFile,
  validatePrescriptionFile,
} from "@/lib/actions/prescription-files";
import { refillRequestSchema } from "@/lib/validation/forms";

type RefillField =
  | "first_name"
  | "last_name"
  | "date_of_birth"
  | "phone"
  | "email"
  | "prescription_number"
  | "medication_name"
  | "fulfillment_preference"
  | "notes"
  | "consent_given"
  | "website";

const successMessage =
  "Thank you. Your refill request has been sent to Terra Losa Pharmacy. A pharmacy team member may contact you if more information is needed. For urgent or same-day needs, please call the pharmacy directly.";

function getFields(formData: FormData): Partial<Record<RefillField, string>> {
  return {
    first_name: getString(formData, "first_name"),
    last_name: getString(formData, "last_name"),
    date_of_birth: getString(formData, "date_of_birth"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    prescription_number: getString(formData, "prescription_number"),
    medication_name: getString(formData, "medication_name"),
    fulfillment_preference: getString(formData, "fulfillment_preference"),
    notes: getString(formData, "notes"),
    website: getString(formData, "website"),
  };
}

export async function submitRefillRequest(
  _previousState: FormState<RefillField>,
  formData: FormData,
): Promise<FormState<RefillField>> {
  const fields = getFields(formData);

  const parsed = refillRequestSchema.safeParse({
    ...fields,
    consent_given: true,
  });

  if (fields.website) {
    return { status: "success", message: successMessage };
  }

  if (!parsed.success) {
    return {
      status: "error",
      fields,
      errors: parsed.error.flatten().fieldErrors as Partial<
        Record<RefillField, string>
      >,
    };
  }

  const file = getFile(formData, "prescription_file");
  const fileError = validatePrescriptionFile(file);

  if (fileError) {
    return {
      status: "error",
      fields,
      errors: { file: fileError },
    };
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { website, ...request } = parsed.data;
    void website;

    const { data, error } = await supabase
      .from("refill_requests")
      .insert(request)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Refill request insert failed", error);
      return {
        status: "error",
        fields,
        errors: {
          form: "We could not send your refill request. Please try again or call the pharmacy.",
        },
      };
    }

    if (file) {
      await uploadPrescriptionFile({
        file,
        requestId: data.id,
        requestType: "refill",
      });
    }

    return { status: "success", message: successMessage };
  } catch (error) {
    console.error("Refill request submission failed", error);
    return {
      status: "error",
      fields,
      errors: {
        form: "We could not send your refill request. Please try again or call the pharmacy.",
      },
    };
  }
}
