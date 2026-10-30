import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { client } from "@/sanity/lib/client";
import { NOINDEX_QUERY } from "@/sanity/lib/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL;
  const now = new Date();

  // Product pages — skipped (not fatal) if Sanity is unreachable
  let products: { slug: string; updatedAt: string }[] = [];
  try {
    products = await client.fetch(
      `*[_type == "product" && defined(slug.current) && seo.noIndex != true]{ "slug": slug.current, "updatedAt": _updatedAt }`
    );
  } catch {}

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/menu/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Site pages an editor marked "Hide from Google" in Sanity → Page SEO
  let hiddenPages: string[] = [];
  try {
    hiddenPages = (await client.fetch<{ pages: string[] }>(NOINDEX_QUERY)).pages ?? [];
  } catch {}
  const isHidden = (url: string) => {
    const key = url === base ? "home" : url.slice(base.length + 1);
    return hiddenPages.includes(key);
  };

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/menu`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/party-bulk-orders`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [...staticEntries.filter((e) => !isHidden(e.url)), ...productEntries];
}
