import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerFast } from "@/lib/animations";
import { BulkOrderForm } from "@/components/organisms/BulkOrderForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party & Bulk Orders",
  description: "Planning a party, wedding, or corporate event in Ahmedabad? OVOW FOODS delivers premium 100% vegetarian bulk catering. Enquire now!",
  openGraph: {
    title: "Party & Bulk Orders | OVOW FOODS",
    description: "Premium vegetarian catering for parties, weddings & events. Order now.",
  },
};

export default function BulkOrdersPage() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-20">
      <div className="container-x">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          
          {/* Left Side: Visuals & Copy */}
          <motion.div
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center lg:pr-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 md:w-12 h-[1px] bg-[#C9A24A]"></span>
              <p className="text-[#C9A24A] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold m-0">
                Planning something special?
              </p>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-primary leading-tight mb-6 md:mb-8">
              Elevate Your <br/><span className="text-[#C9A24A] italic">Gatherings</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-primary/70 leading-relaxed mb-10 md:mb-12 max-w-md">
              From intimate gatherings to grand celebrations, OVOW brings a premium, 100% pure vegetarian culinary experience right to your venue. Fill out the details to start designing your bespoke menu.
            </motion.p>

            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-8 pt-8 md:pt-10 border-t border-primary/10">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-3">Purity Guaranteed</h4>
                <p className="text-primary/60 text-sm leading-relaxed">100% Pure Vegetarian with custom No Onion & No Garlic options available.</p>
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-primary mb-3">Bespoke Menus</h4>
                <p className="text-primary/60 text-sm leading-relaxed">Curated to your specific taste, dietary requirements, and event scale.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Form Component */}
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 md:p-12 shadow-sm border border-primary/5"
          >
            <BulkOrderForm />
          </motion.div>

        </div>
      </div>
    </main>
  );
}
