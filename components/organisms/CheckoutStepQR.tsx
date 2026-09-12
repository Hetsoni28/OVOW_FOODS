"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconCheck, IconCopy, IconAlertTriangle } from "@/components/atoms/Icons";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { pageAnim, childAnim } from "@/lib/animations";
import { COMPANY_CONFIG } from "@/lib/config";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import type { CartItem } from "@/types";

interface CheckoutStepQRProps {
  orderId: string;
  cartTotal: number;
  qrUrl: string;
  upiUri: string;
  cart: CartItem[];
  onConfirmPayment: () => void;
  onBack: () => void;
}

export function CheckoutStepQR({ orderId, cartTotal, qrUrl, upiUri, cart, onConfirmPayment, onBack }: CheckoutStepQRProps) {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmt, setCopiedAmt] = useState(false);

  // Auto-advance state
  const [upiLaunched, setUpiLaunched] = useState(false);
  const [scannerPrompt, setScannerPrompt] = useState(false); // for QR scanner path
  const [countdown, setCountdown] = useState(5);
  const [autoAdvanceCancelled, setAutoAdvanceCancelled] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const scannerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceRef = useRef(false);

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

  const startCountdown = useCallback(() => {
    if (autoAdvanceCancelled) return;
    setCountdown(5);
    autoAdvanceRef.current = true;
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current!);
          if (autoAdvanceRef.current) {
            onConfirmPayment();
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [autoAdvanceCancelled, onConfirmPayment]);

  // When user returns from UPI app (page becomes visible again) → start 5s auto-advance
  useEffect(() => {
    if (!upiLaunched) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && upiLaunched && !autoAdvanceCancelled) {
        startCountdown();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [upiLaunched, autoAdvanceCancelled, startCountdown]);

  // Scanner path: if user hasn't opened UPI app, start a 30s idle timer.
  // After 30s they've likely already scanned & paid → show prompt
  useEffect(() => {
    if (upiLaunched || autoAdvanceCancelled) return;

    scannerTimerRef.current = setTimeout(() => {
      if (!upiLaunched && !autoAdvanceCancelled) {
        setScannerPrompt(true);
        startCountdown();
      }
    }, 30000);

    return () => {
      if (scannerTimerRef.current) clearTimeout(scannerTimerRef.current);
    };
  // Only run once on mount (no upiLaunched/cancelled deps to avoid re-triggering)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelAutoAdvance = () => {
    autoAdvanceRef.current = false;
    if (countdownRef.current) clearInterval(countdownRef.current);
    if (scannerTimerRef.current) clearTimeout(scannerTimerRef.current);
    setAutoAdvanceCancelled(true);
    setScannerPrompt(false);
    setUpiLaunched(false);
  };

  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <motion.div variants={childAnim} className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">Scan &amp; Pay</h2>
          <p className="text-primary/50 text-sm">Works with PhonePe, GPay, Paytm, BHIM &amp; all UPI apps</p>
        </div>
        <button suppressHydrationWarning onClick={onBack} className="p-2 hover:bg-primary/5 rounded-full transition-colors group">
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary/40 font-bold">Amount to Pay</span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl font-bold text-primary">
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-primary/40 text-sm">.00</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-green-600 font-semibold uppercase tracking-widest">Amount pre-filled in QR</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white p-4 shadow-xl border border-primary/5 relative z-10">
              <Image
                src={qrUrl}
                alt={`UPI QR Code — ₹${cartTotal.toLocaleString("en-IN")}`}
                width={220}
                height={220}
                className="w-52 h-52 md:w-60 md:h-60 object-contain"
                unoptimized
              />
            </div>

            <p className="text-[10px] text-primary/40 mt-3 z-10 relative text-center">
              Order #{orderId} · Scan with any camera or UPI app
            </p>
          </div>

          {/* Manual transfer section */}
          <div className="border border-primary/10 p-5 space-y-3 bg-white">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Can&apos;t scan? Transfer manually</p>

            <div className="flex items-center justify-between py-2 border-b border-primary/5">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[10px] text-primary/40 uppercase tracking-widest">UPI ID</p>
                <p className="font-bold text-primary text-sm tracking-wide break-all">{COMPANY_CONFIG.upiId}</p>
              </div>
              <button suppressHydrationWarning onClick={copyUpi} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-2 border border-primary/20 hover:border-primary hover:bg-primary hover:text-white text-primary transition-all">
                {copiedUpi ? <IconCheck size={12} className="text-green-500" /> : <IconCopy size={12} />}
                {copiedUpi ? "Copied!" : "Copy ID"}
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[10px] text-primary/40 uppercase tracking-widest">Exact Amount</p>
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

          {/* Auto-advance countdown banner — appears for both UPI app & scanner paths */}
          <AnimatePresence>
            {(upiLaunched || scannerPrompt) && !autoAdvanceCancelled && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#0B2118] text-white p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Spinning countdown ring */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full border-4 border-[#C9A24A]/20" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-[#C9A24A] animate-spin" />
                      <span className="absolute inset-0 flex items-center justify-center font-black text-[#C9A24A] text-sm">{countdown}</span>
                    </div>
                    <div>
                      {scannerPrompt && !upiLaunched ? (
                        <>
                          <p className="text-sm font-bold text-white flex items-center gap-1.5">Did you just pay by scanning?
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          </p>
                          <p className="text-[11px] text-white/50">
                            Moving to next step in <span className="text-[#C9A24A] font-black">{countdown}s</span>
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-bold text-white">Welcome back!</p>
                          <p className="text-[11px] text-white/50">
                            Advancing to confirmation in <span className="text-[#C9A24A] font-black">{countdown}s</span>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleCancelAutoAdvance}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white border border-white/10 px-3 py-1.5 transition-colors flex-shrink-0"
                  >
                    Not Yet
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <a
              href={upiUri}
              onClick={() => { setUpiLaunched(true); setAutoAdvanceCancelled(false); }}
              className="flex-1 flex flex-col items-center justify-center bg-white border-2 border-primary text-primary py-3 px-2 text-xs font-bold tracking-wider hover:bg-primary hover:text-white transition-colors text-center"
            >
              <span>1. Open UPI App</span>
            </a>
            <button suppressHydrationWarning
              onClick={onConfirmPayment}
              className="flex-1 flex flex-col items-center justify-center bg-[#C9A24A] text-white py-3 px-2 text-xs font-bold tracking-wider hover:bg-[#0B2118] transition-colors shadow-lg shadow-[#0B2118]/20"
            >
              <span>2. I&apos;ve Paid ✓</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
