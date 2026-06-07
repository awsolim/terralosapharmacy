import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://terralosapharmacy.ca"),
  title: {
    default: "Tera Losa Pharmacy",
    template: "%s | Tera Losa Pharmacy",
  },
  description:
    "A calm, local pharmacy experience for prescriptions, refills, transfers, and patient care in Tera Losa.",
  applicationName: "Tera Losa Pharmacy",
  openGraph: {
    title: "Tera Losa Pharmacy",
    description:
      "Local pharmacy care for prescriptions, refills, transfers, and everyday health needs.",
    siteName: "Tera Losa Pharmacy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
