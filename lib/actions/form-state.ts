export type FormStatus = "idle" | "success" | "error";

export type FormState<TField extends string = string> = {
  status: FormStatus;
  message?: string;
  fields?: Partial<Record<TField, string>>;
  errors?: Partial<Record<TField | "form" | "file", string>>;
};

export const initialFormState: FormState = {
  status: "idle",
};

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

