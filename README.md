# Tera Losa Pharmacy

Production website foundation for Tera Losa Pharmacy. The app uses Next.js App
Router, TypeScript, Tailwind CSS, ESLint, and a Supabase backend foundation.

Current backend status:
- Supabase clients and schema files are prepared.
- Public refill and contact forms submit to Supabase.
- Refill prescription uploads go to the private `prescription-uploads` bucket.
- Admin routes are protected with Supabase Auth and `admin_profiles`.
- Admins can manage requests, messages, and structured website content.
- Email, fax, and upload workflows are not implemented yet.
- Prescription transfer functionality is not in the current app scope.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create `.env.local` with:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Important:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-safe.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it to client components
  or browser code.

## Supabase Setup

Run the schema in:

```text
supabase/schema.sql
```

Then run the CMS migration/seed:

```text
supabase/content-cms.sql
```

That SQL creates:
- `pharmacy_settings`
- `business_hours`
- `services`
- `refill_requests`
- `transfer_requests`
- `contact_messages`
- `request_files`
- `admin_profiles`

It also enables RLS, creates basic public insert policies for request forms,
prepares authenticated admin policies, and inserts placeholder seed data.

Transfer tables may exist in the database schema from earlier planning, but the
current app experience does not expose transfer pages, forms, or admin flows.
The SQL also deactivates any legacy `prescription-transfers` service row.

Storage setup notes are in:

```text
supabase/storage.md
```

Create a private bucket named `prescription-uploads` for JPG, JPEG, PNG, and PDF
prescription uploads. The bucket should not be public.

## Admin Setup

Create a Supabase Auth user for each pharmacy admin, then add a matching row in
`admin_profiles`. Approved roles are `owner` and `staff`.

Only authenticated users with an `admin_profiles` row can access `/admin` routes.
Signed-in Supabase users without an admin profile are signed out of the admin
flow and shown an unauthorized message.

```sql
insert into admin_profiles (user_id, full_name, role)
values ('AUTH_USER_ID_HERE', 'Admin Name', 'owner');
```

Admins can view and manage refill requests at `/admin/refills` and contact
messages at `/admin/messages`. Detail pages allow status changes, archiving, and
internal refill notes.

Refill attachment metadata is stored in `request_files`; the files themselves
stay private in the `prescription-uploads` storage bucket. Admin detail pages
generate short-lived signed URLs on the server after the admin profile check has
passed. The service-role key is only used in server-only utilities and is never
sent to browser code.

Status values expected by the current admin UI:
- refill requests: `new`, `in_review`, `waiting_for_patient`, `completed`,
  `archived`
- contact messages: `new`, `read`, `archived`

If your Supabase project was created before those status values were added,
update the `refill_status_check` and `contact_status_check` constraints before
using the new admin status actions.

## Admin Content Editing

Approved admins can manage structured content at `/admin/content`.

Editable content includes:
- homepage sections and announcement
- page copy for about, services, location, patient information, and privacy
- pharmacy settings used by the footer and location page
- business hours
- services, excluding prescription transfers
- conditions treated
- patient and regulatory document links

The CMS intentionally does not make form labels, validation messages, route
names, status names, upload rules, or internal admin navigation editable.

Public pages read editable content from Supabase using public RLS-safe reads and
fall back to local copy if a row is missing or a query fails. The affected public
areas include:
- homepage hero, sections, services, conditions, announcement, and patient
  information callout
- services page intro, active services, and conditions treated
- about, location, privacy, and patient information page copy
- footer contact information and hours

`/patient-info` redirects to `/patient-information`. The patient information page
groups active regulatory documents under:
- Licensing & Pharmacy Information
- Patient Concerns
- Privacy & Information Practices
- Professional Standards

RLS assumptions:
- public visitors can read active public CMS rows
- approved admins, identified by a matching `admin_profiles.user_id`, can manage
  CMS tables
- service-role access remains server-only for protected admin reads/writes

## Validation

```bash
npm run lint
npm run build
```
