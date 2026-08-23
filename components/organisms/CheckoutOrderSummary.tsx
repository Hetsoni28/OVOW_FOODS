"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { CartItem } from "@/types";
import {  pageAnim, childAnim  } from "@/lib/animations";

interface CheckoutOrderSummaryProps {
  cart: CartItem[];
  cartTotal: number;
}

export function CheckoutOrderSummary({ cart, cartTotal }: CheckoutOrderSummaryProps) {
  return (
    <motion.div
      variants={pageAnim}
      initial="hidden"
      animate="visible"
      className="bg-primary/5 p-8 border border-primary/10"
    >
      <motion.div variants={childAnim} className="flex items-center gap-3 mb-8">
        <ShoppingBag className="text-[#C9A24A]" />
        <h2 className="font-serif text-2xl text-primary">Your Order</h2>
      </motion.div>
      <div className="space-y-4 mb-8">
        {cart.map((item, i) => (
          <motion.div variants={childAnim} key={`${item._id}-${i}`} className="flex justify-between items-start text-sm border-b border-primary/5 pb-4">
            <div>
              <p className="font-bold text-primary mb-1">{item.name}</p>
              <p className="text-primary/50 text-xs">Qty: {item.quantity}</p>
            </div>
            <p className="font-serif text-primary">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.div variants={childAnim} className="flex justify-between items-center pt-4">
        <p className="font-bold text-primary">Total</p>
        <p className="font-serif text-3xl text-primary">
          ₹{cartTotal.toLocaleString("en-IN")}
        </p>
      </motion.div>
    </motion.div>
  );
}
