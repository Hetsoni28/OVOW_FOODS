import { CheckCircle2 } from "lucide-react";
import { AddToCartBlock } from "@/app/menu/[slug]/AddToCartBlock";
import type { Product } from "@/types";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="flex flex-col justify-center">
      
      {/* Pure Veg Tag */}
      <div className="flex items-center gap-2 mb-6">
        <span className="flex items-center justify-center w-6 h-6 border-2 border-[#2E7D4F] rounded-sm">
          <span className="w-3 h-3 rounded-full bg-[#2E7D4F]" />
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D4F]">
          100% Pure Vegetarian
        </span>
      </div>

      <h1 className="font-serif text-5xl md:text-6xl text-primary leading-tight mb-4">
        {product.name}
      </h1>
      
      <p className="text-xl md:text-2xl font-serif text-primary/80 mb-8">
        ₹{product.price.toLocaleString("en-IN")}
        {product.originalPrice && (
          <span className="ml-3 text-base text-primary/40 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        )}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-8 pb-8 border-b border-primary/10">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-1">Portion Size</p>
          <p className="text-lg text-primary">{product.size}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-1">Preparation Time</p>
          <p className="text-lg text-primary">25-30 mins</p>
        </div>
      </div>

      {/* Description */}
      <div className="prose prose-p:text-primary/70 prose-p:leading-relaxed">
        <p>
          {product.description ||
            `Experience the authentic taste of our premium ${product.name}. Carefully prepared by our master chefs using hand-picked ingredients and traditional recipes to bring you an unforgettable culinary journey.`}
        </p>
      </div>

      {/* Guarantees */}
      <ul className="mt-8 space-y-3">
        {[
          "Freshly prepared upon order",
          "Premium quality ingredients",
          "No artificial colors or preservatives"
        ].map((text, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-primary/60 font-medium">
            <CheckCircle2 size={16} className="text-[#C9A24A]" /> {text}
          </li>
        ))}
      </ul>

      {/* Interactive Add to Cart Component */}
      <AddToCartBlock product={product} />
    </div>
  );
}
