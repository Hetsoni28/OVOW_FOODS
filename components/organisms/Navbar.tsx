"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";
import { useCart } from "@/context/CartContext";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <nav 
      className={`w-full z-50 transition-all duration-300 ${
        isHome ? "fixed top-0" : "sticky top-0"
      } ${
        isTransparent
          ? "bg-transparent text-white border-transparent shadow-none"
          : "bg-[#F9F6F0] text-primary border-b border-primary/10 shadow-sm"
      }`}
    >
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
          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 text-inherit hover:opacity-70 transition-opacity"
            aria-label="Open cart"
            suppressHydrationWarning
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A24A] text-white text-[9px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center leading-none px-1">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-12 h-12 -mr-3 text-inherit hover:opacity-70 transition-opacity"
            aria-label="Open menu"
            suppressHydrationWarning
          >
            <Menu size={28} className="pointer-events-none" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
}
