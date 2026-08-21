import { CheckCircle2, Clock, Scale } from "lucide-react";
import { AddToCartBlock } from "@/app/menu/[slug]/AddToCartBlock";
import type { Product } from "@/types";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center">
      
      {/* Pure Veg Tag */}
      {product.vegetarian !== false && (
        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center justify-center w-5 h-5 border-2 border-[#2E7D4F] rounded-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D4F]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D4F]">
            100% Pure Vegetarian
          </span>
        </div>
      )}

      {/* Luxury Typography */}
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">
        {product.name}
      </h1>
      <div className="w-16 h-1 bg-[#C9A24A] mb-8 rounded-full" />
      
      <p className="text-2xl md:text-3xl font-serif text-primary mb-8">
        ₹{product.price.toLocaleString("en-IN")}
        {product.originalPrice && (
          <span className="ml-4 text-lg text-primary/40 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </p>

      {/* Details Grid (Soft Cards) */}
      <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-primary/10">
        <div className="bg-white p-5 rounded-none shadow-sm border border-primary/5 flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
          <Scale size={20} className="text-[#C9A24A]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Portion Size</p>
          {/* @ts-ignore */}
          <p className="text-lg font-medium text-primary">{product.servingSize || product.size || "1 Portion"}</p>
        </div>
        <div className="bg-white p-5 rounded-none shadow-sm border border-primary/5 flex flex-col gap-2 transition-transform hover:-translate-y-1 duration-300">
          <Clock size={20} className="text-[#C9A24A]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Prep Time</p>
          <p className="text-lg font-medium text-primary">25-30 mins</p>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-p:text-primary/70 prose-p:leading-relaxed prose-p:text-lg">
        <p>
          {product.description ||
            `Experience the authentic taste of our premium ${product.name}. Carefully prepared by our master chefs using hand-picked ingredients and traditional recipes to bring you an unforgettable culinary journey.`}
        </p>
      </div>

      {/* Guarantees (Feature Grid) */}
      <div className="mt-8 grid gap-3">
        {[
          "Freshly prepared upon order",
          "Premium quality ingredients",
          "No artificial colors or preservatives"
        ].map((text, i) => (
          <div key={i} className="flex items-center gap-4 bg-primary/5 px-4 py-3 rounded-none border border-primary/10">
            <div className="bg-white rounded-none p-1 shadow-sm">
              <CheckCircle2 size={16} className="text-[#C9A24A]" />
            </div>
            <span className="text-sm text-primary/80 font-medium">{text}</span>
          </div>
        ))}
      </div>

      {/* Interactive Add to Cart Component */}
      <AddToCartBlock product={product} />
    </div>
  );
}
