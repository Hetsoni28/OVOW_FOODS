"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconCheck, IconCopy, IconAlertTriangle } from "@/components/atoms/Icons";
import { useEffect, useState } from "react";
import { pageAnim, childAnim } from "@/lib/animations";
import { COMPANY_CONFIG } from "@/lib/config";
import { UTR_LENGTH, isValidUtr, normalizeUtr } from "@/lib/upi";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import type { CartItem } from "@/types";

interface CheckoutStepQRProps {
  orderId: string;
  cartTotal: number;
  upiUri: string;
  cart: CartItem[];
  onConfirmPayment: (utr: string) => void;
  onBack: () => void;
}

export function CheckoutStepQR({ orderId, cartTotal, upiUri, cart, onConfirmPayment, onBack }: CheckoutStepQRProps) {
  const [copiedUpi, setCopiedUpi] = useState(false);

  // QR is drawn in the browser — no third-party QR service, works even if one is down.
  // The library is loaded only on this step.
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [qrFailed, setQrFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setQrSrc(null);
    setQrFailed(false);
    import("qrcode")
      .then(({ default: QRCode }) =>
        QRCode.toDataURL(upiUri, { width: 480, margin: 2, errorCorrectionLevel: "M", color: { dark: "#000000", light: "#ffffff" } })
      )
      .then((src) => { if (!cancelled) setQrSrc(src); })
      .catch(() => { if (!cancelled) setQrFailed(true); });
    return () => { cancelled = true; };
  }, [upiUri]);
  const [copiedAmt, setCopiedAmt] = useState(false);

  // Set when the customer taps "Open UPI App". We never auto-confirm payment —
  // the order only moves on when they tap "I've Paid" themselves.
  const [upiLaunched, setUpiLaunched] = useState(false);
  const [utr, setUtr] = useState("");
  const [utrTouched, setUtrTouched] = useState(false);
  const utrValid = isValidUtr(utr);
  const showUtrError = utrTouched && !utrValid;

  const handleConfirm = () => {
    if (!utrValid) {
      setUtrTouched(true);
      document.getElementById("utr")?.focus();
      return;
    }
    onConfirmPayment(utr);
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const copyAmount = () => {
    navigator.clipboard.writeText(cartTotal.toFixed(2));
    setCopiedAmt(true);
    setTimeout(() => setCopiedAmt(false), 2000);
  };

  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <motion.div variants={childAnim} className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">Scan &amp; Pay</h2>
          <p className="text-primary/70 text-sm">Works with PhonePe, GPay, Paytm, BHIM &amp; all UPI apps</p>
        </div>
        <button suppressHydrationWarning onClick={onBack} aria-label="Back to payment method" className="w-11 h-11 flex items-center justify-center hover:bg-primary/5 rounded-full transition-colors group">
          <IconArrowLeft size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 lg:order-2">
          <CheckoutOrderSummary cart={cart} cartTotal={cartTotal} />
        </div>

        <motion.div variants={childAnim} className="lg:order-1 space-y-4">

          {/* QR Card */}
          <div className="bg-primary/5 p-6 flex flex-col items-center border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            {/* Amount Badge */}
            <div className="relative z-10 mb-5 flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold">Amount to Pay</span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-primary">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-primary/70 text-sm">.00</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-green-700 font-semibold uppercase tracking-widest">Amount pre-filled in QR</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 shadow-xl border border-primary/5 relative z-10">
              {qrSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- data: URL generated on the device
                <img
                  src={qrSrc}
                  alt={`UPI payment QR code for ₹${cartTotal.toLocaleString("en-IN")} to ${COMPANY_CONFIG.name}`}
                  width={240}
                  height={240}
                  className="w-52 h-52 md:w-60 md:h-60 object-contain [image-rendering:pixelated]"
                />
              ) : qrFailed ? (
                <div className="w-52 h-52 md:w-60 md:h-60 flex items-center justify-center text-center text-xs text-primary/70 p-4">
                  Couldn&apos;t draw the QR code. Use &ldquo;Open UPI App&rdquo; or pay to the UPI ID below.
                </div>
              ) : (
                <div className="w-52 h-52 md:w-60 md:h-60 bg-primary/5 animate-pulse" role="status" aria-label="Generating QR code" />
              )}
            </div>

            <p className="text-[10px] text-primary/70 mt-3 z-10 relative text-center">
              Order #{orderId} · Scan with any camera or UPI app
            </p>
          </div>

          {/* Manual transfer section */}
          <div className="border border-primary/10 p-5 space-y-3 bg-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Can&apos;t scan? Transfer manually</p>

            <div className="flex items-center justify-between py-2 border-b border-primary/5">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[10px] text-primary/70 uppercase tracking-widest">UPI ID</p>
                <p className="font-bold text-primary text-sm tracking-wide break-all">{COMPANY_CONFIG.upiId}</p>
              </div>
              <button suppressHydrationWarning onClick={copyUpi} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-2 border border-primary/20 hover:border-primary hover:bg-primary hover:text-white text-primary transition-all">
                {copiedUpi ? <IconCheck size={12} className="text-green-500" /> : <IconCopy size={12} />}
                {copiedUpi ? "Copied!" : "Copy ID"}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[10px] text-primary/70 uppercase tracking-widest">Exact Amount</p>
                <p className="font-bold text-primary text-sm break-all">₹{cartTotal.toLocaleString("en-IN")}.00</p>
              </div>
              <button suppressHydrationWarning onClick={copyAmount} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-2 border border-primary/20 hover:border-primary hover:bg-primary hover:text-white text-primary transition-all">
                {copiedAmt ? <IconCheck size={12} className="text-green-500" /> : <IconCopy size={12} />}
                {copiedAmt ? "Copied!" : "Copy ₹"}
              </button>
            </div>
          </div>

          {/* Screenshot Warning */}
          <div className="flex flex-col gap-3 bg-red-50 p-4 border border-red-100">
            <div className="flex items-start gap-3">
              <IconAlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 leading-relaxed font-bold uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Screenshot Compulsory!
              </p>
            </div>
            <p className="text-xs text-red-700 leading-relaxed pl-7">
              Take a screenshot of your successful payment and attach it to the WhatsApp message on the next step.
            </p>
          </div>

          {/* Reminder after returning from the UPI app — no auto-advance */}
          <AnimatePresence>
            {upiLaunched && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0B2118] text-white p-4">
                  <p className="text-sm font-bold text-white">Finished paying?</p>
                  <p className="text-[11px] text-white/60">
                    Once the payment is successful, enter the 12-digit UPI reference number below and tap <span className="text-[#C9A24A] font-black">&ldquo;I&apos;ve Paid&rdquo;</span>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* UPI reference number — lets the restaurant verify the payment in their bank app */}
          <div className="border border-primary/10 bg-white p-5 space-y-2">
            <label htmlFor="utr" className="block text-[11px] font-bold uppercase tracking-widest text-primary">
              UPI Reference No. (UTR) <span aria-hidden="true" className="text-[#86671C]">·</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              id="utr"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              // no maxLength: UTRs are often copied with spaces ("4123 4567 8901"),
              // normalizeUtr strips non-digits and caps at 12
              value={utr}
              onChange={(e) => setUtr(normalizeUtr(e.target.value))}
              onBlur={() => setUtrTouched(true)}
              placeholder="12-digit number, e.g. 412345678901"
              aria-required="true"
              aria-invalid={showUtrError}
              aria-describedby={showUtrError ? "utr-help utr-error" : "utr-help"}
              className={`w-full border-b-2 bg-transparent py-2.5 text-lg font-mono tracking-[0.15em] text-primary placeholder:text-primary/40 placeholder:text-sm placeholder:tracking-normal placeholder:font-sans focus:outline-none transition-colors ${
                showUtrError ? "border-red-400" : "border-primary/20 focus:border-[#86671C]"
              }`}
            />
            <p id="utr-help" className="text-[11px] text-primary/70 leading-relaxed">
              After paying, open the payment in your UPI app and copy the <strong>UPI Ref No / UTR / Transaction ID</strong> (12 digits).
              We match it with our bank to confirm your order.
            </p>
            {showUtrError && (
              <p id="utr-error" role="alert" className="text-[11px] text-red-700 font-semibold">
                Enter the 12-digit UPI reference number ({utr.length}/{UTR_LENGTH} digits)
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <a
              href={upiUri}
              onClick={() => setUpiLaunched(true)}
              className="flex-1 flex flex-col items-center justify-center bg-white border-2 border-primary text-primary py-3 px-2 text-xs font-bold tracking-wider hover:bg-primary hover:text-white transition-colors text-center"
            >
              <span>1. Open UPI App</span>
            </a>
            <button suppressHydrationWarning
              onClick={handleConfirm}
              aria-disabled={!utrValid}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-xs font-bold tracking-wider transition-colors shadow-lg shadow-[#0B2118]/20 ${
                utrValid ? "bg-[#C9A24A] text-[#0B2118] hover:bg-[#0B2118] hover:text-white" : "bg-[#C9A24A]/50 text-[#0B2118]/70 cursor-not-allowed"
              }`}
            >
              <span>2. I&apos;ve Paid ✓</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
