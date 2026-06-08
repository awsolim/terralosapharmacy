-- Add editable service descriptions and comma-separated checklist items.
-- Run this once in the Supabase SQL editor. Do not rerun the full schema seed.

alter table public.services
add column if not exists description text,
add column if not exists checklist_items text;

update public.services
set description = short_description
where description is null
  and short_description is not null;
