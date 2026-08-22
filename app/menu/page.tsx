import { MenuClient } from "./MenuClient";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import type { Product, Category } from "@/types";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore our premium 100% pure vegetarian menu. Signature dishes, comfort meals, breads, and desserts.",
};

export default async function Menu() {
  const [products, categories] = await Promise.all([
    client.fetch<Product[]>(ALL_PRODUCTS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<Category[]>(ALL_CATEGORIES_QUERY, {}, { next: { revalidate: 60 } }),
  ]);

  return (
    <div className="min-h-screen bg-[#0B2118]">
      {/* ── Cinematic Hero Banner ── */}
      <section className="relative h-[40vh] md:h-[52vh] flex items-end overflow-hidden bg-[#0B2118]">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B2118] via-[#123B2A] to-[#1D5A40]" />
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
        <div className="relative z-10 container-x pb-10 md:pb-14 w-full">
          <p className="text-[#C9A24A] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-3">
            ✦ Pure Vegetarian · Premium Quality
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
            The OVOW<br />
            <span className="text-[#C9A24A]">Menu.</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md leading-relaxed">
            Curated cravings, crafted with love. Every dish tells a story.
          </p>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0B2118] to-transparent" />
      </section>

      {/* ── Menu Content ── */}
      <div className="container-x pb-24 md:pb-12 bg-[#0B2118]">
        <MenuClient products={products} categories={categories} />
      </div>
    </div>
  );
}
