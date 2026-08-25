"use client";

import { motion } from "framer-motion";

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function GalleryFilters({ categories, activeCategory, setActiveCategory }: GalleryFiltersProps) {
  return (
    <motion.div 
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 mb-16"
    >
      {categories.map((cat) => (
        <div key={cat} className="relative">
          <button suppressHydrationWarning
            onClick={() => setActiveCategory(cat)}
            className={`relative z-10 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
              activeCategory === cat
                ? "text-white"
                : "text-primary hover:text-primary/70"
            }`}
          >
            {cat}
          </button>
          {activeCategory === cat && (
            <motion.div
              layoutId="gallery-filter-bg"
              className="absolute inset-0 bg-[#C9A24A] z-0"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}
