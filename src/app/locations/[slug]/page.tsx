import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, MapPin, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import {
  BRAND_SEO_PAGES,
  LOCATION_SEO_PAGES,
  SERVICE_SEO_PAGES,
  SITE_URL,
} from "@/data/seo";

export async function generateStaticParams() {
  return LOCATION_SEO_PAGES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATION_SEO_PAGES.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    keywords: loc.keywords,
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
      url: `${SITE_URL}/locations/${loc.slug}`,
    },
  };
}

export default async function LocationLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = LOCATION_SEO_PAGES.find((l) => l.slug === slug);
  if (!loc) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${SITE_URL}/locations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: loc.name,
        item: `${SITE_URL}/locations/${loc.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <JsonLd data={breadcrumbSchema} />
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#E31E24]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/locations" className="hover:text-[#E31E24]">
            Locations
          </Link>{" "}
          / <span className="text-slate-900">{loc.name}</span>
        </nav>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <MapPin className="h-3.5 w-3.5" />
            {loc.region} • {loc.landmarks}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {loc.h1}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {loc.metaDescription} Mobile Genie provides{" "}
            <strong className="text-slate-900">{loc.serviceMode}</strong> for
            customers in {loc.name}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50/70 p-4 text-xs font-semibold text-[#1D8FE1]">
            <Truck className="h-4 w-4 shrink-0" />
            <span>
              Service Mode for {loc.name}: {loc.serviceMode}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#book-repair"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Pickup / Repair in {loc.name.split(" (")[0]}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              View LKR Price Estimator
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-slate-900">
              Popular Brands Repaired in {loc.name.split(" (")[0]}
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {BRAND_SEO_PAGES.slice(0, 6).map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/brands/${b.slug}`}
                    className="hover:text-[#E31E24] hover:underline"
                  >
                    {b.brandName} Repair →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-slate-900">
              Available Repair Services
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {SERVICE_SEO_PAGES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#1D8FE1] hover:underline"
                  >
                    {s.categoryLabel} ({s.priceRangeLkr}) →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
