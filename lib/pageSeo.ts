import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { PAGE_SEO_QUERY } from "@/sanity/lib/queries";
import { pageMetadata, withCmsSeo, type PageSeo } from "./seo";
import type { SeoFields } from "@/types";

/**
 * Server-side metadata for a fixed site page: coded defaults + optional
 * "Page SEO" overrides edited in Sanity Studio. Cached for 60s like the pages.
 * If Sanity is unreachable the defaults are used, so pages never fail to render.
 */
export async function cmsPageMetadata(page: string, defaults: PageSeo): Promise<Metadata> {
  const cms = await client
    .fetch<SeoFields | null>(PAGE_SEO_QUERY, { page }, { next: { revalidate: 60 } })
    .catch(() => null);
  return pageMetadata(withCmsSeo(defaults, cms));
}
