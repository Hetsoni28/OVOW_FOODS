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
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  const handleClear = () => {
    setSearchQuery("");
    setActiveCategory("All");
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
        <div className="flex items-center justify-between py-8">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/50 flex items-center gap-2">
            <SlidersHorizontal size={12} className="text-[#C9A24A]" />
            {filteredProducts.length} DISH{filteredProducts.length !== 1 && "ES"}
          </p>
          {(searchQuery || activeCategory !== "All") && (
            <button suppressHydrationWarning
              onClick={handleClear}
              className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24A] hover:text-primary transition-colors flex items-center gap-1.5"
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
