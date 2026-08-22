"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChefHat } from "lucide-react";
import { SearchBar } from "@/components/molecules/SearchBar";
import { ProductCard } from "@/components/molecules/ProductCard";
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

  return (
    <div className="min-h-screen text-primary pb-20">
      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[73px] md:top-[81px] z-40 bg-[#F8F4EA]/95 backdrop-blur-xl border-b border-primary/5 py-4 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="w-full md:w-64 shrink-0">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 md:pb-0">
            {[{ _id: "all", name: "All", slug: "all", sortOrder: 0 }, ...categories].map((cat) => {
              const isActive =
                cat.name === "All"
                  ? activeCategory === "All"
                  : activeCategory === cat.name;
              return (
                <button suppressHydrationWarning
                  key={cat._id}
                  onClick={() =>
                    setActiveCategory(cat.name === "All" ? "All" : cat.name)
                  }
                  className={`shrink-0 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm whitespace-nowrap border ${
                    isActive
                      ? "bg-[#0B2118] border-[#0B2118] text-[#C9A24A] shadow-md"
                      : "bg-white border-primary/10 text-primary/60 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ── Results count / reset ── */}
        <div className="flex items-center justify-between py-8">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/50 flex items-center gap-2">
            <SlidersHorizontal size={12} className="text-[#C9A24A]" />
            {filteredProducts.length} DISH{filteredProducts.length !== 1 && "ES"}
          </p>
          {(searchQuery || activeCategory !== "All") && (
            <button suppressHydrationWarning
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24A] hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Product Grid ── */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
              <ChefHat size={32} className="text-[#C9A24A]" />
            </div>
            <p className="font-serif text-3xl md:text-4xl text-primary mb-4">
              No dishes found
            </p>
            <p className="text-base text-primary/60 mb-8 max-w-md">
              We couldn't find any dishes matching your current filters. Try adjusting your search or category.
            </p>
            <button suppressHydrationWarning
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="px-8 py-4 bg-[#C9A24A] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#0B2118] transition-all duration-300"
            >
              Explore Full Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
