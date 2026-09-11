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
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
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
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-primary/10 px-4 py-2.5 rounded-full shadow-sm">
        {/* Live dot */}
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>

        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={ev._id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] text-primary/70 font-medium whitespace-nowrap"
            >
              🛵 <span className="font-bold text-primary">{ev.itemCount} {ev.itemCount === 1 ? "item" : "items"}</span>
              {" "}dispatched to{" "}
              <span className="font-bold text-primary">{ev.area}</span>
              {" · "}
              <span className="text-primary/40">{timeAgo(ev.placedAt)}</span>
            </motion.p>
          )}
        </AnimatePresence>

        {/* Event count badge */}
        <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A24A] bg-[#C9A24A]/10 border border-[#C9A24A]/20 px-2 py-0.5 rounded-full flex-shrink-0">
          {events.length} recent
        </span>
      </div>
    </div>
  );
}
