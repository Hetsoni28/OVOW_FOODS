"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { IconSlidersHorizontal, IconX } from "@/components/atoms/Icons";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SmartSearchBar } from "@/components/molecules/SmartSearchBar";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [timeSeed, setTimeSeed] = useState(0);
  const isFirstRender = useRef(true);
  
  const ITEMS_PER_PAGE = 8;

  // Enforce PDF Menu order logic on Categories
  const getCategoryPriority = (catName: string) => {
    const lower = catName.toLowerCase();
    if (lower.includes("veg") || lower.includes("subji") || lower.includes("paneer")) return 1; // Sabji
    if (lower.includes("biryani") || lower.includes("rice")) return 2; // Biryani
    if (lower.includes("dal")) return 3; // Dal
    if (lower.includes("roti") || lower.includes("bread")) return 4; // Roti
    if (lower.includes("dessert") || lower.includes("sweet")) return 5; // Dessert
    if (lower.includes("side") || lower.includes("said") || lower.includes("raita") || lower.includes("papad")) return 6; // Said items
    return 7;
  };

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => getCategoryPriority(a.name) - getCategoryPriority(b.name));
  }, [categories]);

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
      return matchesCategory && matchesSearch;
    });

    // Helper for stable random sort based on time seed
    const seededRandom = (str: string, seed: number) => {
      let h = 0xdeadbeef ^ seed;
      for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };

    return filtered.sort((a, b) => {
      const aIsTop = a.signature || a.isBestseller ? 1 : 0;
      const bIsTop = b.signature || b.isBestseller ? 1 : 0;

      // DYNAMIC MODE: When viewing "All Menu Items"
      if (activeCategory === "All" && timeSeed !== 0) {
        // 1. Keep Best Sellers & Signatures at the absolute top
        if (aIsTop !== bIsTop) return bIsTop - aIsTop;
        
        // 2. Shuffle the rest randomly based on the current 5-minute time block!
        const randA = seededRandom(a._id || a.name || "", timeSeed);
        const randB = seededRandom(b._id || b.name || "", timeSeed);
        return randB - randA;
      }

      // STRICT MODE: When viewing a specific category (PDF Logic)
      const catA = typeof a.category === "string" ? a.category : a.category?.name ?? "";
      const catB = typeof b.category === "string" ? b.category : b.category?.name ?? "";
      
      const priorityA = getCategoryPriority(catA);
      const priorityB = getCategoryPriority(catB);

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
      return bIsTop - aIsTop;
    });
  }, [activeCategory, searchQuery, products, categories, timeSeed]);

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Automatically change the menu order every 5 minutes!
    const updateSeed = () => setTimeSeed(Math.floor(Date.now() / (1000 * 60 * 5)));
    updateSeed();
    const interval = setInterval(updateSeed, 60000); // Check every minute to see if 5 min block changed

    // When filters change, automatically scroll up to the menu grid
    // so the user doesn't get stuck at the bottom of the page.
    const filterContainer = document.getElementById("menu-grid-top");
    if (filterContainer) {
      // Offset by 120px to account for the sticky navbar and filter bar height
      const y = filterContainer.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen text-primary pb-20" id="menu-grid-top">
      <MenuFilterBar 
        categories={sortedCategories} 
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
          </div>
          <div className="flex items-center gap-3">
            {(searchQuery || activeCategory !== "All") && (
              <button suppressHydrationWarning
                onClick={handleClear}
                className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24A] hover:text-primary transition-colors flex items-center gap-1.5 self-start sm:self-center"
              >
                <IconX size={12} /> Clear filters
              </button>
            )}
            <SmartSearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search biryani, paneer..."
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
              {paginatedProducts.map((p) => {
                return <ProductCard key={p.slug} product={p} fallbackVideo={undefined} />;
              })}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16 pb-8">
                <button suppressHydrationWarning
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    // Direct DOM scroll — bypasses Lenis interception
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
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
                    // Direct DOM scroll — bypasses Lenis interception
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
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
