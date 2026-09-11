"use client";

import Link from "next/link";
import { IconPlus, IconCheck, IconStar, IconFlame, IconChefHat, IconStatusAvailable, IconStatusLimited, IconStatusSoldOut } from "@/components/atoms/Icons";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, fallbackVideo }: { product: Product, fallbackVideo?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Resolve availability: new field takes priority, fallback to legacy boolean
  const status = product.availabilityStatus ?? (product.available === false ? 'soldout' : 'available');
  const isSoldOut = status === 'soldout';
  const isLimited = status === 'limited';
  const isPreOrder = status === 'preorder';

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isSoldOut) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // If pre-order item, show a toast hint (optional improvement)
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const displayVideo = product.previewVideo || fallbackVideo;

  return (
    <div className="group relative flex flex-col h-full bg-white border border-primary/5 hover:border-[#C9A24A]/40 hover:shadow-[0_16px_40px_rgba(18,59,42,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <Link href={`/menu/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-primary/5">
        {displayVideo ? (
          <LazyVideo 
            src={displayVideo} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/40 text-xs font-bold tracking-widest uppercase">
            No Video
          </div>
        )}
        
        {/* Subtle gradient overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges — top left */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2">
          {isSoldOut && (
            <span className="bg-black/80 text-white px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm backdrop-blur-sm flex items-center gap-1.5">
              <IconStatusSoldOut size={10} /> Sold Out
            </span>
          )}
          {isPreOrder && (
            <span className="bg-purple-700/90 text-white px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm backdrop-blur-sm flex items-center gap-1">
              🗓 Pre-Order
            </span>
          )}
          {!isSoldOut && !isPreOrder && (product.isSignature || (product as any).signature) && (
            <span className="bg-[#C9A24A] text-white px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 md:gap-1.5 shadow-sm">
              <IconStar size={8} fill="white" className="md:w-2.5 md:h-2.5" /> Signature
            </span>
          )}
          {!isSoldOut && !isPreOrder && (product.isBestseller || (product as any).isBestSeller) && (
            <span className="bg-white/95 backdrop-blur-md text-[#0B2118] px-2 py-1 md:px-3 md:py-1.5 text-[7px] md:text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 md:gap-1.5 shadow-sm">
              <IconFlame size={8} className="text-[#C9A24A] md:w-2.5 md:h-2.5" /> Bestseller
            </span>
          )}

        </div>

        {/* Limited badge — bottom strip */}
        {isLimited && !isSoldOut && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-500/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
            <IconStatusLimited size={10} />
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white">Limited Availability</span>
          </div>
        )}
        {/* Pre-Order strip — bottom */}
        {isPreOrder && (
          <div className="absolute bottom-0 left-0 right-0 bg-purple-700/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-white">🗓 Schedule Required · Pre-Order Only</span>
          </div>
        )}

        {/* Veg mark */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4">
          <span className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5 bg-white backdrop-blur-md border border-[#2E7D4F] rounded-sm shadow-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#2E7D4F]" />
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-1 flex-col p-3 md:p-5 bg-white relative z-10">
        <Link href={`/menu/${product.slug}`} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-2 md:mb-3">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-medium text-primary/40 flex items-center gap-1.5">
              <span className="hidden md:block"><IconChefHat size={10} /></span> {typeof product.category === 'string' ? product.category : product.category?.name || 'Dish'}
            </span>
            {hasDiscount && (
              <span className="bg-red-50 text-red-600 border border-red-100 text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest">
                Save
              </span>
            )}
          </div>

          <h3 className="font-serif text-sm md:text-xl text-primary leading-snug mb-1 md:mb-2 group-hover:text-[#C9A24A] transition-colors">
            {product.name}
          </h3>
          
          {/* Star Rating */}
          {(product as any).avgRating && (product as any).reviewCount > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[#C9A24A] text-xs">★</span>
              <span className="text-xs font-bold text-primary tabular-nums">
                {Number((product as any).avgRating).toFixed(1)}
              </span>
              <span className="text-[10px] text-primary/40">
                ({(product as any).reviewCount})
              </span>
            </div>
          )}
          
          {product.description && (
            <p className="hidden md:block text-xs md:text-sm text-primary/60 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 md:pt-4">
            <div>
              <p className="text-[8px] md:text-[10px] text-primary/40 uppercase tracking-widest mb-0.5 md:mb-1">{product.servingSize || "1 Portion"}</p>
              <div className="flex items-center gap-1.5 md:gap-2">
                <p className="text-sm md:text-lg font-medium text-primary">₹{product.price}</p>
                {hasDiscount && (
                  <p className="text-[10px] md:text-sm text-primary/40 line-through">₹{product.originalPrice}</p>
                )}
              </div>
            </div>
            
            <button 
              suppressHydrationWarning
              onClick={handleAdd}
              disabled={isSoldOut}
              className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSoldOut 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : added 
                    ? 'bg-[#2E7D4F] text-white border-transparent' 
                    : isPreOrder
                    ? 'border border-purple-500/40 text-purple-600 hover:bg-purple-600 hover:border-transparent hover:text-white'
                    : 'border border-primary/20 text-primary hover:bg-[#C9A24A] hover:border-transparent hover:text-white'
              }`}
            >
              {added ? <IconCheck size={14} className="md:w-[18px] md:h-[18px]" /> : <span className="text-lg md:text-xl font-light mb-0.5">+</span>}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
