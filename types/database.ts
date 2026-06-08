export type RefillStatus =
  | "new"
  | "in_review"
  | "waiting_for_patient"
  | "completed"
  | "archived";
export type ContactStatus = "new" | "read" | "archived";
export type RequestStatus = RefillStatus | ContactStatus;
export type AdminRole = "owner" | "staff";
export type FulfillmentPreference = "pickup" | "delivery" | "not_sure";
export type RequestFileType = "refill" | "transfer";

export type PharmacySettings = {
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

export type PharmacyService = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  icon_name: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RefillRequest = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  email: string | null;
  prescription_number: string | null;
  medication_name: string | null;
  fulfillment_preference: FulfillmentPreference;
  notes: string | null;
  consent_given: boolean;
  status: RefillStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type TransferRequest = {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  phone: string;
  email: string | null;
  current_pharmacy_name: string;
  current_pharmacy_phone: string | null;
  current_pharmacy_fax: string | null;
  medication_names: string | null;
  fulfillment_preference: FulfillmentPreference;
  notes: string | null;
  consent_given: boolean;
  status: RequestStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  reason: string;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
};

export type RequestFile = {
  id: string;
  request_type: RequestFileType;
  request_id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export type AdminProfile = {
  id: string;
  user_id: string;
  full_name: string;
  role: AdminRole;
  created_at: string;
};
