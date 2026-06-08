import { NextResponse } from "next/server";
import { adminAccessCookieName, adminRefreshCookieName } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type AdminSessionRequest = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
};

function clearAdminCookies(response: NextResponse) {
  response.cookies.set(adminAccessCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(adminRefreshCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as AdminSessionRequest;

  if (!body.accessToken || !body.refreshToken) {
    return NextResponse.json({ message: "Missing session." }, { status: 400 });
  }

  const authClient = createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(body.accessToken);

  if (userError || !user) {
    return NextResponse.json({ message: "Invalid login." }, { status: 401 });
  }

  const adminClient = createAdminSupabaseClient();
  const { data: profile, error: profileError } = await adminClient
    .from("admin_profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) {
    return NextResponse.json(
      { message: "Admin profile check failed." },
      { status: 500 },
    );
  }

  if (!profile) {
    const response = NextResponse.json(
      { message: "This account is not approved for admin access." },
      { status: 403 },
    );
    clearAdminCookies(response);
    return response;
  }

  const response = NextResponse.json({ ok: true });
  const maxAge = Math.max(60, body.expiresIn ?? 60 * 60);

  response.cookies.set(adminAccessCookieName, body.accessToken, {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(adminRefreshCookieName, body.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  clearAdminCookies(response);
  return response;
}
