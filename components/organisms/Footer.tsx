import Link from "next/link";
import { IconPhone, IconInstagram, IconFacebook, IconMapPin } from "@/components/atoms/Icons";
import { Logo } from "@/components/atoms/Logo";
import { COMPANY_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-primary py-8 text-white text-center mt-auto">
      <div className="container-x flex flex-col items-center">
        
        {/* Shop Info Bar */}
        <div className="w-full max-w-6xl mb-8">
          <div className="border border-tertiary py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            
            {/* Phone */}
            <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 shrink-0 border border-tertiary flex items-center justify-center text-tertiary">
                <IconPhone size={24} className="fill-tertiary" />
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
                <IconInstagram size={24} />
              </div>
              <span className="text-white text-sm md:text-base font-medium">ovow foods</span>
            </a>

            <div className="hidden md:block w-px h-12 bg-tertiary"></div>

            {/* Facebook */}
            <a href={COMPANY_CONFIG.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 shrink-0 bg-[#1877F2] flex items-center justify-center text-white">
                <IconFacebook size={24} className="fill-white stroke-none" />
              </div>
              <span className="text-white text-sm md:text-base font-medium">ovow foods</span>
            </a>

            <div className="hidden md:block w-px h-12 bg-tertiary"></div>

            {/* Location */}
            <a href="https://maps.google.com/?q=OVOW+FOODS+Ahmedabad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity max-w-[250px] text-left">
              <div className="text-tertiary shrink-0">
                <IconMapPin size={32} className="fill-tertiary text-primary" />
              </div>
              <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                {COMPANY_CONFIG.address} <br/> <span className="text-tertiary font-bold">{COMPANY_CONFIG.hours}</span>
              </span>
            </a>

          </div>
        </div>

        <div className="mb-4 flex flex-col items-center gap-2">
          <Logo className="h-12 w-12 md:h-14 md:w-14 mx-auto" />
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
            OVOW FOODS
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-xs opacity-70 uppercase tracking-widest font-medium">
          <Link href="/about" className="hover:text-[#C9A24A] hover:opacity-100 transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-[#C9A24A] hover:opacity-100 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-[#C9A24A] hover:opacity-100 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/contact" className="hover:text-[#C9A24A] hover:opacity-100 transition-colors">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-6 w-full max-w-4xl mx-auto px-4">
          <Link href="/menu" className="flex-1 min-w-[160px] bg-[#C9A24A] text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#1D5A40] hover:border-[#1D5A40] hover:text-[#C9A24A] transition-colors shadow-sm border border-[#C9A24A]">
            Order Now
          </Link>
          <Link href="/menu" className="flex-1 min-w-[160px] bg-[#C9A24A] text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#1D5A40] hover:border-[#1D5A40] hover:text-[#C9A24A] transition-colors shadow-sm border border-[#C9A24A]">
            Pre-Order Now
          </Link>
          <Link href="/party-bulk-orders" className="flex-1 min-w-[160px] bg-[#C9A24A] text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#1D5A40] hover:border-[#1D5A40] hover:text-[#C9A24A] transition-colors shadow-sm border border-[#C9A24A]">
            Catering / Bulk Order
          </Link>
        </div>

        {/* Developer Credit — Premium Bottom Bar */}
        <div className="mt-8 w-full border-t border-white/[0.08]">
          {/* Main Credit Bar */}
          <div className="border-t border-white/[0.05] pt-5 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            
            {/* Copyright */}
            <p className="text-white/25 text-[10px] tracking-widest uppercase font-medium order-2 sm:order-1">
              &copy; {new Date().getFullYear()} OVOW Foods. All rights reserved.
            </p>

            {/* Designer Badge */}
            <a
              href="https://hetsoni28-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 order-1 sm:order-2"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A]/30 flex items-center justify-center group-hover:bg-[#C9A24A]/30 group-hover:border-[#C9A24A]/60 transition-all duration-300">
                <span className="text-[#C9A24A] text-[10px] font-black tracking-tight">SH</span>
              </div>

              {/* Text */}
              <div className="flex flex-col text-left">
                <span className="text-white/20 text-[8px] uppercase tracking-[0.25em] font-medium group-hover:text-white/40 transition-colors duration-300">
                  Designed &amp; Developed by
                </span>
                <span className="text-[#C9A24A]/60 group-hover:text-[#C9A24A] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.15em]">
                  Soni Het
                </span>
              </div>

              {/* Arrow */}
              <svg
                className="w-3 h-3 text-white/10 group-hover:text-[#C9A24A]/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
