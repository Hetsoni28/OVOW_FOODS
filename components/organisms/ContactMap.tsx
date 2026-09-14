"use client";

import { motion } from "framer-motion";
import { IconMapPin } from "@/components/atoms/Icons";
import { COMPANY_CONFIG } from "@/lib/config";
import { fadeUp } from "@/lib/animations";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}


export function ContactMap() {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY_CONFIG.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="mb-12"
    >
      {/* ── Map container ── */}
      {/* Mobile: 4:3 ratio (not too tall); Desktop: cinematic 21:9 */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-primary/5 overflow-hidden group">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
        />

        {/* Hover overlay card — desktop only (hover works on pointer devices) */}
        <div className="hidden md:block absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-8 max-w-sm border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 shrink-0 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
              <IconMapPin size={20} className="text-[#C9A24A]" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-primary mb-2">Visit our Kitchen</h2>
              <p className="text-primary/70 text-sm leading-relaxed">
                {COMPANY_CONFIG.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile info card — below the map, always visible ── */}
      <div className="md:hidden bg-white border border-primary/8 shadow-sm px-5 py-4">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 shrink-0 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mt-0.5">
            <IconMapPin size={16} className="text-[#C9A24A]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">Our Location</p>
            <p className="text-sm font-medium text-primary leading-relaxed">
              {COMPANY_CONFIG.address}
            </p>
          </div>
        </div>

        {/* Hours row */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-primary/8">
          <div className="w-9 h-9 shrink-0 bg-[#C9A24A]/10 rounded-full flex items-center justify-center">
            <ClockIcon />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-0.5">Delivery Hours</p>
            <p className="text-sm font-medium text-primary">Open Daily · Until 4:00 AM</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
