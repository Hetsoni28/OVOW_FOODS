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
  const isDarkHero = pathname === "/menu" || pathname === "/gallery";

  return (
    <div className={`w-full z-40 pt-[75px] md:pt-[90px] pointer-events-none ${isDarkHero ? "absolute top-0 left-0" : "relative pb-2"}`}>
      <div className="container-x w-full pointer-events-auto">
        <motion.nav 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex flex-wrap items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest py-3 ${
            isDarkHero ? "text-white/60" : "text-primary/60"
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
