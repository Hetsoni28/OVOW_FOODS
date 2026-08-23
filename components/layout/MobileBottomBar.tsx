"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, Images, ShoppingBag, Receipt } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { openWhatsAppInquiry } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function MobileBottomBar() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (pathname === "/checkout") return null;

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      if (latest > previous) {
        setHidden(true);
      } else if (latest < previous) {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
  });

  useEffect(() => { setMounted(true); }, []);

  const navItems = [
    { label: "Menu", href: "/menu", icon: UtensilsCrossed },
    { label: "Orders", href: "/orders", icon: Receipt },
    { label: "Gallery", href: "/gallery", icon: Images },
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      suppressHydrationWarning 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F9F6F0] border-t border-primary/10 flex items-stretch pb-4"
    >
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-1 flex-col items-center justify-center py-3 gap-1 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
            pathname === href ? "text-primary" : "text-primary/40 hover:text-primary"
          }`}
        >
          <Icon size={18} strokeWidth={1.5} />
          {label}
        </Link>
      ))}

      {/* Cart */}
      <button
        onClick={openCart}
        suppressHydrationWarning
        className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-primary/40 hover:text-primary transition-colors relative"
      >
        <span className="relative">
          <ShoppingBag size={18} strokeWidth={1.5} />
          {mounted && count > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#C9A24A] text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center px-0.5">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </span>
        Cart
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => openWhatsAppInquiry()}
        suppressHydrationWarning
        className="flex flex-1 flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-[#25D366] hover:opacity-80 transition-opacity"
      >
        <WhatsAppIcon className="w-[18px] h-[18px]" />
        WhatsApp
      </button>
    </motion.nav>
  );
}
