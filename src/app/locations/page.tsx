import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LOCATION_SEO_PAGES } from "@/data/seo";

export const metadata: Metadata = {
  title:
    "Mobile Phone Repair Locations in Colombo & Sri Lanka | Near Me",
  description:
    "Same-day phone repair & doorstep pickup across Bambalapitiya, Wellawatte, Kollupitiya, Dehiwala, Nugegoda, Maharagama, Negombo, Kandy, Galle & island-wide.",
  alternates: { canonical: "/locations" },
};

export default function LocationsIndexPage() {
  const colomboHubs = LOCATION_SEO_PAGES.filter(
    (l) => l.region === "Colombo Hub"
  );
  const islandWide = LOCATION_SEO_PAGES.filter(
    (l) => l.region === "Greater Western & Island-Wide"
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#E31E24]">
            <MapPin className="h-3.5 w-3.5" />
            Local Colombo &amp; Island-Wide Coverage
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            Phone Repair Near You in Colombo &amp; Sri Lanka
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Walk in to our Colombo express lab or schedule same-day doorstep
            pickup &amp; insured island-wide courier repair.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-slate-900">
            Colombo Commercial Hubs (Walk-In &amp; Express Pickup)
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colomboHubs.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#E31E24] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#E31E24]">
                    {loc.name}
                  </h3>
                  <MapPin className="h-4 w-4 text-[#E31E24]" />
                </div>
                <p className="mt-1.5 text-xs text-slate-500">{loc.landmarks}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#1D8FE1]">
                  {loc.serviceMode} <ArrowRight className="h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
            <Truck className="h-5 w-5 text-[#1D8FE1]" />
            Greater Western &amp; Island-Wide Areas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {islandWide.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#1D8FE1] hover:shadow-md"
              >
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1D8FE1]">
                  {loc.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{loc.landmarks}</p>
                <p className="mt-3 text-xs font-semibold text-[#E31E24]">
                  {loc.serviceMode} →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
