import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { BRAND_SEO_PAGES, SITE_URL } from "@/data/seo";

export async function generateStaticParams() {
  return BRAND_SEO_PAGES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = BRAND_SEO_PAGES.find((b) => b.slug === slug);
  if (!brand) return {};
  return {
    title: brand.metaTitle,
    description: brand.metaDescription,
    keywords: brand.keywords,
    alternates: { canonical: `/brands/${brand.slug}` },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: `${SITE_URL}/brands/${brand.slug}`,
    },
  };
}

export default async function BrandLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = BRAND_SEO_PAGES.find((b) => b.slug === slug);
  if (!brand) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Brands",
        item: `${SITE_URL}/brands`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${brand.brandName} Repair Sri Lanka`,
        item: `${SITE_URL}/brands/${brand.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#E31E24]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/brands" className="hover:text-[#E31E24]">
            Brands
          </Link>{" "}
          / <span className="text-slate-900">{brand.brandName}</span>
        </nav>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <Wrench className="h-3.5 w-3.5" />
            {brand.brandName} Express Repair Lab • Colombo
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {brand.h1}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {brand.heroSubtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {brand.popularModels.map((model) => (
              <span
                key={model}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
              >
                {model}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#book-repair"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book {brand.brandName} Repair Appointment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Estimate Price in LKR
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-900">
            {brand.brandName} Repair Services &amp; Sri Lanka Pricing
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {brand.repairs.map((r) => (
              <div
                key={r.name}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {r.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#1D8FE1]" />
                      {r.time}
                    </span>
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {r.warranty}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-lg font-extrabold text-[#E31E24]">
                    {r.priceLkr}
                  </span>
                  <Link
                    href="/#book-repair"
                    className="text-xs font-bold text-slate-900 hover:text-[#E31E24]"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            Frequently Asked Questions — {brand.brandName} Repair Sri Lanka
          </h2>
          <div className="mt-4 space-y-4">
            {brand.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <h3 className="flex items-start gap-2 text-sm font-bold text-slate-900">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D8FE1]" />
                  {faq.q}
                </h3>
                <p className="mt-1.5 pl-6 text-xs leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
