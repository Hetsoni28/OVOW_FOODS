"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconBell } from "@/components/atoms/Icons";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WHATSAPP_NUMBER = "917567566214";

const TIME_OPTIONS = [
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
];

const DAY_OPTIONS = [
  { label: "Today", offset: 0 },
  { label: "Tomorrow", offset: 1 },
  { label: "Day After", offset: 2 },
  { label: "This Weekend", offset: null },
];

function getDateLabel(option: typeof DAY_OPTIONS[0]) {
  if (option.offset === null) {
    // Next Saturday
    const d = new Date();
    const daysUntilSat = (6 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + daysUntilSat);
    return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
  }
  const d = new Date();
  d.setDate(d.getDate() + option.offset);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
}

interface ReminderModalProps {
  productName: string;
  productPrice: number;
}

export function ReminderButton({ productName, productPrice }: ReminderModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [sent, setSent] = useState(false);

  function handleConfirm() {
    const dayLabel = getDateLabel(DAY_OPTIONS[selectedDay]);
    const message = encodeURIComponent(
      `🍽️ *Pre-Order Request — OVOW FOODS*\n\n` +
      `Hi! I'd like to Pre-Order:\n` +
      `*${productName}* — ₹${productPrice}\n\n` +
      `📅 *Requested Date:* ${dayLabel}\n` +
      `🕐 *Requested Time:* ${selectedTime}\n\n` +
      `Please confirm availability. Thank you!`
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2.5 border border-[#C9A24A]/40 text-[#C9A24A] hover:bg-[#C9A24A]/10 px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
      >
        <IconBell size={15} />
        Set Pre-Order Reminder
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="bg-[#0B2118] w-full max-w-md rounded-sm border border-[#C9A24A]/20 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A24A] font-bold mb-1">Pre-Order Reminder</p>
                  <h3 className="font-serif text-xl text-white">{productName}</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  <IconX size={16} />
                </button>
              </div>

              <div className="px-6 py-6 space-y-6">
                {/* Day Picker */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3">Choose Day</p>
                  <div className="grid grid-cols-2 gap-2">
                    {DAY_OPTIONS.map((opt, i) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedDay(i)}
                        className={`px-4 py-3 rounded-sm text-left transition-all duration-200 border ${
                          selectedDay === i
                            ? "bg-[#C9A24A] border-[#C9A24A] text-white"
                            : "border-white/10 text-white/70 hover:border-[#C9A24A]/40 hover:text-white"
                        }`}
                      >
                        <p className="text-xs font-bold">{opt.label}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{getDateLabel(opt)}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Picker */}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3">Choose Time</p>
                  <div className="grid grid-cols-5 gap-2">
                    {TIME_OPTIONS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 text-[10px] font-bold rounded-sm border transition-all duration-200 ${
                          selectedTime === t
                            ? "bg-[#C9A24A] border-[#C9A24A] text-white"
                            : "border-white/10 text-white/60 hover:border-[#C9A24A]/40 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-sm">
                  <p className="text-xs text-white/60">
                    📅 <span className="text-white font-medium">{getDateLabel(DAY_OPTIONS[selectedDay])}</span> at{" "}
                    <span className="text-white font-medium">{selectedTime}</span>
                  </p>
                  <p className="text-[10px] text-white/40 mt-1">
                    We'll send your Pre-Order request via WhatsApp
                  </p>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirm}
                  className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                    sent
                      ? "bg-[#1D5A40] text-white"
                      : "bg-[#C9A24A] hover:bg-white text-[#0B2118]"
                  }`}
                >
                  {sent ? "✓ Opening WhatsApp..." : "🔔 Send Pre-Order Request"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
