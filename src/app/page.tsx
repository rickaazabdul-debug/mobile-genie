"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer, type CartEntry } from "@/components/CartDrawer";
import { MyBookingsModal } from "@/components/MyBookingsModal";
import { RepairBookingSection } from "@/components/RepairBookingSection";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BRAND_SEO_PAGES,
  LOCATION_SEO_PAGES,
  SERVICE_SEO_PAGES,
} from "@/data/seo";
import {
  REPAIR_SERVICES,
  formatLkr,
  type ProductItem,
  type RepairService,
} from "@/data/catalog";
import {
  useLiveRepairServices,
  useLiveStoreProducts,
} from "@/lib/useLiveCatalog";

function ServiceIcon({ name }: { name: RepairService["iconName"] }) {
  switch (name) {
    case "smartphone":
      return <Smartphone className="h-5 w-5 text-[#E31E24]" />;
    case "battery":
      return <BatteryCharging className="h-5 w-5 text-emerald-600" />;
    case "plug":
      return <PlugZap className="h-5 w-5 text-amber-600" />;
    case "droplets":
      return <Droplets className="h-5 w-5 text-[#1D8FE1]" />;
    case "camera":
      return <Camera className="h-5 w-5 text-slate-800" />;
    case "shield":
      return <ShieldCheck className="h-5 w-5 text-[#1D8FE1]" />;
  }
}

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingsOpen, setBookingsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(
    REPAIR_SERVICES[0].title
  );
  const [category, setCategory] = useState<
    "All" | "Phone Parts" | "Smartphones" | "Accessories"
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartEntry[]>([]);

  const liveServices = useLiveRepairServices();
  const { allProducts } = useLiveStoreProducts();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, category, searchQuery]);

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
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar
        cartCount={totalCartItems}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenBookings={() => setBookingsOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#061838]">
        <Image
          src="/hero-repair.jpg"
          alt="Mobile Genie technician repairing smartphone in Colombo lab"
          fill
          priority
          className="object-cover object-right opacity-90 sm:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#04122b]/95 via-[#061838]/80 to-[#061838]/20 lg:via-[#061838]/65 lg:to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/15 px-3.5 py-1.5 text-xs font-bold text-sky-200 backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-[#E31E24]" />
              Mobile Repair Center Colombo • Same-Day Sri Lanka
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Mobile Phone Repair Sri Lanka —{" "}
              <span className="text-[#ff4d52]">Fix it Fast,</span>{" "}
              <span className="text-[#38bdf8]">Fix it Right!</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base">
              Looking for the best mobile repair shop in Colombo? Select your
              smartphone brand, pick your repair issue &amp; part tier, and book
              same-day walk-in or doorstep service with genuine spare parts.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#book-repair"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-[#c8181e]"
              >
                <Wrench className="h-4 w-4" />
                Select Brand &amp; Book Repair
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/track"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <Clock className="h-4 w-4 text-sky-300" />
                Track Ticket
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
            {[
              { label: "Devices Repaired", value: "15,000+", color: "text-[#ff4d52]" },
              { label: "Avg. Turnaround", value: "30 Mins", color: "text-sky-300" },
              { label: "Screen Warranty", value: "Lifetime", color: "text-white" },
              { label: "Customer Rating", value: "4.9 ★", color: "text-amber-300" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-slate-950/65 p-4 text-center backdrop-blur-md"
              >
                <p className={`text-xl font-extrabold sm:text-2xl ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-slate-300 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Selection & Repair Appointment Flow */}
      <RepairBookingSection
        selectedServiceTitle={selectedService}
        onServiceChange={setSelectedService}
      />

      {/* Repair Services Section */}
      <section
        id="services"
        className="border-t border-slate-200 bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D8FE1]">
                Precision Repair Lab
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Common Mobile Repair Issues
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Click any repair issue below to jump straight to your
                appointment with that service pre-selected.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
              <Award className="h-4 w-4" />
              OEM-Grade Parts &amp; No-Fix, No-Fee
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {liveServices.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-[#E31E24]/50 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xs">
                      <ServiceIcon name={service.iconName} />
                    </div>
                    {service.popular && (
                      <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-[#E31E24]">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Turnaround: {service.turnaround}</span>
                    <span className="font-semibold text-emerald-600">
                      {service.warranty}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">From</span>
                      <p className="text-xl font-extrabold text-slate-900">
                        {formatLkr(service.startingPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectRepair(service.title)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#E31E24]"
                    >
                      Book This
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devices & Accessories Shop */}
      <section
        id="shop"
        className="border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31E24]">
                Mobile Genie Storefront
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                Certified Phones &amp; Accessories
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                50-point inspected unlocked smartphones and fast-charging gear
                ready for same-day pickup.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search iPhone, Pixel, GaN..."
                  className="w-56 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#E31E24] focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap rounded-xl border border-slate-200 bg-white p-1">
                {(
                  ["All", "Phone Parts", "Smartphones", "Accessories"] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCategory(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      category === tab
                        ? "bg-[#E31E24] text-white"
                        : "text-slate-600 hover:text-slate-900"
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
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#1D8FE1]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${product.badgeColor}`}
                    >
                      {product.condition}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {product.specs}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-slate-900">
                      {formatLkr(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatLkr(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#E31E24]"
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

      {/* SEO Directory: Dedicated Brand, Service & Sri Lanka Location Pages */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E31E24]">
                Dedicated Repair Pages &amp; LKR Price Guides
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Express Smartphone Repair Service Across Sri Lanka
              </h2>
            </div>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D8FE1] hover:underline"
            >
              Open LKR Price Estimator &amp; FAQ
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Brand Repair Pages
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {BRAND_SEO_PAGES.slice(0, 8).map((b) => (
                  <Link
                    key={b.slug}
                    href={`/brands/${b.slug}`}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-[#E31E24] hover:text-[#E31E24]"
                  >
                    {b.brandName} Repair
                  </Link>
                ))}
                <Link
                  href="/brands"
                  className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#E31E24]"
                >
                  All 16+ Brands →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Hardware &amp; IC Services
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICE_SEO_PAGES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-[#1D8FE1] hover:text-[#1D8FE1]"
                  >
                    {s.categoryLabel}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Colombo &amp; Island-Wide Pickup
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {LOCATION_SEO_PAGES.slice(0, 9).map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-[#E31E24] hover:text-[#E31E24]"
                  >
                    {loc.name.split(" (")[0]}
                  </Link>
                ))}
                <Link
                  href="/locations"
                  className="rounded-lg bg-[#1D8FE1] px-2.5 py-1 text-xs font-semibold text-white hover:opacity-90"
                >
                  All 21 Areas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

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
