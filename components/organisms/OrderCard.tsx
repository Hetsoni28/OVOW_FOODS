"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/config";
import type { CartItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export interface OrderItem {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  method?: string;
}

export function OrderCard({ order, index }: { order: OrderItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="bg-white border border-primary/10 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-primary/5 flex flex-wrap items-center justify-between gap-4 bg-primary/[0.02]">
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">
            Order #{order.id}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-primary/70">
            <Calendar size={12} className="text-primary/40" />
            {new Date(order.date).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit"
            })}
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-xl font-bold text-[#C9A24A] tabular-nums">
            ₹{order.total.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mt-0.5">
            {order.method === "cod" ? "Cash on Delivery" : "UPI Payment"}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.slug} className="flex justify-between text-sm">
              <span className="text-primary">
                <span className="text-primary/40 mr-2">{item.quantity}x</span>
                {item.name} {item.size ? `(${item.size})` : ""}
              </span>
              <span className="text-primary/60 tabular-nums">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=Hi, I would like to reorder my previous order (${order.id}). Can you help me?`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C9A24A] hover:text-primary transition-colors"
        >
          Reorder via WhatsApp <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
