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


export function LiveDispatchTicker({ events }: { events: OrderEvent[] }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  // "3m ago" depends on the current time, so only render it in the browser —
  // the server-rendered (cached) value would never match and cause a hydration error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (events.length <= 1) return;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const t = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIdx((i) => (i + 1) % events.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => {
      clearInterval(t);
      clearTimeout(swap);
    };
  }, [events.length]);

  if (!events.length) return null;

  const ev = events[idx % events.length];
  // Older events were saved before locality extraction — never show numbers/house details
  const area = /^[A-Za-z][A-Za-z .-]{2,23}$/.test(ev.area?.trim() ?? "") ? ev.area.trim() : "Ahmedabad";

  return (
    <div className="container-x flex items-center gap-4 py-3.5 text-[13px] md:gap-6">
      {/* Label */}
      <span className="flex shrink-0 items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C9A24A] md:text-[11px]">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7BC69A] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7BC69A]" />
        </span>
        <span className="hidden sm:inline">Live from the kitchen</span>
        <span className="sm:hidden">Live</span>
      </span>
      <span aria-hidden="true" className="h-4 w-px shrink-0 bg-white/20" />

      {/* Rotating event */}
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.p
              key={ev._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="truncate text-white/80"
            >
              <span className="font-semibold text-white">
                {ev.itemCount} {ev.itemCount === 1 ? "dish" : "dishes"}
              </span>{" "}
              on the way to <span className="font-semibold text-white">{area}</span>
              {mounted && <span className="text-white/60"> · {timeAgo(ev.placedAt)}</span>}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <span className="hidden shrink-0 font-serif text-sm italic text-white/60 md:inline">
        {events.length} recent orders
      </span>
    </div>
  );
}
