"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
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

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
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
  }, [activeCategory, searchQuery, swaminarayanOnly, products]);

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSwaminarayanOnly(false);
  };

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
              <SlidersHorizontal size={12} className="text-[#C9A24A]" />
              {filteredProducts.length} DISH{filteredProducts.length !== 1 && "ES"}
            </p>
            {/* Swaminarayan Filter Toggle */}
            <button
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
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <MenuEmptyState onClear={handleClear} />
        )}
      </div>
    </div>
  );
}
