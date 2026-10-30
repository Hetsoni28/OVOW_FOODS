import type { Metadata } from "next";
import { SITE_URL, COMPANY_CONFIG } from "./config";
import type { SeoFields } from "@/types";

export const SITE_NAME = "OVOW FOODS";
export const DEFAULT_DESCRIPTION =
  "Premium 100% pure vegetarian cloud kitchen in Ahmedabad. Order Dum Matka Biryani, paneer specials, comfort meals and desserts — delivered fresh.";
export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "OVOW FOODS — Taste the WOW. Experience OVOW. 100% Pure Vegetarian, Ahmedabad",
};

export interface PageSeo {
  /** Page title without the brand — the root layout template appends " | OVOW FOODS" */
  title: string;
  description: string;
  /** Route path, e.g. "/menu" — becomes the canonical URL */
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  /** Keep private/transactional pages out of search results */
  noIndex?: boolean;
  /** Use the title as-is (no brand template) */
  absoluteTitle?: boolean;
  /** Override the canonical URL (absolute) — defaults to `path` */
  canonical?: string;
}

/**
 * Complete per-page metadata. Next.js replaces (not merges) nested objects like
 * `openGraph`, so every page must supply the full set — this helper does that.
 */
export function pageMetadata({ title, description, path, image, noIndex, absoluteTitle, canonical }: PageSeo): Metadata {
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: canonical || path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/** Serialises JSON-LD safely for a <script> tag (escapes "<" to avoid tag injection) */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export const RESTAURANT_ID = `${SITE_URL}/#restaurant`;

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": RESTAURANT_ID,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl("/logo/ovow-foods-logo.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    telephone: "+917567566214",
    email: COMPANY_CONFIG.email,
    servesCuisine: ["Indian", "Vegetarian", "Gujarati", "Biryani"],
    priceRange: "₹₹",
    menu: absoluteUrl("/menu"),
    hasMenu: absoluteUrl("/menu"),
    acceptsReservations: false,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382481",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 23.0525, longitude: 72.5337 },
    areaServed: { "@type": "City", name: "Ahmedabad" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "04:00",
    },
    sameAs: [COMPANY_CONFIG.instagram, COMPANY_CONFIG.facebook],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": RESTAURANT_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Descriptive, keyword-natural alt text for a dish photo.
 * Prefers the editor-written alt from Sanity; otherwise e.g.
 * "Veg Makhmali – pure veg premium subjis by OVOW FOODS, Ahmedabad".
 */
export function productImageAlt(product: { name: string; category?: unknown; thumbnailAlt?: string }): string {
  if (product.thumbnailAlt?.trim()) return product.thumbnailAlt.trim();
  return `${product.name} – ${pureVegLabel(product.category).toLowerCase()} by OVOW FOODS, Ahmedabad`;
}

/** "Pure Veg Premium Subjis" — without doubling up when the category already says veg */
export function pureVegLabel(category: unknown): string {
  const c = typeof category === "string" ? category.trim() : "";
  if (!c) return "Pure Veg Dish";
  return /\b(veg|vegetarian)\b/i.test(c) ? `Pure ${c.replace(/^pure\s+/i, "")}` : `Pure Veg ${c}`;
}

/** Google-friendly product title (≤ ~60 chars), falling back to a shorter form for long names */
export function productTitle(product: { name: string; seo?: SeoFields | null }): string {
  if (product.seo?.title?.trim()) return product.seo.title.trim();
  const full = `${product.name} | Pure Veg in Ahmedabad | ${SITE_NAME}`;
  return full.length <= 60 ? full : `${product.name} | ${SITE_NAME}`;
}

/**
 * Applies editor overrides from Sanity (Page SEO / product SEO block) on top of
 * the coded defaults. Empty fields keep the defaults.
 */
export function withCmsSeo(defaults: PageSeo, cms?: SeoFields | null): PageSeo {
  if (!cms) return defaults;
  const title = cms.title?.trim();
  return {
    ...defaults,
    // An editor-written title is used exactly as typed (no "| OVOW FOODS" added)
    ...(title && { title, absoluteTitle: true }),
    ...(cms.description?.trim() && { description: cms.description.trim() }),
    ...(cms.image && {
      image: { url: `${cms.image}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630, alt: cms.imageAlt || defaults.title },
    }),
    ...(cms.canonicalUrl && { canonical: cms.canonicalUrl }),
    ...(cms.noIndex && { noIndex: true }),
  };
}

