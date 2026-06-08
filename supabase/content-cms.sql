-- Tera Losa Pharmacy editable content CMS.
-- Run this after supabase/schema.sql. It is safe to re-run.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  eyebrow text,
  title text,
  subtitle text,
  hero_title text,
  hero_subtitle text,
  body text,
  meta_title text,
  meta_description text,
  updated_at timestamptz not null default now()
);

alter table public.site_pages
add column if not exists eyebrow text;

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  eyebrow text,
  title text,
  subtitle text,
  body text,
  button_label text,
  button_href text,
  secondary_button_label text,
  secondary_button_href text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.conditions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text,
  short_description text,
  long_description text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.about_values (
  id uuid primary key default gen_random_uuid(),
  value_key text unique not null,
  title text not null,
  description text,
  icon_name text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.regulatory_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  document_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.business_hours
drop constraint if exists business_hours_day_check;
alter table public.business_hours
add constraint business_hours_day_check check (
  lower(day_of_week) in ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
);

drop trigger if exists set_site_pages_updated_at on public.site_pages;
create trigger set_site_pages_updated_at
before update on public.site_pages
for each row execute function public.set_updated_at();

drop trigger if exists set_homepage_sections_updated_at on public.homepage_sections;
create trigger set_homepage_sections_updated_at
before update on public.homepage_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_conditions_updated_at on public.conditions;
create trigger set_conditions_updated_at
before update on public.conditions
for each row execute function public.set_updated_at();

drop trigger if exists set_about_values_updated_at on public.about_values;
create trigger set_about_values_updated_at
before update on public.about_values
for each row execute function public.set_updated_at();

drop trigger if exists set_regulatory_documents_updated_at on public.regulatory_documents;
create trigger set_regulatory_documents_updated_at
before update on public.regulatory_documents
for each row execute function public.set_updated_at();

alter table public.site_pages enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.conditions enable row level security;
alter table public.about_values enable row level security;
alter table public.regulatory_documents enable row level security;

-- Public visitors can read content intended for the public website.
drop policy if exists "Public can read site pages" on public.site_pages;
create policy "Public can read site pages"
on public.site_pages for select
using (true);

drop policy if exists "Public can read active homepage sections" on public.homepage_sections;
create policy "Public can read active homepage sections"
on public.homepage_sections for select
using (is_active is true);

drop policy if exists "Public can read active conditions" on public.conditions;
create policy "Public can read active conditions"
on public.conditions for select
using (is_active is true);

drop policy if exists "Public can read active about values" on public.about_values;
create policy "Public can read active about values"
on public.about_values for select
using (is_active is true);

drop policy if exists "Public can read active regulatory documents" on public.regulatory_documents;
create policy "Public can read active regulatory documents"
on public.regulatory_documents for select
using (is_active is true);

-- Only approved admins can manage editable content.
drop policy if exists "Admins can manage site pages" on public.site_pages;
create policy "Admins can manage site pages"
on public.site_pages for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage homepage sections" on public.homepage_sections;
create policy "Admins can manage homepage sections"
on public.homepage_sections for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage conditions" on public.conditions;
create policy "Admins can manage conditions"
on public.conditions for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage about values" on public.about_values;
create policy "Admins can manage about values"
on public.about_values for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

drop policy if exists "Admins can manage regulatory documents" on public.regulatory_documents;
create policy "Admins can manage regulatory documents"
on public.regulatory_documents for all
to authenticated
using (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()))
with check (exists (select 1 from public.admin_profiles ap where ap.user_id = auth.uid()));

insert into public.homepage_sections (
  section_key,
  eyebrow,
  title,
  subtitle,
  body,
  button_label,
  button_href,
  secondary_button_label,
  secondary_button_href,
  display_order,
  is_active
) values
  ('hero', 'Terra Losa Pharmacy', 'Personal pharmacy care, close to home.', 'Refills, prescribing support, and medication questions handled by a team you can reach.', null, 'Refill prescription', '/refill', 'About us', '/about', 1, true),
  ('local_care', 'Alberta Pharmacy Prescribing', 'Skip the Doctor''s Office. Walk Right In.', 'Pharmacist prescribing can help with common concerns when care is appropriate and available.', null, null, null, null, null, 2, true),
  ('services_intro', 'Services', 'Everything You Need, Under One Roof', 'Practical pharmacy services for everyday care, prescriptions, and medication support.', null, 'View all services', '/services', null, null, 3, true),
  ('patient_info_callout', 'Patient & regulatory information', 'Patient & Regulatory Information', 'Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.', null, 'View patient information', '/patient-information', null, null, 4, true),
  ('final_cta', 'Need help today?', 'Personal pharmacy care, close to home.', 'Call or send a request and the Terra Losa Pharmacy team will help with the next step.', null, 'Refill prescription', '/refill', 'Contact us', '/contact', 5, true)
on conflict (section_key) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  subtitle = excluded.subtitle,
  body = excluded.body,
  button_label = excluded.button_label,
  button_href = excluded.button_href,
  secondary_button_label = excluded.secondary_button_label,
  secondary_button_href = excluded.secondary_button_href,
  display_order = excluded.display_order,
  is_active = excluded.is_active;

insert into public.site_pages (
  slug,
  eyebrow,
  title,
  subtitle,
  hero_title,
  hero_subtitle,
  body,
  meta_title,
  meta_description
) values
  ('about', 'About', 'A local pharmacy built around practical care.', 'Terra Losa Pharmacy serves nearby Edmonton patients and families with clear, grounded support.', 'A local pharmacy built around practical care.', 'Personal pharmacy help should feel clear, reachable, and close to home.', 'Terra Losa Pharmacy was created for nearby Edmonton patients and families who want pharmacy care that feels clear, personal, and easy to reach.

The team is focused on practical everyday support: refills, medication questions, product guidance, prescribing conversations when appropriate, and a familiar place to call when the next step is not obvious.', 'About Terra Losa Pharmacy', 'Learn about Terra Losa Pharmacy and its local pharmacy care.'),
  ('services', 'Services', 'Everything You Need, Under One Roof', 'A visual overview of common pharmacy services and support available through Terra Losa Pharmacy.', 'Pharmacy services for everyday care.', 'Refills, prescribing support, medication reviews, packaging, delivery questions, and practical guidance.', null, 'Services', 'Explore pharmacy services at Terra Losa Pharmacy.'),
  ('refill', 'Refill prescription', 'Request a Prescription Refill.', 'Send the details the pharmacy team needs to review your request. This is not a confirmation that the prescription is ready.', 'Request a Prescription Refill.', 'Send the details the pharmacy team needs to review your request. This is not a confirmation that the prescription is ready.', null, 'Refill Prescription', 'Request a prescription refill online with Terra Losa Pharmacy.'),
  ('location', 'Location', 'Find Terra Losa Pharmacy.', 'Visit Terra Losa Pharmacy in Edmonton or contact the team before you come in.', 'Find Terra Losa Pharmacy.', 'Address, hours, phone, fax, and map information for the pharmacy.', null, 'Location', 'Find Terra Losa Pharmacy contact details and hours.'),
  ('patient-info', 'Patient & regulatory information', 'Patient & Regulatory Information', 'Pharmacy information in one place.', 'Patient & Regulatory Information', 'Find pharmacy documents, patient concern information, privacy details, and other required resources in one place.', null, 'Patient & Regulatory Information', 'View patient and regulatory information for Terra Losa Pharmacy.'),
  ('privacy', 'Privacy', 'Website intake and privacy notice.', 'A simple notice for the current website foundation. A final legal privacy policy should be reviewed before launch.', 'Website intake and privacy notice.', 'Understand how website forms are intended to be used.', null, 'Privacy', 'Privacy and website intake notice for Terra Losa Pharmacy.')
on conflict (slug) do update set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  subtitle = excluded.subtitle,
  hero_title = excluded.hero_title,
  hero_subtitle = excluded.hero_subtitle,
  body = excluded.body,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description;

insert into public.conditions (
  name,
  slug,
  category,
  short_description,
  long_description,
  display_order,
  is_active
) values
  ('Cold sores', 'cold-sores', 'Minor ailments', 'Ask about assessment and treatment options for cold sores.', null, 1, true),
  ('Allergies', 'allergies', 'Minor ailments', 'Support for seasonal allergy symptoms and product selection.', null, 2, true),
  ('Minor skin concerns', 'minor-skin-concerns', 'Minor ailments', 'Ask about eligible minor skin concerns and treatment options.', null, 3, true),
  ('Prescription renewals', 'prescription-renewals', 'Medication support', 'Ask whether a renewal may be appropriate for your medication.', null, 4, true),
  ('Pink eye', 'pink-eye', 'Minor ailments', 'Pharmacy support may be available for eligible eye concerns.', null, 5, true),
  ('Hay fever', 'hay-fever', 'Minor ailments', 'Practical help for hay fever symptoms and medication choices.', null, 6, true),
  ('Oral thrush', 'oral-thrush', 'Minor ailments', 'Ask the pharmacy team about eligible oral thrush treatment support.', null, 7, true),
  ('Insect bites', 'insect-bites', 'Minor ailments', 'Support for mild insect bite symptoms and product options.', null, 8, true)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  display_order = excluded.display_order,
  is_active = excluded.is_active;

insert into public.about_values (
  value_key,
  title,
  description,
  icon_name,
  display_order,
  is_active
) values
  ('clear-answers', 'Clear answers', 'Patients should be able to understand their next step without sorting through complicated language.', 'heart', 1, true),
  ('local-care', 'Local care', 'Terra Losa Pharmacy is built around the practical needs of nearby Edmonton patients and families.', 'roots', 2, true),
  ('everyday-support', 'Everyday support', 'Prescription help, medication questions, and health product guidance should feel approachable.', 'support', 3, true),
  ('clinical-confidence', 'Clinical confidence', 'Care should balance warmth with careful pharmacy judgment and patient privacy.', 'shield', 4, true)
on conflict (value_key) do update set
  title = excluded.title,
  description = excluded.description,
  icon_name = excluded.icon_name,
  display_order = excluded.display_order,
  is_active = excluded.is_active;

insert into public.regulatory_documents (
  title,
  description,
  category,
  document_url,
  display_order,
  is_active
) values
  ('Pharmacy license', 'Current licensing and registration information for Terra Losa Pharmacy.', 'Licensing & Pharmacy Information', null, 1, true),
  ('Patient concerns', 'Information for patients who want to raise a concern or ask about pharmacy care.', 'Patient Concerns', null, 2, true),
  ('Privacy information', 'Plain-language information about privacy and patient records.', 'Privacy & Information Practices', null, 3, true),
  ('Professional standards', 'Professional standards and expectations for regulated pharmacy care.', 'Professional Standards', null, 4, true)
on conflict do nothing;

-- Keep earlier transfer planning out of the current public/admin experience.
update public.services
set is_active = false, is_featured = false
where slug = 'prescription-transfers';

delete from public.business_hours;
insert into public.business_hours (day_of_week, open_time, close_time, is_closed, display_order)
values
  ('monday', '09:00', '18:00', false, 1),
  ('tuesday', '09:00', '18:00', false, 2),
  ('wednesday', '09:00', '18:00', false, 3),
  ('thursday', '09:00', '18:00', false, 4),
  ('friday', '09:00', '18:00', false, 5),
  ('saturday', '10:00', '15:00', false, 6),
  ('sunday', null, null, true, 7);
