"use client";

import React, { useMemo, useState } from "react";
import {
  Smartphone,
  BatteryCharging,
  PlugZap,
  Droplets,
  Camera,
  ShieldCheck,
  ArrowRight,
  Star,
  Zap,
  Award,
  Search,
  Plus,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer, type CartEntry } from "@/components/CartDrawer";
import { MyBookingsModal } from "@/components/MyBookingsModal";
import { RepairBookingSection } from "@/components/RepairBookingSection";
import {
  PRODUCTS,
  REPAIR_SERVICES,
  type ProductItem,
  type RepairService,
} from "@/data/catalog";

function ServiceIcon({ name }: { name: RepairService["iconName"] }) {
  switch (name) {
    case "smartphone":
      return <Smartphone className="h-5 w-5 text-cyan-400" />;
    case "battery":
      return <BatteryCharging className="h-5 w-5 text-emerald-400" />;
    case "plug":
      return <PlugZap className="h-5 w-5 text-amber-400" />;
    case "droplets":
      return <Droplets className="h-5 w-5 text-sky-400" />;
    case "camera":
      return <Camera className="h-5 w-5 text-violet-400" />;
    case "shield":
      return <ShieldCheck className="h-5 w-5 text-indigo-400" />;
  }
}

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(
    REPAIR_SERVICES[0].title
  );
  const [category, setCategory] = useState<"All" | "Smartphones" | "Accessories">(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartEntry[]>([]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery]);

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleSelectRepair = (title: string) => {
    setSelectedService(title);
    document.getElementById("book-repair")?.scrollIntoView({ behavior: "smooth" });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar
        cartCount={totalCartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenBookings={() => setBookingsOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/35 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              30-Minute Express Repairs • Certified Device Store
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Your Phone Fixed Fast.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Pure Magic.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              Mobile Genie is your neighborhood micro-soldering lab and mobile
              boutique. From shattered OLED screens to certified refurbished
              flagships, we keep you connected without the wait.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#book-repair"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110"
              >
                <Wrench className="h-4 w-4" />
                Book Express Repair
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#shop"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Phones &amp; Gear
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Devices Repaired", value: "15,000+" },
              { label: "Avg. Turnaround", value: "30 Mins" },
              { label: "Screen Warranty", value: "Lifetime" },
              { label: "Customer Rating", value: "4.9 ★" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-center backdrop-blur"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section
        id="services"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Precision Repair Lab
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Transparent Repair Pricing
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Select a service to pre-fill your appointment. Free diagnostics on
              every walk-in or booked repair.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-300">
            <Award className="h-4 w-4" />
            OEM-Grade Parts &amp; No-Fix, No-Fee
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIR_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-indigo-500/40 hover:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950">
                    <ServiceIcon name={service.iconName} />
                  </div>
                  {service.popular && (
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300">
                      Most Popular
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Turnaround: {service.turnaround}</span>
                  <span className="text-emerald-400">{service.warranty}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">From</span>
                    <p className="text-xl font-bold text-white">
                      ${service.startingPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectRepair(service.title)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/15 px-3.5 py-2 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500 hover:text-white"
                  >
                    Book This
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Devices & Accessories Shop */}
      <section
        id="shop"
        className="border-y border-white/10 bg-slate-900/35 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Mobile Genie Storefront
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Certified Phones &amp; Accessories
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                50-point inspected unlocked smartphones and fast-charging gear
                ready for same-day pickup.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search iPhone, Pixel, GaN..."
                  className="w-56 rounded-xl border border-white/10 bg-slate-950 py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex rounded-xl border border-white/10 bg-slate-950 p-1">
                {(["All", "Smartphones", "Accessories"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCategory(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      category === tab
                        ? "bg-indigo-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${product.badgeColor}`}
                    >
                      {product.condition}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-300" />
                      {product.rating}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {product.specs}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center gap-1 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-500"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Booking Form */}
      <RepairBookingSection
        selectedServiceTitle={selectedService}
        onServiceChange={setSelectedService}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold">Mobile Genie</span>
            <span>• Express Repair &amp; Certified Devices</span>
          </div>
          <p>
            Powered by Next.js &amp; Firebase (2026).
          </p>
        </div>
      </footer>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        onRequireAuth={() => {
          setCartOpen(false);
          setAuthOpen(true);
        }}
      />
      <MyBookingsModal
        isOpen={bookingsOpen}
        onClose={() => setBookingsOpen(false)}
      />
    </div>
  );
}
