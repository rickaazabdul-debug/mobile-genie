"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck } from "lucide-react";

const ESTIMATE_DATA: Record<
  string,
  Record<string, { original: string; oem: string; time: string }>
> = {
  "Apple iPhone": {
    "Screen Replacement": {
      original: "LKR 24,000 – 95,000",
      oem: "LKR 14,500 – 55,000",
      time: "30–45 mins",
    },
    "Battery Replacement": {
      original: "LKR 12,500 – 22,000",
      oem: "LKR 8,500 – 14,500",
      time: "25 mins",
    },
    "Back Glass Laser Repair": {
      original: "LKR 14,500 – 28,000",
      oem: "LKR 9,500 – 18,000",
      time: "60 mins",
    },
    "Face ID / Motherboard IC": {
      original: "LKR 12,000 – 28,000",
      oem: "N/A (Board Level)",
      time: "1–3 hours",
    },
  },
  "Samsung Galaxy": {
    "Screen Replacement": {
      original: "LKR 16,500 – 88,000",
      oem: "LKR 11,500 – 48,000",
      time: "40 mins",
    },
    "Green Line Screen Fix": {
      original: "LKR 24,000 – 65,000",
      oem: "Laser / Service Pack",
      time: "45–60 mins",
    },
    "Battery Replacement": {
      original: "LKR 9,500 – 16,500",
      oem: "LKR 7,500 – 12,000",
      time: "30 mins",
    },
    "USB-C Charging Port": {
      original: "LKR 5,500 – 9,500",
      oem: "LKR 4,000 – 6,500",
      time: "35 mins",
    },
  },
  "Google Pixel / OnePlus": {
    "Screen Replacement": {
      original: "LKR 22,000 – 68,000",
      oem: "LKR 16,500 – 45,000",
      time: "45 mins",
    },
    "Battery Replacement": {
      original: "LKR 9,500 – 15,000",
      oem: "LKR 7,500 – 11,500",
      time: "30 mins",
    },
  },
  "Xiaomi / Redmi / OPPO / Vivo": {
    "Screen Replacement": {
      original: "LKR 9,500 – 32,000",
      oem: "LKR 6,800 – 19,500",
      time: "35 mins",
    },
    "Battery Replacement": {
      original: "LKR 5,500 – 9,500",
      oem: "LKR 4,200 – 7,500",
      time: "25 mins",
    },
  },
};

export function PriceEstimator() {
  const brands = Object.keys(ESTIMATE_DATA);
  const [brand, setBrand] = useState(brands[0]);
  const issues = Object.keys(ESTIMATE_DATA[brand]);
  const [issue, setIssue] = useState(issues[0]);

  const currentIssue = issues.includes(issue) ? issue : issues[0];
  const estimate = ESTIMATE_DATA[brand][currentIssue];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#E31E24]">
        <Calculator className="h-4 w-4" />
        Sri Lanka Repair Price Estimator (LKR)
      </div>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
        Compare Original vs. OEM / Copy Display Prices
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Select your brand and repair issue for an instant Sri Lankan Rupee
        estimate.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Phone Brand
          </label>
          <select
            value={brand}
            onChange={(e) => {
              const nextBrand = e.target.value;
              setBrand(nextBrand);
              setIssue(Object.keys(ESTIMATE_DATA[nextBrand])[0]);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#E31E24] focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">
            Repair Issue
          </label>
          <select
            value={currentIssue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#E31E24] focus:outline-none"
          >
            {issues.map((iss) => (
              <option key={iss} value={iss}>
                {iss}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3">
        <div>
          <span className="text-xs font-semibold text-slate-500">
            Original / Service Pack
          </span>
          <p className="mt-1 text-lg font-extrabold text-[#E31E24]">
            {estimate.original}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500">
            OEM / Soft-OLED / Copy
          </span>
          <p className="mt-1 text-lg font-extrabold text-[#1D8FE1]">
            {estimate.oem}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500">
            Est. Turnaround
          </span>
          <p className="mt-1 text-lg font-extrabold text-slate-900">
            {estimate.time}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          Includes free 32-point diagnostic check in Colombo
        </span>
        <Link
          href="/#book-repair"
          className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
        >
          Book Exact Quote &amp; Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
