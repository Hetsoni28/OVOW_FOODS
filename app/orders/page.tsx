"use client";

import { useOrderHistory } from "@/hooks/useOrderHistory";
import { motion } from "framer-motion";
import Link from "next/link";
import { Receipt, Calendar, ArrowRight, ShoppingBag } from "lucide-react";
import { COMPANY_CONFIG } from "@/lib/config";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function OrdersPage() {
  const { orders, mounted } = useOrderHistory();

  if (!mounted) return null;

  return (
    <div className="min-h-[85vh] bg-[#F9F6F0] pt-12 pb-32">
      <div className="container-x max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#C9A24A]/10 text-[#C9A24A] px-3 py-1.5 mb-4">
            <Receipt size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Order History</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-3">Past Orders</h1>
          <p className="text-sm text-primary/60 max-w-md leading-relaxed">
            View your recent orders and reorder your favorites.
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="bg-white border border-primary/10 p-12 text-center"
          >
            <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-[#C9A24A]" />
            </div>
            <h2 className="font-serif text-2xl text-primary font-bold mb-2">No past orders yet</h2>
            <p className="text-sm text-primary/60 mb-6">Looks like you haven't placed any orders from this device.</p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#C9A24A] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors"
            >
              Explore Menu
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id + order.date}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
