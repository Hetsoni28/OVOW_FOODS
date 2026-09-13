"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderEvent {
  _id: string;
  orderId: string;
  area: string;
  itemCount: number;
  paymentMethod: string;
  placedAt: string;
}

function timeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

// Delivery truck SVG icon
function TruckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/>
      <circle cx="17" cy="19" r="2"/><circle cx="7" cy="19" r="2"/>
    </svg>
  );
}

export function LiveDispatchTicker({ events }: { events: OrderEvent[] }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (events.length <= 1) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % events.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, [events.length]);

  if (!events.length) return null;

  const ev = events[idx];

  return (
    <div className="flex items-center justify-center py-1">
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-0 bg-white/90 backdrop-blur-md border border-primary/8 rounded-full shadow-[0_2px_16px_rgba(11,33,24,0.07)] overflow-hidden"
      >
        {/* Left accent stripe */}
        <div className="w-1 h-full bg-gradient-to-b from-green-400 to-green-500 self-stretch rounded-l-full" />

        {/* Main content */}
        <div className="flex items-center gap-3 pl-3 pr-1 py-2">

          {/* Live pulse dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>

          {/* Truck icon */}
          <span className="text-[#C9A24A]">
            <TruckIcon />
          </span>

          {/* Animated text */}
          <AnimatePresence mode="wait">
            {visible && (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="flex items-center gap-1.5 text-[11px] whitespace-nowrap"
              >
                <span className="font-bold text-[#0B2118]">
                  {ev.itemCount} {ev.itemCount === 1 ? "item" : "items"}
                </span>
                <span className="text-[#0B2118]/40 font-medium">dispatched to</span>
                <span className="font-bold text-[#0B2118]">{ev.area}</span>
                <span className="text-[#0B2118]/30 mx-0.5">·</span>
                <span className="text-[#0B2118]/35 font-medium">{timeAgo(ev.placedAt)}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="w-px h-4 bg-primary/10 flex-shrink-0" />

          {/* Recent badge — pill with gold */}
          <div className="flex items-center gap-1.5 bg-[#C9A24A]/10 border border-[#C9A24A]/25 rounded-full px-2.5 py-1 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24A] flex-shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C9A24A]">
              {events.length} Recent
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
