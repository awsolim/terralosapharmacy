import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import {
  acceptedPrescriptionFileExtensions,
  acceptedPrescriptionFileTypes,
  maxPrescriptionFileSize,
} from "@/lib/validation/forms";

const uploadBucket = "prescription-uploads";

async function ensurePrescriptionUploadBucket(
  supabase: ReturnType<typeof createAdminSupabaseClient>,
) {
  const { data, error } = await supabase.storage.getBucket(uploadBucket);

  if (data && !error) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    uploadBucket,
    {
      public: false,
      fileSizeLimit: maxPrescriptionFileSize,
      allowedMimeTypes: [...acceptedPrescriptionFileTypes],
    },
  );

  if (createError) {
    console.error("Prescription upload bucket check/create failed", {
      getBucketError: error,
      createError,
    });
    throw new Error("Prescription upload bucket is not available.");
  }
}

function getExtension(fileName: string) {
  const match = /\.[^.]+$/.exec(fileName.toLowerCase());
  return match?.[0] ?? "";
}

function sanitizeFileName(fileName: string) {
  const extension = getExtension(fileName);
  const baseName = fileName
    .slice(0, extension ? -extension.length : undefined)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 80);

  return `${baseName || "prescription-file"}${extension}`;
}

export function validatePrescriptionFile(file: File | null) {
  if (!file) {
    return null;
  }

  const extension = getExtension(file.name);

  if (!acceptedPrescriptionFileTypes.includes(file.type as never)) {
    return "Upload a JPG, PNG, or PDF file.";
  }

  if (!acceptedPrescriptionFileExtensions.includes(extension as never)) {
    return "File name must end in .jpg, .jpeg, .png, or .pdf.";
  }

  if (file.size > maxPrescriptionFileSize) {
    return "File must be 10MB or smaller.";
  }

  return null;
}

export async function uploadPrescriptionFile({
  file,
  requestId,
  requestType,
}: {
  file: File;
  requestId: string;
  requestType: "refill" | "transfer";
}) {
  const supabase = createAdminSupabaseClient();
  await ensurePrescriptionUploadBucket(supabase);

  const safeFileName = sanitizeFileName(file.name);
  const filePath = `${requestType}/${requestId}/${Date.now()}-${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from(uploadBucket)
    .upload(filePath, file, {
      cacheControl: "0",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Prescription file upload failed", uploadError);
    throw new Error("File upload failed.");
  }

  const { error: metadataError } = await supabase.from("request_files").insert({
    request_type: requestType,
    request_id: requestId,
    file_path: filePath,
    file_name: safeFileName,
    file_type: file.type,
    file_size: file.size,
  });

  if (metadataError) {
    console.error("Prescription file metadata insert failed", metadataError);
    throw new Error("File metadata insert failed.");
  }
}
