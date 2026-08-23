"use client";

import { useState, FormEvent } from "react";
import { openWhatsAppBulkOrder, BulkInquiryDetails } from "@/lib/whatsapp";
import { submitBulkOrderAction } from "@/actions/submitBulkOrder";
import { BulkOrderInput } from "./BulkOrderInput";
import { BulkOrderSelect } from "./BulkOrderSelect";
import { BulkOrderTextarea } from "./BulkOrderTextarea";
import { BulkOrderSubmit } from "./BulkOrderSubmit";

export function BulkOrderForm() {
  const [details, setDetails] = useState<BulkInquiryDetails>({
    name: "", mobile: "", eventType: "", eventDate: "",
    guestCount: "", location: "", preferredItems: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<BulkInquiryDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate() {
    const e: Partial<BulkInquiryDetails> = {};
    if (!details.name.trim()) e.name = "Required";
    if (!details.mobile.trim() || !/^\d{10}$/.test(details.mobile.trim())) e.mobile = "10-digit number required";
    if (!details.eventType) e.eventType = "Required";
    if (!details.eventDate) e.eventDate = "Required";
    if (!details.guestCount) e.guestCount = "Required";
    if (!details.location.trim()) e.location = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    
    setIsSubmitting(true);
    const result = await submitBulkOrderAction(details);
    setIsSubmitting(false);

    if (result.success) {
      openWhatsAppBulkOrder(details);
      setDetails({ name: "", mobile: "", eventType: "", eventDate: "", guestCount: "", location: "", preferredItems: "", notes: "" });
    } else {
      setSubmitError(result.error || "Failed to submit. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <BulkOrderInput label="Full Name *" value={details.name} onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))} error={errors.name} />
        <BulkOrderInput label="Mobile Number *" type="tel" value={details.mobile} onChange={(e) => setDetails((d) => ({ ...d, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} error={errors.mobile} />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <BulkOrderSelect label="Event Type *" value={details.eventType} onChange={(e) => setDetails((d) => ({ ...d, eventType: e.target.value }))} options={[{label: "Wedding", value: "Wedding"}, {label: "Birthday", value: "Birthday"}, {label: "Corporate Event", value: "Corporate Event"}, {label: "Anniversary", value: "Anniversary"}, {label: "Other", value: "Other"}]} error={errors.eventType} />
        <BulkOrderInput label="Guest Count *" type="number" min="1" value={details.guestCount} onChange={(e) => setDetails((d) => ({ ...d, guestCount: e.target.value }))} error={errors.guestCount} />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <BulkOrderInput label="Event Date *" type="date" value={details.eventDate} onChange={(e) => setDetails((d) => ({ ...d, eventDate: e.target.value }))} error={errors.eventDate} />
        <BulkOrderInput label="Location/Area *" value={details.location} onChange={(e) => setDetails((d) => ({ ...d, location: e.target.value }))} error={errors.location} />
      </div>
      <BulkOrderTextarea label="Preferred Items (Optional)" value={details.preferredItems || ""} onChange={(e) => setDetails((d) => ({ ...d, preferredItems: e.target.value }))} placeholder="E.g. Signature Biryani, Dal Makhani..." />
      <BulkOrderTextarea label="Special Requirements (Optional)" value={details.notes || ""} onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))} placeholder="Any dietary constraints, setup needs, or budget expectations?" />
      
      <BulkOrderSubmit isSubmitting={isSubmitting} submitError={submitError} />
    </form>
  );
}
