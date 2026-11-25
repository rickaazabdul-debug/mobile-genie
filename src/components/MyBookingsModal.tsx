"use client";

import React, { useEffect, useState } from "react";
import { X, Wrench, Package, Loader2, ClipboardList } from "lucide-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

interface RepairTicket {
  id: string;
  deviceModel: string;
  serviceType: string;
  preferredDate: string;
  status: string;
}

interface StoreOrder {
  id: string;
  totalAmount: number;
  status: string;
  items: { name: string; quantity: number }[];
}

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyBookingsModal({ isOpen, onClose }: MyBookingsModalProps) {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<RepairTicket[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loadedUid, setLoadedUid] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !user) return;

    const ticketsQuery = query(
      collection(db, "repair_bookings"),
      where("userId", "==", user.uid)
    );
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsubTickets = onSnapshot(
      ticketsQuery,
      (snap) => {
        setTickets(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<RepairTicket, "id">),
          }))
        );
        setLoadedUid(user.uid);
      },
      () => setLoadedUid(user.uid)
    );

    const unsubOrders = onSnapshot(
      ordersQuery,
      (snap) => {
        setOrders(
          snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<StoreOrder, "id">),
          }))
        );
      },
      () => {}
    );

    return () => {
      unsubTickets();
      unsubOrders();
    };
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const loading = loadedUid !== user.uid;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <ClipboardList className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">My Repair Tickets &amp; Orders</h2>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Live synced with Firebase Firestore for {user.email}
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading your records...
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Wrench className="h-4 w-4 text-indigo-400" />
                Repair Bookings ({tickets.length})
              </h3>
              {tickets.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-500">
                  No repair bookings yet. Use the booking form below to schedule one.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {tickets.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-3.5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t.deviceModel} — {t.serviceType}
                        </p>
                        <p className="text-xs text-slate-400">
                          Ticket #{t.id.slice(0, 8)} • Preferred: {t.preferredDate}
                        </p>
                      </div>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                <Package className="h-4 w-4 text-emerald-400" />
                Store Reservations ({orders.length})
              </h3>
              {orders.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-slate-950/60 p-4 text-xs text-slate-500">
                  No store orders placed yet.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-3.5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {o.items?.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                        </p>
                        <p className="text-xs text-slate-400">
                          Order #{o.id.slice(0, 8)} • Total: ${o.totalAmount}
                        </p>
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
