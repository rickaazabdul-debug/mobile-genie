"use client";

import React, { useMemo, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
  Search,
  Check,
  Smartphone,
  Wrench,
  CalendarClock,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  APPOINTMENT_TIME_SLOTS,
  PHONE_BRANDS,
  REPAIR_SERVICES,
  type PhoneBrand,
} from "@/data/catalog";

interface RepairBookingSectionProps {
  selectedServiceTitle: string;
  onServiceChange: (serviceTitle: string) => void;
}

export function RepairBookingSection({
  selectedServiceTitle,
  onServiceChange,
}: RepairBookingSectionProps) {
  const { user } = useAuth();
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<PhoneBrand>(PHONE_BRANDS[0]);
  const [deviceModel, setDeviceModel] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(APPOINTMENT_TIME_SLOTS[1]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<{
    id: string;
    brand: string;
    model: string;
    issue: string;
    date: string;
    slot: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resolvedName = customerName ?? user?.displayName ?? "";
  const resolvedEmail = email ?? user?.email ?? "";
  const serviceType = selectedServiceTitle || REPAIR_SERVICES[0].title;

  const filteredBrands = useMemo(() => {
    const q = brandSearch.trim().toLowerCase();
    if (!q) return PHONE_BRANDS;
    return PHONE_BRANDS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.popularModels.some((m) => m.toLowerCase().includes(q))
    );
  }, [brandSearch]);

  const activeService =
    REPAIR_SERVICES.find((s) => s.title === serviceType) || REPAIR_SERVICES[0];

  const handleSelectBrand = (brand: PhoneBrand) => {
    setSelectedBrand(brand);
    setDeviceModel("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const finalModel = deviceModel.trim() || selectedBrand.popularModels[0];
    const finalDate = preferredDate || "Today / Walk-in";

    try {
      const docRef = await addDoc(collection(db, "repair_bookings"), {
        userId: user?.uid ?? null,
        customerName: resolvedName.trim(),
        email: resolvedEmail.trim(),
        phone: phone.trim(),
        brand: selectedBrand.name,
        deviceModel: finalModel,
        serviceType,
        preferredDate: finalDate,
        timeSlot,
        notes: notes.trim(),
        status: "Appointment Confirmed",
        createdAt: serverTimestamp(),
      });
      setTicketInfo({
        id: docRef.id,
        brand: selectedBrand.name,
        model: finalModel,
        issue: serviceType,
        date: finalDate,
        slot: timeSlot,
      });
      setDeviceModel("");
      setNotes("");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to submit appointment. Please check Firestore configuration.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="book-repair"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
              <CalendarClock className="h-3.5 w-3.5" />
              3-Step Express Repair Appointment
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              Select Your Brand &amp; Book Repair
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Time Matters — Fix it fast, Fix it Right! Choose your phone brand,
              pick the issue, and reserve your slot.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-sky-50 px-3 py-2 text-[#1D8FE1]">
              <Clock className="h-3.5 w-3.5" />
              30-Min Express Service
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-[#E31E24]" />
              Walk-ins &amp; Appointments
            </span>
          </div>
        </div>

        {ticketInfo ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
              Mobile Repair Appointment Confirmed!
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              We&apos;ve reserved your repair slot. Show this ticket ID at the
              Mobile Genie counter.
            </p>
            <code className="mt-3 rounded-lg border border-emerald-200 bg-white px-4 py-1.5 font-mono text-sm font-bold text-emerald-700">
              {ticketInfo.id}
            </code>

            <div className="mt-6 grid w-full max-w-xl gap-3 rounded-xl border border-emerald-200 bg-white p-4 text-left text-xs sm:grid-cols-2">
              <div>
                <span className="text-slate-400">Brand &amp; Model</span>
                <p className="font-bold text-slate-900">
                  {ticketInfo.brand} — {ticketInfo.model}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Repair Issue</span>
                <p className="font-bold text-[#E31E24]">{ticketInfo.issue}</p>
              </div>
              <div>
                <span className="text-slate-400">Appointment Date</span>
                <p className="font-bold text-slate-900">{ticketInfo.date}</p>
              </div>
              <div>
                <span className="text-slate-400">Time Slot</span>
                <p className="font-bold text-[#1D8FE1]">{ticketInfo.slot}</p>
              </div>
            </div>

            <button
              onClick={() => setTicketInfo(null)}
              className="mt-6 rounded-xl bg-[#E31E24] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c8181e]"
            >
              Book Another Repair
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-10">
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-[#E31E24]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: SELECT BRAND */}
            <div>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E31E24] text-xs font-bold text-white">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Select Your Phone Brand
                  </h3>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    {selectedBrand.name}
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brand (Samsung, Apple...)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
                {filteredBrands.map((brand) => {
                  const isSelected = selectedBrand.id === brand.id;
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => handleSelectBrand(brand)}
                      className={`group relative flex h-20 flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                        isSelected
                          ? "border-[#E31E24] bg-red-50/40 ring-2 ring-[#E31E24]/25 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#E31E24] text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                      <span className={`text-base sm:text-lg ${brand.textStyle}`}>
                        {brand.displayText}
                      </span>
                      <span className="mt-1 text-[10px] font-medium text-slate-400">
                        {brand.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SELECT REPAIR ISSUE & MODEL */}
            <div className="border-t border-slate-200 pt-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D8FE1] text-xs font-bold text-white">
                  2
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Select Repair Issue &amp; {selectedBrand.name} Model
                </h3>
              </div>

              {/* Popular models quick-pick */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <Smartphone className="h-4 w-4 text-[#1D8FE1]" />
                    {selectedBrand.name} Model *
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBrand.popularModels.map((model) => (
                      <button
                        key={model}
                        type="button"
                        onClick={() => setDeviceModel(model)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                          deviceModel === model
                            ? "border-[#1D8FE1] bg-[#1D8FE1] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-[#1D8FE1]"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder={`Type your ${selectedBrand.name} model (e.g. ${selectedBrand.popularModels[0]})`}
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D8FE1] focus:outline-none"
                />
              </div>

              {/* Repair Issue Cards */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {REPAIR_SERVICES.map((service) => {
                  const isSelected = serviceType === service.title;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => onServiceChange(service.title)}
                      className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#E31E24] bg-red-50/40 ring-2 ring-[#E31E24]/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {service.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {service.turnaround} • {service.warranty}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-900">
                          From ${service.startingPrice}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: APPOINTMENT DATE, TIME & DETAILS */}
            <div className="border-t border-slate-200 pt-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Choose Appointment Date &amp; Time Slot
                </h3>
              </div>

              <div className="mt-4 grid gap-6 lg:grid-cols-5">
                <div className="space-y-4 lg:col-span-3">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={resolvedName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={resolvedEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 234-9870"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Appointment Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-slate-700">
                      Preferred Time Slot
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {APPOINTMENT_TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                            timeSlot === slot
                              ? "border-[#1D8FE1] bg-[#1D8FE1] text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Additional Issue Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe any extra symptoms (e.g. touch unresponsive, bent frame, won't power on)..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live Summary Card */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E31E24]">
                      <Wrench className="h-4 w-4" />
                      Appointment Summary
                    </div>
                    <dl className="mt-4 space-y-3 border-t border-slate-200 pt-4 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Brand</dt>
                        <dd className="font-bold text-slate-900">
                          {selectedBrand.name}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Model</dt>
                        <dd className="font-semibold text-slate-900">
                          {deviceModel.trim() || "Not entered yet"}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-500">Repair Issue</dt>
                        <dd className="text-right font-bold text-[#E31E24]">
                          {activeService.title}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Est. Time</dt>
                        <dd className="font-semibold text-slate-900">
                          {activeService.turnaround}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Date &amp; Slot</dt>
                        <dd className="font-semibold text-[#1D8FE1]">
                          {preferredDate || "Today"} • {timeSlot}
                        </dd>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-3">
                        <dt className="font-semibold text-slate-700">
                          Starting Estimate
                        </dt>
                        <dd className="text-lg font-extrabold text-slate-900">
                          From ${activeService.startingPrice}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E31E24] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition hover:bg-[#c8181e] disabled:opacity-60"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                      Confirm Repair Appointment
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                      <Phone className="h-3 w-3 text-[#1D8FE1]" />
                      Need help? Call (555) 234-9870
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
