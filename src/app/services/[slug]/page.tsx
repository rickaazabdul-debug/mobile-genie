import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { SERVICE_SEO_PAGES, SITE_URL } from "@/data/seo";

export async function generateStaticParams() {
  return SERVICE_SEO_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICE_SEO_PAGES.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    keywords: svc.keywords,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      url: `${SITE_URL}/services/${svc.slug}`,
    },
  };
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = SERVICE_SEO_PAGES.find((s) => s.slug === slug);
  if (!svc) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.h1,
    description: svc.metaDescription,
    areaServed: "Sri Lanka",
    provider: {
      "@type": "MobilePhoneStore",
      name: "Mobile Genie",
      url: SITE_URL,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#E31E24]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/services" className="hover:text-[#E31E24]">
            Services
          </Link>{" "}
          / <span className="text-slate-900">{svc.categoryLabel}</span>
        </nav>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            {svc.categoryLabel} • Sri Lanka
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {svc.h1}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {svc.summary}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs text-slate-500">Estimated Price</span>
              <p className="mt-1 text-lg font-extrabold text-[#E31E24]">
                {svc.priceRangeLkr}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs text-slate-500">Turnaround</span>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-[#1D8FE1]">
                <Clock className="h-4 w-4" />
                {svc.turnaround}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs text-slate-500">Coverage</span>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                {svc.warranty}
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5">
            {svc.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#book-repair"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book This Repair Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Browse Supported Brands
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-4">
            {svc.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
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
