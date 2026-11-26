import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/data/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Mobile Genie | Mobile Phone Repair Sri Lanka & Colombo Express Center",
    template: "%s | Mobile Genie Sri Lanka",
  },
  description:
    "Best mobile repair shop in Colombo & Sri Lanka. Same-day phone repair for iPhone, Samsung green line, Google Pixel, Xiaomi, OnePlus & genuine mobile phone spare parts.",
  keywords: [
    "mobile phone repair Sri Lanka",
    "phone repair shop near me",
    "mobile repair center Colombo",
    "same day phone repair Sri Lanka",
    "smartphone repair service Sri Lanka",
    "mobile phone spare parts Sri Lanka",
    "best mobile repair shop in Colombo",
    "express phone repair Sri Lanka",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: SITE_URL,
    siteName: "Mobile Genie Sri Lanka",
    title: "Mobile Genie | Express Mobile Phone Repair Sri Lanka & Colombo",
    description:
      "Time Matters — Fix it fast, Fix it Right! Same-day smartphone screen, battery, and IC chip-level repair in Colombo with genuine parts.",
    images: [
      {
        url: "/mobile-genie-logo.png",
        width: 352,
        height: 128,
        alt: "Mobile Genie Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Genie | Mobile Phone Repair Sri Lanka",
    description:
      "Same-day iPhone, Samsung, Pixel & Android repair in Colombo with warranty.",
    images: ["/mobile-genie-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneStore",
  name: "Mobile Genie",
  description:
    "Express mobile phone repair center in Colombo, Sri Lanka specializing in iPhone, Samsung, Google Pixel, Xiaomi, OnePlus, OPPO, and Vivo screen, battery, and IC chip-level repairs.",
  url: SITE_URL,
  logo: `${SITE_URL}/mobile-genie-logo.png`,
  telephone: "+94112349870",
  priceRange: "LKR 1,500 - LKR 95,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bambalapitiya, Galle Road",
    addressLocality: "Colombo",
    addressRegion: "Western Province",
    postalCode: "00400",
    addressCountry: "LK",
  },
  areaServed: [
    "Colombo",
    "Bambalapitiya",
    "Wellawatte",
    "Kollupitiya",
    "Dehiwala",
    "Nugegoda",
    "Negombo",
    "Kandy",
    "Galle",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:30",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "11:00",
      closes: "17:30",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-white text-slate-900 flex flex-col">
        <JsonLd data={localBusinessSchema} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
