import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminProfile } from "@/types/database";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const adminAccessCookieName = "tlp-admin-access-token";
export const adminRefreshCookieName = "tlp-admin-refresh-token";

export type AdminSession = {
  email: string;
  profile: AdminProfile;
  userId: string;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(adminAccessCookieName)?.value;

  if (!accessToken) {
    return null;
  }

  const authClient = createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) {
    return null;
  }

  const adminClient = createAdminSupabaseClient();
  const { data: profile, error: profileError } = await adminClient
    .from("admin_profiles")
    .select("id, user_id, full_name, role, created_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return null;
  }

  return {
    email: user.email ?? "Signed-in admin",
    profile: profile as AdminProfile,
    userId: user.id,
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?reason=unauthorized");
  }

  return session;
}
