"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/config";
import { fadeUp } from "@/lib/animations";

export function ContactMap() {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY_CONFIG.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="relative w-full aspect-square md:aspect-[21/9] bg-primary/5 overflow-hidden group mb-12"
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
      ></iframe>

      {/* Floating Info Card */}
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md p-6 md:p-8 max-w-sm border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 shrink-0 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
            <MapPin size={20} className="text-[#C9A24A]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-primary mb-2">Visit our Kitchen</h2>
            <p className="text-primary/70 text-sm leading-relaxed">
              {COMPANY_CONFIG.address}
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile-only visible info card (since hover doesn't work well on mobile) */}
      <div className="absolute top-4 left-4 right-4 md:hidden bg-white/95 backdrop-blur-md p-4 border border-white/20 shadow-lg">
        <div className="flex gap-3 items-start">
          <MapPin size={18} className="text-[#C9A24A] shrink-0 mt-0.5" />
          <p className="text-primary/80 text-xs leading-relaxed font-medium">
            {COMPANY_CONFIG.address}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
