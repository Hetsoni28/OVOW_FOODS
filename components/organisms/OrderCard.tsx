"use client";

import { motion } from "framer-motion";
import { IconCalendar, IconCheck, IconArrowRight, IconShoppingBag } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";
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
  const { addItem, openCart } = useCart();

  const handleReorder = () => {
    order.items.forEach((item) => {
      // Add the item multiple times to match quantity
      for (let i = 0; i < item.quantity; i++) {
        addItem(item);
      }
    });
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="bg-white border border-primary/10 overflow-hidden shadow-lg shadow-primary/5 rounded-sm hover:shadow-xl hover:border-[#C9A24A]/30 transition-all duration-300 relative group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C9A24A] to-[#C9A24A]/30 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
      
      <div className="px-6 md:px-8 py-5 border-b border-primary/5 flex flex-wrap items-start justify-between gap-4 bg-primary/[0.02]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest bg-white border border-primary/10 px-2 py-0.5 rounded-sm">
              Order #{order.id}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D5A40] uppercase tracking-widest bg-[#1D5A40]/10 px-2 py-0.5 rounded-sm">
              <IconCheck size={12} /> Completed
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-primary/70 font-medium">
            <IconCalendar size={14} className="text-[#C9A24A]" />
            {new Date(order.date).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
              hour: "2-digit", minute: "2-digit"
            })}
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-2xl md:text-3xl font-bold text-[#0B2118] tabular-nums">
            ₹{order.total.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-primary/40 font-bold mt-1">
            {order.method === "cod" ? "Cash on Delivery" : "UPI Payment"}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="space-y-4 mb-8">
          {order.items.map((item, idx) => (
            <div key={item.slug + idx} className="flex justify-between items-center text-sm md:text-base border-b border-primary/5 pb-4 last:border-0 last:pb-0">
              <span className="text-primary font-medium flex items-center gap-3">
                <span className="bg-primary/5 text-primary px-2 py-1 rounded-sm text-xs font-bold w-8 text-center">{item.quantity}x</span>
                <span>
                  {item.name} 
                  {item.size && <span className="block text-xs text-primary/50 mt-0.5 uppercase tracking-widest">{item.size}</span>}
                </span>
              </span>
              <span className="text-primary/80 tabular-nums font-serif text-lg">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleReorder}
            className="inline-flex items-center justify-center gap-2 bg-[#C9A24A] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all shadow-md hover:shadow-xl w-full sm:w-auto"
          >
            <IconShoppingBag size={16} />
            Reorder Items
          </button>
        </div>
      </div>
    </motion.div>
  );
}
