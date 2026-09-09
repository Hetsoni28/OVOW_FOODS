import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconCheckCircle, IconLeaf, IconUtensilsCrossed, IconFlame, IconStar } from "@/components/atoms/Icons";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY, RELATED_PRODUCTS_QUERY, PRODUCT_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { AddToCartBlock } from "./AddToCartBlock";
import { ProductCard } from "@/components/molecules/ProductCard";
import { RelatedProductsRow } from "@/components/organisms/RelatedProductsRow";
import { ProductDetails } from "@/components/organisms/ProductDetails";
import { ProductReviews } from "@/components/organisms/ProductReviews";
import type { Metadata } from "next";
import type { Product } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(
    PRODUCT_BY_SLUG_QUERY, 
    { slug },
    { next: { revalidate: 0 } }
  );
  
  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.description || `Premium ${product.name} from OVOW Foods.`,
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch<Product | null>(
    PRODUCT_BY_SLUG_QUERY, 
    { slug },
    { next: { revalidate: 60 } }
  );
  
  if (!product) notFound();

  const allProducts = await client.fetch<Product[]>(
    ALL_PRODUCTS_QUERY, 
    {}, 
    { next: { revalidate: 60 } }
  );

  const relatedProducts = await client.fetch<Product[]>(
    RELATED_PRODUCTS_QUERY, 
    { category: product.category, slug: product.slug },
    { next: { revalidate: 60 } }
  );

  type ReviewItem = { _id: string; name: string; rating: number; comment: string; date: string };
  const productReviews = await client.fetch<ReviewItem[]>(
    PRODUCT_REVIEWS_QUERY,
    { slug: product.slug },
    { next: { revalidate: 60 } }
  );

  const isSoldOut = product.available === false;

  // Fallback video logic for main product
  let mainFallbackVideo = undefined;
  if (!product.previewVideo) {
    let rp = allProducts.find((p) => p.category === product.category && p.previewVideo);
    if (!rp) rp = allProducts.find((p) => p.previewVideo);
    if (rp) mainFallbackVideo = rp.previewVideo;
  }
  const mainDisplayVideo = product.previewVideo || mainFallbackVideo;

  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Back button */}
        <Link 
          href="/menu"
          className="inline-flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8"
        >
          <IconArrowLeft size={16} />
          Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Video & Badges */}
          <div className="relative">
            <div className="relative aspect-[4/5] bg-primary/5 overflow-hidden">
              {mainDisplayVideo ? (
                <LazyVideo 
                  src={mainDisplayVideo} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#F8F4EA] flex items-center justify-center text-primary/40 text-sm font-bold tracking-widest uppercase">
                  No Video
                </div>
              )}
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Badges Container */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {isSoldOut && (
                  <span className="bg-black/90 text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl backdrop-blur-sm">
                    Sold Out
                  </span>
                )}
                {!isSoldOut && (product.isSignature || (product as any).signature) && (
                  <span className="bg-[#C9A24A] text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl flex items-center gap-2">
                    <IconStar size={12} fill="white" /> Signature Dish
                  </span>
                )}
                {!isSoldOut && (product.isBestseller || (product as any).isBestSeller) && (
                  <span className="bg-white/95 backdrop-blur-md text-[#0B2118] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl flex items-center gap-2">
                    <IconFlame size={12} className="text-[#C9A24A]" /> Bestseller
                  </span>
                )}
              </div>
              
              {/* Veg Badge Bottom Right */}
              {product.vegetarian && (
                <div className="absolute bottom-6 right-6 w-8 h-8 bg-white rounded-md shadow-lg flex items-center justify-center pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-600 border-2 border-white ring-1 ring-green-600" />
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <ProductDetails product={product} />
        </div>

        {/* You Might Also Like */}
        <RelatedProductsRow products={relatedProducts} allProducts={allProducts} />

        {/* Product Reviews */}
        <ProductReviews reviews={productReviews} productName={product.name} />

      </div>
    </main>
  );
}
