"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import {
  BellRing,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  Printer,
  Wrench,
  AlertCircle,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { formatLkr } from "@/data/catalog";

interface ReceiptData {
  docId?: string;
  ticketCode: string;
  brand: string;
  model?: string;
  deviceModel?: string;
  issue?: string;
  serviceType?: string;
  partTier?: string;
  warranty?: string;
  serviceMode?: string;
  colomboZone?: string;
  pickupAddress?: string;
  date?: string;
  preferredDate?: string;
  slot?: string;
  timeSlot?: string;
  estimatedTotalLkr?: number;
  damageMediaUrl?: string | null;
  reminderEnabled?: boolean;
  status?: string;
}

export function BookingReceiptClient() {
  const searchParams = useSearchParams();
  const ticketCode = (searchParams.get("ticket") || "").trim().toUpperCase();

  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(Boolean(ticketCode));
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!ticketCode) return;
    let cancelled = false;

    async function loadReceipt() {
      // 1. Check localStorage first for instant display after redirect
      try {
        const cached: ReceiptData[] = JSON.parse(
          localStorage.getItem("mobile_genie_tickets") || "[]"
        );
        const localHit = cached.find(
          (t) => t.ticketCode.toUpperCase() === ticketCode
        );
        if (localHit && !cancelled) {
          setReceipt(localHit);
          setLoading(false);
          return;
        }
      } catch {
        // ignore
      }

      // 2. Fall back to Firestore lookup by ticketCode
      try {
        const q = query(
          collection(db, "repair_bookings"),
          where("ticketCode", "==", ticketCode),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty && !cancelled) {
          const d = snap.docs[0];
          setReceipt({
            docId: d.id,
            ...(d.data() as Omit<ReceiptData, "docId">),
          });
        }
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadReceipt();
    return () => {
      cancelled = true;
    };
  }, [ticketCode]);

  const handleCopyTrackingLink = () => {
    if (!receipt) return;
    const url = `${window.location.origin}/track?ticket=${encodeURIComponent(
      receipt.ticketCode
    )}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!ticketCode) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-10 w-10 text-[#E31E24]" />
        <h2 className="mt-3 text-xl font-extrabold text-slate-900">
          No Ticket ID Provided
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          Book a repair appointment or look up an existing ticket ID.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/#book-repair"
            className="rounded-xl bg-[#E31E24] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#c8181e]"
          >
            Book Repair
          </Link>
          <Link
            href="/track"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Track Ticket
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-sm text-slate-600 shadow-sm">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#E31E24]" />
        Loading your booking receipt...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-10 w-10 text-[#E31E24]" />
        <h2 className="mt-3 text-xl font-extrabold text-slate-900">
          Receipt Not Found for {ticketCode}
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">
          Try checking your ticket status on our live tracker page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href={`/track?ticket=${encodeURIComponent(ticketCode)}`}
            className="rounded-xl bg-[#1D8FE1] px-5 py-2.5 text-sm font-bold text-white"
          >
            Go to Ticket Tracker
          </Link>
          <Link
            href="/#book-repair"
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-800"
          >
            Book New Repair
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Instant Booking Receipt — Confirmed!
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-slate-600">
          Your unique repair job ID is ready. Use it anytime to track live
          progress, reschedule, or cancel.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <code className="rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-2.5 font-mono text-lg font-extrabold text-[#E31E24]">
            {receipt.ticketCode}
          </code>
          <button
            type="button"
            onClick={handleCopyTrackingLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            <Copy className="h-3.5 w-3.5 text-[#1D8FE1]" />
            {copiedLink ? "Link Copied!" : "Copy Reschedule / Track Link"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 print:hidden"
          >
            <Printer className="h-3.5 w-3.5 text-slate-600" />
            Print Receipt
          </button>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs sm:grid-cols-2 sm:text-sm">
        <div>
          <span className="text-slate-400">Brand &amp; Model</span>
          <p className="font-bold text-slate-900">
            {receipt.brand} — {receipt.model || receipt.deviceModel}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Repair Issue</span>
          <p className="font-bold text-[#E31E24]">
            {receipt.issue || receipt.serviceType}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Part Tier &amp; Warranty</span>
          <p className="font-bold text-slate-900">
            {receipt.partTier || "OEM Pulled / Soft-OLED"}
            {receipt.warranty ? ` (${receipt.warranty})` : ""}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Service Mode &amp; Zone</span>
          <p className="font-bold text-slate-900">
            {receipt.serviceMode || "Walk-In"} •{" "}
            {receipt.colomboZone || "Colombo 04"}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Date &amp; Time Slot</span>
          <p className="font-bold text-[#1D8FE1]">
            {receipt.date || receipt.preferredDate} •{" "}
            {receipt.slot || receipt.timeSlot}
          </p>
        </div>
        <div>
          <span className="text-slate-400">Estimated Total</span>
          <p className="text-base font-extrabold text-slate-900">
            From {formatLkr(receipt.estimatedTotalLkr || 14500)}
          </p>
        </div>
        {receipt.damageMediaUrl && (
          <div className="sm:col-span-2">
            <span className="text-slate-400">Attached Damage Media</span>
            <p className="mt-0.5">
              <a
                href={receipt.damageMediaUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#1D8FE1] underline"
              >
                View Uploaded Photo / Clip →
              </a>
            </p>
          </div>
        )}
      </div>

      {receipt.reminderEnabled !== false && (
        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">
          <BellRing className="h-4 w-4" />
          Automated reminder scheduled 2 hours before your{" "}
          {receipt.slot || receipt.timeSlot} slot.
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
        <Link
          href={`/track?ticket=${encodeURIComponent(receipt.ticketCode)}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1D8FE1] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
        >
          <ExternalLink className="h-4 w-4" />
          Track / Reschedule Ticket
        </Link>
        <Link
          href="/#book-repair"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
        >
          <Wrench className="h-4 w-4 text-[#E31E24]" />
          Book Another Repair
        </Link>
      </div>
    </div>
  );
}
