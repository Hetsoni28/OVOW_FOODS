"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allOptions = [{ _id: "all", name: "All", slug: "all", sortOrder: 0 }, ...categories];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-[73px] md:top-[81px] z-40 bg-[#F8F4EA]/95 backdrop-blur-xl border-b border-primary/5 py-4 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
        {/* Search */}
        <div className="w-full md:w-64 shrink-0">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Custom Select Dropdown */}
        <div className="relative w-full md:w-80" ref={dropdownRef}>
          <button suppressHydrationWarning
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between bg-white border px-5 py-3.5 shadow-sm transition-all duration-300 outline-none rounded-sm ${
              isOpen ? "border-[#C9A24A]" : "border-[#C9A24A]/50 hover:border-[#C9A24A]"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-[12px] uppercase tracking-[0.1em] font-semibold text-primary">
                {activeCategory === "All" ? "ALL MENU ITEMS" : activeCategory}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2E1B4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-1 bg-[#F8F4EA] border border-[#C9A24A]/20 shadow-2xl z-50 rounded-sm overflow-hidden transform-gpu origin-top"
              >
                <div className="max-h-[320px] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {allOptions.map((cat) => {
                    const isActive =
                      cat.name === "All"
                        ? activeCategory === "All"
                        : activeCategory === cat.name;

                    return (
                      <button suppressHydrationWarning
                        key={cat._id}
                        onClick={() => {
                          setActiveCategory(cat.name === "All" ? "All" : cat.name);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors border-b border-black/5 last:border-0 ${
                          isActive 
                            ? "bg-[#C9A24A]/5" 
                            : "hover:bg-white/50"
                        }`}
                      >
                        <span className={`text-[12px] uppercase tracking-[0.1em] font-semibold transition-colors ${
                          isActive ? "text-[#C9A24A]" : "text-primary"
                        }`}>
                          {cat.name === "All" ? "ALL MENU ITEMS" : cat.name}
                        </span>

                        {/* Custom Checkbox Icon */}
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors rounded-none ${
                          isActive ? "border-[#C9A24A]" : "border-primary/20"
                        }`}>
                          {isActive && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-[#C9A24A]" 
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
