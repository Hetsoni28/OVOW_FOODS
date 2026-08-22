import { HeroSection } from "@/components/organisms/HeroSection";
import { QuoteSection } from "@/components/organisms/QuoteSection";
import { MenuPreviewSection } from "@/components/organisms/MenuPreviewSection";
import { SignatureDishSection } from "@/components/organisms/SignatureDishSection";
import { VideoReelSection } from "@/components/organisms/VideoReelSection";
import { CraftSection } from "@/components/organisms/CraftSection";
import { CtaSection } from "@/components/organisms/CtaSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OVOW FOODS | Taste the WOW. Experience OVOW.",
  description: "Experience a sensory journey into heritage vegetarian cuisine. Crafted for the conscious palate.",
};

export default function Home() {
  return (
    <main className="bg-[#F9F6F0]">
      <HeroSection />
      <QuoteSection />
      <MenuPreviewSection />
      <SignatureDishSection />
      <VideoReelSection />
      <CraftSection />
      <CtaSection />
    </main>
  );
}
