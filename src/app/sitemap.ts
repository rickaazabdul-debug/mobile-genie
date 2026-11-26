import type { MetadataRoute } from "next";
import {
  BRAND_SEO_PAGES,
  GUIDE_SEO_PAGES,
  LOCATION_SEO_PAGES,
  SERVICE_SEO_PAGES,
  SITE_URL,
} from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-26");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/brands`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const brandRoutes = BRAND_SEO_PAGES.map((b) => ({
    url: `${SITE_URL}/brands/${b.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const serviceRoutes = SERVICE_SEO_PAGES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const locationRoutes = LOCATION_SEO_PAGES.map((l) => ({
    url: `${SITE_URL}/locations/${l.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const guideRoutes = GUIDE_SEO_PAGES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...guideRoutes,
  ];
}
