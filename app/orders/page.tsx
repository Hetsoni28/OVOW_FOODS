"use client";

import { useOrderHistory } from "@/hooks/useOrderHistory";
import { motion } from "framer-motion";
import { IconReceipt } from "@/components/atoms/Icons";
import { OrderEmptyState } from "@/components/organisms/OrderEmptyState";
import { OrderCard, type OrderItem } from "@/components/organisms/OrderCard";
import { OrderSuggestionsSection } from "@/components/organisms/OrderSuggestionsSection";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function OrdersPage() {
  const { orders, mounted } = useOrderHistory();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F9F6F0]">
      {/* Premium Header Section */}
      <div className="bg-[#0B2118] text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A24A]/5 to-transparent"></div>
        
        <div className="container-x relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 bg-[#C9A24A]/20 border border-[#C9A24A]/30 text-[#C9A24A] px-4 py-2 rounded-full mb-6">
              <IconReceipt size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Your Order History</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Past Orders</h1>
            <p className="text-[#F9F6F0]/70 max-w-lg mx-auto leading-relaxed">
              Relive your favorite dining experiences. View your recent orders and reorder your favorites with a single click.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Orders List Section */}
      <div className="container-x max-w-4xl mx-auto -mt-20 relative z-20 pb-32">
        {orders.length === 0 ? (
          <OrderEmptyState />
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <OrderCard key={order.id + order.date} order={order as OrderItem} index={i} />
            ))}
          </div>
        )}

        {/* Smart Suggestions Section */}
        <OrderSuggestionsSection />
      </div>
    </div>
  );
}
