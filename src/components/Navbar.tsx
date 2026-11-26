"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  User as UserIcon,
  LogOut,
  ClipboardList,
  CalendarCheck,
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
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/mobile-genie-logo.png"
            alt="Mobile Genie — Time Matters - Fix it fast - Fix it Right!"
            width={176}
            height={64}
            priority
            className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <a
            href="#book-repair"
            className="transition-colors hover:text-[#E31E24]"
          >
            Book Appointment
          </a>
          <Link
            href="/brands"
            className="transition-colors hover:text-[#E31E24]"
          >
            Brands
          </Link>
          <Link
            href="/services"
            className="transition-colors hover:text-[#E31E24]"
          >
            Services
          </Link>
          <Link
            href="/locations"
            className="transition-colors hover:text-[#E31E24]"
          >
            Colombo &amp; LK
          </Link>
          <Link
            href="/guides"
            className="transition-colors hover:text-[#E31E24]"
          >
            Price Guide
          </Link>
          <Link
            href="/track"
            className="transition-colors hover:text-[#1D8FE1]"
          >
            Track Ticket
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#book-repair"
            className="hidden items-center gap-1.5 rounded-xl bg-[#E31E24] px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-red-500/20 transition hover:bg-[#c8181e] lg:inline-flex"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            Book Repair
          </a>

          {user && (
            <button
              onClick={onOpenBookings}
              className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
            >
              <ClipboardList className="h-4 w-4 text-[#1D8FE1]" />
              My Tickets
            </button>
          )}

          <button
            onClick={onOpenCart}
            aria-label="Open shopping cart"
            className="relative inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ShoppingBag className="h-4 w-4 text-[#E31E24]" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E31E24] px-1.5 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenBookings}
                className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-[#1D8FE1] transition hover:bg-sky-100"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="max-w-[110px] truncate">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
              </button>
              <button
                onClick={() => logout()}
                title="Sign out"
                className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
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
