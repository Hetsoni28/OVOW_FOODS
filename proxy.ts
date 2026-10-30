import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";

// Why this exists: app/loading.tsx makes every page stream, so the HTTP status
// (200) is already sent before /menu/[slug] can call notFound(). Unknown product
// slugs therefore returned a "soft 404". Checking the slug here — before
// rendering starts — lets us rewrite to an unmatched path, which Next serves
// with a real 404 status.

const CACHE_MS = 60_000;
let cached: { slugs: Set<string>; at: number } | null = null;

async function getProductSlugs(): Promise<Set<string> | null> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.slugs;
  try {
    const slugs = await client.fetch<string[]>(`*[_type == "product" && defined(slug.current)].slug.current`);
    cached = { slugs: new Set(slugs), at: Date.now() };
    return cached.slugs;
  } catch {
    return cached?.slugs ?? null; // Sanity unreachable → don't 404 real products
  }
}

export async function proxy(request: NextRequest) {
  const slug = decodeURIComponent(request.nextUrl.pathname.split("/")[2] ?? "");
  const slugs = await getProductSlugs();

  if (slugs && slug && !slugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_product-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/menu/:slug",
};
