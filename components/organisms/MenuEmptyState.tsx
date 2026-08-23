"use client";

import { ChefHat } from "lucide-react";

interface MenuEmptyStateProps {
  onClear: () => void;
}

export function MenuEmptyState({ onClear }: MenuEmptyStateProps) {
  return (
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
        onClick={onClear}
        className="px-8 py-4 bg-[#C9A24A] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#0B2118] transition-all duration-300"
      >
        Explore Full Menu
      </button>
    </div>
  );
}
