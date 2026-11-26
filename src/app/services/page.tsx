import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wrench, Clock, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SERVICE_SEO_PAGES } from "@/data/seo";

export const metadata: Metadata = {
  title: "Mobile Repair Services Sri Lanka | Screen, Battery & IC Chip Repair",
  description:
    "Explore Mobile Genie repair services in Colombo & Sri Lanka: phone display replacement, battery & charging port repair, IC chip-level motherboard repair, water damage recovery & doorstep pickup.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#1D8FE1]">
            <Wrench className="h-3.5 w-3.5" />
            Colombo Precision Repair Lab
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Smartphone Repair Services in Sri Lanka
          </h1>
          <p className="mt-3 text-base text-slate-600">
            From 30-minute cracked screen replacements to micro-soldered
            motherboard IC repairs and doorstep pickup across Colombo.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SEO_PAGES.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#E31E24] hover:shadow-md"
            >
              <div>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-[#E31E24]">
                  {svc.categoryLabel}
                </span>
                <h2 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-[#E31E24]">
                  {svc.h1}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {svc.summary}
                </p>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#1D8FE1]" />
                    {svc.turnaround}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {svc.warranty}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-900">
                    {svc.priceRangeLkr}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E31E24]">
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
