import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PriceEstimator } from "@/components/PriceEstimator";
import { GUIDE_SEO_PAGES } from "@/data/seo";

export const metadata: Metadata = {
  title:
    "Mobile Repair Price Estimator & Guides Sri Lanka | Original vs Copy",
  description:
    "Check iPhone & Samsung screen replacement costs in Sri Lanka (LKR), compare Original vs Copy displays, and book doorstep mobile repair in Colombo.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <BookOpen className="h-3.5 w-3.5" />
            Price Estimator &amp; Sri Lanka Repair Guides
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Phone Repair Costs &amp; Buying Guides in Sri Lanka
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Compare Original Service Pack vs. Copy display prices in LKR and
            read transparent guides from Mobile Genie&apos;s Colombo technicians.
          </p>
        </div>

        <div className="mt-8">
          <PriceEstimator />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Repair Cost &amp; Troubleshooting Guides
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {GUIDE_SEO_PAGES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#E31E24] hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-bold text-[#1D8FE1]">
                    {guide.readTime}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900 group-hover:text-[#E31E24]">
                    {guide.h1}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {guide.summary}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#E31E24]">
                  Read Full Guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
