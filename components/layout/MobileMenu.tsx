"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/reviews", label: "Reviews" },
    { href: "/party-bulk-orders", label: "Bulk Orders" },
    { href: "/contact", label: "Contact" },
  ];

  // Lock/unlock body scroll using a CSS class (more reliable than inline style)
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("menu-open");
    } else {
      document.documentElement.classList.remove("menu-open");
    }
    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[99] bg-black/40"
        style={{ animation: "menuFadeIn 0.3s ease both" }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm z-[100] flex flex-col bg-[#F9F6F0] shadow-2xl"
        style={{ animation: "menuSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10 flex-shrink-0">
          <span className="font-serif text-xl font-bold tracking-tight text-primary">
            OVOW FOODS
          </span>
          <button
            onClick={onClose}
            className="p-2 text-primary hover:opacity-70 transition-opacity"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links — scrollable */}
        <div className="flex flex-col px-6 py-6 gap-0 overflow-y-auto flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-serif text-primary hover:opacity-70 transition-opacity block py-4 border-b border-primary/5 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer — above mobile bottom bar (80px clearance) */}
        <div className="p-6 pb-24 border-t border-primary/10 flex-shrink-0">
          <p className="text-xs uppercase tracking-widest text-primary/50 font-bold mb-2">
            Get in touch
          </p>
          <a href="tel:+917567566214" className="text-primary hover:opacity-70 text-sm block mb-1 font-medium">
            +91 75675 66214
          </a>
          <a href="mailto:hello@ovowfoods.com" className="text-primary hover:opacity-70 text-sm block">
            hello@ovowfoods.com
          </a>
        </div>
      </div>
    </>
  );
}

