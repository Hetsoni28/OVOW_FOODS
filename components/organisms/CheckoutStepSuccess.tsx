"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {  pageAnim, childAnim  } from "@/lib/animations";
import { WhatsAppIcon } from "@/components/atoms/WhatsAppIcon";

interface CheckoutStepSuccessProps {
  orderId: string;
  cartTotal: number;
  handleSendWhatsApp: (isCod: boolean) => void;
}

export function CheckoutStepSuccess({ orderId, cartTotal, handleSendWhatsApp }: CheckoutStepSuccessProps) {
  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" className="bg-white p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 text-center max-w-2xl mx-auto">
      <motion.div variants={childAnim} className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-8 border border-green-100">
        <CheckCircle2 size={40} className="text-green-500" />
      </motion.div>
      
      <motion.h2 variants={childAnim} className="font-serif text-4xl md:text-5xl text-primary mb-4">
        Order Received!
      </motion.h2>
      
      <motion.p variants={childAnim} className="text-primary/60 text-lg mb-8">
        Your order <span className="font-bold text-primary">#{orderId}</span> has been saved.
      </motion.p>

      <motion.div variants={childAnim} className="bg-primary/5 p-6 mb-10 inline-block text-left min-w-[280px]">
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-primary/60">Amount Paid</span>
          <span className="font-serif text-xl text-primary">₹{cartTotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-primary/60">Status</span>
          <span className="text-[#C9A24A] font-bold uppercase tracking-wider text-xs">Processing</span>
        </div>
      </motion.div>

      <motion.div variants={childAnim} className="space-y-4 max-w-md mx-auto">
        <button
          onClick={() => handleSendWhatsApp(false)}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1DA851] transition-colors shadow-lg shadow-[#25D366]/20"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Send Receipt on WhatsApp
        </button>
        
        <Link href="/menu" className="w-full flex items-center justify-center gap-3 bg-transparent border-2 border-primary text-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-colors">
          <ShoppingBag size={16} />
          Order More Food
        </Link>
      </motion.div>
    </motion.div>
  );
}
