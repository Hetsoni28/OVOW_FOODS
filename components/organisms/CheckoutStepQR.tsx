"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, QrCode, AlertTriangle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {  pageAnim, childAnim  } from "@/lib/animations";
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
  const [copied, setCopied] = useState(false);

  const copyUpi = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <motion.div variants={childAnim} className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Scan to Pay</h2>
          <p className="text-primary/50 text-sm">Scan the QR code with any UPI app.</p>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-primary/5 rounded-full transition-colors group">
          <ArrowLeft size={20} className="text-primary/40 group-hover:text-primary transition-colors" />
        </button>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 lg:order-2">
          <CheckoutOrderSummary cart={cart} cartTotal={cartTotal} />
        </div>

        <motion.div variants={childAnim} className="lg:order-1">
          <div className="bg-primary/5 p-8 flex flex-col items-center justify-center border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="bg-white p-4 shadow-xl border border-primary/5 mb-8 relative z-10">
              <Image src={qrUrl} alt="UPI QR Code" width={220} height={220} className="w-56 h-56 md:w-64 md:h-64 object-contain" unoptimized />
            </div>
            
            <div className="text-center space-y-4 w-full relative z-10">
              <div className="flex items-center justify-center gap-2">
                <span className="text-primary/60 text-sm">UPI ID:</span>
                <span className="font-bold text-primary tracking-wide">{COMPANY_CONFIG.upiId}</span>
                <button onClick={copyUpi} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-primary" title="Copy UPI ID">
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="flex gap-4">
                <a href={upiUri} className="flex-1 bg-white border-2 border-primary text-primary py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors text-center">
                  Pay with App
                </a>
                <button onClick={onConfirmPayment} className="flex-1 bg-primary text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#1A4D3A] transition-colors shadow-lg shadow-primary/20">
                  I have paid
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-start gap-3 bg-red-50 p-4 border border-red-100">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 leading-relaxed">
              <strong>Do not close this page</strong> until you click <br/>"I have paid" after successful payment.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
