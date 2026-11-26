"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  Search,
  CheckCircle2,
  Clock,
  CalendarClock,
  XCircle,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { APPOINTMENT_TIME_SLOTS, formatLkr } from "@/data/catalog";

interface TrackedTicket {
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
  date?: string;
  preferredDate?: string;
  slot?: string;
  timeSlot?: string;
  estimatedTotalLkr?: number;
  damageMediaUrl?: string | null;
  status: string;
}

const REPAIR_STAGES = [
  "Appointment Confirmed",
  "Diagnostics",
  "In Repair",
  "Quality Check",
  "Ready for Pickup",
];

export function TicketTrackerClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("ticket") || "";

  const [ticketInput, setTicketInput] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<TrackedTicket | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState(
    APPOINTMENT_TIME_SLOTS[2]
  );
  const [updating, setUpdating] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const lookupTicket = useCallback(async (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setError(null);
    setActionMessage(null);
    setTicket(null);

    try {
      // 1. Check Firestore by ticketCode
      const q = query(
        collection(db, "repair_bookings"),
        where("ticketCode", "==", code),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0];
        const data = d.data() as Omit<TrackedTicket, "docId">;
        setTicket({ docId: d.id, ...data });
        setLoading(false);
        return;
      }
    } catch {
      // Fall back to local cache if Firestore rules or network block unauthenticated query
    }

    // 2. Fallback to localStorage cache
    try {
      const cached: TrackedTicket[] = JSON.parse(
        localStorage.getItem("mobile_genie_tickets") || "[]"
      );
      const found = cached.find(
        (t) => t.ticketCode.toUpperCase() === code
      );
      if (found) {
        setTicket(found);
        setLoading(false);
        return;
      }
    } catch {
      // ignore
    }

    setError(`No repair ticket found for "${code}". Please check your REP-XXXX ID.`);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!initialQuery) return;
    const timer = setTimeout(() => {
      void lookupTicket(initialQuery);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialQuery, lookupTicket]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    lookupTicket(ticketInput);
  };

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;
    setUpdating(true);
    setActionMessage(null);
    const nextDate = rescheduleDate || ticket.preferredDate || ticket.date || "Next Available";

    try {
      if (ticket.docId) {
        await updateDoc(doc(db, "repair_bookings", ticket.docId), {
          preferredDate: nextDate,
          timeSlot: rescheduleSlot,
          status: "Rescheduled",
          rescheduledAt: serverTimestamp(),
        });
      }
    } catch {
      // Update local state & cache even if Firestore update rules are not yet deployed
    }

    const updated: TrackedTicket = {
      ...ticket,
      preferredDate: nextDate,
      date: nextDate,
      timeSlot: rescheduleSlot,
      slot: rescheduleSlot,
      status: "Rescheduled",
    };
    setTicket(updated);
    syncLocalCache(updated);
    setActionMessage(
      `Appointment rescheduled to ${nextDate} at ${rescheduleSlot}.`
    );
    setUpdating(false);
  };

  const handleCancel = async () => {
    if (!ticket) return;
    setUpdating(true);
    setActionMessage(null);

    try {
      if (ticket.docId) {
        await updateDoc(doc(db, "repair_bookings", ticket.docId), {
          status: "Cancelled",
          rescheduledAt: serverTimestamp(),
        });
      }
    } catch {
      // fallback
    }

    const updated: TrackedTicket = { ...ticket, status: "Cancelled" };
    setTicket(updated);
    syncLocalCache(updated);
    setActionMessage("Your repair appointment has been cancelled.");
    setUpdating(false);
  };

  function syncLocalCache(updated: TrackedTicket) {
    try {
      const cached: TrackedTicket[] = JSON.parse(
        localStorage.getItem("mobile_genie_tickets") || "[]"
      );
      const next = cached.map((t) =>
        t.ticketCode === updated.ticketCode ? updated : t
      );
      localStorage.setItem("mobile_genie_tickets", JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  const activeStageIndex = ticket
    ? Math.max(
        0,
        REPAIR_STAGES.findIndex((s) =>
          ticket.status.toLowerCase().includes(s.toLowerCase())
        )
      )
    : 0;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              placeholder="Enter your Ticket ID (e.g. REP-1042)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 font-mono text-sm font-bold uppercase text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:normal-case placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e] disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Check Live Status
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-[#E31E24]">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {ticket && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
            <div>
              <span className="font-mono text-xs font-bold text-[#1D8FE1]">
                TICKET {ticket.ticketCode}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                {ticket.brand} {ticket.deviceModel || ticket.model}
              </h2>
              <p className="text-sm font-semibold text-[#E31E24]">
                {ticket.serviceType || ticket.issue}
              </p>
            </div>
            <span
              className={`rounded-full border px-4 py-1.5 text-xs font-extrabold ${
                ticket.status === "Cancelled"
                  ? "border-red-200 bg-red-50 text-[#E31E24]"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          {/* 5-Stage Live Progress */}
          {ticket.status !== "Cancelled" && (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {REPAIR_STAGES.map((stage, idx) => {
                const done = idx <= activeStageIndex;
                return (
                  <div
                    key={stage}
                    className={`rounded-xl border p-3 text-center text-xs font-bold ${
                      done
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    <CheckCircle2
                      className={`mx-auto mb-1 h-4 w-4 ${
                        done ? "text-emerald-600" : "text-slate-300"
                      }`}
                    />
                    {stage}
                  </div>
                );
              })}
            </div>
          )}

          {/* Ticket Details */}
          <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs sm:grid-cols-3">
            <div>
              <span className="text-slate-400">Part Tier &amp; Warranty</span>
              <p className="mt-1 flex items-center gap-1 font-bold text-slate-900">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1D8FE1]" />
                {ticket.partTier || "OEM Pulled / Soft-OLED"}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Service Mode &amp; Zone</span>
              <p className="mt-1 font-bold text-slate-900">
                {ticket.serviceMode || "Walk-In"} •{" "}
                {ticket.colomboZone || "Colombo 04"}
              </p>
            </div>
            <div>
              <span className="text-slate-400">Scheduled Date &amp; Slot</span>
              <p className="mt-1 flex items-center gap-1 font-bold text-[#1D8FE1]">
                <Clock className="h-3.5 w-3.5" />
                {ticket.preferredDate || ticket.date} •{" "}
                {ticket.timeSlot || ticket.slot}
              </p>
            </div>
            {ticket.estimatedTotalLkr && (
              <div>
                <span className="text-slate-400">Estimated Total</span>
                <p className="mt-1 text-sm font-extrabold text-slate-900">
                  From {formatLkr(ticket.estimatedTotalLkr)}
                </p>
              </div>
            )}
            {ticket.damageMediaUrl && (
              <div>
                <span className="text-slate-400">Uploaded Damage Photo/Clip</span>
                <p className="mt-1">
                  <a
                    href={ticket.damageMediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#1D8FE1] underline"
                  >
                    View Uploaded Media →
                  </a>
                </p>
              </div>
            )}
          </div>

          {actionMessage && (
            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-700">
              {actionMessage}
            </div>
          )}

          {/* Self-Serve Reschedule / Cancel */}
          {ticket.status !== "Cancelled" && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <CalendarClock className="h-4 w-4 text-[#E31E24]" />
                Self-Serve Reschedule or Cancel Appointment
              </h3>
              <form
                onSubmit={handleReschedule}
                className="mt-4 grid gap-3 sm:grid-cols-3"
              >
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                />
                <select
                  value={rescheduleSlot}
                  onChange={(e) => setRescheduleSlot(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                >
                  {APPOINTMENT_TIME_SLOTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 rounded-xl bg-[#1D8FE1] px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    disabled={updating}
                    onClick={handleCancel}
                    className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-bold text-[#E31E24] transition hover:bg-red-100 disabled:opacity-60"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div>
        <Link
          href="/#book-repair"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D8FE1] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Express Repair Booking
        </Link>
      </div>
    </div>
  );
}
