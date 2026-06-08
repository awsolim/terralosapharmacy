-- Make date of birth optional for public refill requests.
-- Run this once in the Supabase SQL editor. Do not rerun the full schema seed.

alter table public.refill_requests
alter column date_of_birth drop not null;
