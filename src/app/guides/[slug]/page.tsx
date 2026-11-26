import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { GUIDE_SEO_PAGES, SITE_URL } from "@/data/seo";

export async function generateStaticParams() {
  return GUIDE_SEO_PAGES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_SEO_PAGES.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDE_SEO_PAGES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <JsonLd data={faqSchema} />
      <SiteHeader />

      <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#E31E24]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/guides" className="hover:text-[#E31E24]">
            Guides &amp; Price Estimator
          </Link>{" "}
          / <span className="text-slate-900">Guide</span>
        </nav>

        <article className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <span className="text-xs font-bold text-[#1D8FE1]">
            {guide.readTime} • Mobile Genie Sri Lanka
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {guide.h1}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {guide.summary}
          </p>

          <div className="mt-8 space-y-8">
            {guide.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {sec.body}
                </p>
                {sec.bullets && (
                  <ul className="mt-3 space-y-2">
                    {sec.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-slate-800"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E31E24]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-extrabold text-slate-900">
              Quick Answers
            </h2>
            <div className="mt-3 space-y-3">
              {guide.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#book-repair"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E31E24] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c8181e]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Express Repair in Colombo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Open LKR Price Estimator
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
