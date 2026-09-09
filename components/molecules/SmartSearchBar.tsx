"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconX } from "@/components/atoms/Icons";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface SmartSearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[#C9A24A]/30 text-[#0B2118] rounded-sm px-0.5 not-italic font-bold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function SmartSearchBar({ value, onChange, placeholder = "Search dishes..." }: SmartSearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setExpanded(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setExpanded(false);
        onChange("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onChange]);

  function handleOpen() {
    setExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 80);
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  function handleClose() {
    setExpanded(false);
    onChange("");
  }

  return (
    <div className="relative flex items-center">
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: EASE }}
            onClick={handleOpen}
            className="flex items-center gap-2 px-4 py-2.5 border border-primary/20 hover:border-[#C9A24A]/50 text-primary/50 hover:text-[#C9A24A] rounded-full text-xs font-bold tracking-widest transition-all duration-300 group"
          >
            <IconSearch size={14} className="text-[#C9A24A]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/5 border border-primary/10 rounded text-[9px] font-mono text-primary/40 group-hover:border-[#C9A24A]/20">
              ⌘K
            </kbd>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, width: 120, scale: 0.97 }}
            animate={{ opacity: 1, width: "min(360px, 80vw)", scale: 1 }}
            exit={{ opacity: 0, width: 120, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-2 bg-white border border-[#C9A24A]/40 shadow-lg shadow-primary/5 rounded-full px-4 py-2.5 overflow-hidden"
          >
            <IconSearch size={14} className="flex-shrink-0 text-[#C9A24A]" />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm text-primary placeholder:text-primary/40 font-medium min-w-0"
              autoComplete="off"
            />
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleClear}
                className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary/50 hover:bg-[#C9A24A]/20 hover:text-[#C9A24A] transition-colors"
              >
                <IconX size={10} />
              </motion.button>
            )}
            <button
              onClick={handleClose}
              className="flex-shrink-0 text-[10px] font-bold tracking-widest text-primary/30 hover:text-[#C9A24A] transition-colors uppercase"
            >
              Esc
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
