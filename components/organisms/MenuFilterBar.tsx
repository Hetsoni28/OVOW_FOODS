"use client";

import { SearchBar } from "@/components/molecules/SearchBar";
import type { Category } from "@/types";

interface MenuFilterBarProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export function MenuFilterBar({ categories, activeCategory, setActiveCategory, searchQuery, setSearchQuery }: MenuFilterBarProps) {
  return (
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
                    ? "bg-[#C9A24A] border-[#C9A24A] text-white shadow-md"
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
  );
}
