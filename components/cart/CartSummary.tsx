"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { openWhatsAppOrder, CustomerDetails } from "@/lib/whatsapp";
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
    clearCart();
    closeCart();
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
      <button
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

      <button
        onClick={showForm ? handleOrder : () => setShowForm(true)}
        suppressHydrationWarning
        className="w-full bg-[#25D366] text-white flex items-center justify-center gap-2.5 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1DA851] transition-colors"
      >
        <WhatsAppIcon className="w-5 h-5" />
        Order on WhatsApp
      </button>
    </div>
  );
}
