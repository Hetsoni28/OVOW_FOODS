import { AboutHero } from "@/components/organisms/AboutHero";
import { AboutContent } from "@/components/organisms/AboutContent";
import { AboutLocation } from "@/components/organisms/AboutLocation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn the story behind OVOW FOODS — a premium 100% pure vegetarian cloud kitchen in Ahmedabad crafting extraordinary flavours with heritage recipes.",
  openGraph: {
    title: "About OVOW FOODS | Our Story",
    description: "A sensory journey into heritage vegetarian cuisine, crafted for the conscious palate.",
  },
};


export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-24 pb-20 selection:bg-primary selection:text-white">
      <AboutHero />
      <AboutContent />
      <AboutLocation />
    </main>
  );
}
