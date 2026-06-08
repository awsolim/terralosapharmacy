import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { AdminLoginForm } from "@/app/admin/login/login-form";
import { buttonStyles } from "@/components/ui/button";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-primary lg:block">
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            sizes="52vw"
            src="/images/storefrontweb.png"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,75,63,0.84),rgba(14,106,120,0.54),rgba(115,191,67,0.22))]" />
          <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
            <div className="max-w-xl text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/78">
                Terra Losa Pharmacy
              </p>
              <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight xl:text-6xl">
                Secure staff access.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/82">
                Sign in to access the protected pharmacy admin workspace.
              </p>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center px-5 py-10 sm:px-6 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              className="inline-flex items-center gap-3 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-ring"
              href="/"
            >
              <span className="relative flex size-12 overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-border">
                <Image
                  alt=""
                  className="object-contain p-1.5"
                  fill
                  sizes="48px"
                  src="/images/logo.jpg"
                />
              </span>
              <span className="font-serif text-2xl font-semibold text-foreground">
                Terra Losa Pharmacy
              </span>
            </Link>

            <div className="mt-10 rounded-[30px] border border-white/75 bg-surface/90 p-6 shadow-[var(--shadow-soft)] ring-1 ring-border/45 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-awning">
                Admin login
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground">
                Welcome back.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Use an approved staff account to continue.
              </p>
              <Suspense>
                <AdminLoginForm />
              </Suspense>
            </div>

            <Link
              className={buttonStyles({
                variant: "ghost",
                size: "sm",
                className: "mt-5",
              })}
              href="/"
            >
              Back to public site
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
