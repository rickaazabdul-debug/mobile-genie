"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ShieldCheck,
  Wrench,
  Package,
  Search,
  Loader2,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Clock,
  LogIn,
  Lock,
  Plus,
  Trash2,
  Save,
  Cpu,
  DollarSign,
  Upload,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import {
  PHONE_BRANDS,
  formatLkr,
  type ProductItem,
} from "@/data/catalog";
import {
  useLiveRepairServices,
  useLiveStoreProducts,
} from "@/lib/useLiveCatalog";

const ADMIN_EMAILS = new Set([
  "rickaazabdul@gmail.com",
  "acmrickaaz@gmail.com",
]);

const TICKET_STATUSES = [
  "Appointment Confirmed",
  "Diagnostics",
  "In Repair",
  "Quality Check",
  "Ready for Pickup",
  "Rescheduled",
  "Cancelled",
];

const ORDER_STATUSES = [
  "Reserved for In-Store Pickup",
  "Ready for Pickup",
  "Completed",
  "Cancelled",
];

interface AdminTicket {
  id: string;
  ticketCode?: string;
  customerName: string;
  email: string;
  phone?: string;
  brand: string;
  deviceModel: string;
  serviceType: string;
  partTier?: string;
  warranty?: string;
  serviceMode?: string;
  colomboZone?: string;
  pickupAddress?: string;
  preferredDate: string;
  timeSlot?: string;
  estimatedTotalLkr?: number;
  damageMediaUrl?: string | null;
  status: string;
}

interface AdminOrder {
  id: string;
  customerEmail?: string;
  customerName?: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
}

export function AdminDashboardClient() {
  const { user, loading: authLoading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "repairs" | "orders" | "parts" | "prices"
  >("repairs");

  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Live repair services & e-commerce parts
  const liveServices = useLiveRepairServices();
  const { customProducts } = useLiveStoreProducts();

  // New Phone Part / Product form state
  const [partName, setPartName] = useState("");
  const [partBrand, setPartBrand] = useState(PHONE_BRANDS[1].name); // Apple
  const [partCategory, setPartCategory] =
    useState<ProductItem["category"]>("Phone Parts");
  const [partCondition, setPartCondition] =
    useState<ProductItem["condition"]>("Genuine Part");
  const [partPrice, setPartPrice] = useState("");
  const [partOriginalPrice, setPartOriginalPrice] = useState("");
  const [partSpecs, setPartSpecs] = useState("");
  const [partImageUrl, setPartImageUrl] = useState<string | null>(null);
  const [uploadingPartImage, setUploadingPartImage] = useState(false);
  const [addingPart, setAddingPart] = useState(false);

  // Editable repair prices state
  const [priceEdits, setPriceEdits] = useState<
    Record<string, { startingPrice: string; turnaround: string; warranty: string }>
  >({});
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);

  const isAdmin = Boolean(
    user?.email && ADMIN_EMAILS.has(user.email.toLowerCase())
  );

  useEffect(() => {
    if (!isAdmin) return;

    const ticketsQ = query(
      collection(db, "repair_bookings"),
      orderBy("createdAt", "desc")
    );
    const ordersQ = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubTickets = onSnapshot(
      ticketsQ,
      (snap) => {
        setTickets(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<AdminTicket, "id">),
          }))
        );
        setLoadingData(false);
        setFirestoreError(null);
      },
      (err) => {
        setFirestoreError(err.message);
        setLoadingData(false);
      }
    );

    const unsubOrders = onSnapshot(
      ordersQ,
      (snap) => {
        setOrders(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<AdminOrder, "id">),
          }))
        );
      },
      () => {}
    );

    return () => {
      unsubTickets();
      unsubOrders();
    };
  }, [isAdmin]);

  const filteredTickets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tickets.filter((t) => {
      const matchesStatus =
        statusFilter === "All" || t.status === statusFilter;
      const matchesSearch =
        !q ||
        (t.ticketCode || "").toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.brand.toLowerCase().includes(q) ||
        t.deviceModel.toLowerCase().includes(q) ||
        (t.phone || "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [tickets, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const activeCount = tickets.filter(
      (t) => t.status !== "Ready for Pickup" && t.status !== "Cancelled"
    ).length;
    const readyCount = tickets.filter(
      (t) => t.status === "Ready for Pickup"
    ).length;
    const pipelineLkr = tickets
      .filter((t) => t.status !== "Cancelled")
      .reduce((sum, t) => sum + (t.estimatedTotalLkr || 0), 0);

    return {
      totalTickets: tickets.length,
      activeCount,
      readyCount,
      pipelineLkr,
      partsCount: customProducts.length,
    };
  }, [tickets, customProducts]);

  const flashNotice = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleUpdateTicketStatus = async (id: string, nextStatus: string) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "repair_bookings", id), { status: nextStatus });
      flashNotice(`Updated ticket status to "${nextStatus}".`);
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to update ticket status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateOrderStatus = async (id: string, nextStatus: string) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "orders", id), { status: nextStatus });
      flashNotice(`Updated order status to "${nextStatus}".`);
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePartImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFirestoreError(null);
    setUploadingPartImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload-product-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed.");
      setPartImageUrl(data.url);
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to upload item image."
      );
    } finally {
      setUploadingPartImage(false);
    }
  };

  const handleAddPart = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirestoreError(null);
    const numericPrice = Number(partPrice);
    if (!partName.trim() || !numericPrice || numericPrice <= 0) {
      setFirestoreError("Please enter a valid part name and LKR price.");
      return;
    }

    setAddingPart(true);
    try {
      const badgeColor =
        partCategory === "Phone Parts"
          ? "bg-red-50 text-[#E31E24] border-red-200"
          : partCategory === "Smartphones"
          ? "bg-sky-50 text-[#1D8FE1] border-sky-200"
          : "bg-amber-50 text-amber-700 border-amber-200";

      const newProduct: Record<string, unknown> = {
        name: partName.trim(),
        brand: partBrand,
        category: partCategory,
        condition: partCondition,
        price: numericPrice,
        specs: partSpecs.trim() || `${partBrand} • In Stock for Online Order`,
        rating: 4.9,
        badgeColor,
        inStock: true,
        createdAt: serverTimestamp(),
      };

      const orig = Number(partOriginalPrice);
      if (orig > numericPrice) {
        newProduct.originalPrice = orig;
      }
      if (partImageUrl) {
        newProduct.imageUrl = partImageUrl;
      }

      await addDoc(collection(db, "store_products"), newProduct);
      setPartName("");
      setPartPrice("");
      setPartOriginalPrice("");
      setPartSpecs("");
      setPartImageUrl(null);
      flashNotice("New phone part added to the live storefront!");
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to add phone part."
      );
    } finally {
      setAddingPart(false);
    }
  };

  const handleDeletePart = async (id: string) => {
    try {
      await deleteDoc(doc(db, "store_products", id));
      flashNotice("Part removed from storefront.");
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to remove part."
      );
    }
  };

  const handleSaveServicePrice = async (
    serviceId: string,
    fallbackPrice: number,
    fallbackTurnaround: string,
    fallbackWarranty: string
  ) => {
    const edited = priceEdits[serviceId];
    const nextPrice = Number(edited?.startingPrice ?? fallbackPrice);
    if (!nextPrice || nextPrice <= 0) {
      setFirestoreError("Please enter a valid LKR starting price.");
      return;
    }

    setSavingServiceId(serviceId);
    setFirestoreError(null);
    try {
      await setDoc(
        doc(db, "repair_services", serviceId),
        {
          startingPrice: nextPrice,
          turnaround: (edited?.turnaround ?? fallbackTurnaround).trim(),
          warranty: (edited?.warranty ?? fallbackWarranty).trim(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      flashNotice("Repair service price updated live!");
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to save repair price."
      );
    } finally {
      setSavingServiceId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white p-14 text-sm text-slate-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#E31E24]" />
        Checking admin session...
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#E31E24]">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
            Admin Sign In Required
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in with your authorized Mobile Genie admin account (
            <code className="font-mono text-xs font-bold">
              rickaazabdul@gmail.com
            </code>{" "}
            or{" "}
            <code className="font-mono text-xs font-bold">
              acmrickaaz@gmail.com
            </code>
            ) to manage repair tickets, phone parts, and repair prices.
          </p>
          <button
            onClick={() => setAuthOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
          >
            <LogIn className="h-4 w-4" />
            Sign In as Admin
          </button>
        </div>
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-10 w-10 text-[#E31E24]" />
        <h2 className="mt-3 text-xl font-extrabold text-slate-900">
          Access Restricted
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Signed in as <strong>{user.email}</strong>, which is not in the Mobile
          Genie admin list.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Total Repair Tickets
          </span>
          <p className="mt-1 text-3xl font-extrabold text-slate-900">
            {stats.totalTickets}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Active In-Progress
          </span>
          <p className="mt-1 text-3xl font-extrabold text-[#1D8FE1]">
            {stats.activeCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Custom Parts Listed
          </span>
          <p className="mt-1 text-3xl font-extrabold text-emerald-600">
            {stats.partsCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">
            Est. Repair Pipeline
          </span>
          <p className="mt-1 text-2xl font-extrabold text-[#E31E24]">
            {formatLkr(stats.pipelineLkr)}
          </p>
        </div>
      </div>

      {successNotice && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          {successNotice}
        </div>
      )}

      {firestoreError && (
        <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div>
            <p className="font-bold">Firestore Notice: {firestoreError}</p>
            <p className="mt-0.5">
              Make sure you have published the updated{" "}
              <code>firestore.rules</code> in your Firebase Console.
            </p>
          </div>
        </div>
      )}

      {/* Tabs + Content */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("repairs")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "repairs"
                  ? "bg-[#E31E24] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Wrench className="h-4 w-4" />
              Repair Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab("parts")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "parts"
                  ? "bg-[#E31E24] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Cpu className="h-4 w-4" />
              Add Phone Parts ({customProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("prices")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "prices"
                  ? "bg-[#1D8FE1] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <DollarSign className="h-4 w-4" />
              Repair Service Prices
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === "orders"
                  ? "bg-[#1D8FE1] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Package className="h-4 w-4" />
              Store Orders ({orders.length})
            </button>
          </div>

          {activeTab === "repairs" && (
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search REP-ID, phone, model..."
                  className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-[#E31E24] focus:bg-white focus:outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#E31E24] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                {TICKET_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: REPAIR TICKETS */}
        {activeTab === "repairs" &&
          (loadingData ? (
            <div className="flex items-center justify-center py-12 text-sm text-slate-500">
              <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#E31E24]" />
              Loading live Firestore records...
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No repair tickets match your current filter.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredTickets.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 lg:flex-row lg:items-center"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-[#E31E24]">
                        {t.ticketCode || t.id.slice(0, 8)}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {t.brand} {t.deviceModel}
                      </span>
                      <span className="text-xs font-semibold text-[#1D8FE1]">
                        • {t.serviceType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      <strong>{t.customerName}</strong> ({t.email}
                      {t.phone ? ` • ${t.phone}` : ""})
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#1D8FE1]" />
                        {t.preferredDate} {t.timeSlot ? `• ${t.timeSlot}` : ""}
                      </span>
                      {t.partTier && (
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <ShieldCheck className="h-3 w-3 text-emerald-600" />
                          {t.partTier}
                        </span>
                      )}
                      {t.serviceMode && (
                        <span>
                          {t.serviceMode} ({t.colomboZone || "Colombo"})
                        </span>
                      )}
                      {t.estimatedTotalLkr && (
                        <span className="font-bold text-slate-900">
                          {formatLkr(t.estimatedTotalLkr)}
                        </span>
                      )}
                      {t.damageMediaUrl && (
                        <a
                          href={t.damageMediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-[#1D8FE1] underline"
                        >
                          Damage Media <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <select
                      value={t.status}
                      disabled={updatingId === t.id}
                      onChange={(e) =>
                        handleUpdateTicketStatus(t.id, e.target.value)
                      }
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#E31E24] focus:outline-none disabled:opacity-60"
                    >
                      {TICKET_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {t.ticketCode && (
                      <Link
                        href={`/track?ticket=${encodeURIComponent(t.ticketCode)}`}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#1D8FE1] hover:bg-slate-100"
                      >
                        Track
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* TAB 2: ADD PHONE PARTS FOR E-COMMERCE */}
        {activeTab === "parts" && (
          <div className="mt-6 grid gap-8 lg:grid-cols-5">
            <form
              onSubmit={handleAddPart}
              className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 lg:col-span-2"
            >
              <h3 className="flex items-center gap-2 text-base font-extrabold text-slate-900">
                <Plus className="h-4 w-4 text-[#E31E24]" />
                Add New Phone Part / Product
              </h3>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Part / Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="e.g. iPhone 15 Pro OLED Display Assembly"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#E31E24] focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Brand
                  </label>
                  <select
                    value={partBrand}
                    onChange={(e) => setPartBrand(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#E31E24] focus:outline-none"
                  >
                    {PHONE_BRANDS.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                    <option value="Mobile Genie">Mobile Genie</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    value={partCategory}
                    onChange={(e) =>
                      setPartCategory(e.target.value as ProductItem["category"])
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#E31E24] focus:outline-none"
                  >
                    <option value="Phone Parts">Phone Parts</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Condition / Tier
                  </label>
                  <select
                    value={partCondition}
                    onChange={(e) =>
                      setPartCondition(
                        e.target.value as ProductItem["condition"]
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#E31E24] focus:outline-none"
                  >
                    <option value="Genuine Part">Genuine Part</option>
                    <option value="OEM Part">OEM Part</option>
                    <option value="New">New</option>
                    <option value="Certified Refurbished">
                      Certified Refurbished
                    </option>
                    <option value="Accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Price (LKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    value={partPrice}
                    onChange={(e) => setPartPrice(e.target.value)}
                    placeholder="28500"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#E31E24] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Old Price (Optional)
                  </label>
                  <input
                    type="number"
                    min={100}
                    value={partOriginalPrice}
                    onChange={(e) => setPartOriginalPrice(e.target.value)}
                    placeholder="34000"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#E31E24] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Specs / Compatibility
                </label>
                <input
                  type="text"
                  value={partSpecs}
                  onChange={(e) => setPartSpecs(e.target.value)}
                  placeholder="120Hz ProMotion • Original Pulled • 6-Mo Warranty"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#E31E24] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Item Image (Stored in Vercel Blob)
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 transition hover:border-[#1D8FE1] hover:text-[#1D8FE1]">
                    {uploadingPartImage ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        {partImageUrl ? "Change Image" : "Upload Image"}
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePartImageUpload}
                      className="hidden"
                    />
                  </label>
                  {partImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={partImageUrl}
                      alt="Uploaded part preview"
                      className="h-11 w-11 rounded-lg border border-slate-200 object-cover"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={addingPart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E31E24] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#c8181e] disabled:opacity-60"
              >
                {addingPart ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Publish Part to Online Store
              </button>
            </form>

            <div className="space-y-3 lg:col-span-3">
              <h3 className="text-base font-extrabold text-slate-900">
                Live Custom Parts &amp; Products ({customProducts.length})
              </h3>
              {customProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500">
                  No custom parts added yet. Use the form on the left to add
                  spare parts (screens, batteries, charging boards) so customers
                  can order them online.
                </div>
              ) : (
                customProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex items-center gap-3">
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover"
                        />
                      )}
                      <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-900">
                          {item.name}
                        </span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}
                        >
                          {item.condition}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.brand} • {item.category} • {item.specs}
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-[#E31E24]">
                        {formatLkr(item.price)}
                      </p>
                    </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePart(item.id)}
                      className="rounded-xl border border-red-200 bg-white p-2 text-[#E31E24] transition hover:bg-red-50"
                      title="Delete part"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EDIT REPAIR SERVICE PRICES */}
        {activeTab === "prices" && (
          <div className="mt-6 space-y-4">
            <p className="text-xs text-slate-600">
              Update any repair service starting price (LKR), turnaround time,
              or warranty below. Changes sync immediately to the homepage and
              4-step booking wizard.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {liveServices.map((svc) => {
                const edit = priceEdits[svc.id];
                const priceVal =
                  edit?.startingPrice ?? String(svc.startingPrice);
                const turnaroundVal = edit?.turnaround ?? svc.turnaround;
                const warrantyVal = edit?.warranty ?? svc.warranty;

                return (
                  <div
                    key={svc.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {svc.title}
                    </h4>
                    <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                          Price (LKR)
                        </label>
                        <input
                          type="number"
                          min={500}
                          value={priceVal}
                          onChange={(e) =>
                            setPriceEdits((prev) => ({
                              ...prev,
                              [svc.id]: {
                                startingPrice: e.target.value,
                                turnaround: turnaroundVal,
                                warranty: warrantyVal,
                              },
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                          Turnaround
                        </label>
                        <input
                          type="text"
                          value={turnaroundVal}
                          onChange={(e) =>
                            setPriceEdits((prev) => ({
                              ...prev,
                              [svc.id]: {
                                startingPrice: priceVal,
                                turnaround: e.target.value,
                                warranty: warrantyVal,
                              },
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                          Warranty
                        </label>
                        <input
                          type="text"
                          value={warrantyVal}
                          onChange={(e) =>
                            setPriceEdits((prev) => ({
                              ...prev,
                              [svc.id]: {
                                startingPrice: priceVal,
                                turnaround: turnaroundVal,
                                warranty: e.target.value,
                              },
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-[#1D8FE1] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        disabled={savingServiceId === svc.id}
                        onClick={() =>
                          handleSaveServicePrice(
                            svc.id,
                            svc.startingPrice,
                            svc.turnaround,
                            svc.warranty
                          )
                        }
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#1D8FE1] px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                      >
                        {savingServiceId === svc.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Save className="h-3.5 w-3.5" />
                        )}
                        Save Price
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: STORE ORDERS */}
        {activeTab === "orders" &&
          (orders.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No store orders placed yet.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      {o.items
                        ?.map((i) => `${i.quantity}× ${i.name}`)
                        .join(", ")}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-600">
                      Order #{o.id.slice(0, 8)} •{" "}
                      {o.customerEmail || o.customerName} •{" "}
                      <strong className="text-[#E31E24]">
                        {formatLkr(o.totalAmount)}
                      </strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <select
                      value={o.status}
                      disabled={updatingId === o.id}
                      onChange={(e) =>
                        handleUpdateOrderStatus(o.id, e.target.value)
                      }
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#1D8FE1] focus:outline-none disabled:opacity-60"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
