# Tera Losa Pharmacy

Production website foundation for Tera Losa Pharmacy. The app uses Next.js App
Router, TypeScript, Tailwind CSS, ESLint, and a Supabase backend foundation.

Current backend status:
- Supabase clients and schema files are prepared.
- Public forms are UI-only and do not submit yet.
- Admin routes are placeholders.
- Authentication is not implemented yet.
- Email, fax, and upload workflows are not implemented yet.

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

That SQL creates:
- `pharmacy_settings`
- `business_hours`
- `services`
- `refill_requests`
- `transfer_requests`
- `contact_messages`
- `request_files`
- `admin_profiles`

It also enables RLS, creates basic public insert policies for future request
forms, prepares authenticated admin policies, and inserts placeholder seed data.

Storage setup notes are in:

```text
supabase/storage.md
```

Create a private bucket named `prescription-uploads` for future JPG, JPEG, PNG,
and PDF prescription uploads. The bucket should not be public.

## Validation

```bash
npm run lint
npm run build
```
