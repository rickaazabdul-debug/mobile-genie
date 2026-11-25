"use client";

import React from "react";
import {
  Smartphone,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenBookings: () => void;
}

export function Navbar({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenBookings,
}: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-lg shadow-indigo-500/25 transition-transform group-hover:scale-105">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="flex items-center gap-1 text-lg font-bold tracking-tight text-white">
              Mobile Genie
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            </span>
            <p className="text-[11px] font-medium text-slate-400">
              Store &amp; Express Repair Lab
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a href="#services" className="transition-colors hover:text-white">
            Repair Services
          </a>
          <a href="#shop" className="transition-colors hover:text-white">
            Devices &amp; Gear
          </a>
          <a href="#book-repair" className="transition-colors hover:text-white">
            Book Repair
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          {user && (
            <button
              onClick={onOpenBookings}
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10 sm:inline-flex"
            >
              <ClipboardList className="h-4 w-4 text-cyan-400" />
              My Tickets
            </button>
          )}

          <button
            onClick={onOpenCart}
            aria-label="Open shopping cart"
            className="relative inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10"
          >
            <ShoppingBag className="h-4 w-4 text-indigo-400" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1.5 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBookings}
                className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="max-w-[110px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>
              <button
                onClick={() => logout()}
                title="Sign out"
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110"
            >
              <UserIcon className="h-3.5 w-3.5" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
