"use client";

import { useState } from "react";
import { Plus, Minus, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export function AddToCartBlock({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAdd = () => {
    // Add multiple items based on selected quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart(); // Automatically open cart drawer after short delay
    }, 800);
  };

  return (
    <div className="mt-10 pt-10 border-t border-primary/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        
        {/* Quantity Selector */}
        <div className="flex items-center gap-6 bg-white px-6 py-4 border border-primary/10">
          <button
            onClick={handleDecrease}
            className="text-primary/40 hover:text-primary transition-colors disabled:opacity-30"
            disabled={quantity <= 1}
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <span className="font-serif text-xl font-medium min-w-[20px] text-center text-primary">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="text-primary/40 hover:text-primary transition-colors"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          disabled={added}
          suppressHydrationWarning
          className={`flex-1 w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            added
              ? "bg-[#2E7D4F] text-white"
              : "bg-primary text-white hover:bg-[#1A4D3A] hover:shadow-lg hover:-translate-y-0.5"
          }`}
        >
          {added ? (
            <>
              <Check size={16} /> Added successfully
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> Add to Cart — ₹{product.price * quantity}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
