"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, X, SlidersHorizontal, Flame, Star, ChefHat } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/molecules/SearchBar";
import type { Product, Category } from "@/types";

/* ── ProductCard — beast version ───────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col h-full bg-white overflow-hidden shadow-[0_2px_20px_rgba(18,59,42,0.06)] hover:shadow-[0_8px_40px_rgba(18,59,42,0.14)] transition-all duration-500 rounded-sm">
      {/* Image */}
      <Link href={`/menu/${product.slug}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
          {product.previewVideo ? (
            <video
              src={product.previewVideo}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <Image
              src={product.image || "/placeholder-food.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          {/* Dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Top-left badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isSignature || product.signature ? (
              <span className="bg-[#C9A24A] text-white px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1">
                <Star size={8} fill="white" /> Signature
              </span>
            ) : null}
            {product.isBestseller ? (
              <span className="bg-[#123B2A] text-[#C9A24A] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1">
                <Flame size={8} /> Bestseller
              </span>
            ) : null}
          </div>

          {/* Top-right: Veg mark + discount */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
            {/* Veg dot */}
            <span className="flex items-center justify-center w-5 h-5 bg-white border-2 border-[#2E7D4F] rounded-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
            </span>
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* View details on hover */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white/90 text-primary text-[10px] uppercase tracking-widest font-bold px-4 py-1.5">
              View Details →
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/menu/${product.slug}`} className="flex-1 flex flex-col">
          {/* Category tag */}
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#C9A24A] mb-2 flex items-center gap-1">
            <ChefHat size={9} /> {typeof product.category === "string" ? product.category : product.category?.name}
          </span>

          {/* Name + Price */}
          <div className="flex justify-between items-start gap-2 mb-1.5">
            <h3 className="font-serif text-base md:text-lg text-primary leading-tight flex-1 group-hover:opacity-70 transition-opacity">
              {product.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="font-serif text-lg font-bold text-primary">
                ₹{product.price}
              </span>
              {hasDiscount && (
                <span className="block text-xs text-primary/40 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Serving size */}
          {(product.servingSize || product.size) && (
            <p className="text-[10px] text-primary/40 uppercase tracking-widest mb-2">
              {product.servingSize || product.size}
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-xs md:text-sm text-primary/55 line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>
          )}
        </Link>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            added
              ? "bg-[#123B2A] text-white"
              : "bg-[#C9A24A] text-white hover:bg-[#123B2A]"
          }`}
        >
          {added ? (
            <>
              <Check size={12} strokeWidth={3} /> Added!
            </>
          ) : (
            <>
              <Plus size={12} strokeWidth={3} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── MenuClient ─────────────────────────────────────────────── */
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
    <div>
      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[73px] md:top-[81px] z-40 bg-[#F8F4EA]/95 backdrop-blur-md -mx-4 md:mx-0 px-4 md:px-0 pt-3 pb-3 border-b border-primary/10">
        <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Compact search — slightly wider */}
          <div className="shrink-0 w-40 sm:w-56">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Divider */}
          <div className="shrink-0 w-px h-5 bg-primary/15" />

          {/* Category pills */}
          {[{ _id: "all", name: "All", slug: "all", sortOrder: 0 }, ...categories].map((cat) => {
            const isActive =
              cat.name === "All"
                ? activeCategory === "All"
                : activeCategory === cat.name;
            return (
              <button
                key={cat._id}
                onClick={() =>
                  setActiveCategory(cat.name === "All" ? "All" : cat.name)
                }
                className={`shrink-0 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-200 rounded-full whitespace-nowrap ${
                  isActive
                    ? "bg-[#123B2A] text-[#C9A24A] shadow-sm"
                    : "bg-white border border-primary/15 text-primary/55 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results count / reset ── */}
      <div className="flex items-center justify-between py-4">
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/40 flex items-center gap-2">
          <SlidersHorizontal size={12} />
          {filteredProducts.length} dish{filteredProducts.length !== 1 && "es"}
        </p>
        {(searchQuery || activeCategory !== "All") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="text-[10px] uppercase tracking-widest font-bold text-[#C9A24A] hover:text-primary transition-colors flex items-center gap-1"
          >
            <X size={10} /> Clear filters
          </button>
        )}
      </div>

      {/* ── Product Grid ── */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
            <ChefHat size={28} className="text-primary/30" />
          </div>
          <p className="font-serif text-2xl md:text-3xl text-primary mb-3">
            No dishes found
          </p>
          <p className="text-sm text-primary/50 mb-6 max-w-xs">
            Try adjusting your search or category filter.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="px-6 py-3 bg-[#C9A24A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#123B2A] transition-colors"
          >
            Show All Dishes
          </button>
        </div>
      )}
    </div>
  );
}
