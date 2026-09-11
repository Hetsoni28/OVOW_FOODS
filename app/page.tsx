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

export const metadata: Metadata = {
  title: "OVOW FOODS | Taste the WOW. Experience OVOW.",
  description: "Experience a sensory journey into heritage vegetarian cuisine. Crafted for the conscious palate.",
};

// Revalidate every 60s so the ticker stays fresh without rebuilding
export const revalidate = 60;

export default async function Home() {
  // Fetch real order events from Sanity (anonymised, no PII)
  let orderEvents: Awaited<ReturnType<typeof client.fetch>> = [];
  try {
    orderEvents = await client.fetch(RECENT_ORDER_EVENTS_QUERY);
  } catch {
    // Silently fail — ticker just won't show if Sanity is unavailable
  }

  return (
    <main className="bg-[#F9F6F0]">
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
    </main>
  );
}
