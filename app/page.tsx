import { HeroSection } from "@/components/organisms/HeroSection";
import { QuoteSection } from "@/components/organisms/QuoteSection";
import { MenuPreviewSection } from "@/components/organisms/MenuPreviewSection";
import { SignatureDishSection } from "@/components/organisms/SignatureDishSection";
import { VideoReelSection } from "@/components/organisms/VideoReelSection";
import { CraftSection } from "@/components/organisms/CraftSection";
import { CtaSection } from "@/components/organisms/CtaSection";
import { LiveDispatchTicker } from "@/components/organisms/LiveDispatchTicker";
import { client } from "@/sanity/lib/client";
import { RECENT_ORDER_EVENTS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "home"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("home", {
    title: "OVOW FOODS – Pure Vegetarian Food Delivery in Ahmedabad",
    description: "Premium 100% pure vegetarian cloud kitchen in Ahmedabad. Heritage recipes, Dum Matka Biryani, paneer specials & comfort meals — order online for fresh delivery.",
    path: "/",
    absoluteTitle: true,
  });
}

// Revalidate every 60s so the ticker stays fresh without rebuilding
export const revalidate = 60;

interface OrderEvent {
  _id: string;
  orderId: string;
  area: string;
  itemCount: number;
  paymentMethod: string;
  placedAt: string;
}

export default async function Home() {
  // Fetch real order events from Sanity (anonymised, no PII)
  let orderEvents: OrderEvent[] = [];
  try {
    const result = await client.fetch<OrderEvent[]>(RECENT_ORDER_EVENTS_QUERY);
    orderEvents = Array.isArray(result) ? result : [];
  } catch {
    // Silently fail — ticker just won't show if Sanity is unavailable
  }

  return (
    <div className="bg-[#F9F6F0]">
      <HeroSection />
      {/* Live dispatch ticker — only shows when there are real events */}
      {orderEvents.length > 0 && (
        <div className="bg-[#F9F6F0] py-4 border-b border-primary/5">
          <LiveDispatchTicker events={orderEvents} />
        </div>
      )}
      <QuoteSection />
      <MenuPreviewSection />
      <SignatureDishSection />
      <VideoReelSection />
      <CraftSection />
      <CtaSection />
    </div>
  );
}
