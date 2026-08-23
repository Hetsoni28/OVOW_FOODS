"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2,
  ShoppingBag, Smartphone, AlertTriangle, Phone, Copy, MapPin, User, Hash,
  QrCode, Banknote,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { buildUpiUri, buildQrUrl } from "@/lib/upi";
import { generateOrderRef } from "@/lib/order";
import { buildCheckoutWhatsAppMessage, CheckoutCustomerDetails } from "@/lib/whatsapp";
import { COMPANY_CONFIG } from "@/lib/config";
import type { CartItem } from "@/types";

// ── Types ───────────────────────────────────────────────────────────────────────
type Details = CheckoutCustomerDetails;
type Errors = Partial<Record<keyof Details, string>>;
type PaymentMethod = "upi" | "cod";

// ── Animations ──────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pageAnim: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: EASE, staggerChildren: 0.07 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22 } },
};

const childAnim: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

// ── Shared input ────────────────────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full border-b-2 px-0 py-2.5 text-sm text-primary placeholder:text-primary/25 bg-transparent focus:outline-none transition-colors ${
    err ? "border-red-300 focus:border-red-500" : "border-primary/15 focus:border-[#C9A24A]"
  }`;

// ── Form field wrapper ──────────────────────────────────────────────────────────
function Field({
  id, label, required, error, children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={childAnim} className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold text-primary/45"
      >
        {label}
        {required && <span className="text-[#C9A24A] font-black">·</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[11px] flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
          {error}
        </p>
      )}
    </motion.div>
  );
}

// ── Progress bar ────────────────────────────────────────────────────────────────
const STEP_LABELS = ["Details", "Summary", "Pay", "Done"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center mb-10 select-none">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 flex items-center justify-center text-xs font-bold border-2 transition-all duration-400 ${
                  done
                    ? "bg-primary border-primary text-white"
                    : active
                    ? "bg-[#C9A24A] border-[#C9A24A] text-white shadow-[0_2px_12px_rgba(201,162,74,0.35)]"
                    : "border-primary/12 text-primary/20 bg-transparent"
                }`}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : n}
              </div>
              <span
                className={`text-[9px] uppercase tracking-widest font-bold transition-colors ${
                  active
                    ? "text-[#C9A24A]"
                    : done
                    ? "text-primary/50"
                    : "text-primary/20"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className="w-10 md:w-16 h-px mx-1.5 mb-5 bg-primary/8 overflow-hidden">
                <motion.div
                  className="h-full bg-[#C9A24A]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: step > n ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Order panel ─────────────────────────────────────────────────────────────────
function OrderPanel({ items, total }: { items: CartItem[]; total: number }) {
  return (
    <div className="bg-white border border-primary/8 shadow-sm">
      <div className="px-5 py-4 border-b border-primary/6">
        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/35">Your Order</p>
      </div>
      <div className="px-5 py-4 space-y-3.5">
        {items.map((item) => (
          <div key={item.slug} className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm text-primary leading-snug">{item.name}</p>
              <p className="text-[11px] text-primary/35 mt-0.5">
                {item.size && `${item.size} · `}qty {item.quantity}
              </p>
            </div>
            <p className="text-sm font-semibold text-primary tabular-nums">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-baseline px-5 py-4 border-t border-primary/8 bg-primary/[0.02]">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/35">Total</p>
          <p className="text-[9px] text-primary/25 mt-0.5">No tax · No extra charges</p>
        </div>
        <p className="font-serif text-2xl font-bold text-[#C9A24A] tabular-nums">
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}


// ── Payment method pill ──────────────────────────────────────────────────────────
function PaymentPill({
  id, active, onClick, icon, title, subtitle,
}: {
  id: string; active: boolean; onClick: () => void;
  icon: React.ReactNode; title: string; subtitle: string;
}) {
  return (
    <button id={id} onClick={onClick}
      className={`relative flex flex-col items-center gap-2.5 p-5 border-2 transition-all duration-200 text-center w-full ${
        active ? "border-[#C9A24A] bg-[#C9A24A]/5" : "border-primary/10 hover:border-primary/25 bg-white"
      }`}
    >
      {active && (
        <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#C9A24A] flex items-center justify-center">
          <Check size={10} strokeWidth={3} className="text-white" />
        </span>
      )}
      <span className={`transition-colors ${active ? "text-[#C9A24A]" : "text-primary/35"}`}>{icon}</span>
      <div>
        <p className={`text-xs font-bold transition-colors ${active ? "text-primary" : "text-primary/55"}`}>{title}</p>
        <p className="text-[10px] text-primary/30 mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────────
export function CheckoutClient() {
  const { items, total, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [details, setDetails] = useState<Details>({ name: "", mobile: "", address: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [snapItems, setSnapItems] = useState<CartItem[]>(items);
  const [snapTotal, setSnapTotal] = useState(total);
  const [orderRef] = useState<string>(generateOrderRef);
  const [waSent, setWaSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [upiAppOpened, setUpiAppOpened] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Show sticky bar only when user has scrolled down
  useEffect(() => {
    function onScroll() {
      setShowStickyBar(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    // Reset on step change
    setShowStickyBar(window.scrollY > 80);
    return () => window.removeEventListener("scroll", onScroll);
  }, [step]);

  // Sync live cart on step 1
  useEffect(() => {
    if (step === 1) { setSnapItems(items); setSnapTotal(total); }
  }, [items, total, step]);

  // Auto-transition when returning from UPI app
  useEffect(() => {
    if (step !== 3) return;
    function onVisibility() {
      if (document.visibilityState === "visible" && upiAppOpened) {
        setTimeout(handlePaymentDone, 800);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [step, upiAppOpened]);

  // Empty cart guard
  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center gap-6 text-center px-6 py-24">
        <ShoppingBag size={52} className="text-primary/10" strokeWidth={1} />
        <div>
          <p className="font-serif text-3xl text-primary/30 mb-2">Nothing here yet.</p>
          <p className="text-sm text-primary/25">Something delicious is waiting for you.</p>
        </div>
        <Link
          href="/menu"
          className="bg-[#C9A24A] text-white px-10 py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  // Validation
  function validate(): boolean {
    const e: Errors = {};
    if (!details.name.trim()) e.name = "Please enter your name";
    if (!/^\d{10}$/.test(details.mobile.trim())) e.mobile = "Enter a valid 10-digit number";
    if (!details.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goToSummary() {
    if (!validate()) return;
    setSnapItems([...items]); setSnapTotal(total); setStep(2); window.scrollTo({ top: 0 });
  }
  function goToPayment() {
    if (paymentMethod === "cod") { 
      handleSendWhatsApp();
      setStep(4); 
    } else { 
      setStep(3); 
    }
    window.scrollTo({ top: 0 });
  }
  function handlePaymentDone() { setStep(4); window.scrollTo({ top: 0 }); }

  function buildWhatsAppMsg() {
    const base = buildCheckoutWhatsAppMessage(snapItems, details, snapTotal, orderRef);
    const payLine = paymentMethod === "cod"
      ? "\n\uD83D\uDCB5 *Payment: Cash on Delivery (COD)*"
      : "\n\uD83D\uDCF1 *Payment: UPI (paid)*";
    return base + payLine;
  }

  function handleSendWhatsApp() {
    const msg = buildWhatsAppMsg();
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    setWaSent(true); clearCart();
  }
  function handleCopyOrder() {
    navigator.clipboard.writeText(buildWhatsAppMsg()).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  const upiUri = buildUpiUri(snapTotal, orderRef);
  const qrUrl = buildQrUrl(snapTotal, orderRef);

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-8 pb-28 md:pb-16">
      <div className="container-x max-w-5xl">
        <ProgressBar step={step} />

        <AnimatePresence mode="wait">

          {/* ══ STEP 1 — DETAILS ══════════════════════════════════════════════ */}
          {step === 1 && (
            <motion.div key="s1" variants={pageAnim} initial="hidden" animate="visible" exit="exit">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start">

                <div className="lg:col-span-3 space-y-6">
                  <motion.div variants={childAnim}>
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors mb-5"
                    >
                      <ArrowLeft size={12} /> Back to Cart
                    </Link>
                    <h1 className="font-serif text-3xl md:text-4xl text-primary">Your Details</h1>
                    <p className="text-sm text-primary/40 mt-1.5">We&apos;ll deliver right to your door.</p>
                  </motion.div>

                  <div className="bg-white border border-primary/8 shadow-sm p-7 md:p-9 space-y-7">
                    <Field id="ck-name" label="Full Name" required error={errors.name}>
                      <input
                        id="ck-name" type="text" autoComplete="name" placeholder="e.g. Rahul Patel"
                        value={details.name}
                        onChange={e => {
                          setDetails(d => ({ ...d, name: e.target.value }));
                          setErrors(er => ({ ...er, name: undefined }));
                        }}
                        className={inputCls(errors.name)}
                      />
                    </Field>

                    <Field id="ck-mobile" label="Mobile Number" required error={errors.mobile}>
                      <input
                        id="ck-mobile" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile"
                        value={details.mobile}
                        onChange={e => {
                          setDetails(d => ({ ...d, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }));
                          setErrors(er => ({ ...er, mobile: undefined }));
                        }}
                        className={inputCls(errors.mobile)}
                      />
                    </Field>

                    <Field id="ck-address" label="Delivery Address" required error={errors.address}>
                      <textarea
                        id="ck-address" rows={3} autoComplete="street-address" placeholder="Building, street, area, city..."
                        value={details.address}
                        onChange={e => {
                          setDetails(d => ({ ...d, address: e.target.value }));
                          setErrors(er => ({ ...er, address: undefined }));
                        }}
                        className={`${inputCls(errors.address)} resize-none`}
                      />
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-7">
                      <Field id="ck-email" label="Email (optional)">
                        <input
                          id="ck-email" type="email" autoComplete="email" placeholder="your@email.com"
                          value={details.email ?? ""}
                          onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
                          className={inputCls()}
                        />
                      </Field>
                      <Field id="ck-notes" label="Order Notes (optional)">
                        <input
                          id="ck-notes" type="text" placeholder="Spice level, allergies..."
                          value={details.notes ?? ""}
                          onChange={e => setDetails(d => ({ ...d, notes: e.target.value }))}
                          className={inputCls()}
                        />
                      </Field>
                    </div>
                  </div>

                  <motion.button
                    variants={childAnim}
                    onClick={goToSummary}
                    className="hidden md:flex w-full bg-[#C9A24A] text-white items-center justify-center gap-2.5 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors group"
                  >
                    Review My Order
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>

                {/* Sticky summary */}
                <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-28">
                  <OrderPanel items={snapItems} total={snapTotal} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 2 — SUMMARY ══════════════════════════════════════════════ */}
          {step === 2 && (
            <motion.div key="s2" variants={pageAnim} initial="hidden" animate="visible" exit="exit">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start">

                <div className="lg:col-span-3 space-y-6">
                  <motion.div variants={childAnim}>
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors mb-5"
                    >
                      <ArrowLeft size={12} /> Edit Details
                    </button>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary">Order Summary</h2>
                    <p className="text-sm text-primary/40 mt-1.5">Review before you pay.</p>
                  </motion.div>

                  <motion.div variants={childAnim} className="bg-white border border-primary/8 shadow-sm overflow-hidden">
                    {snapItems.map((item, idx) => (
                      <div
                        key={item.slug}
                        className={`flex items-start justify-between gap-4 px-7 py-5 ${
                          idx < snapItems.length - 1 ? "border-b border-primary/6" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base text-primary font-semibold leading-snug">{item.name}</p>
                          <p className="text-[11px] text-primary/35 mt-0.5">
                            {item.size && `${item.size} · `}Qty {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-primary tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                    <div className="flex justify-between items-baseline px-7 py-5 bg-primary/[0.025] border-t border-primary/10">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/40">Total</p>
                        <p className="text-[9px] text-primary/25 mt-0.5">No tax · Free delivery</p>
                      </div>
                      <p className="font-serif text-3xl font-bold text-[#C9A24A] tabular-nums">
                        ₹{snapTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={childAnim} className="bg-white border border-primary/8 shadow-sm p-6">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/40 mb-4">Payment Method</p>
                    <div className="grid grid-cols-2 gap-3">
                      <PaymentPill id="pm-upi" active={paymentMethod === "upi"} onClick={() => setPaymentMethod("upi")}
                        icon={<QrCode size={22} />} title="UPI / QR" subtitle="GPay · PhonePe · Paytm" />
                      <PaymentPill id="pm-cod" active={paymentMethod === "cod"} onClick={() => setPaymentMethod("cod")}
                        icon={<Banknote size={22} />} title="Cash on Delivery" subtitle="Pay when delivered" />
                    </div>
                    {paymentMethod === "cod" && (
                      <motion.p
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        className="text-[11px] text-primary/50 mt-4 leading-relaxed bg-primary/[0.03] border border-primary/8 px-4 py-3"
                      >
                        Please keep <strong>₹{snapTotal.toLocaleString("en-IN")}</strong> ready at delivery. Our team will call to confirm.
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.button
                    variants={childAnim}
                    onClick={goToPayment}
                    className="hidden md:flex w-full bg-[#C9A24A] text-white items-center justify-center gap-2.5 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors group"
                  >
                    {paymentMethod === "cod" ? "Place Order" : `Pay ₹${snapTotal.toLocaleString("en-IN")}`}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>

                {/* Recap panel */}
                <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-28">
                  <div className="bg-white border border-primary/8 shadow-sm p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/35 mb-4">Delivering To</p>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-start">
                        <User size={13} className="text-[#C9A24A] mt-0.5 shrink-0" />
                        <div>
                          <p className="font-serif text-base text-primary leading-snug">{details.name}</p>
                          <p className="text-xs text-primary/45 mt-0.5">{details.mobile}</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <MapPin size={13} className="text-[#C9A24A] mt-0.5 shrink-0" />
                        <p className="text-sm text-primary/55 leading-relaxed">{details.address}</p>
                      </div>
                      {details.notes && (
                        <p className="text-xs text-primary/30 italic pl-5">&ldquo;{details.notes}&rdquo;</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 3 — UPI PAYMENT ══════════════════════════════════════════ */}
          {step === 3 && (
            <motion.div key="s3" variants={pageAnim} initial="hidden" animate="visible" exit="exit">
              <div className="max-w-sm mx-auto">
                <motion.div variants={childAnim}>
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors mb-8"
                  >
                    <ArrowLeft size={12} /> Back
                  </button>
                </motion.div>

                <motion.div variants={childAnim} className="bg-white border border-primary/8 shadow-sm overflow-hidden">
                  {/* Dark header */}
                  <div className="bg-primary px-8 py-7 text-center">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/35 mb-3">Scan & Pay</p>
                    <p className="font-serif text-5xl font-bold text-[#C9A24A] tabular-nums">
                      ₹{snapTotal.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-white/30 mt-2 tracking-wide">
                      OVOW FOODS · {COMPANY_CONFIG.upiId}
                    </p>
                  </div>

                  <div className="flex flex-col items-center px-8 pt-7 pb-8">
                    {/* QR */}
                    <div className="border border-primary/10 p-3 mb-6 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrUrl}
                        alt={`UPI QR to pay ₹${snapTotal.toLocaleString("en-IN")} to OVOW FOODS`}
                        width={220}
                        height={220}
                        className="block"
                      />
                    </div>

                    {/* Steps */}
                    <div className="w-full space-y-3 mb-6">
                      {[
                        "Open GPay, PhonePe, Paytm or any UPI app",
                        `Scan QR · confirm amount is ₹${snapTotal.toLocaleString("en-IN")}`,
                        "Pay · return to this page",
                      ].map((t, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="w-5 h-5 rounded-full bg-[#C9A24A]/10 flex items-center justify-center text-[9px] font-bold text-[#C9A24A] shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-primary/50 leading-relaxed">{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Warning */}
                    <div className="w-full flex gap-2.5 items-start bg-amber-50 border border-amber-100 px-4 py-3 mb-6">
                      <AlertTriangle size={13} className="text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-amber-700 leading-relaxed">
                        Verify the amount is <strong>₹{snapTotal.toLocaleString("en-IN")}</strong> before paying.
                      </p>
                    </div>

                    {/* Open UPI App */}
                    <a
                      href={upiUri}
                      onClick={() => setUpiAppOpened(true)}
                      className="w-full flex items-center justify-center gap-2 bg-[#C9A24A] text-white py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                      aria-label={`Open UPI app to pay ₹${snapTotal.toLocaleString("en-IN")}`}
                    >
                      <Smartphone size={14} /> Open UPI App
                    </a>

                    <p className="text-center text-[10px] text-primary/25 mt-5 leading-relaxed">
                      Paid on another device?{" "}
                      <button
                        onClick={handlePaymentDone}
                        className="underline hover:text-primary transition-colors font-semibold text-primary/40"
                      >
                        Continue →
                      </button>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ══ STEP 4 — CONFIRMATION ══════════════════════════════════════════ */}
          {step === 4 && (
            <motion.div key="s4" variants={pageAnim} initial="hidden" animate="visible" exit="exit">
              <div className="max-w-sm mx-auto">
                {paymentMethod === "upi" && (
                  <motion.div variants={childAnim}>
                    <button
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/30 hover:text-primary transition-colors mb-8"
                    >
                      <ArrowLeft size={12} /> Back
                    </button>
                  </motion.div>
                )}

                {/* Success card */}
                <motion.div variants={childAnim} className={`bg-white border shadow-sm p-8 mb-4 text-center ${!waSent && paymentMethod === "upi" ? "border-amber-200" : "border-primary/8"}`}>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${!waSent && paymentMethod === "upi" ? "bg-amber-100" : "bg-primary/6"}`}
                  >
                    {!waSent && paymentMethod === "upi" ? (
                      <AlertTriangle size={36} className="text-amber-500" strokeWidth={1.5} />
                    ) : (
                      <CheckCircle2 size={36} className="text-primary" strokeWidth={1.5} />
                    )}
                  </motion.div>

                  <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-2 ${!waSent && paymentMethod === "upi" ? "text-amber-600" : "text-primary"}`}>
                    {!waSent && paymentMethod === "upi" 
                      ? "Action Required" 
                      : paymentMethod === "cod" ? "Order Placed" : "Payment Marked as Completed"}
                  </p>
                  <p className="font-serif text-2xl text-primary mb-3">
                    {!waSent && paymentMethod === "upi" ? "Almost Done!" : "Thank you!"}
                  </p>
                  <p className="text-xs text-primary/40 mb-5 leading-relaxed">
                    {!waSent && paymentMethod === "upi"
                      ? "You MUST send us your order details on WhatsApp so our kitchen can start preparing your food."
                      : paymentMethod === "cod"
                      ? `Please keep ₹${snapTotal.toLocaleString("en-IN")} ready. Our team will call to confirm your delivery.`
                      : "Our team will verify your UPI payment and confirm your order shortly."}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 bg-[#C9A24A]/8 border border-[#C9A24A]/20 px-3 py-1.5">
                      {paymentMethod === "cod" ? <Banknote size={12} className="text-[#C9A24A]" /> : <QrCode size={12} className="text-[#C9A24A]" />}
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A24A]">
                        {paymentMethod === "cod" ? "Cash on Delivery" : "UPI Payment"}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2.5 bg-[#F9F6F0] border border-primary/8 px-5 py-3">
                    <Hash size={12} className="text-[#C9A24A] shrink-0" />
                    <div className="text-left">
                      <p className="text-[9px] text-primary/30 uppercase tracking-widest mb-0.5">Order Ref</p>
                      <p className="font-mono text-sm font-bold text-primary tracking-wider">{orderRef}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Order recap */}
                <motion.div variants={childAnim} className="bg-white border border-primary/8 shadow-sm overflow-hidden mb-4">
                  <div className="px-6 py-4 border-b border-primary/6">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary/35">Your Order</p>
                  </div>
                  {snapItems.map((item) => (
                    <div
                      key={item.slug}
                      className="flex justify-between items-center px-6 py-3.5 border-b border-primary/5 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-semibold text-primary">{item.name}</p>
                        <p className="text-[11px] text-primary/30">
                          {item.size && `${item.size} · `}Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary tabular-nums">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between items-baseline px-6 py-4 bg-primary/[0.025]">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-primary/35">{paymentMethod === "cod" ? "Amount Due on Delivery" : "Total Paid"}</p>
                    <p className="font-serif text-xl font-bold text-[#C9A24A] tabular-nums">
                      ₹{snapTotal.toLocaleString("en-IN")}
                    </p>
                  </div>
                </motion.div>

                {/* WhatsApp */}
                {!waSent ? (
                  <motion.div variants={childAnim} className="space-y-2">
                    <motion.button
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      onClick={handleSendWhatsApp}
                      className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-[#1DA851] transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> Send Order on WhatsApp
                    </motion.button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleCopyOrder}
                        className="flex items-center justify-center gap-1.5 bg-white border border-primary/10 text-primary py-3 text-[10px] font-bold uppercase tracking-widest hover:border-primary/25 transition-colors"
                      >
                        <Copy size={12} /> {copied ? "Copied!" : "Copy Order"}
                      </button>
                      <a
                        href={`tel:${COMPANY_CONFIG.phone.replace(/\s+/g, "")}`}
                        className="flex items-center justify-center gap-1.5 bg-white border border-primary/10 text-primary py-3 text-[10px] font-bold uppercase tracking-widest hover:border-primary/25 transition-colors"
                      >
                        <Phone size={12} /> Call OVOW
                      </a>
                    </div>
                    <p className="text-center text-[9px] text-primary/25 pt-1">
                      WhatsApp didn&apos;t open? Copy the order and paste it manually.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={childAnim}
                    className="text-center bg-white border border-primary/8 shadow-sm p-8"
                  >
                    <CheckCircle2 size={28} className="text-[#25D366] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="font-serif text-lg text-primary mb-1.5">Order Sent!</p>
                    <p className="text-xs text-primary/35 mb-5 leading-relaxed">
                      Our team will confirm your order soon.
                    </p>
                    <Link
                      href="/menu"
                      className="text-[11px] font-bold uppercase tracking-widest text-[#C9A24A] hover:text-primary transition-colors"
                    >
                      Back to Menu →
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Mobile Sticky CTA (scroll-aware) ────────────────────────────────── */}
      <AnimatePresence>
        {(step === 1 || step === 2) && showStickyBar && (
          <motion.div
            key="sticky-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-primary/8 px-4 py-3 flex items-center gap-3 md:hidden z-50"
          >
            <div className="shrink-0">
              <p className="text-[8px] uppercase tracking-widest text-primary/30 font-bold">Total</p>
              <p className="font-serif text-lg font-bold text-[#C9A24A] tabular-nums">
                ₹{snapTotal.toLocaleString("en-IN")}
              </p>
            </div>
            {step === 1 ? (
              <button
                onClick={goToSummary}
                className="flex-1 bg-[#C9A24A] text-white py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
              >
                Review Order
              </button>
            ) : (
              <button
                onClick={goToPayment}
                className="flex-1 bg-[#C9A24A] text-white py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
              >
                {paymentMethod === "cod" ? "Place Order" : `Pay ₹${snapTotal.toLocaleString("en-IN")}`}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
