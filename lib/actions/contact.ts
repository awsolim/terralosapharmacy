"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { FormState } from "@/lib/actions/form-state";
import { getString } from "@/lib/actions/form-state";
import { contactMessageSchema } from "@/lib/validation/forms";

type ContactField =
  | "name"
  | "phone"
  | "email"
  | "reason"
  | "message"
  | "website";

const successMessage =
  "Thank you. Your message has been sent. For urgent pharmacy needs, please call us directly.";

function getFields(formData: FormData): Partial<Record<ContactField, string>> {
  return {
    name: getString(formData, "name"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    reason: getString(formData, "reason"),
    message: getString(formData, "message"),
    website: getString(formData, "website"),
  };
}

export async function submitContactMessage(
  _previousState: FormState<ContactField>,
  formData: FormData,
): Promise<FormState<ContactField>> {
  const fields = getFields(formData);

  const parsed = contactMessageSchema.safeParse(fields);

  if (fields.website) {
    return { status: "success", message: successMessage };
  }

  if (!parsed.success) {
    return {
      status: "error",
      fields,
      errors: parsed.error.flatten().fieldErrors as Partial<
        Record<ContactField, string>
      >,
    };
  }

  try {
    const supabase = createAdminSupabaseClient();
    const { website, ...message } = parsed.data;
    void website;
    const { error } = await supabase.from("contact_messages").insert(message);

    if (error) {
      console.error("Contact message insert failed", error);
      return {
        status: "error",
        fields,
        errors: {
          form: "We could not send your message. Please try again or call the pharmacy.",
        },
      };
    }

    return { status: "success", message: successMessage };
  } catch (error) {
    console.error("Contact message submission failed", error);
    return {
      status: "error",
      fields,
      errors: {
        form: "We could not send your message. Please try again or call the pharmacy.",
      },
    };
  }
}
