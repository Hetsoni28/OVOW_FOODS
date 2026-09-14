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

function TruckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
    /* Full-width on mobile so it can breathe; auto/inline on md+ */
    <div className="flex items-center justify-center py-1 px-4 w-full md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        /* w-full on mobile, auto on md — max-w caps it on wide screens */
        className="flex items-center gap-0 w-full md:w-auto md:inline-flex bg-white/90 backdrop-blur-md border border-primary/8 rounded-full shadow-[0_2px_16px_rgba(11,33,24,0.07)] overflow-hidden"
      >
        {/* Left accent stripe */}
        <div className="w-1 self-stretch bg-gradient-to-b from-green-400 to-green-500 rounded-l-full flex-shrink-0" />

        {/* Main content — flex, allow wrapping on tiny screens */}
        <div className="flex items-center gap-2 pl-3 pr-2 py-2 min-w-0 flex-1">

          {/* Live pulse dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>

          {/* Truck icon */}
          <span className="text-[#C9A24A] flex-shrink-0">
            <TruckIcon />
          </span>

          {/* Animated text — truncates cleanly on narrow screens */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {visible && (
                <motion.div
                  key={ev._id}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  /* On mobile: wrap allowed; on md+: nowrap */
                  className="flex items-baseline flex-wrap gap-x-1 gap-y-0 text-[10px] md:text-[11px] leading-tight"
                >
                  <span className="font-bold text-[#0B2118] whitespace-nowrap">
                    {ev.itemCount} {ev.itemCount === 1 ? "item" : "items"}
                  </span>
                  <span className="text-[#0B2118]/40 font-medium whitespace-nowrap">dispatched to</span>
                  {/* Area truncates if very long */}
                  <span className="font-bold text-[#0B2118] truncate max-w-[100px] sm:max-w-none">{ev.area}</span>
                  <span className="text-[#0B2118]/30 hidden sm:inline">·</span>
                  <span className="text-[#0B2118]/35 font-medium whitespace-nowrap hidden sm:inline">{timeAgo(ev.placedAt)}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider — hidden on very small screens */}
          <div className="w-px h-4 bg-primary/10 flex-shrink-0 hidden xs:block sm:block" />

          {/* Recent badge — hidden on xs, visible sm+ */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#C9A24A]/10 border border-[#C9A24A]/25 rounded-full px-2.5 py-1 flex-shrink-0">
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
