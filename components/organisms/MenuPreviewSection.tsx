import { ProductCard } from "@/components/molecules/ProductCard";
import { client } from "@/sanity/lib/client";
import { HOME_FEATURED_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/types";
import Link from "next/link";

export async function MenuPreviewSection() {
  const featuredProducts = await client.fetch<Product[]>(
    HOME_FEATURED_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <section className="bg-[#F4F1E9] py-24 md:py-32 text-primary relative overflow-hidden">
      <div className="container-x text-center mb-12 md:mb-16 relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-[#0B2118]">
          Curated Masterpieces
        </h2>
        <p className="opacity-80 max-w-2xl mx-auto text-sm md:text-base">
          Experience our highest-rated signatures. Authentic subjis and dum biryanis, slow-cooked to absolute perfection.
        </p>
      </div>

      <div className="container-x relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <Link href="/menu" className="inline-flex items-center justify-center border border-[#C9A24A] text-[#C9A24A] px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-[#C9A24A] hover:text-white transition-colors duration-300">
            Explore Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
