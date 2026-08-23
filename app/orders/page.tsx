"use client";

import { useOrderHistory } from "@/hooks/useOrderHistory";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
import { OrderEmptyState } from "@/components/organisms/OrderEmptyState";
import { OrderCard, type OrderItem } from "@/components/organisms/OrderCard";

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
          <OrderEmptyState />
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <OrderCard key={order.id + order.date} order={order as OrderItem} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
