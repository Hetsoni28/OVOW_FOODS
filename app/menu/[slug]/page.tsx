import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconCheckCircle, IconLeaf, IconUtensilsCrossed, IconTrophy, IconSignatureDish, IconKidsSpecial, IconPreOrder } from "@/components/atoms/Icons";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { sanityImageUrl } from "@/lib/sanityImage";
import Image from "next/image";
import { ScrollToTop } from "@/components/atoms/ScrollToTop";
import { client } from "@/sanity/lib/client";
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_VIDEOS_QUERY, PRODUCT_SLUGS_QUERY, RELATED_PRODUCTS_QUERY, PRODUCT_REVIEWS_QUERY } from "@/sanity/lib/queries";
import { AddToCartBlock } from "./AddToCartBlock";
import { ProductCard } from "@/components/molecules/ProductCard";
import { RelatedProductsRow } from "@/components/organisms/RelatedProductsRow";
import { ProductDetails } from "@/components/organisms/ProductDetails";
import { ProductReviews } from "@/components/organisms/ProductReviews";
import { ReminderButton } from "@/components/organisms/ReminderModal";
import type { Metadata } from "next";
import type { Product } from "@/types";
import { pageMetadata, withCmsSeo, jsonLd, absoluteUrl, breadcrumbJsonLd, RESTAURANT_ID, productImageAlt, productTitle } from "@/lib/seo";

// Prerender every product at build time and refresh in the background every 60s.
// New products still render on first request (dynamicParams defaults to true).
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(PRODUCT_SLUGS_QUERY).catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

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

  // Unknown slugs are turned into a real 404 by proxy.ts before rendering starts
  if (!product) notFound();

  // Editor's SEO description → dish description (+ brand/location if short) → template
  // Dish description (+ brand/location if short) → template. The editor's SEO
  // block (title, description, image, canonical, noindex) is applied on top below.
  const base = product.description?.trim() || "";
  const suffix = ` Order online from OVOW FOODS, Ahmedabad's pure veg kitchen.`;
  const description = (
    base
      ? base.length < 100 ? `${base}${suffix}` : base
      : `${product.name} — ₹${product.price}. Premium 100% pure vegetarian from OVOW FOODS, Ahmedabad. Order online for fresh delivery.`
  ).slice(0, 160);
  const image = product.thumbnailUrl
    ? { url: sanityImageUrl(product.thumbnailUrl, 1200, 630)!, width: 1200, height: 630, alt: productImageAlt(product) }
    : undefined;

  return pageMetadata(
    withCmsSeo(
      {
        // Absolute title bypasses the "%s | OVOW FOODS" template — avoids a stray
        // <title> text node during SSR/streaming with Turbopack.
        title: productTitle(product),
        absoluteTitle: true,
        description,
        path: `/menu/${product.slug}`,
        image,
      },
      product.seo
    )
  );
}

const SCHEMA_AVAILABILITY: Record<string, string> = {
  soldout: "https://schema.org/OutOfStock",
  preorder: "https://schema.org/PreOrder",
  limited: "https://schema.org/LimitedAvailability",
  available: "https://schema.org/InStock",
};

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

  type ReviewItem = { _id: string; name: string; rating: number; comment: string; date: string };
  const [allProducts, relatedProducts, productReviews] = await Promise.all([
    client.fetch<Product[]>(PRODUCT_VIDEOS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch<Product[]>(
      RELATED_PRODUCTS_QUERY,
      { category: product.category, slug: product.slug },
      { next: { revalidate: 60 } }
    ),
    client.fetch<ReviewItem[]>(PRODUCT_REVIEWS_QUERY, { slug: product.slug }, { next: { revalidate: 60 } }),
  ]);

  const status = (product as any).availabilityStatus ?? (product.available === false ? 'soldout' : 'available');
  const isSoldOut = status === 'soldout' || product.available === false;
  const isPreOrder = status === 'preorder';
  const isKidsSpecial = !!(product as any).isKidsSpecial;

  // Fallback video logic for main product
  let mainFallbackVideo = undefined;
  if (!product.previewVideo && !product.thumbnailUrl) {
    let rp = allProducts.find((p) => p.category === product.category && p.previewVideo);
    if (!rp) rp = allProducts.find((p) => p.previewVideo);
    if (rp) mainFallbackVideo = rp.previewVideo;
  }
  const mainDisplayVideo = product.previewVideo || mainFallbackVideo;

  const productUrl = absoluteUrl(`/menu/${product.slug}`);
  const ratedReviews = productReviews.filter((r) => r.rating >= 1 && r.rating <= 5);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || `${product.name} from OVOW FOODS — 100% pure vegetarian.`,
    url: productUrl,
    sku: product.slug,
    ...(product.thumbnailUrl && { image: [sanityImageUrl(product.thumbnailUrl, 1200, 1200)] }),
    ...(product.category && { category: String(product.category) }),
    brand: { "@type": "Brand", name: "OVOW FOODS" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: product.price,
      availability: SCHEMA_AVAILABILITY[isSoldOut ? "soldout" : status] ?? SCHEMA_AVAILABILITY.available,
      seller: { "@id": RESTAURANT_ID },
    },
    ...(ratedReviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (ratedReviews.reduce((sum, r) => sum + r.rating, 0) / ratedReviews.length).toFixed(1),
        reviewCount: ratedReviews.length,
        bestRating: 5,
        worstRating: 1,
      },
      review: ratedReviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        datePublished: r.date,
        reviewBody: r.comment,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      })),
    }),
  };
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: product.name, path: `/menu/${product.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#F8F4EA] pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([productSchema, breadcrumbSchema])} />
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Back button */}
        <Link 
          href="/menu"
          className="inline-flex items-center gap-2 text-primary/70 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8"
        >
          <IconArrowLeft size={16} />
          Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Video & Badges */}
          <div className="relative">
            <div className="relative aspect-[3/4] md:aspect-[4/5] bg-primary/5 overflow-hidden">
              {mainDisplayVideo ? (
                <LazyVideo
                  src={mainDisplayVideo}
                  poster={sanityImageUrl(product.thumbnailUrl, 900, 1125)}
                  className="w-full h-full object-cover"
                  deferUntilIdle // Sanity product videos are 2–3 MB each — never compete with page load
                />
              ) : product.thumbnailUrl ? (
                <Image
                  src={product.thumbnailUrl}
                  alt={productImageAlt(product)}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#F8F4EA] flex items-center justify-center text-primary/70 text-sm font-bold tracking-widest uppercase">
                  No Image
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
                {isPreOrder && (
                  <span className="bg-purple-700/90 text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl backdrop-blur-sm flex items-center gap-2">
                    <IconPreOrder size={12} /> Pre-Order Only
                  </span>
                )}
                {!isSoldOut && !isPreOrder && isKidsSpecial && (
                  <span className="bg-rose-500/90 text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl backdrop-blur-sm flex items-center gap-2">
                    <IconKidsSpecial size={12} /> Kids Special
                  </span>
                )}
                {!isSoldOut && !isPreOrder && (product.isSignature || (product as any).signature) && (
                  <span className="bg-[#C9A24A] text-[#0B2118] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl flex items-center gap-2">
                    <IconSignatureDish size={12} /> Signature Dish
                  </span>
                )}
                {!isSoldOut && !isPreOrder && (product.isBestseller || (product as any).isBestSeller) && (
                  <span className="bg-white/95 backdrop-blur-md text-[#0B2118] px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold shadow-xl flex items-center gap-2">
                    <IconTrophy size={12} className="text-[#C9A24A]" /> Bestseller
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

        {/* Pre-Order Reminder Button */}
        {!isSoldOut && (
          <div className="mt-10 flex justify-center">
            <ReminderButton productName={product.name} productPrice={product.price} />
          </div>
        )}

        {/* You Might Also Like */}
        <RelatedProductsRow products={relatedProducts} allProducts={allProducts} />

        {/* Product Reviews */}
        <ProductReviews reviews={productReviews} productName={product.name} />

      </div>
    </div>
  );
}
