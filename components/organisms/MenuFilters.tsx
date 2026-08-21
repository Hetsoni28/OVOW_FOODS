"use client";

import { SlidersHorizontal } from "lucide-react";
import { SearchBar } from "@/components/molecules/SearchBar";
import type { Category } from "@/types";

interface MenuFiltersProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  resultsCount: number;
}

export function MenuFilters({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  resultsCount,
}: MenuFiltersProps) {
  return (
    <>
      {/* Search and Filters Header */}
      <div className="sticky top-[73px] md:top-[81px] z-40 bg-[#F8F4EA]/90 backdrop-blur-md pb-2 pt-4 -mx-4 px-4 md:mx-0 md:px-0 shadow-sm md:shadow-none border-b border-primary/5 md:border-none">
        <div className="flex flex-col gap-4">
          
          {/* Search Bar */}
          <div className="w-full">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Horizontal Scrollable Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => setActiveCategory("All")}
              className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                activeCategory === "All"
                  ? "bg-primary text-[#E4C77A]"
                  : "bg-white border border-primary/20 text-primary hover:border-primary/50"
              }`}
            >
              All Menu
            </button>
            {categories?.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category.name)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeCategory === category.name
                    ? "bg-primary text-[#E4C77A]"
                    : "bg-white border border-primary/20 text-primary hover:border-primary/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-primary/50 mt-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} />
          <span>
            {resultsCount} Item{resultsCount !== 1 && "s"}
          </span>
        </div>
        {(searchQuery || activeCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="text-primary hover:opacity-70 transition-opacity"
          >
            Reset Filters
          </button>
        )}
      </div>
    </>
  );
}
