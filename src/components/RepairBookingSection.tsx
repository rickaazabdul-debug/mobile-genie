"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  AlertCircle,
  Search,
  Check,
  Smartphone,
  Wrench,
  CalendarClock,
  ShieldCheck,
  Truck,
  Store,
  Upload,
  BellRing,
  PackageCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  APPOINTMENT_TIME_SLOTS,
  COLOMBO_POSTAL_ZONES,
  PART_TIERS,
  PHONE_BRANDS,
  REPAIR_SERVICES,
  SERVICE_MODES,
  SLOT_STATUS,
  formatLkr,
  generateTicketCode,
  getPartsAvailability,
  type PartTierOption,
  type PhoneBrand,
  type ServiceModeId,
} from "@/data/catalog";

interface RepairBookingSectionProps {
  selectedServiceTitle: string;
  onServiceChange: (serviceTitle: string) => void;
}

const WIZARD_STEPS = [
  { step: 1, label: "Select Brand" },
  { step: 2, label: "Issue & Model" },
  { step: 3, label: "Part Tier & Warranty" },
  { step: 4, label: "Service Mode & Slot" },
] as const;

export function RepairBookingSection({
  selectedServiceTitle,
  onServiceChange,
}: RepairBookingSectionProps) {
  const router = useRouter();
  const { user } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<PhoneBrand>(PHONE_BRANDS[0]);
  const [deviceModel, setDeviceModel] = useState("");
  const [selectedTier, setSelectedTier] = useState<PartTierOption>(PART_TIERS[1]);
  const [serviceMode, setServiceMode] = useState<ServiceModeId>("walk-in");
  const [colomboZone, setColomboZone] = useState(COLOMBO_POSTAL_ZONES[3]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(APPOINTMENT_TIME_SLOTS[1]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [damageMediaUrl, setDamageMediaUrl] = useState<string | null>(null);
  const [damageMediaName, setDamageMediaName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
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
  const activeMode =
    SERVICE_MODES.find((m) => m.id === serviceMode) || SERVICE_MODES[0];

  const partsAvailability = getPartsAvailability(
    selectedBrand.id,
    selectedTier.id
  );

  const estimatedPartPrice =
    Math.round((activeService.startingPrice * selectedTier.multiplier) / 100) *
    100;
  const estimatedTotalLkr = estimatedPartPrice + activeMode.feeLkr;

  const goToStep = (step: 1 | 2 | 3 | 4) => {
    setCurrentStep(step);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectBrand = (brand: PhoneBrand) => {
    setSelectedBrand(brand);
    setDeviceModel("");
    goToStep(2);
  };

  const handleSelectIssue = (title: string) => {
    onServiceChange(title);
    goToStep(3);
  };

  const handleSelectTier = (tier: PartTierOption) => {
    setSelectedTier(tier);
    goToStep(4);
  };

  const handleDamageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-damage", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }
      setDamageMediaUrl(data.url);
      setDamageMediaName(data.filename);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Unable to upload file."
      );
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const finalModel = deviceModel.trim() || selectedBrand.popularModels[0];
    const finalDate = preferredDate || "Today / Next Available";
    const ticketCode = generateTicketCode();
    const zoneLabel =
      serviceMode === "walk-in" ? "Colombo 04 (Bambalapitiya Lab)" : colomboZone;

    const payload = {
      userId: user?.uid ?? null,
      ticketCode,
      customerName: resolvedName.trim(),
      email: resolvedEmail.trim(),
      phone: phone.trim(),
      brand: selectedBrand.name,
      deviceModel: finalModel,
      serviceType,
      partTier: selectedTier.name,
      warranty: selectedTier.warranty,
      serviceMode: activeMode.label,
      colomboZone: zoneLabel,
      pickupAddress:
        serviceMode === "walk-in" ? "Shop Drop-Off" : pickupAddress.trim(),
      preferredDate: finalDate,
      timeSlot,
      estimatedTotalLkr,
      damageMediaUrl,
      reminderEnabled,
      notes: notes.trim(),
      status: "Appointment Confirmed",
    };

    try {
      const docRef = await addDoc(collection(db, "repair_bookings"), {
        ...payload,
        createdAt: serverTimestamp(),
      });

      const confirmed = {
        docId: docRef.id,
        ticketCode,
        brand: selectedBrand.name,
        model: finalModel,
        issue: serviceType,
        partTier: selectedTier.name,
        warranty: selectedTier.warranty,
        serviceMode: activeMode.label,
        colomboZone: zoneLabel,
        pickupAddress: payload.pickupAddress,
        date: finalDate,
        slot: timeSlot,
        estimatedTotalLkr,
        damageMediaUrl,
        reminderEnabled,
        status: "Appointment Confirmed",
      };

      try {
        const existing = JSON.parse(
          localStorage.getItem("mobile_genie_tickets") || "[]"
        );
        localStorage.setItem(
          "mobile_genie_tickets",
          JSON.stringify([confirmed, ...existing].slice(0, 20))
        );
      } catch {
        // ignore storage quota errors
      }

      fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketCode,
          customerName: resolvedName.trim(),
          email: resolvedEmail.trim(),
          phone: phone.trim(),
          brand: selectedBrand.name,
          model: finalModel,
          issue: serviceType,
          partTier: selectedTier.name,
          warranty: selectedTier.warranty,
          serviceMode: activeMode.label,
          colomboZone: zoneLabel,
          date: finalDate,
          slot: timeSlot,
          estimatedTotalLkr,
          trackingUrl: `${window.location.origin}/track?ticket=${encodeURIComponent(
            ticketCode
          )}`,
        }),
      }).catch(() => {});

      router.push(`/receipt?ticket=${encodeURIComponent(ticketCode)}`);
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
      ref={sectionRef}
      id="book-repair"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
              <CalendarClock className="h-3.5 w-3.5" />
              4-Step Express Repair Appointment
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              Select Your Brand &amp; Book Repair
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Click each step below to choose your brand, repair issue, part
              tier &amp; warranty, and appointment slot.
            </p>
          </div>
          <Link
            href="/track"
            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs font-bold text-[#1D8FE1] transition hover:bg-sky-100"
          >
            <PackageCheck className="h-4 w-4" />
            Track Existing Ticket
          </Link>
        </div>

        {/* Clickable 4-Step Progress Bar */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {WIZARD_STEPS.map(({ step, label }) => {
            const isActive = currentStep === step;
            const isDone = currentStep > step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => goToStep(step)}
                className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left transition ${
                  isActive
                    ? "border-[#E31E24] bg-red-50/60 ring-2 ring-[#E31E24]/20"
                    : isDone
                    ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-[#E31E24] text-white"
                      : isDone
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : step}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-extrabold text-slate-900">
                    {label}
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    {step === 1 && selectedBrand.name}
                    {step === 2 && (deviceModel.trim() || activeService.shortLabel)}
                    {step === 3 && selectedTier.badge}
                    {step === 4 && `${timeSlot}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          {error && (
            <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-[#E31E24]">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: SELECT BRAND */}
          {currentStep === 1 && (
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
                          : "border-slate-200 bg-white hover:border-[#E31E24]/60 hover:shadow-md"
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

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c8181e]"
                >
                  Next: Issue &amp; {selectedBrand.name} Model
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ISSUE & MODEL */}
          {currentStep === 2 && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D8FE1] text-xs font-bold text-white">
                    2
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Issue, Part Tier &amp; {selectedBrand.name} Model
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${partsAvailability.badgeClass}`}
                >
                  <PackageCheck className="h-3.5 w-3.5" />
                  Parts: {partsAvailability.status}
                </span>
              </div>

              <p className="mt-1.5 text-xs text-slate-500">
                {partsAvailability.note}
              </p>

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
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder={`Type your ${selectedBrand.name} model (e.g. ${selectedBrand.popularModels[0]})`}
                  className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D8FE1] focus:outline-none"
                />
              </div>

              {/* Repair Issue Cards */}
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-600">
                Click a Repair Issue to Continue
              </p>
              <div className="mt-2.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {REPAIR_SERVICES.map((service) => {
                  const isSelected = serviceType === service.title;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleSelectIssue(service.title)}
                      className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[#E31E24] bg-red-50/40 ring-2 ring-[#E31E24]/20"
                          : "border-slate-200 bg-white hover:border-[#E31E24]/60 hover:shadow-sm"
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
                          From {formatLkr(service.startingPrice)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Brand
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1D8FE1] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Next: Choose Part Quality Tier &amp; Warranty
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE PART QUALITY TIER & WARRANTY */}
          {currentStep === 3 && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E31E24] text-xs font-bold text-white">
                    3
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Choose Part Quality Tier &amp; Warranty
                  </h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {selectedBrand.name} • {activeService.title}
                </span>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {PART_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  const tierPrice =
                    Math.round(
                      (activeService.startingPrice * tier.multiplier) / 100
                    ) * 100;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectTier(tier)}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition ${
                        isSelected
                          ? "border-[#E31E24] bg-red-50/30 ring-2 ring-[#E31E24]/20"
                          : "border-slate-200 bg-white hover:border-[#E31E24]/60 hover:shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {tier.name}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tier.badgeClass}`}
                          >
                            {tier.badge}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-600">
                          {tier.description}
                        </p>
                      </div>
                      <p className="mt-4 text-base font-extrabold text-slate-900">
                        Est. {formatLkr(tierPrice)}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Damage Photo / Clip Upload (Vercel Blob) */}
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <Upload className="h-4 w-4 text-[#1D8FE1]" />
                      Upload Photo or Short Clip of Damage (Optional)
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Share screen green lines, water exposure, or frame dents
                      so our technician prepares the exact part before you
                      arrive (max 15MB).
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-[#1D8FE1] hover:text-[#1D8FE1]">
                    {uploadingMedia ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        {damageMediaUrl ? "Replace Photo/Clip" : "Choose File"}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleDamageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {damageMediaUrl && (
                  <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Attached: {damageMediaName || "Damage media"}
                  </p>
                )}
                {uploadError && (
                  <p className="mt-2 text-xs font-medium text-[#E31E24]">
                    {uploadError}
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Issue &amp; Model
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(4)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#c8181e]"
                >
                  Next: Service Mode, Colombo Zone &amp; Time Slot
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SERVICE MODE, COLOMBO ZONE & TIME SLOT */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  4
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Service Mode, Colombo Zone &amp; Time Slot
                </h3>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {SERVICE_MODES.map((mode) => {
                  const isSelected = serviceMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setServiceMode(mode.id)}
                      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-[#1D8FE1] bg-sky-50/60 ring-2 ring-[#1D8FE1]/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      {mode.id === "walk-in" ? (
                        <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#E31E24]" />
                      ) : (
                        <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[#1D8FE1]" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {mode.label}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {mode.sublabel}
                        </p>
                        <p className="mt-1.5 text-xs font-extrabold text-[#E31E24]">
                          {mode.feeLkr === 0
                            ? "Free"
                            : `+ ${formatLkr(mode.feeLkr)}`}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {serviceMode !== "walk-in" && (
                <div className="mt-4 grid gap-4 rounded-2xl border border-sky-200 bg-sky-50/40 p-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-[#E31E24]" />
                      Colombo Postal Code / Suburb *
                    </label>
                    <select
                      value={colomboZone}
                      onChange={(e) => setColomboZone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                    >
                      {COLOMBO_POSTAL_ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Pickup / Visit Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={pickupAddress}
                      onChange={(e) => setPickupAddress(e.target.value)}
                      placeholder="No. 45, Galle Road, Colombo 04"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D8FE1] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="mt-5 grid gap-6 lg:grid-cols-5">
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
                        placeholder="Kasun Perera"
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
                        placeholder="kasun@example.lk"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="077 234 9870"
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
                      Smart Time Slot Availability
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {APPOINTMENT_TIME_SLOTS.map((slot) => {
                        const info = SLOT_STATUS[slot];
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTimeSlot(slot)}
                            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                              timeSlot === slot
                                ? "border-[#1D8FE1] bg-[#1D8FE1] text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            <span>{slot}</span>
                            {info?.urgent && timeSlot !== slot && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                                {info.label}
                              </span>
                            )}
                          </button>
                        );
                      })}
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
                      placeholder="Describe any extra symptoms (e.g. touch unresponsive, bent frame, green line)..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={reminderEnabled}
                      onChange={(e) => setReminderEnabled(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#E31E24] focus:ring-[#E31E24]"
                    />
                    <BellRing className="h-3.5 w-3.5 text-[#1D8FE1]" />
                    Send instant booking receipt &amp; 2-hour pre-slot reminder
                  </label>
                </div>

                {/* Live Summary Card */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E31E24]">
                      <Wrench className="h-4 w-4" />
                      Appointment Summary
                    </div>
                    <dl className="mt-4 space-y-2.5 border-t border-slate-200 pt-4 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Brand &amp; Model</dt>
                        <dd className="font-bold text-slate-900">
                          {selectedBrand.name} •{" "}
                          {deviceModel.trim() || selectedBrand.popularModels[0]}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-500">Repair Issue</dt>
                        <dd className="text-right font-bold text-[#E31E24]">
                          {activeService.title}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Part Tier</dt>
                        <dd className="font-semibold text-slate-900">
                          {selectedTier.name}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Warranty</dt>
                        <dd className="font-semibold text-emerald-700">
                          {selectedTier.badge}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Service Mode</dt>
                        <dd className="text-right font-semibold text-slate-900">
                          {activeMode.label}
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
                          Estimated Total
                        </dt>
                        <dd className="text-lg font-extrabold text-slate-900">
                          From {formatLkr(estimatedTotalLkr)}
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
                      Confirm &amp; Generate Ticket ID
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                      <Phone className="h-3 w-3 text-[#1D8FE1]" />
                      Need help? Call +94 11 234 9870
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Part Quality Tier &amp; Warranty
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
