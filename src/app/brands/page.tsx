import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BRAND_SEO_PAGES } from "@/data/seo";

export const metadata: Metadata = {
  title: "Phone Brands We Repair in Sri Lanka | Apple, Samsung, Pixel & More",
  description:
    "Dedicated smartphone repair pages for Apple iPhone, Samsung Galaxy, Google Pixel, Xiaomi, Redmi, OnePlus, OPPO, Vivo, Huawei, HONOR & more in Colombo, Sri Lanka.",
  alternates: { canonical: "/brands" },
};

export default function BrandsIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <Smartphone className="h-3.5 w-3.5" />
            Genuine &amp; OEM Parts in Colombo
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Mobile Phone Brands We Repair in Sri Lanka
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Select your smartphone brand below to view model-specific repair
            services, LKR price estimates, turnaround times, and warranty
            coverage.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_SEO_PAGES.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#E31E24] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-[#E31E24]">
                    {brand.brandName} Repair Sri Lanka
                  </h2>
                  <ShieldCheck className="h-5 w-5 text-[#1D8FE1]" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {brand.heroSubtitle}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {brand.popularModels.slice(0, 3).map((m) => (
                    <span
                      key={m}
                      className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#E31E24]">
                View {brand.brandName} Repair Prices
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
