"use client";

import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { DEVICE_BRANDS, REPAIR_SERVICES } from "@/data/catalog";

interface RepairBookingSectionProps {
  selectedServiceTitle: string;
  onServiceChange: (serviceTitle: string) => void;
}

export function RepairBookingSection({
  selectedServiceTitle,
  onServiceChange,
}: RepairBookingSectionProps) {
  const { user } = useAuth();
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState(DEVICE_BRANDS[0]);
  const [deviceModel, setDeviceModel] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resolvedName = customerName ?? user?.displayName ?? "";
  const resolvedEmail = email ?? user?.email ?? "";
  const serviceType = selectedServiceTitle || REPAIR_SERVICES[0].title;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, "repair_bookings"), {
        userId: user?.uid ?? null,
        customerName: resolvedName.trim(),
        email: resolvedEmail.trim(),
        phone: phone.trim(),
        brand,
        deviceModel: deviceModel.trim(),
        serviceType,
        preferredDate: preferredDate || "Walk-in / ASAP",
        notes: notes.trim(),
        status: "Pending Diagnostics",
        createdAt: serverTimestamp(),
      });
      setTicketId(docRef.id);
      setDeviceModel("");
      setNotes("");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to submit booking. Please check Firestore configuration.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="book-repair"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="grid gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 p-6 sm:p-10 lg:grid-cols-5">
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Calendar className="h-3.5 w-3.5" />
              Same-Day Express Booking
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              Book Your Repair in 60 Seconds
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Reserve your repair slot online and skip the queue. Every repair
              includes a free 32-point diagnostic check and genuine OEM-grade
              parts backed by our Mobile Genie warranty.
            </p>
          </div>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>Mon–Sat: 9:00 AM – 8:00 PM • Sun: 11:00 AM – 6:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-indigo-400" />
              <span>420 Tech Plaza, Suite 102 • Walk-ins Welcome</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>(555) 234-9870 • support@mobilegenie.shop</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {ticketId ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
              <h3 className="mt-4 text-2xl font-bold text-white">
                Repair Ticket Confirmed!
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Your booking has been saved to Firestore. Ticket ID:
              </p>
              <code className="mt-2 rounded-lg bg-slate-950 px-4 py-1.5 font-mono text-sm text-emerald-300">
                {ticketId}
              </code>
              <button
                onClick={() => setTicketId(null)}
                className="mt-6 rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Book Another Repair
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6"
            >
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={resolvedName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Jordan Taylor"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={resolvedEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 019-2834"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Device Brand *
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {DEVICE_BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">
                    Device Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro, S24 Ultra"
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Repair Service Needed *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => onServiceChange(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  {REPAIR_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} (From ${s.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">
                  Issue Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe the issue (e.g., cracked glass, touch unresponsive, battery draining fast)..."
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm Repair Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
