import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Leaf, UtensilsCrossed, Flame } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY, RELATED_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { AddToCartBlock } from "./AddToCartBlock";
import { ProductCard } from "@/components/molecules/ProductCard";
import { ProductDetails } from "@/components/organisms/ProductDetails";
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
    { next: { revalidate: 60 } }
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

  const relatedProducts = await client.fetch<Product[]>(
    RELATED_PRODUCTS_QUERY, 
    { category: product.category, slug: product.slug },
    { next: { revalidate: 60 } }
  );

  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">
        
        {/* Back Link */}
        <Link 
          href="/menu" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Menu
        </Link>

        {/* Product Split Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Image Hero */}
          <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden bg-primary/5 shadow-sm">
            <Image
              src={product.image || "/placeholder-food.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-col items-start gap-3">
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-sm">
                {product.category}
              </div>
              {product.isSignature && (
                <div className="bg-[#C9A24A] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-sm">
                  Signature Dish
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <ProductDetails product={product} />
        </div>

        {/* Full Experience Video */}
        {product.fullExperienceVideo && (
          <div className="mt-20 md:mt-32 max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl text-primary mb-10 text-center">
              The full experience.
            </h2>
            <div className="relative aspect-video w-full overflow-hidden bg-black shadow-sm">
              <video
                src={product.fullExperienceVideo}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* You Might Also Like */}
        <div className="mt-32">
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10">
            You might also like
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
