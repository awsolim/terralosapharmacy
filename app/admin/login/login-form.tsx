"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginStatus = "idle" | "loading" | "error" | "unauthorized";

const unauthorizedMessage =
  "This login is valid, but it is not approved for Terra Losa admin access. Please ask the pharmacy owner to add this user to admin profiles.";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setStatus("error");
      setMessage("The email or password did not match an admin account.");
      return;
    }

    const sessionResponse = await fetch("/admin/login/session", {
      body: JSON.stringify({
        accessToken: data.session.access_token,
        expiresIn: data.session.expires_in,
        refreshToken: data.session.refresh_token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (sessionResponse.status === 403) {
      await supabase.auth.signOut();
      setStatus("unauthorized");
      setMessage(unauthorizedMessage);
      return;
    }

    if (!sessionResponse.ok) {
      await supabase.auth.signOut();
      setStatus("error");
      setMessage("Admin login could not be completed. Please try again.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  const isLoading = status === "loading";
  const hasUnauthorizedReason = searchParams.get("reason") === "unauthorized";
  const displayStatus =
    status === "idle" && hasUnauthorizedReason ? "unauthorized" : status;
  const displayMessage =
    message ||
    (hasUnauthorizedReason ? "Please sign in with an approved admin account." : "");

  return (
    <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
      <Input
        autoComplete="email"
        disabled={isLoading}
        id="admin-email"
        label="Email"
        onChange={(event) => setEmail(event.target.value)}
        required
        type="email"
        value={email}
      />
      <Input
        autoComplete="current-password"
        disabled={isLoading}
        id="admin-password"
        label="Password"
        onChange={(event) => setPassword(event.target.value)}
        required
        type="password"
        value={password}
      />

      {displayMessage ? (
        <div
          className={
            displayStatus === "unauthorized"
              ? "rounded-[18px] border border-amber/35 bg-[#fff7df] px-4 py-3 text-sm font-semibold leading-6 text-[#76551a]"
              : "rounded-[18px] border border-[#e0aaa8] bg-[#fff3f2] px-4 py-3 text-sm font-semibold leading-6 text-[#9f3432]"
          }
          role="alert"
        >
          {displayMessage}
        </div>
      ) : null}

      <Button className="w-full" disabled={isLoading} size="lg" type="submit">
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
