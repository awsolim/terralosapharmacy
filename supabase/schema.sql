-- Tera Losa Pharmacy Supabase schema foundation.
-- Paste this file into the Supabase SQL editor and run it once for a new project.
-- This creates tables, constraints, updated_at triggers, RLS policies, and seed data.

create extension if not exists "pgcrypto";

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
) values (
  'prescription-uploads',
  'prescription-uploads',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'application/pdf']
) on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.pharmacy_settings (
  id uuid primary key default gen_random_uuid(),
  pharmacy_name text not null default 'Tera Losa Pharmacy',
  phone text,
  fax text,
  email text,
  address_line_1 text,
  address_line_2 text,
  city text,
  province text,
  postal_code text,
  google_maps_url text,
  homepage_announcement text,
  delivery_note text,
  updated_at timestamptz not null default now()
);

create table if not exists public.business_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week text not null,
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  display_order integer not null,
  updated_at timestamptz not null default now(),
  constraint business_hours_day_check check (
    lower(day_of_week) in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
  ),
  constraint business_hours_display_order_check check (display_order between 1 and 7)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  short_description text,
  long_description text,
  checklist_items text,
  icon_name text,
  is_featured boolean not null default false,
  display_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.refill_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  phone text not null,
  email text,
  prescription_number text,
  medication_name text,
  fulfillment_preference text not null default 'pickup',
  notes text,
  consent_given boolean not null,
  status text not null default 'new',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint refill_fulfillment_preference_check check (
    fulfillment_preference in ('pickup', 'delivery', 'not_sure')
  ),
  constraint refill_status_check check (
    status in ('new', 'in_review', 'waiting_for_patient', 'completed', 'archived')
  ),
  constraint refill_consent_required_check check (consent_given is true)
);

create table if not exists public.transfer_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  phone text not null,
  email text,
  current_pharmacy_name text not null,
  current_pharmacy_phone text,
  current_pharmacy_fax text,
  medication_names text,
  fulfillment_preference text not null default 'pickup',
  notes text,
  consent_given boolean not null,
  status text not null default 'new',
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transfer_fulfillment_preference_check check (
    fulfillment_preference in ('pickup', 'delivery', 'not_sure')
  ),
  constraint transfer_status_check check (
    status in ('new', 'in_review', 'completed', 'archived')
  ),
  constraint transfer_consent_required_check check (consent_given is true)
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  reason text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_reason_check check (
    reason in ('general_question', 'prescription_question', 'delivery_question', 'hours_location', 'other')
  ),
  constraint contact_status_check check (
    status in ('new', 'read', 'archived')
  )
);

alter table public.business_hours
drop constraint if exists business_hours_day_check;
alter table public.business_hours
add constraint business_hours_day_check check (
  lower(day_of_week) in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
);

alter table public.refill_requests
drop constraint if exists refill_status_check;
alter table public.refill_requests
add constraint refill_status_check check (
  status in ('new', 'in_review', 'waiting_for_patient', 'completed', 'archived')
);

alter table public.contact_messages
drop constraint if exists contact_status_check;
alter table public.contact_messages
add constraint contact_status_check check (
  status in ('new', 'read', 'archived')
);

create table if not exists public.request_files (
  id uuid primary key default gen_random_uuid(),
  request_type text not null,
  request_id uuid not null,
  file_path text not null,
  file_name text not null,
  file_type text not null,
  file_size integer not null,
  created_at timestamptz not null default now(),
  constraint request_files_type_check check (request_type in ('refill', 'transfer')),
  constraint request_files_size_check check (file_size > 0)
);

create table if not exists public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'staff',
  created_at timestamptz not null default now(),
  constraint admin_profiles_role_check check (role in ('owner', 'staff'))
);

drop trigger if exists set_pharmacy_settings_updated_at on public.pharmacy_settings;
create trigger set_pharmacy_settings_updated_at
before update on public.pharmacy_settings
for each row execute function public.set_updated_at();

drop trigger if exists set_business_hours_updated_at on public.business_hours;
create trigger set_business_hours_updated_at
before update on public.business_hours
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_refill_requests_updated_at on public.refill_requests;
create trigger set_refill_requests_updated_at
before update on public.refill_requests
for each row execute function public.set_updated_at();

drop trigger if exists set_transfer_requests_updated_at on public.transfer_requests;
create trigger set_transfer_requests_updated_at
before update on public.transfer_requests
for each row execute function public.set_updated_at();

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

alter table public.pharmacy_settings enable row level security;
alter table public.business_hours enable row level security;
alter table public.services enable row level security;
alter table public.refill_requests enable row level security;
alter table public.transfer_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.request_files enable row level security;
alter table public.admin_profiles enable row level security;

-- Public website content can be read by anyone.
drop policy if exists "Public can read pharmacy settings" on public.pharmacy_settings;
create policy "Public can read pharmacy settings"
on public.pharmacy_settings for select
using (true);

drop policy if exists "Public can read business hours" on public.business_hours;
create policy "Public can read business hours"
on public.business_hours for select
using (true);

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services for select
using (is_active is true);

-- Admin identity helper: authenticated users count as admins only if they have a profile.
-- The admin_profiles table itself only exposes the signed-in user's own profile.
drop policy if exists "Admins can read own profile" on public.admin_profiles;
create policy "Admins can read own profile"
on public.admin_profiles for select
to authenticated
using (user_id = auth.uid());

-- Public inserts are prepared for future website forms, but the app does not use them yet.
-- Submitted request rows are never publicly readable.
drop policy if exists "Public can create refill requests" on public.refill_requests;
create policy "Public can create refill requests"
on public.refill_requests for insert
to anon, authenticated
with check (consent_given is true);

drop policy if exists "Public can create transfer requests" on public.transfer_requests;
create policy "Public can create transfer requests"
on public.transfer_requests for insert
to anon, authenticated
with check (consent_given is true);

drop policy if exists "Public can create contact messages" on public.contact_messages;
create policy "Public can create contact messages"
on public.contact_messages for insert
to anon, authenticated
with check (true);

-- Admin read/update access for future dashboard work.
drop policy if exists "Admins can manage pharmacy settings" on public.pharmacy_settings;
create policy "Admins can manage pharmacy settings"
on public.pharmacy_settings for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage business hours" on public.business_hours;
create policy "Admins can manage business hours"
on public.business_hours for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage services" on public.services;
create policy "Admins can manage services"
on public.services for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage refill requests" on public.refill_requests;
create policy "Admins can manage refill requests"
on public.refill_requests for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage transfer requests" on public.transfer_requests;
create policy "Admins can manage transfer requests"
on public.transfer_requests for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage contact messages" on public.contact_messages;
create policy "Admins can manage contact messages"
on public.contact_messages for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage request files" on public.request_files;
create policy "Admins can manage request files"
on public.request_files for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

insert into public.pharmacy_settings (
  pharmacy_name,
  phone,
  fax,
  email,
  address_line_1,
  address_line_2,
  city,
  province,
  postal_code,
  google_maps_url,
  homepage_announcement,
  delivery_note
) values (
  'Tera Losa Pharmacy',
  '(780) 000-0000',
  '(780) 000-0001',
  'hello@terralosapharmacy.ca',
  'Placeholder address',
  null,
  'Edmonton',
  'AB',
  'T0T 0T0',
  null,
  'Online request forms are being prepared. Please call the pharmacy for active prescription support.',
  'Ask us about delivery availability for your area.'
) on conflict do nothing;

insert into public.business_hours (day_of_week, open_time, close_time, is_closed, display_order)
values
  ('monday', '09:00', '18:00', false, 1),
  ('tuesday', '09:00', '18:00', false, 2),
  ('wednesday', '09:00', '18:00', false, 3),
  ('thursday', '09:00', '18:00', false, 4),
  ('friday', '09:00', '18:00', false, 5),
  ('saturday', '10:00', '15:00', false, 6),
  ('sunday', null, null, true, 7)
on conflict do nothing;

insert into public.services (
  title,
  slug,
  short_description,
  long_description,
  icon_name,
  is_featured,
  display_order,
  is_active
) values
  ('Prescription refills', 'prescription-refills', 'Request refills and the team will review the details.', null, 'pill', true, 1, true),
  ('Medication reviews', 'medication-reviews', 'Book time to review medications and ask practical questions.', null, 'clipboard-list', true, 3, true),
  ('Blister packaging', 'blister-packaging', 'Ask about packaging options that make doses easier to manage.', null, 'package', false, 4, true),
  ('Delivery', 'delivery', 'Ask us about delivery availability for your area.', null, 'truck', false, 5, true),
  ('Vaccines and injections', 'vaccines-injections', 'Contact the pharmacy to confirm current availability.', null, 'syringe', false, 6, true),
  ('Minor ailments prescribing', 'minor-ailments-prescribing', 'Contact the pharmacy to confirm availability and eligibility.', null, 'stethoscope', false, 7, true),
  ('Diabetes support', 'diabetes-support', 'Practical support for supplies, medication questions, and routines.', null, 'activity', false, 8, true),
  ('Blood pressure checks', 'blood-pressure-checks', 'Ask about in-pharmacy blood pressure support.', null, 'heart-pulse', false, 9, true),
  ('Over-the-counter guidance', 'over-the-counter-guidance', 'Clear help choosing non-prescription products safely.', null, 'shopping-bag', false, 10, true)
on conflict (slug) do nothing;

update public.services
set is_active = false, is_featured = false
where slug = 'prescription-transfers';
