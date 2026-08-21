"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/atoms/Button";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group flex flex-col h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/menu/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-primary/5">
          {product.previewVideo ? (
            <video
              src={product.previewVideo}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Image
              src={product.image || "/placeholder-food.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#F4F1E9] px-2 py-1 text-[10px] uppercase tracking-widest text-primary font-semibold">
              {product.category}
            </span>
            {product.isSignature && (
              <span className="bg-[#C9A24A] text-white px-2 py-1 text-[10px] uppercase tracking-widest font-semibold">
                Signature
              </span>
            )}
          </div>
          {/* Pure Veg dot */}
          <div className="absolute top-4 right-4">
            <span className="flex items-center justify-center w-5 h-5 border-2 border-[#2E7D4F] rounded-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/menu/${product.slug}`} className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-serif text-lg md:text-xl text-primary leading-tight flex-1 hover:opacity-70 transition-opacity">
              {product.name}
            </h3>
            <span className="font-serif text-lg text-primary whitespace-nowrap">
              ₹{product.price}
            </span>
          </div>
          <p className="text-xs text-primary/50 mb-4">{product.servingSize || product.size}</p>
          {product.description && (
            <p className="text-sm text-primary/60 mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </Link>

        {/* Add to Cart */}
        <Button
          onClick={handleAdd}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-none ${
            added
              ? "!bg-primary !text-white"
              : ""
          }`}
        >
          {added ? (
            <>
              <Check size={13} /> Added!
            </>
          ) : (
            <>
              <Plus size={13} /> Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
