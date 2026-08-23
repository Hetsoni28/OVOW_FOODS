"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { openWhatsAppOrder, CustomerDetails } from "@/lib/whatsapp";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/config";
import { buildOrderMessage } from "@/lib/whatsapp";

export function CartSummary() {
  const { items, total, clearCart, closeCart } = useCart();
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [details, setDetails] = useState<CustomerDetails>({ name: "", mobile: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [orderAttempted, setOrderAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(): boolean {
    const e: Partial<CustomerDetails> = {};
    if (!details.name.trim()) e.name = "Please enter your name";
    if (!/^\d{10}$/.test(details.mobile.trim())) e.mobile = "Enter a valid 10-digit mobile number";
    if (!details.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleQuickOrder() {
    if (!validate()) return;
    openWhatsAppOrder(items, details);
    setOrderAttempted(true);
  }

  function handleCopyOrder() {
    const msg = buildOrderMessage(items, details);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border-t border-primary/10 pt-4 mt-2">
      {/* Subtotal */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs uppercase tracking-widest text-primary/50">Subtotal</span>
        <span className="font-serif text-2xl text-primary font-bold">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>
      <p className="text-[10px] text-primary/40 mb-5">No tax · No hidden charges</p>

      {/* Primary CTA: Checkout */}
      <Link
        href="/checkout"
        onClick={closeCart}
        className="w-full bg-primary text-white flex items-center justify-center gap-2.5 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors mb-3"
      >
        Proceed to Checkout <ArrowRight size={14} />
      </Link>

      {/* Secondary: Quick WhatsApp (collapsible) */}
      {!orderAttempted ? (
        <>
          <button
            suppressHydrationWarning
            onClick={() => setShowQuickOrder(v => !v)}
            className="w-full flex items-center justify-center gap-2 text-[11px] text-primary/40 hover:text-primary transition-colors py-1"
          >
            {showQuickOrder ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            Quick order via WhatsApp
          </button>

          {showQuickOrder && (
            <div className="mt-3 space-y-2">
              <input
                type="text" placeholder="Your Name *"
                value={details.name}
                onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
                className="w-full border border-primary/20 px-3 py-2 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              <input
                type="tel" placeholder="Mobile (10 digits) *"
                value={details.mobile}
                onChange={e => setDetails(d => ({ ...d, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="w-full border border-primary/20 px-3 py-2 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent"
              />
              {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
              <textarea
                placeholder="Delivery Address *" rows={2}
                value={details.address}
                onChange={e => setDetails(d => ({ ...d, address: e.target.value }))}
                className="w-full border border-primary/20 px-3 py-2 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent resize-none"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              <button
                suppressHydrationWarning
                onClick={handleQuickOrder}
                className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> Send on WhatsApp
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-primary/5 p-4 border border-primary/10 mt-2">
          <p className="font-serif text-sm text-primary font-bold mb-2">Couldn't open WhatsApp?</p>
          <p className="text-xs text-primary/60 mb-3">Your order is saved here.</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => openWhatsAppOrder(items, details)} className="bg-[#25D366] text-white py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors">
              Try Again
            </button>
            <button onClick={handleCopyOrder} className="bg-white border border-primary/20 text-primary py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors">
              {copied ? "Copied!" : "Copy Order"}
            </button>
          </div>
          <a href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, "")}`} className="flex items-center justify-center mt-2 w-full bg-primary text-white py-2 text-xs font-bold uppercase tracking-widest">
            Call OVOW
          </a>
          <button onClick={() => { clearCart(); closeCart(); }} className="w-full text-center text-primary/40 hover:text-primary text-xs uppercase tracking-widest font-bold mt-3 transition-colors">
            Clear Cart & Close
          </button>
        </div>
      )}
    </div>
  );
}
