"use client";

import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { openWhatsAppInquiry } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  return (
    <button suppressHydrationWarning
      onClick={() => openWhatsAppInquiry()}
      className="hidden md:flex fixed bottom-24 right-5 md:bottom-8 z-50 w-14 h-14 bg-[#25D366] text-white items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </button>
  );
}
