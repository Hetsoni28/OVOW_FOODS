"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { openWhatsAppOrder, buildOrderMessage, CustomerDetails } from "@/lib/whatsapp";
import { COMPANY_CONFIG } from "@/lib/config";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";

export function CartSummary() {
  const { items, total, clearCart, closeCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    mobile: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [orderAttempted, setOrderAttempted] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(): boolean {
    const e: Partial<CustomerDetails> = {};
    if (!details.name.trim()) e.name = "Please enter your name";
    if (!details.mobile.trim() || !/^\d{10}$/.test(details.mobile.trim()))
      e.mobile = "Please enter a valid 10-digit mobile number";
    if (!details.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleOrder() {
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
      <p className="text-[10px] text-primary/40 mb-5">
        Taxes & delivery calculated by OVOW
      </p>

      {/* Toggle customer details */}
      <button suppressHydrationWarning
        onClick={() => setShowForm((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold text-primary border border-primary/20 px-4 py-3 mb-3 hover:bg-primary/5 transition-colors"
      >
        <span>Enter Delivery Details</span>
        {showForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showForm && (
        <div className="space-y-3 mb-4">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              value={details.name}
              onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
              className="w-full border border-primary/20 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Mobile Number (10 digits) *"
              value={details.mobile}
              onChange={(e) =>
                setDetails((d) => ({ ...d, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))
              }
              className="w-full border border-primary/20 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <textarea
              placeholder="Delivery Address *"
              rows={2}
              value={details.address}
              onChange={(e) => setDetails((d) => ({ ...d, address: e.target.value }))}
              className="w-full border border-primary/20 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent resize-none"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <textarea
            placeholder="Special instructions (optional)"
            rows={2}
            value={details.notes}
            onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
            className="w-full border border-primary/20 px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary bg-transparent resize-none"
          />
        </div>
      )}

      {!orderAttempted ? (
        <button suppressHydrationWarning
          onClick={showForm ? handleOrder : () => setShowForm(true)}
          className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2.5 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1DA851] transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Order on WhatsApp
        </button>
      ) : (
        <div className="bg-primary/5 p-5 border border-primary/10">
          <p className="font-serif text-lg text-primary font-bold mb-2">
            Couldn't open WhatsApp?
          </p>
          <p className="text-sm text-primary/70 mb-4">
            If the WhatsApp app didn't open automatically, you can try again or use the options below. Don't worry, your order is saved here.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => openWhatsAppOrder(items, details)}
              className="w-full bg-[#25D366] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors"
            >
              Try Again
            </button>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={handleCopyOrder}
                className="bg-white border border-primary/20 text-primary py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors"
              >
                {copied ? "Copied!" : "Copy Order"}
              </button>
              <a
                href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, '')}`}
                className="bg-primary text-white flex items-center justify-center py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors text-center"
              >
                Call OVOW
              </a>
            </div>
            <button
              onClick={() => {
                clearCart();
                closeCart();
              }}
              className="w-full text-center text-primary/50 hover:text-primary text-xs uppercase tracking-widest font-bold mt-4 transition-colors"
            >
              Clear Cart & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
