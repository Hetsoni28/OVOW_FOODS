"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Smartphone, Banknote, ShieldCheck } from "lucide-react";
import {  pageAnim, childAnim  } from "@/lib/animations";
import type {  PaymentMethod  } from "./CheckoutTypes";
import type { CartItem } from "@/types";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";

interface CheckoutStepPaymentProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  cart: CartItem[];
  cartTotal: number;
  handleSendWhatsApp: (isCod: boolean) => void;
  onBack: () => void;
}

export function CheckoutStepPayment({ paymentMethod, setPaymentMethod, cart, cartTotal, handleSendWhatsApp, onBack }: CheckoutStepPaymentProps) {
  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <motion.div variants={childAnim} className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Order Summary</h2>
          <p className="text-primary/50 text-sm">Review your items and choose payment method.</p>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-primary/5 rounded-full transition-colors group">
          <ArrowLeft size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <CheckoutOrderSummary cart={cart} cartTotal={cartTotal} />
        </div>

        <motion.div variants={childAnim} className="space-y-8 lg:border-l lg:border-primary/10 lg:pl-12">
          <div>
            <h3 className="font-serif text-xl text-primary mb-6">Payment Method</h3>
            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`w-full p-5 border-2 flex items-center gap-4 transition-all ${
                  paymentMethod === "upi" ? "border-[#C9A24A] bg-[#C9A24A]/5 shadow-[0_0_20px_rgba(201,162,74,0.15)]" : "border-primary/10 hover:border-primary/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "upi" ? "bg-[#C9A24A] text-white" : "bg-primary/5 text-primary/40"}`}>
                  <Smartphone size={24} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-bold ${paymentMethod === "upi" ? "text-primary" : "text-primary/70"}`}>Pay Online (UPI)</p>
                  <p className="text-xs text-primary/50 mt-1">GPay, PhonePe, Paytm, etc.</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "upi" ? "border-[#C9A24A]" : "border-primary/20"}`}>
                  {paymentMethod === "upi" && <div className="w-2.5 h-2.5 bg-[#C9A24A] rounded-full" />}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("cod")}
                className={`w-full p-5 border-2 flex items-center gap-4 transition-all ${
                  paymentMethod === "cod" ? "border-primary bg-primary/5 shadow-lg" : "border-primary/10 hover:border-primary/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "cod" ? "bg-primary text-white" : "bg-primary/5 text-primary/40"}`}>
                  <Banknote size={24} />
                </div>
                <div className="text-left flex-1">
                  <p className={`font-bold ${paymentMethod === "cod" ? "text-primary" : "text-primary/70"}`}>Cash on Delivery</p>
                  <p className="text-xs text-primary/50 mt-1">Pay when your food arrives</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-primary" : "border-primary/20"}`}>
                  {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => handleSendWhatsApp(paymentMethod === "cod")}
              className="w-full flex items-center justify-between bg-[#C9A24A] text-white px-8 py-5 group hover:bg-[#0B2118] transition-all hover:shadow-xl hover:shadow-[#0B2118]/20 hover:-translate-y-1"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{paymentMethod === "cod" ? "Place Order on WhatsApp" : "Proceed to QR Code"}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#C9A24A]" />
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] uppercase tracking-widest text-primary/40 font-bold">
              <ShieldCheck size={14} /> Secure Checkout Process
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
