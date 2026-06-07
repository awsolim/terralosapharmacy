# Supabase Storage Notes

Create a private storage bucket for future prescription upload files.

Bucket:
- Name: `prescription-uploads`
- Public bucket: No
- Suggested max file size: 10 MB to 15 MB
- Accepted file types: JPG, JPEG, PNG, PDF

This project does not implement real upload logic yet. When uploads are added,
the app should validate file type and size before requesting an upload.

Suggested dashboard setup:
1. Open Supabase Dashboard.
2. Go to Storage.
3. Create a new bucket named `prescription-uploads`.
4. Keep the bucket private.
5. Add file size and MIME type restrictions if your Supabase project exposes
   those controls.

Storage policy notes:
- Public users should not be able to list or read uploaded prescription files.
- Future upload flows should use a server-side route or controlled signed upload
  flow.
- Admin dashboard access should be limited to authenticated admin users.
- Avoid making this bucket public.
