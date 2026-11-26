import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AdminDashboardClient } from "@/components/AdminDashboardClient";

export const metadata: Metadata = {
  title: "Admin Backend Dashboard | Mobile Genie Sri Lanka",
  description:
    "Manage Mobile Genie repair tickets, live job statuses, part tiers, and store reservations.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Mobile Genie Operations Portal
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Admin Backend Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Monitor live repair bookings, update ticket stages, review uploaded
            damage media, and manage store orders.
          </p>
        </div>

        <AdminDashboardClient />
      </main>

      <SiteFooter />
    </div>
  );
}
