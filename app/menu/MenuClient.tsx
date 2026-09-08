"use client";

import { useState, useMemo, useEffect } from "react";
import { IconSlidersHorizontal, IconX } from "@/components/atoms/Icons";
import { ProductCard } from "@/components/molecules/ProductCard";
import { MenuFilterBar } from "@/components/organisms/MenuFilterBar";
import { MenuEmptyState } from "@/components/organisms/MenuEmptyState";
import type { Product, Category } from "@/types";

export function MenuClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [swaminarayanOnly, setSwaminarayanOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 8;

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const catName =
        typeof p.category === "string" ? p.category : p.category?.name ?? "";
      const matchesCategory =
        activeCategory === "All" || catName === activeCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDiet = swaminarayanOnly ? p.isSwaminarayan : true;
      return matchesCategory && matchesSearch && matchesDiet;
    });

    // Sort logic:
    // 1. Force Subji (Veg/Paneer), Biryani, and Rice to the top
    // 2. Group by Category Order (using the order from Sanity)
    // 3. Within each category, put Signature / Best Seller items first
    return filtered.sort((a, b) => {
      const getPriority = (catName: string) => {
        const lower = catName.toLowerCase();
        if (lower.includes("veg") || lower.includes("paneer")) return 1;
        if (lower.includes("biryani")) return 2;
        if (lower.includes("rice")) return 3;
        return 4; // Everything else
      };

      const catA = typeof a.category === "string" ? a.category : a.category?.name ?? "";
      const catB = typeof b.category === "string" ? b.category : b.category?.name ?? "";
      
      const priorityA = getPriority(catA);
      const priorityB = getPriority(catB);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      const rankA = categories.findIndex((c) => c.name === catA);
      const rankB = categories.findIndex((c) => c.name === catB);
      
      const finalRankA = rankA === -1 ? 999 : rankA;
      const finalRankB = rankB === -1 ? 999 : rankB;

      if (finalRankA !== finalRankB) {
        return finalRankA - finalRankB;
      }

      // If they are in the same category, sort top items first
      const aIsTop = a.signature || a.isBestseller ? 1 : 0;
      const bIsTop = b.signature || b.isBestseller ? 1 : 0;
      return bIsTop - aIsTop;
    });
  }, [activeCategory, searchQuery, swaminarayanOnly, products, categories]);

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSwaminarayanOnly(false);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, swaminarayanOnly]);

  return (
    <div className="min-h-screen text-primary pb-20">
      <MenuFilterBar 
        categories={categories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4">
          <div className="flex items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/50 flex items-center gap-2">
              <IconSlidersHorizontal size={12} className="text-[#C9A24A]" />
              {filteredProducts.length} DISH{filteredProducts.length !== 1 && "ES"}
            </p>
            {/* Swaminarayan Filter Toggle */}
            <button
              suppressHydrationWarning
              onClick={() => setSwaminarayanOnly(!swaminarayanOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-[10px] font-bold tracking-widest uppercase ${
                swaminarayanOnly
                  ? "bg-[#C9A24A] border-[#C9A24A] text-white shadow-lg shadow-[#C9A24A]/20"
                  : "bg-transparent border-primary/20 text-primary/60 hover:border-[#C9A24A] hover:text-[#C9A24A]"
              }`}
            >
              <span className="text-[12px]">🌿</span>
              Swaminarayan Only
            </button>
          </div>
          {(searchQuery || activeCategory !== "All" || swaminarayanOnly) && (
            <button suppressHydrationWarning
              onClick={handleClear}
              className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24A] hover:text-primary transition-colors flex items-center gap-1.5 self-start sm:self-center"
            >
              <IconX size={12} /> Clear filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
              {paginatedProducts.map((p) => {
                let fallbackVideo = undefined;
                if (!p.previewVideo) {
                  // 1. Find another product in the exact same category that DOES have a video
                  let relatedProduct = products.find(
                    (rp) => rp.category === p.category && rp.previewVideo
                  );
                  
                  // 2. If no video in this category, just find ANY video from any product
                  if (!relatedProduct) {
                    relatedProduct = products.find((rp) => rp.previewVideo);
                  }

                  if (relatedProduct) {
                    fallbackVideo = relatedProduct.previewVideo;
                  }
                }

                return <ProductCard key={p.slug} product={p} fallbackVideo={fallbackVideo} />;
              })}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16 pb-8">
                <button suppressHydrationWarning
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="px-6 py-2 border border-[#C9A24A]/30 rounded-full text-[#C9A24A] text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C9A24A] hover:text-white transition-all"
                >
                  Previous
                </button>
                <span className="text-primary/60 text-xs font-bold tracking-widest">
                  {currentPage} / {totalPages}
                </span>
                <button suppressHydrationWarning
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 border border-[#C9A24A]/30 rounded-full text-[#C9A24A] text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C9A24A] hover:text-white transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <MenuEmptyState onClear={handleClear} />
        )}
      </div>
    </div>
  );
}
