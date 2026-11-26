import React, { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingReceiptClient } from "@/components/BookingReceiptClient";

export const metadata: Metadata = {
  title: "Booking Receipt Confirmed | Mobile Genie Sri Lanka",
  description:
    "Your Mobile Genie repair appointment receipt, unique REP-XXXX ticket ID, and self-serve reschedule link.",
  robots: { index: false, follow: false },
};

export default function BookingReceiptPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Loading your booking receipt...
            </div>
          }
        >
          <BookingReceiptClient />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
