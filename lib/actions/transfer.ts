"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { FormState } from "@/lib/actions/form-state";
import {
  getBoolean,
  getFile,
  getString,
} from "@/lib/actions/form-state";
import {
  uploadPrescriptionFile,
  validatePrescriptionFile,
} from "@/lib/actions/prescription-files";
import { transferRequestSchema } from "@/lib/validation/forms";

type TransferField =
  | "first_name"
  | "last_name"
  | "date_of_birth"
  | "phone"
  | "email"
  | "current_pharmacy_name"
  | "current_pharmacy_phone"
  | "current_pharmacy_fax"
  | "medication_names"
  | "fulfillment_preference"
  | "notes"
  | "consent_given"
  | "website";

const successMessage =
  "Thank you. Your transfer request has been sent to Tera Losa Pharmacy. The pharmacy may contact you or your current pharmacy to complete the transfer.";

function getFields(formData: FormData): Partial<Record<TransferField, string>> {
  return {
    first_name: getString(formData, "first_name"),
    last_name: getString(formData, "last_name"),
    date_of_birth: getString(formData, "date_of_birth"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    current_pharmacy_name: getString(formData, "current_pharmacy_name"),
    current_pharmacy_phone: getString(formData, "current_pharmacy_phone"),
    current_pharmacy_fax: getString(formData, "current_pharmacy_fax"),
    medication_names: getString(formData, "medication_names"),
    fulfillment_preference: getString(formData, "fulfillment_preference"),
    notes: getString(formData, "notes"),
    website: getString(formData, "website"),
  };
}

export async function submitTransferRequest(
  _previousState: FormState<TransferField>,
  formData: FormData,
): Promise<FormState<TransferField>> {
  const fields = getFields(formData);

  const parsed = transferRequestSchema.safeParse({
    ...fields,
    consent_given: getBoolean(formData, "consent_given"),
  });

  if (fields.website) {
    return { status: "success", message: successMessage };
  }

  if (!parsed.success) {
    return {
      status: "error",
      fields,
      errors: parsed.error.flatten().fieldErrors as Partial<
        Record<TransferField, string>
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
      .from("transfer_requests")
      .insert(request)
      .select("id")
      .single();

    if (error || !data) {
      console.error("Transfer request insert failed", error);
      return {
        status: "error",
        fields,
        errors: {
          form: "We could not send your transfer request. Please try again or call the pharmacy.",
        },
      };
    }

    if (file) {
      await uploadPrescriptionFile({
        file,
        requestId: data.id,
        requestType: "transfer",
      });
    }

    return { status: "success", message: successMessage };
  } catch (error) {
    console.error("Transfer request submission failed", error);
    return {
      status: "error",
      fields,
      errors: {
        form: "We could not send your transfer request. Please try again or call the pharmacy.",
      },
    };
  }
}
