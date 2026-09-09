import { AboutHero } from "@/components/organisms/AboutHero";
import { AboutContent } from "@/components/organisms/AboutContent";
import { AboutLocation } from "@/components/organisms/AboutLocation";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-12 pb-20 selection:bg-primary selection:text-white">
      <AboutHero />
      <AboutContent />
      <AboutLocation />
    </main>
  );
}
