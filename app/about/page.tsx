import { AboutHero } from "@/components/organisms/AboutHero";
import { AboutPhilosophy } from "@/components/organisms/AboutPhilosophy";
import { AboutValues } from "@/components/organisms/AboutValues";
import { AboutLocation } from "@/components/organisms/AboutLocation";

export default function About() {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pt-12 pb-20 selection:bg-primary selection:text-white">
      <AboutHero />
      <AboutPhilosophy />
      <AboutValues />
      <AboutLocation />
    </main>
  );
}
