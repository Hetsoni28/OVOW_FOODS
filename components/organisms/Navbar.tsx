"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconShoppingBag, IconMenu } from "@/components/atoms/Icons";
import { motion } from "framer-motion";
import { Logo } from "@/components/atoms/Logo";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { InstallAppButton } from "@/components/atoms/InstallAppButton";

export function Navbar() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isWiggling, setIsWiggling] = useState(false);

  useEffect(() => {
    if (count > 0 && mounted) {
      setIsWiggling(true);
      const timer = setTimeout(() => setIsWiggling(false), 500);
      return () => clearTimeout(timer);
    }
  }, [count, mounted]);

  const isHome = pathname === "/";
  const isMenu = pathname === "/menu";
  const isDarkHero = isHome || isMenu;
  const isTransparent = isDarkHero && !isScrolled;

  return (
    <nav suppressHydrationWarning
      className={`w-full z-50 transition-all duration-300 fixed top-0 ${
        isTransparent
          ? "text-white border-transparent shadow-none"
          : "bg-[#F9F6F0] text-primary border-b border-primary/10 shadow-sm"
      }`}
    >
      {/* Background Gradient for Transparent State — Ensures readability over bright images */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[160px] bg-gradient-to-b from-black/80 via-black/30 to-transparent -z-10 transition-opacity duration-300 pointer-events-none ${
          isTransparent ? "opacity-100" : "opacity-0"
        }`} 
        aria-hidden="true" 
      />

      <div className={`container-x flex items-center justify-between transition-all duration-300 ${isTransparent ? "py-5" : "py-3"}`}>
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
            OVOW
          </span>
          <Logo className="h-12 w-12 md:h-14 md:w-14" />
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
            FOODS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden gap-10 text-[15px] md:flex">
          <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
          <Link href="/menu" className="hover:opacity-70 transition-opacity">Menu</Link>
          <Link href="/orders" className="hover:opacity-70 transition-opacity">Orders</Link>
          <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link href="/gallery" className="hover:opacity-70 transition-opacity">Gallery</Link>
          <Link href="/reviews" className="hover:opacity-70 transition-opacity">Reviews</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/party-bulk-orders"
            className="hidden md:flex items-center gap-2 text-[15px] hover:opacity-70 transition-opacity"
          >
            Bulk Order
          </Link>

          {/* Cart Icon */}
          <motion.button
            onClick={openCart}
            className="relative flex items-center gap-1.5 text-inherit hover:opacity-70 transition-opacity"
            aria-label="Open cart"
            suppressHydrationWarning
            animate={isWiggling ? { 
              rotate: [0, -15, 15, -15, 15, 0],
              scale: [1, 1.2, 1]
            } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <IconShoppingBag size={22} strokeWidth={1.5} />
            {mounted && count > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={count}
                className="absolute -top-2 -right-2 bg-[#C9A24A] text-white text-[9px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center leading-none px-1"
              >
                {count > 99 ? "99+" : count}
              </motion.span>
            )}
          </motion.button>

          {/* Hamburger Menu (Mobile Only) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-12 h-12 -mr-3 text-inherit hover:opacity-70 transition-opacity"
            aria-label="Open menu"
            suppressHydrationWarning
          >
            <IconMenu size={28} className="pointer-events-none" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
}
