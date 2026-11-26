import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import {
  BRAND_SEO_PAGES,
  GUIDE_SEO_PAGES,
  LOCATION_SEO_PAGES,
  SERVICE_SEO_PAGES,
} from "@/data/seo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/mobile-genie-logo.png"
                alt="Mobile Genie Sri Lanka"
                width={154}
                height={56}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-600">
              Mobile Genie is Colombo&apos;s express smartphone repair center &amp;
              genuine spare parts lab. Same-day phone repair in Sri Lanka for
              Apple iPhone, Samsung, Google Pixel, Xiaomi, OnePlus, OPPO, Vivo &amp;
              more.
            </p>
            <div className="mt-4 space-y-1.5 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#E31E24]" />
                Colombo Repair Center • Bambalapitiya &amp; Island-Wide Pickup
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#1D8FE1]" />
                Mon–Sat: 9:30 AM – 7:30 PM • Sun: 11:00 AM – 5:30 PM
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                +94 11 234 9870 • support@mobilegenie.lk
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Popular Brands
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {BRAND_SEO_PAGES.slice(0, 7).map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="hover:text-[#E31E24]"
                  >
                    {b.brandName} Repair Sri Lanka
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/brands"
                  className="font-semibold text-[#1D8FE1] hover:underline"
                >
                  View all 16+ brands →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Repair Services
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {SERVICE_SEO_PAGES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#E31E24]"
                  >
                    {s.categoryLabel}
                  </Link>
                </li>
              ))}
              {GUIDE_SEO_PAGES.slice(0, 2).map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="text-[#1D8FE1] hover:underline"
                  >
                    {g.slug.includes("cost")
                      ? "iPhone Screen Cost LK"
                      : "Original vs Copy Display"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Colombo &amp; Sri Lanka
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {LOCATION_SEO_PAGES.slice(0, 7).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="hover:text-[#E31E24]"
                  >
                    Phone Repair {loc.name.split(" (")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="font-semibold text-[#1D8FE1] hover:underline"
                >
                  All 21 Sri Lanka areas →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            Mobile Genie © 2026 • Time Matters — Fix it fast, Fix it Right!
          </p>
          <div className="flex gap-4">
            <Link href="/track" className="hover:text-[#1D8FE1]">
              Track Ticket
            </Link>
            <Link href="/admin" className="hover:text-[#E31E24]">
              Admin
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-800">
              Sitemap
            </Link>
            <Link href="/guides" className="hover:text-slate-800">
              Price Estimator
            </Link>
            <Link href="/#book-repair" className="hover:text-[#E31E24]">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
