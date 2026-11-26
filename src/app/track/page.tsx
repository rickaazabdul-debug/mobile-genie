import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TicketTrackerClient } from "@/components/TicketTrackerClient";

export const metadata: Metadata = {
  title: "Track Repair Ticket & Reschedule Appointment | Mobile Genie Sri Lanka",
  description:
    "Check live repair status using your REP-XXXX ticket ID, view part warranty details, or reschedule/cancel your Mobile Genie appointment in Colombo.",
  alternates: { canonical: "/track" },
};

export default function TrackTicketPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <Wrench className="h-3.5 w-3.5" />
            Live Repair Status Tracker
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Track Your Repair Ticket or Reschedule
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your unique <code className="font-mono font-bold text-[#E31E24]">REP-XXXX</code>{" "}
            job ID from your instant booking receipt to check live repair
            progress or update your appointment slot.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
              Loading ticket tracker...
            </div>
          }
        >
          <TicketTrackerClient />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
