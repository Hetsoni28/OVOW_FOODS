"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2,
  ShoppingBag, Smartphone, AlertTriangle, Phone, Copy,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { buildUpiUri, buildQrUrl } from "@/lib/upi";
import { generateOrderRef } from "@/lib/order";
import { buildCheckoutWhatsAppMessage, CheckoutCustomerDetails } from "@/lib/whatsapp";
import { COMPANY_CONFIG } from "@/lib/config";
import type { CartItem } from "@/types";

// ── Types ──────────────────────────────────────────────────────────────────────

type Details = CheckoutCustomerDetails;
type Errors = Partial<Record<keyof Details, string>>;

// ── Shared input classes ───────────────────────────────────────────────────────

const inputBase =
  "w-full border px-4 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none bg-transparent transition-colors";

// ── Step animation ─────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stepAnim: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// ── Order Summary panel (reused in Steps 1 & 2) ────────────────────────────────

function OrderPanel({ items, total }: { items: CartItem[]; total: number }) {
  return (
    <div className="bg-white border border-primary/10 p-6">
      <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-4">Your Order</p>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.slug} className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm text-primary leading-snug">{item.name}</p>
              {item.size && (
                <p className="text-[11px] text-primary/40 mt-0.5">
                  {item.size} × {item.quantity}
                </p>
              )}
            </div>
            <p className="text-sm font-bold text-primary whitespace-nowrap">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
      <div className="border-t border-primary/10 pt-4 flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest font-bold text-primary/50">Total</span>
        <span className="font-serif text-2xl font-bold text-[#C9A24A]">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>
      <p className="text-[10px] text-primary/30 text-right mt-1">No tax · No hidden charges</p>
    </div>
  );
}

// ── Progress bar ───────────────────────────────────────────────────────────────

const LABELS = ["Details", "Summary", "Pay", "Done"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {LABELS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                  done
                    ? "bg-[#2E7D4F] border-[#2E7D4F] text-white"
                    : active
                    ? "bg-primary border-primary text-white"
                    : "border-primary/20 text-primary/30 bg-transparent"
                }`}
              >
                {done ? <Check size={14} /> : n}
              </div>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold ${
                  active ? "text-primary" : "text-primary/30"
                }`}
              >
                {label}
              </span>
            </div>
            {i < LABELS.length - 1 && (
              <div
                className={`w-10 md:w-16 h-px mb-5 mx-1 transition-colors ${
                  step > n ? "bg-[#2E7D4F]" : "bg-primary/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function CheckoutClient() {
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<Details>({
    name: "",
    mobile: "",
    address: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  // Snapshot — locked when leaving step 1 so cart changes don't affect steps 2-4
  const [snapItems, setSnapItems] = useState<CartItem[]>(items);
  const [snapTotal, setSnapTotal] = useState(total);

  // Generated once
  const [orderRef] = useState<string>(generateOrderRef);

  // Step 4 state
  const [waSent, setWaSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-transition state
  const [upiAppOpened, setUpiAppOpened] = useState(false);

  // Keep snapshot in sync with live cart on step 1
  useEffect(() => {
    if (step === 1) {
      setSnapItems(items);
      setSnapTotal(total);
    }
  }, [items, total, step]);

  // Auto-transition when returning from UPI app (mobile)
  useEffect(() => {
    if (step !== 3) return;

    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && upiAppOpened) {
        // User returned to browser from UPI app, auto-transition to next step
        setTimeout(() => {
          handlePaymentDone();
        }, 800);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [step, upiAppOpened]);

  // ── Empty cart guard ────────────────────────────────────────────────────────

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center py-24 gap-6 text-center px-4">
        <ShoppingBag size={56} className="text-primary/10" strokeWidth={1} />
        <div>
          <p className="font-serif text-3xl text-primary/40 mb-2">Nothing here yet.</p>
          <p className="text-sm text-primary/30">Something delicious is waiting for you.</p>
        </div>
        <Link
          href="/menu"
          className="bg-primary text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  // ── Validation ──────────────────────────────────────────────────────────────

  function validate(): boolean {
    const e: Errors = {};
    if (!details.name.trim()) e.name = "Please enter your name";
    if (!/^\d{10}$/.test(details.mobile.trim()))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!details.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function goToSummary() {
    if (!validate()) return;
    setSnapItems([...items]);
    setSnapTotal(total);
    setStep(2);
    window.scrollTo({ top: 0 });
  }

  function goToPayment() {
    setStep(3);
    window.scrollTo({ top: 0 });
  }

  function handlePaymentDone() {
    setStep(4);
    window.scrollTo({ top: 0 });
  }

  // ── WhatsApp ────────────────────────────────────────────────────────────────

  function handleSendWhatsApp() {
    const msg = buildCheckoutWhatsAppMessage(snapItems, details, snapTotal, orderRef);
    window.open(
      `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setWaSent(true);
    clearCart();
  }

  function handleCopyOrder() {
    const msg = buildCheckoutWhatsAppMessage(snapItems, details, snapTotal, orderRef);
    navigator.clipboard.writeText(msg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── UPI ─────────────────────────────────────────────────────────────────────

  const upiUri = buildUpiUri(snapTotal, orderRef);
  const qrUrl = buildQrUrl(snapTotal, orderRef);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-8 pb-28 md:pb-16">
      <div className="container-x">
        <ProgressBar step={step} />

        <AnimatePresence mode="wait">

          {/* ══════════════════════════════════════════════════════════════════
              STEP 1 — CUSTOMER DETAILS
          ══════════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <motion.div key="s1" variants={stepAnim} initial="hidden" animate="visible" exit="exit">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                {/* Form */}
                <div className="lg:col-span-3">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-6"
                  >
                    <ArrowLeft size={13} /> Back to Cart
                  </Link>
                  <h1 className="font-serif text-3xl md:text-4xl text-primary mb-8">
                    Your Details
                  </h1>

                  <div className="bg-white border border-primary/10 p-6 md:p-8 space-y-5">

                    {/* Name */}
                    <div>
                      <label htmlFor="ck-name" className="block text-[10px] uppercase tracking-widest font-bold text-primary/50 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="ck-name"
                        type="text"
                        autoComplete="name"
                        value={details.name}
                        onChange={(e) => {
                          setDetails((d) => ({ ...d, name: e.target.value }));
                          setErrors((er) => ({ ...er, name: undefined }));
                        }}
                        placeholder="e.g. Rahul Patel"
                        className={`${inputBase} ${
                          errors.name ? "border-red-400" : "border-primary/20 focus:border-primary"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label htmlFor="ck-mobile" className="block text-[10px] uppercase tracking-widest font-bold text-primary/50 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        id="ck-mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={details.mobile}
                        onChange={(e) => {
                          setDetails((d) => ({
                            ...d,
                            mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                          }));
                          setErrors((er) => ({ ...er, mobile: undefined }));
                        }}
                        placeholder="10-digit mobile number"
                        className={`${inputBase} ${
                          errors.mobile ? "border-red-400" : "border-primary/20 focus:border-primary"
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label htmlFor="ck-address" className="block text-[10px] uppercase tracking-widest font-bold text-primary/50 mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        id="ck-address"
                        rows={3}
                        autoComplete="street-address"
                        value={details.address}
                        onChange={(e) => {
                          setDetails((d) => ({ ...d, address: e.target.value }));
                          setErrors((er) => ({ ...er, address: undefined }));
                        }}
                        placeholder="Building, street, area, city..."
                        className={`${inputBase} resize-none ${
                          errors.address ? "border-red-400" : "border-primary/20 focus:border-primary"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label htmlFor="ck-email" className="block text-[10px] uppercase tracking-widest font-bold text-primary/50 mb-2">
                        Email{" "}
                        <span className="text-primary/30 normal-case font-normal tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="ck-email"
                        type="email"
                        autoComplete="email"
                        value={details.email ?? ""}
                        onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                        placeholder="your@email.com"
                        className={`${inputBase} border-primary/20 focus:border-primary`}
                      />
                    </div>

                    {/* Notes (optional) */}
                    <div>
                      <label htmlFor="ck-notes" className="block text-[10px] uppercase tracking-widest font-bold text-primary/50 mb-2">
                        Order Notes{" "}
                        <span className="text-primary/30 normal-case font-normal tracking-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="ck-notes"
                        rows={2}
                        value={details.notes ?? ""}
                        onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                        placeholder="Allergies, special requests, delivery notes..."
                        className={`${inputBase} resize-none border-primary/20 focus:border-primary`}
                      />
                    </div>
                  </div>

                  {/* Desktop CTA */}
                  <button
                    onClick={goToSummary}
                    className="hidden md:flex mt-6 w-full bg-primary text-white items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                  >
                    Review Order <ArrowRight size={15} />
                  </button>
                </div>

                {/* Sticky order panel (desktop) */}
                <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-28">
                  <OrderPanel items={snapItems} total={snapTotal} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 2 — ORDER SUMMARY
          ══════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <motion.div key="s2" variants={stepAnim} initial="hidden" animate="visible" exit="exit">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

                {/* Items breakdown */}
                <div className="lg:col-span-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-6"
                  >
                    <ArrowLeft size={13} /> Edit Details
                  </button>
                  <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">
                    Order Summary
                  </h2>

                  <div className="bg-white border border-primary/10 p-6 md:p-8">
                    {snapItems.map((item) => (
                      <div
                        key={item.slug}
                        className="flex justify-between items-start gap-4 py-4 border-b border-primary/10 last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base text-primary leading-snug font-semibold">
                            {item.name}
                          </p>
                          {item.size && (
                            <p className="text-xs text-primary/50 mt-0.5">{item.size}</p>
                          )}
                          <p className="text-xs text-primary/40 mt-0.5">
                            Qty {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className="font-bold text-primary text-sm whitespace-nowrap">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="mt-4 pt-4 border-t-2 border-primary/20 flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-primary/60">
                          Total
                        </span>
                        <p className="text-[10px] text-primary/30 mt-0.5">
                          No tax · No delivery charge
                        </p>
                      </div>
                      <span className="font-serif text-3xl font-bold text-[#C9A24A]">
                        ₹{snapTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Pay CTA */}
                  <button
                    onClick={goToPayment}
                    className="hidden md:flex mt-6 w-full bg-[#C9A24A] text-white items-center justify-center gap-2 py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#E4C77A] transition-colors"
                  >
                    PAY ₹{snapTotal.toLocaleString("en-IN")} <ArrowRight size={16} />
                  </button>
                </div>

                {/* Delivery details recap (desktop) */}
                <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-28">
                  <div className="bg-white border border-primary/10 p-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-4">
                      Delivering To
                    </p>
                    <p className="font-serif text-lg text-primary mb-1">{details.name}</p>
                    <p className="text-sm text-primary/60">{details.mobile}</p>
                    {details.email && (
                      <p className="text-xs text-primary/40 mt-1">{details.email}</p>
                    )}
                    <p className="text-sm text-primary/60 mt-3 leading-relaxed">
                      {details.address}
                    </p>
                    {details.notes && (
                      <p className="text-xs text-primary/40 mt-3 italic leading-relaxed">
                        &ldquo;{details.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 3 — UPI QR PAYMENT
          ══════════════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <motion.div key="s3" variants={stepAnim} initial="hidden" animate="visible" exit="exit">
              <div className="max-w-md mx-auto">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8"
                >
                  <ArrowLeft size={13} /> Back
                </button>

                <div className="bg-white border border-primary/10 p-8 text-center">
                  {/* Header */}
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#2E7D4F] mb-2">
                    Scan &amp; Pay
                  </p>
                  <p className="font-serif text-5xl md:text-6xl font-bold text-primary mb-8">
                    ₹{snapTotal.toLocaleString("en-IN")}
                  </p>

                  {/* QR Code */}
                  <div className="flex justify-center mb-3">
                    <div className="border-4 border-primary/10 p-2 inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrUrl}
                        alt={`Scan to pay ₹${snapTotal.toLocaleString("en-IN")} to OVOW FOODS via UPI`}
                        width={260}
                        height={260}
                        className="block"
                      />
                    </div>
                  </div>

                  {/* Merchant info */}
                  <p className="text-xs font-bold text-primary/60 mb-1">OVOW FOODS</p>
                  <p className="text-[11px] text-primary/40 mb-6">
                    UPI ID: {COMPANY_CONFIG.upiId}
                  </p>

                  {/* 3-step instructions */}
                  <div className="bg-[#F9F6F0] p-5 mb-5 text-left space-y-3">
                    {[
                      { n: "01", t: "Open GPay, PhonePe, Paytm or any UPI app" },
                      {
                        n: "02",
                        t: `Scan the QR and verify the amount is ₹${snapTotal.toLocaleString("en-IN")}`,
                      },
                      { n: "03", t: "Complete the payment and return here" },
                    ].map((s) => (
                      <div key={s.n} className="flex gap-3 items-start">
                        <span className="text-[#C9A24A] font-bold text-xs shrink-0 mt-0.5">
                          {s.n}
                        </span>
                        <span className="text-sm text-primary/70 leading-relaxed">{s.t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Warning */}
                  <div className="flex gap-3 items-start bg-amber-50 border border-amber-200 p-4 mb-6 text-left">
                    <AlertTriangle
                      size={16}
                      className="text-amber-500 mt-0.5 shrink-0"
                    />
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Please verify the amount shown in your UPI app matches{" "}
                      <strong>₹{snapTotal.toLocaleString("en-IN")}</strong> before completing
                      the payment.
                    </p>
                  </div>

                  {/* Open UPI deep link */}
                  <a
                    href={upiUri}
                    onClick={() => setUpiAppOpened(true)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors mb-3"
                    aria-label={`Open UPI app to pay ₹${snapTotal.toLocaleString("en-IN")}`}
                  >
                    <Smartphone size={15} /> Open UPI App
                  </a>

                  {/* Confirm payment */}
                  <button
                    onClick={handlePaymentDone}
                    className="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                  >
                    I Have Completed Payment
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 4 — CONFIRMATION + WHATSAPP
          ══════════════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <motion.div key="s4" variants={stepAnim} initial="hidden" animate="visible" exit="exit">
              <div className="max-w-md mx-auto">
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors mb-8"
                >
                  <ArrowLeft size={13} /> Back to Payment
                </button>

                {/* Status card */}
                <div className="bg-white border border-primary/10 p-8 mb-6 text-center">
                  <CheckCircle2
                    size={48}
                    className="text-[#2E7D4F] mx-auto mb-4"
                    strokeWidth={1.5}
                  />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#2E7D4F] mb-2">
                    Payment Marked as Completed
                  </p>
                  <p className="font-serif text-2xl text-primary mb-3">Thank you!</p>
                  <p className="text-sm text-primary/60 mb-6 leading-relaxed">
                    Your payment will be confirmed by the OVOW team. Please send your order
                    on WhatsApp to complete the process.
                  </p>

                  {/* Order Reference */}
                  <div className="bg-[#F9F6F0] border border-primary/10 px-6 py-4 inline-block">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-1">
                      Order Reference
                    </p>
                    <p className="font-mono text-xl font-bold text-primary tracking-wider">
                      {orderRef}
                    </p>
                  </div>
                </div>

                {/* Order Recap */}
                <div className="bg-white border border-primary/10 p-6 mb-5">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40 mb-4">
                    Your Order
                  </p>
                  {snapItems.map((item) => (
                    <div
                      key={item.slug}
                      className="flex justify-between py-3 border-b border-primary/5 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">{item.name}</p>
                        <p className="text-[11px] text-primary/40">
                          {item.size && `${item.size} · `}Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4 mt-2 border-t border-primary/20">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">
                      Total Paid
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#C9A24A]">
                      ₹{snapTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                {!waSent ? (
                  <>
                    <button
                      onClick={handleSendWhatsApp}
                      className="w-full bg-[#25D366] text-white flex items-center justify-center gap-3 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors mb-3"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      Send Order on WhatsApp
                    </button>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={handleCopyOrder}
                        className="flex items-center justify-center gap-2 bg-white border border-primary/20 text-primary py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors"
                      >
                        <Copy size={13} />
                        {copied ? "Copied!" : "Copy Order"}
                      </button>
                      <a
                        href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, "")}`}
                        className="flex items-center justify-center gap-2 bg-primary text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                      >
                        <Phone size={13} /> Call OVOW
                      </a>
                    </div>

                    <p className="text-center text-[10px] text-primary/30 leading-relaxed">
                      WhatsApp didn&apos;t open? Use &ldquo;Copy Order&rdquo; and paste it manually.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-6 bg-white border border-primary/10 p-8">
                    <CheckCircle2 size={32} className="text-[#25D366] mx-auto mb-3" />
                    <p className="font-serif text-xl text-primary mb-2">Order Sent!</p>
                    <p className="text-sm text-primary/50 mb-6 leading-relaxed">
                      The OVOW team will verify your UPI payment and confirm your order.
                    </p>
                    <Link
                      href="/menu"
                      className="text-xs font-bold uppercase tracking-widest text-[#C9A24A] hover:text-primary transition-colors"
                    >
                      Browse Menu Again →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Mobile Sticky CTA (steps 1 & 2) ────────────────────────────────── */}
      {(step === 1 || step === 2) && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-primary/10 px-4 py-3 flex items-center gap-4 md:hidden z-50 shadow-2xl">
          <div className="shrink-0">
            <p className="text-[9px] uppercase tracking-widest text-primary/40 font-bold">Total</p>
            <p className="font-serif text-xl font-bold text-[#C9A24A]">
              ₹{snapTotal.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={step === 1 ? goToSummary : goToPayment}
            className="flex-1 bg-primary text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            {step === 1 ? "Review Order" : `PAY ₹${snapTotal.toLocaleString("en-IN")}`}
          </button>
        </div>
      )}
    </div>
  );
}
