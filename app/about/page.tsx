import { AboutHero } from "@/components/organisms/AboutHero";
import { AboutContent } from "@/components/organisms/AboutContent";
import { AboutLocation } from "@/components/organisms/AboutLocation";
import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/pageSeo";

// Defaults below; editors can override them in Sanity Studio → Page SEO → "about"
export function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata("about", {
    title: "About Us – Pure Veg Cloud Kitchen in Ahmedabad",
    description: "The story behind OVOW FOODS — a premium 100% pure vegetarian cloud kitchen in Ahmedabad crafting extraordinary flavours from heritage recipes.",
    path: "/about",
  });
}


export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F4EA] pt-24 pb-20 selection:bg-primary selection:text-white">
      <AboutHero />
      <AboutContent />
      <AboutLocation />
    </div>
  );
}
