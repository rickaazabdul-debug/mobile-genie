import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/mobile-genie-logo.png"
            alt="Mobile Genie — Mobile Phone Repair Sri Lanka"
            width={176}
            height={64}
            priority
            className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <Link href="/brands" className="transition-colors hover:text-[#E31E24]">
            Brands
          </Link>
          <Link href="/services" className="transition-colors hover:text-[#E31E24]">
            Repair Services
          </Link>
          <Link href="/locations" className="transition-colors hover:text-[#E31E24]">
            Colombo &amp; Sri Lanka
          </Link>
          <Link href="/guides" className="transition-colors hover:text-[#E31E24]">
            Price Guide &amp; FAQ
          </Link>
        </nav>

        <Link
          href="/#book-repair"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#E31E24] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-red-500/20 transition hover:bg-[#c8181e]"
        >
          <CalendarCheck className="h-4 w-4" />
          Book Repair
        </Link>
      </div>
    </header>
  );
}
