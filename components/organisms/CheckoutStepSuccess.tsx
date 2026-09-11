"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";
import { IconShoppingBag, IconCheck } from "@/components/atoms/Icons";

interface CheckoutStepSuccessProps {
  orderId: string;
  cartTotal: number;
  handleSendWhatsApp: () => void;
}

// Confetti particle
function Particle({ delay, color }: { delay: number; color: string }) {
  const x = (Math.random() - 0.5) * 600;
  const rotate = Math.random() * 720 - 360;
  const size = Math.random() * 8 + 4;
  return (
    <motion.div
      className="absolute top-0 left-1/2 pointer-events-none"
      style={{ width: size, height: size, backgroundColor: color, borderRadius: Math.random() > 0.5 ? "50%" : "0%" }}
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
      animate={{ y: 300 + Math.random() * 200, x, opacity: 0, rotate }}
      transition={{ duration: 1.5 + Math.random(), delay, ease: "easeOut" }}
    />
  );
}

const CONFETTI_COLORS = ["#C9A24A", "#0B2118", "#25D366", "#F97316", "#FBBF24", "#34D399"];

const ORDER_STEPS = [
  { label: "Order Received", sub: "Your order is in our system", done: true },
  { label: "Kitchen Notified", sub: "Chefs are being alerted", done: true },
  { label: "Preparing", sub: "Your food is being freshly made", done: false },
  { label: "Out for Delivery", sub: "On its way to you!", done: false },
];

export function CheckoutStepSuccess({ orderId, cartTotal, handleSendWhatsApp }: CheckoutStepSuccessProps) {
  const [showParticles, setShowParticles] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Trigger confetti after mount
  useEffect(() => {
    const t = setTimeout(() => setShowParticles(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Animate the order timeline steps
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      if (step >= 2) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleWA = () => {
    handleSendWhatsApp();
    setWhatsappSent(true);
  };

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: i * 0.04,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative max-w-2xl mx-auto"
    >
      {/* Confetti burst */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 overflow-visible pointer-events-none z-50">
            {particles.map((p) => (
              <Particle key={p.id} delay={p.delay} color={p.color} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Hero success card */}
      <div className="relative bg-[#0B2118] overflow-hidden">

        {/* Decorative gold rings */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-[#C9A24A]/10 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-[#C9A24A]/15 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-[#C9A24A]/10 pointer-events-none" />

        {/* Gold shimmer line at top */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent" />

        <div className="px-8 md:px-16 py-14 text-center relative z-10">

          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#C9A24A]/20"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full bg-[#C9A24A]/10 border border-[#C9A24A]/30" />
            {/* Check */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                className="w-14 h-14 rounded-full bg-[#C9A24A] flex items-center justify-center shadow-[0_0_30px_rgba(201,162,74,0.5)]"
              >
                <IconCheck size={28} strokeWidth={3} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A24A] mb-3">
              Order Confirmed
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
              Your food is on <br />
              <span className="text-[#C9A24A]">its way!</span>
            </h2>
            <p className="text-white/40 text-sm mt-4">
              We've received your order and the kitchen has been notified.
            </p>
          </motion.div>

          {/* Order ID + Amount chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center justify-center gap-3 mt-8 flex-wrap"
          >
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Order</span>
              <span className="text-sm font-black text-white tracking-wider">#{orderId}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#C9A24A]/10 border border-[#C9A24A]/30 px-4 py-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A24A]/60">Total</span>
              <span className="font-serif text-xl font-black text-[#C9A24A]">₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Order status timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white border-x border-b border-primary/5 px-8 py-8"
      >
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/30 mb-6">Order Status</p>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-primary/10" />

          <div className="space-y-5">
            {ORDER_STEPS.map((step, idx) => {
              const isActive = idx <= activeStep;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.15 }}
                  className="flex items-center gap-4 pl-0"
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-[#C9A24A] border-[#C9A24A] shadow-[0_0_12px_rgba(201,162,74,0.4)]"
                      : "bg-white border-primary/15"
                  }`}>
                    {isActive ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <IconCheck size={14} strokeWidth={3} className="text-white" />
                      </motion.div>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-primary/15" />
                    )}
                  </div>
                  {/* Label */}
                  <div className="flex-1">
                    <p className={`text-sm font-bold transition-colors ${isActive ? "text-primary" : "text-primary/30"}`}>
                      {step.label}
                    </p>
                    <p className={`text-[10px] transition-colors ${isActive ? "text-primary/50" : "text-primary/20"}`}>
                      {step.sub}
                    </p>
                  </div>
                  {idx <= 1 && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A24A] bg-[#C9A24A]/10 border border-[#C9A24A]/20 px-2 py-1">
                      Done
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white border-x border-b border-primary/5 px-8 pb-10 space-y-3"
      >
        {/* WhatsApp CTA — primary */}
        <motion.button
          suppressHydrationWarning
          onClick={handleWA}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full relative overflow-hidden flex items-center justify-center gap-3 px-8 py-5 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-500 shadow-xl ${
            whatsappSent
              ? "bg-[#0B2118] text-white"
              : "bg-[#25D366] text-white shadow-[#25D366]/30 hover:bg-[#1DA851]"
          }`}
        >
          {/* Shimmer */}
          {!whatsappSent && (
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite_1s] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
          )}
          <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
          <span>{whatsappSent ? "✓ WhatsApp Opened! Attach Your Screenshot" : "Send Order via WhatsApp + Attach Screenshot"}</span>
        </motion.button>

        {/* Important note */}
        {!whatsappSent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-[10px] text-primary/40 leading-relaxed"
          >
            ⚠️ Your order is only confirmed after you send the WhatsApp message with your payment screenshot.
          </motion.p>
        )}

        {/* Secondary buttons */}
        <div className="flex gap-3 pt-1">
          <Link
            href={`/receipt/${orderId}`}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-primary/15 text-primary px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-colors"
          >
            View Receipt
          </Link>
          <Link
            href="/menu"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-primary/15 text-primary px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-colors"
          >
            <IconShoppingBag size={14} />
            Order More
          </Link>
        </div>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-center text-[10px] text-primary/30 mt-6 leading-relaxed px-4"
      >
        Questions? WhatsApp us at {" "}
        <span className="text-primary/50 font-bold">+91 the number on your receipt</span>
      </motion.p>
    </motion.div>
  );
}
