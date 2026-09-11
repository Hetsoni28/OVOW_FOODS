"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { Product } from "@/types";

interface DynamicCuratedMasterpiecesProps {
  products: Product[];
}

export function DynamicCuratedMasterpieces({ products }: DynamicCuratedMasterpiecesProps) {
  const [timeSeed, setTimeSeed] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Automatically change the featured items every 5 minutes!
    const updateSeed = () => setTimeSeed(Math.floor(Date.now() / (1000 * 60 * 5)));
    updateSeed();
    const interval = setInterval(updateSeed, 60000); // Check every minute to see if 5 min block changed
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    
    return () => clearInterval(interval);
  }, []);

  const displayedProducts = useMemo(() => {
    if (products.length <= 4) return products; // Not enough products to shuffle meaningfully

    // Helper for stable random sort based on time seed
    const seededRandom = (str: string, seed: number) => {
      let h = 0xdeadbeef ^ seed;
      for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };

    // If it's the very first SSR render, we just return the first 4 to avoid hydration mismatch
    if (isFirstRender.current || timeSeed === 0) {
      return products.slice(0, 4);
    }

    // Shuffle the products randomly based on the current 5-minute time block
    const shuffled = [...products].sort((a, b) => {
      const randA = seededRandom(a._id || a.name || "", timeSeed);
      const randB = seededRandom(b._id || b.name || "", timeSeed);
      return randB - randA;
    });

    // Return only 4 items for the grid
    return shuffled.slice(0, 4);
  }, [products, timeSeed]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {displayedProducts.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
