"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { openWhatsAppBulkOrder, BulkInquiryDetails } from "@/lib/whatsapp";
import { submitBulkOrderAction } from "@/actions/submitBulkOrder";

export function BulkOrderForm() {
  const [details, setDetails] = useState<BulkInquiryDetails>({
    name: "",
    mobile: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    location: "",
    preferredItems: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Partial<BulkInquiryDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const e: Partial<BulkInquiryDetails> = {};
    if (!details.name.trim()) e.name = "Required";
    if (!details.mobile.trim() || !/^\d{10}$/.test(details.mobile.trim()))
      e.mobile = "10-digit number required";
    if (!details.eventType) e.eventType = "Required";
    if (!details.eventDate) e.eventDate = "Required";
    if (!details.guestCount) e.guestCount = "Required";
    if (!details.location.trim()) e.location = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    
    if (validate()) {
      setIsSubmitting(true);
      
      const result = await submitBulkOrderAction(details);
      
      setIsSubmitting(false);

      if (result.success) {
        // Save successful, proceed to WhatsApp
        openWhatsAppBulkOrder(details);
        // Reset form optionally
        setDetails({
          name: "", mobile: "", eventType: "", eventDate: "",
          guestCount: "", location: "", preferredItems: "", notes: ""
        });
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again or contact us directly.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Full Name *</label>
          <input
            type="text"
            value={details.name}
            onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Mobile Number *</label>
          <input
            type="tel"
            value={details.mobile}
            onChange={(e) => setDetails((d) => ({ ...d, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Event Type *</label>
          <select
            value={details.eventType}
            onChange={(e) => setDetails((d) => ({ ...d, eventType: e.target.value }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors appearance-none"
          >
            <option value="" disabled>Select event type</option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Other">Other</option>
          </select>
          {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Guest Count *</label>
          <input
            type="number"
            min="1"
            value={details.guestCount}
            onChange={(e) => setDetails((d) => ({ ...d, guestCount: e.target.value }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
          />
          {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Event Date *</label>
          <input
            type="date"
            value={details.eventDate}
            onChange={(e) => setDetails((d) => ({ ...d, eventDate: e.target.value }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
          />
          {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Location/Area *</label>
          <input
            type="text"
            value={details.location}
            onChange={(e) => setDetails((d) => ({ ...d, location: e.target.value }))}
            className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors"
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Preferred Items (Optional)</label>
        <textarea
          rows={2}
          value={details.preferredItems}
          onChange={(e) => setDetails((d) => ({ ...d, preferredItems: e.target.value }))}
          className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors resize-none"
          placeholder="E.g. Signature Biryani, Dal Makhani..."
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Special Requirements (Optional)</label>
        <textarea
          rows={2}
          value={details.notes}
          onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
          className="w-full border-b border-primary/20 py-3 text-primary focus:outline-none focus:border-primary bg-transparent transition-colors resize-none"
          placeholder="Any dietary constraints, setup needs, or budget expectations?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        suppressHydrationWarning
        className="w-full mt-6 bg-[#25D366] text-white flex items-center justify-center gap-3 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1DA851] hover:scale-[1.02] transition-all shadow-lg disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <span className="animate-pulse">Submitting...</span>
        ) : (
          <>
            <WhatsAppIcon className="w-5 h-5" />
            Discuss on WhatsApp
          </>
        )}
      </button>
      
      {submitError && (
        <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>
      )}

    </form>
  );
}
