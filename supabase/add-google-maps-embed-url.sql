-- Add an editable Google Maps embed URL for the location page.
-- Run this once in the Supabase SQL editor. Do not rerun the full schema seed.

alter table public.pharmacy_settings
add column if not exists google_maps_embed_url text;
