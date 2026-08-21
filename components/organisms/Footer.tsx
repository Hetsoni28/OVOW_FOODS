import Link from "next/link";
import { Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { COMPANY_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-primary py-16 text-white text-center mt-auto">
      <div className="container-x flex flex-col items-center">
        
        {/* Shop Info Bar */}
        <div className="w-full max-w-6xl mb-16">
          <div className="border border-tertiary py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
            
            {/* Phone */}
            <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 shrink-0 border border-tertiary flex items-center justify-center text-tertiary">
                <Phone size={24} className="fill-tertiary" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-tertiary text-[10px] uppercase tracking-widest font-bold">Order Now</span>
                <span className="text-white text-xl md:text-2xl font-bold tracking-wider">{COMPANY_CONFIG.phone}</span>
              </div>
            </a>

            <div className="hidden md:block w-px h-12 bg-tertiary"></div>

            {/* Instagram */}
            <a href={COMPANY_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 shrink-0 bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] flex items-center justify-center text-white p-2">
                <Instagram size={24} />
              </div>
              <span className="text-white text-sm md:text-base font-medium">ovow foods</span>
            </a>

            <div className="hidden md:block w-px h-12 bg-tertiary"></div>

            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 shrink-0 bg-[#1877F2] flex items-center justify-center text-white">
                <Facebook size={24} className="fill-white stroke-none" />
              </div>
              <span className="text-white text-sm md:text-base font-medium">ovow foods</span>
            </a>

            <div className="hidden md:block w-px h-12 bg-tertiary"></div>

            {/* Location */}
            <a href="https://maps.google.com/?q=OVOW+FOODS+Ahmedabad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity max-w-[250px] text-left">
              <div className="text-tertiary shrink-0">
                <MapPin size={32} className="fill-tertiary text-primary" />
              </div>
              <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                {COMPANY_CONFIG.address} <br/> <span className="text-tertiary font-bold">{COMPANY_CONFIG.hours}</span>
              </span>
            </a>

          </div>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4">
          <Logo className="h-20 w-20 md:h-24 md:w-24 mx-auto" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            OVOW FOODS
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-70">
          <Link href="/about" className="hover:opacity-100 transition-opacity">
            About
          </Link>
          <Link href="/menu" className="hover:opacity-100 transition-opacity">
            Menu
          </Link>
          <Link href="/gallery" className="hover:opacity-100 transition-opacity">
            Gallery
          </Link>
          <Link href="/reviews" className="hover:opacity-100 transition-opacity">
            Reviews
          </Link>
          <Link href="/party-bulk-orders" className="hover:opacity-100 transition-opacity">
            Bulk Order
          </Link>
          <Link href="/contact" className="hover:opacity-100 transition-opacity">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
