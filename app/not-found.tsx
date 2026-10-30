import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconUtensilsCrossed } from "@/components/atoms/Icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for doesn't exist. Explore the OVOW FOODS menu instead.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/menu", label: "Our Menu" },
  { href: "/party-bulk-orders", label: "Party & Bulk Orders" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#F9F6F0] pt-32 pb-24 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-8 shadow-xl border border-primary/10">
          <IconUtensilsCrossed size={40} className="text-primary/60" aria-hidden="true" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A6A1F] mb-3">Error 404</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">This dish isn&apos;t on the menu</h1>
        <p className="text-primary/70 mb-10 text-lg">
          The page you&apos;re looking for has moved or no longer exists.
        </p>

        <Link
          href="/menu"
          className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 min-h-[44px] text-xs font-bold uppercase tracking-widest hover:bg-[#1A4D3A] transition-colors"
        >
          <IconArrowLeft size={16} aria-hidden="true" />
          Browse the Menu
        </Link>

        <nav aria-label="Helpful links" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <li>
              <Link href="/" className="text-primary underline underline-offset-4 hover:text-[#8A6A1F]">Home</Link>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-primary underline underline-offset-4 hover:text-[#8A6A1F]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
