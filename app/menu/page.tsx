import { MenuClient } from "./MenuClient";
import type { Metadata } from "next";
import { jsonLd, absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { Product, Category } from "@/types";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { DownloadMenuButton } from "@/components/atoms/DownloadMenuButton";
import Image from "next/image";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "menu"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("menu", {
    title: "Pure Veg Menu – Biryani, Paneer, Dal & Desserts",
    description: "Browse the full OVOW FOODS menu — Dum Matka Biryani, premium paneer subjis, dal, rotis, desserts and sides. 100% pure vegetarian, Swaminarayan style available.",
    path: "/menu",
  });
}

export default async function Menu() {
  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(ALL_PRODUCTS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<Category[]>(ALL_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "OVOW FOODS Menu",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/menu/${p.slug}`),
      name: p.name,
    })),
  };

  return (
    <div className="min-h-screen bg-[#F8F4EA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([menuSchema, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Menu", path: "/menu" }])])}
      />
      {/* ── Cinematic Hero Banner ── */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex flex-col pt-[130px] md:pt-[160px] pb-12 overflow-hidden bg-[#0B2118]">
        {/* Layer 1: Static image fallback */}
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover z-0"
        />

        {/* Layer 2: Video */}
        <LazyVideo
          src="/videos/hero-bg.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
          threshold={0}
          rootMargin="0px"
          deferUntilIdle
        />

        {/* Layered gradient background over video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2118]/80 via-[#123B2A]/80 to-[#1D5A40]/60 z-0" />
        {/* Decorative gold radial glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 65% 40%, #C9A24A 0%, transparent 70%)",
          }}
        />
        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        {/* Vertical gold line accent */}
        <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A24A]/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 container-x pb-8 w-full">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
            <span className="block font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#C9A24A] mb-3">
              ✦ Pure Vegetarian Menu · Ahmedabad
            </span>
            The OVOW<br />
            <span className="text-[#C9A24A]">Menu.</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
            Curated cravings, crafted with love. Every dish tells a story.
          </p>
          <div className="mt-6">
            <DownloadMenuButton products={products} />
          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F8F4EA] to-transparent" />
      </section>

      {/* ── Menu Content ── */}
      <div className="container-x pb-24 md:pb-12">
        <MenuClient products={products} categories={categories} />
      </div>
    </div>
  );
}
