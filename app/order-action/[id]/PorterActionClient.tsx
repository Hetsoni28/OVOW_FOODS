"use client";

import { useState } from "react";
import {
  IconCheckCircle, IconTruck, IconAlertCircle, IconCopy,
  IconLoader, IconExternalLink, IconMessageSquare
} from "@/components/atoms/Icons";
import { motion, AnimatePresence } from "framer-motion";

interface PorterData {
  order_id: string;
  tracking_url: string;
  driver: {
    name: string;
    phone: string;
    vehicle_number: string;
  };
  estimated_pickup: string;
}

export function PorterActionClient({ orderRef, phone, customerName }: { orderRef: string; phone?: string; customerName?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [data, setData] = useState<PorterData | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyPhone = () => {
    if (!phone) return;
    navigator.clipboard.writeText(`+91${phone}`);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleBookPorter = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/porter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderRef }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || "Failed to book");
      setData(result.data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleNotifyCustomer = (trackingUrl?: string) => {
    if (!phone) return;
    const msg = [
      `✨ *OVOW FOODS | ORDER CONFIRMED* ✨`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello ${customerName || "there"}! 👋`,
      ``,
      `Great news! We have received your order *${orderRef}* and it has been *ACCEPTED*! 🟢`,
      ``,
      `Our chefs are preparing your world-class meal right now. 👨‍🍳🔥`,
      trackingUrl ? `\n*🚚 TRACK YOUR DELIVERY:*\n${trackingUrl}\n` : `We will deliver it to you shortly.`,
      ``,
      `Thank you for choosing OVOW FOODS! 🌿`
    ].join("\n");
    window.open(`https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-3 pt-2">
      <AnimatePresence mode="wait">

        {/* SUCCESS STATE */}
        {status === "success" && data && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/20 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-green-500/10">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <IconCheckCircle size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-green-300">Porter Booked!</p>
                <p className="text-[11px] text-green-400/60">Pickup in {data.estimated_pickup}</p>
              </div>
            </div>

            {/* Driver details */}
            <div className="px-5 py-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Driver</p>
                <p className="text-sm font-bold text-white">{data.driver.name}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Contact</p>
                <p className="text-sm font-bold text-white">{data.driver.phone}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Vehicle</p>
                <p className="text-sm font-bold text-white">{data.driver.vehicle_number}</p>
              </div>
            </div>

            <div className="px-5 pb-4 space-y-2">
              <a
                href={data.tracking_url}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-green-500 hover:bg-green-400 text-white py-3.5 font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 transition-colors"
              >
                Track Delivery <IconExternalLink size={13} />
              </a>
              {phone && (
                <button
                  onClick={() => handleNotifyCustomer(data.tracking_url)}
                  className="w-full bg-[#25D366] hover:bg-[#1da851] text-white py-3.5 font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <IconMessageSquare size={14} />
                  Send Tracking to Customer
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* IDLE / ERROR STATE */}
        {status !== "success" && (
          <motion.div key="actions" className="space-y-2">

            {/* Accept & Notify */}
            {phone && (
              <button
                onClick={() => handleNotifyCustomer()}
                className="w-full bg-[#25D366] hover:bg-[#1da851] active:scale-[0.98] text-white py-4 font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
              >
                <IconMessageSquare size={17} />
                Accept &amp; Notify Customer
              </button>
            )}

            {/* Copy phone */}
            {phone && (
              <button
                onClick={copyPhone}
                className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 text-xs font-bold text-white/40 hover:border-white/30 hover:text-white/70 transition-colors"
              >
                {copiedPhone ? <IconCheckCircle size={13} className="text-green-400" /> : <IconCopy size={13} />}
                {copiedPhone ? "Copied!" : `Copy: +91 ${phone}`}
              </button>
            )}

            {/* Book Porter */}
            <button
              onClick={handleBookPorter}
              disabled={status === "loading"}
              className="w-full bg-[#1E40AF] hover:bg-blue-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-900/20"
            >
              {status === "loading" ? (
                <><IconLoader size={16} /> Booking Porter...</>
              ) : (
                <><IconTruck size={16} /> Book Porter Delivery</>
              )}
            </button>

            {/* Error message */}
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 py-2.5 px-4"
                >
                  <IconAlertCircle size={13} className="text-red-400" />
                  <p className="text-xs text-red-400 font-bold">Failed to book. Please try again.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {status !== "error" && (
              <p className="text-center text-[9px] text-white/15 mt-2 flex items-center justify-center gap-1 uppercase tracking-wider">
                <IconAlertCircle size={10} />
                Mock mode — no actual drivers booked
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
