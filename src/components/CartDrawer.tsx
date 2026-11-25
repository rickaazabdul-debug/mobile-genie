"use client";

import React, { useState } from "react";
import { X, Trash2, ShoppingBag, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import type { ProductItem } from "@/data/catalog";

export interface CartEntry {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartEntry[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onRequireAuth: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onRequireAuth,
}: CartDrawerProps) {
  const { user } = useAuth();
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setError(null);
    setPlacing(true);
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customerEmail: user.email,
        customerName: user.displayName || user.email,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })),
        totalAmount: subtotal,
        status: "Reserved for In-Store Pickup",
        createdAt: serverTimestamp(),
      });
      setOrderId(docRef.id);
      onClearCart();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Could not place order in Firestore.";
      setError(msg);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Your Genie Bag</h2>
          </div>
          <button
            onClick={() => {
              setOrderId(null);
              setError(null);
              onClose();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-5">
          {orderId ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
              <h3 className="mt-3 text-base font-bold text-white">
                Order Reserved!
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Reference ID: <span className="font-mono text-emerald-300">{orderId}</span>
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Your order is saved to your account. Pick up in-store within 48 hours.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-slate-600" />
              <p className="mt-3 text-sm font-medium text-slate-400">
                Your bag is currently empty.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Add a certified device or accessory from the shop.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 p-3.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                    <p className="text-xs text-slate-400">
                      Qty {quantity} × ${product.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-cyan-300">
                      ${product.price * quantity}
                    </span>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {items.length > 0 && !orderId && (
          <div className="border-t border-white/10 pt-4">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-lg font-bold text-white">${subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={placing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 disabled:opacity-60"
            >
              {placing && <Loader2 className="h-4 w-4 animate-spin" />}
              {user ? "Reserve Order in Firestore" : "Sign In to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
