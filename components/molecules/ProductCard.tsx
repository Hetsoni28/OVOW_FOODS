"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Check, Star, Flame, ChefHat } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="group relative flex flex-col h-full bg-[#123B2A]/30 border border-white/5 hover:border-[#C9A24A]/40 transition-all duration-500 overflow-hidden">
      {/* Image Container - taller aspect ratio for elegance */}
      <Link href={`/menu/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-[#0B2118]">
        {product.previewVideo ? (
          <video
            src={`${product.previewVideo}#t=0.001`}
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => e.currentTarget.pause()}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        ) : (
          <Image
            src={product.image || "/placeholder-food.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
        )}
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118] via-transparent to-black/30" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isSignature && (
            <span className="bg-[#C9A24A] text-white px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
              <Star size={10} fill="white" /> Signature
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#123B2A]/80 backdrop-blur-md border border-[#C9A24A]/30 text-[#C9A24A] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shadow-lg">
              <Flame size={10} /> Bestseller
            </span>
          )}
        </div>

        {/* Veg mark */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center justify-center w-5 h-5 bg-white/10 backdrop-blur-md border border-[#2E7D4F] rounded-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-1 flex-col p-5 md:p-6 relative z-10 -mt-10 bg-gradient-to-t from-[#0B2118] via-[#0B2118] to-transparent pt-10">
        <Link href={`/menu/${product.slug}`} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#C9A24A] flex items-center gap-1.5">
              <ChefHat size={12} /> {typeof product.category === 'string' ? product.category : product.category?.name || 'Dish'}
            </span>
            {hasDiscount && (
              <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
                Save
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl md:text-2xl text-white leading-tight mb-2 group-hover:text-[#C9A24A] transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-xs md:text-sm text-white/50 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{product.servingSize || product.size || '1 Portion'}</p>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl text-white">₹{product.price}</span>
                {hasDiscount && (
                  <span className="text-sm text-white/30 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>
            
            <button
              onClick={handleAdd}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border ${
                added 
                  ? "bg-[#2E7D4F] border-[#2E7D4F] text-white" 
                  : "bg-transparent border-[#C9A24A]/40 text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white hover:border-[#C9A24A]"
              }`}
            >
              {added ? <Check size={16} strokeWidth={2.5} /> : <Plus size={16} />}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
