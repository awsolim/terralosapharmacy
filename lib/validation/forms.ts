import { z } from "zod";

export const acceptedPrescriptionFileTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
] as const;

export const acceptedPrescriptionFileExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".pdf",
] as const;

export const maxPrescriptionFileSize = 10 * 1024 * 1024;

const optionalEmail = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null))
  .pipe(z.string().email("Enter a valid email address.").nullable());

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null));

const requiredText = (message: string) => z.string().trim().min(1, message);

export const fulfillmentPreferenceSchema = z.enum(
  ["pickup", "delivery", "not_sure"],
  {
    error: "Choose a pickup or delivery preference.",
  },
);

export const refillRequestSchema = z.object({
  first_name: requiredText("First name is required."),
  last_name: requiredText("Last name is required."),
  date_of_birth: requiredText("Date of birth is required."),
  phone: requiredText("Phone number is required."),
  email: optionalEmail,
  prescription_number: optionalText,
  medication_name: optionalText,
  fulfillment_preference: fulfillmentPreferenceSchema.default("not_sure"),
  notes: optionalText,
  consent_given: z.literal(true, {
    error: "Consent is required before sending this request.",
  }),
  website: optionalText,
});

export const contactMessageSchema = z.object({
  name: requiredText("Name is required."),
  phone: requiredText("Phone number is required."),
  email: optionalEmail,
  reason: z.enum(
    [
      "general_question",
      "prescription_question",
      "delivery_question",
      "hours_location",
      "other",
    ],
    { error: "Choose a message reason." },
  ),
  message: requiredText("Message is required."),
  website: optionalText,
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type RefillRequestInput = z.infer<typeof refillRequestSchema>;

