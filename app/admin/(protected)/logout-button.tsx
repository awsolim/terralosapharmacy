"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    await fetch("/admin/login/session", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Button
      disabled={isLoggingOut}
      onClick={handleLogout}
      size="sm"
      variant="outline"
    >
      {isLoggingOut ? "Signing out..." : "Logout"}
    </Button>
  );
}
