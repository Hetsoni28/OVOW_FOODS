import { DynamicCuratedMasterpieces } from "./DynamicCuratedMasterpieces";
import { client } from "@/sanity/lib/client";
import { HOME_FEATURED_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/types";
import Link from "next/link";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { IconArrowRight } from "@/components/atoms/Icons";

export async function MenuPreviewSection() {
  const featuredProducts = await client.fetch<Product[]>(
    HOME_FEATURED_PRODUCTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <section className="bg-[#EFE9DB] py-24 text-primary md:py-32">
      <div className="container-x">
        {/* Header: label + title left, intro + link right */}
        <div className="grid gap-8 border-b border-primary/15 pb-10 md:grid-cols-12 md:items-end md:pb-12">
          <div className="md:col-span-7">
            <SectionLabel index="02">From the menu</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl leading-[1] tracking-[-0.02em] text-[#0B2118] md:text-7xl">
              Curated <em className="text-[#86671C]">masterpieces</em>
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <p className="max-w-sm text-[15px] leading-relaxed text-primary/80">
              Our most-ordered subjis and dum biryanis, slow-cooked the old way. The selection changes through the day.
            </p>
            <Link
              href="/menu"
              className="group mt-6 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B2118]"
            >
              <span className="link-rule">See the full menu</span>
              <IconArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-14">
          <DynamicCuratedMasterpieces products={featuredProducts} />
        </div>
      </div>
    </section>
  );
}
