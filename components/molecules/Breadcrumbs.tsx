"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on the home page or studio
  if (pathname === "/" || pathname.startsWith("/studio")) return null;

  // Generate breadcrumb path segments
  const segments = pathname.split("/").filter((p) => p !== "");
  const isDarkHero = pathname === "/menu";

  return (
    <div className={`w-full z-40 pt-[75px] md:pt-[90px] pointer-events-none ${isDarkHero ? "absolute top-0 left-0" : "relative pb-4"}`}>
      <div className="container-x w-full pointer-events-auto">
        <motion.nav 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full backdrop-blur-md border shadow-sm ${
            isDarkHero 
              ? "bg-black/20 border-white/10 text-white/70 shadow-black/10" 
              : "bg-white/60 border-primary/10 text-primary/60 shadow-primary/5"
          }`}
        >
          <Link 
            href="/" 
            className={`hover:text-[#C9A24A] transition-colors flex items-center gap-1.5 ${isDarkHero ? "text-white" : "text-primary"}`}
          >
            <Home size={12} strokeWidth={2} />
            <span className="sr-only">Home</span>
          </Link>

          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const isLast = index === segments.length - 1;
            
            // Format segment name (e.g., "party-bulk-orders" -> "Party Bulk Orders")
            const name = segment
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div key={href} className="flex items-center gap-2">
                <ChevronRight size={10} className={isDarkHero ? "text-white/40" : "text-primary/30"} strokeWidth={3} />
                {isLast ? (
                  <span className="text-[#C9A24A]">{name}</span>
                ) : (
                  <Link href={href} className={`hover:text-[#C9A24A] transition-colors ${isDarkHero ? "text-white" : "text-primary"}`}>
                    {name}
                  </Link>
                )}
              </div>
            );
          })}
        </motion.nav>
      </div>
    </div>
  );
}
