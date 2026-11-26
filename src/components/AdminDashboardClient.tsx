"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
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
} from "lucide-react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { formatLkr } from "@/data/catalog";

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
  const [activeTab, setActiveTab] = useState<"repairs" | "orders">("repairs");

  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
      ordersCount: orders.length,
    };
  }, [tickets, orders]);

  const handleUpdateTicketStatus = async (id: string, nextStatus: string) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "repair_bookings", id), { status: nextStatus });
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
    } catch (err) {
      setFirestoreError(
        err instanceof Error ? err.message : "Failed to update order status."
      );
    } finally {
      setUpdatingId(null);
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
            ) to manage repair tickets and store orders.
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
            Ready for Pickup
          </span>
          <p className="mt-1 text-3xl font-extrabold text-emerald-600">
            {stats.readyCount}
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

      {firestoreError && (
        <div className="flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div>
            <p className="font-bold">Firestore Notice: {firestoreError}</p>
            <p className="mt-0.5">
              Make sure you have published the updated{" "}
              <code>firestore.rules</code> in your Firebase Console so admin
              accounts can list and update all tickets.
            </p>
          </div>
        </div>
      )}

      {/* Tabs + Filters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center">
          <div className="flex gap-2">
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

        {loadingData ? (
          <div className="flex items-center justify-center py-12 text-sm text-slate-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#E31E24]" />
            Loading live Firestore records...
          </div>
        ) : activeTab === "repairs" ? (
          filteredTickets.length === 0 ? (
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
                      <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-[#E31E24] border border-slate-200">
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
          )
        ) : orders.length === 0 ? (
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
        )}
      </div>
    </div>
  );
}
