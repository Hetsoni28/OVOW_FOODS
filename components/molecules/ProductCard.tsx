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
    <div className="group relative flex flex-col h-full bg-white border border-primary/5 hover:border-[#C9A24A]/40 hover:shadow-[0_8px_40px_rgba(18,59,42,0.14)] transition-all duration-500 overflow-hidden">
      {/* Image Container */}
      <Link href={`/menu/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-primary/5">
        {product.previewVideo ? (
          <video
            src={product.previewVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={product.image || "/placeholder-food.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Subtle gradient overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isSignature && (
            <span className="bg-[#C9A24A] text-white px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shadow-sm">
              <Star size={10} fill="white" /> Signature
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-white/95 backdrop-blur-md text-[#0B2118] px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shadow-sm">
              <Flame size={10} className="text-[#C9A24A]" /> Bestseller
            </span>
          )}
        </div>

        {/* Veg mark */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center justify-center w-5 h-5 bg-white backdrop-blur-md border border-[#2E7D4F] rounded-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="flex flex-1 flex-col p-5 md:p-6 bg-white relative z-10">
        <Link href={`/menu/${product.slug}`} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#C9A24A] flex items-center gap-1.5">
              <ChefHat size={12} /> {typeof product.category === 'string' ? product.category : product.category?.name || 'Dish'}
            </span>
            {hasDiscount && (
              <span className="bg-red-50 text-red-600 border border-red-100 text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
                Save
              </span>
            )}
          </div>

          <h3 className="font-serif text-xl md:text-2xl text-primary leading-tight mb-2 group-hover:text-[#C9A24A] transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-xs md:text-sm text-primary/60 line-clamp-2 leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-4 flex items-end justify-between border-t border-primary/10">
            <div>
              <p className="text-[10px] text-primary/40 uppercase tracking-widest mb-1">{product.servingSize || product.size || '1 Portion'}</p>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl text-primary font-medium">₹{product.price}</span>
                {hasDiscount && (
                  <span className="text-sm text-primary/40 line-through">₹{product.originalPrice}</span>
                )}
              </div>
            </div>
            
            <button suppressHydrationWarning
              onClick={handleAdd}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
                added 
                  ? "bg-[#2E7D4F] border-[#2E7D4F] text-white shadow-md" 
                  : "bg-white border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white"
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
