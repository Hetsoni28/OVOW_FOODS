"use client";

import { useState } from "react";
import { IconCheckCircle, IconTruck, IconAlertCircle, IconCopy, IconNavigation, IconLoader, IconExternalLink, IconMessageSquare } from "@/components/atoms/Icons";

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
      
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to book");
      }
      
      setData(result.data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success" && data) {
    return (
      <div className="pt-4 space-y-4">
        <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <IconCheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="font-bold text-green-800">Porter Booked Successfully!</p>
              <p className="text-xs text-green-700 font-medium mt-0.5">Pickup in {data.estimated_pickup}</p>
            </div>
          </div>
          
          <div className="space-y-3 bg-white p-4 rounded-lg border border-green-100 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Driver</p>
              <p className="text-sm font-bold text-gray-900">{data.driver.name}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Contact</p>
                <p className="text-sm font-medium text-gray-900">{data.driver.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Vehicle</p>
                <p className="text-sm font-medium text-gray-900">{data.driver.vehicle_number}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <a 
              href={data.tracking_url}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors"
            >
              Track Delivery <IconExternalLink size={14} />
            </a>
            
            {/* Notify Customer with Tracking Link */}
            {phone && (
              <button
                onClick={() => handleNotifyCustomer(data.tracking_url)}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <IconMessageSquare size={16} />
                Send Tracking to Customer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

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
    <div className="pt-4 space-y-3">
      {/* Accept & Notify Customer Button */}
      {phone && (
        <button
          onClick={() => handleNotifyCustomer()}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
        >
          <IconMessageSquare size={18} />
          Accept Order & Notify Customer
        </button>
      )}
      {/* Copy phone button */}
      {phone && (
        <button
          onClick={copyPhone}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
        >
          {copiedPhone ? <IconCheckCircle size={14} className="text-green-500" /> : <IconCopy size={14} />}
          {copiedPhone ? "Phone Copied!" : `Copy Phone: +91 ${phone}`}
        </button>
      )}
      <button 
        onClick={handleBookPorter}
        disabled={status === "loading"}
        className="w-full bg-[#1E40AF] hover:bg-blue-900 text-white p-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <IconLoader size={18} />
            Booking Porter...
          </>
        ) : (
          <>
            <IconTruck size={18} />
            Book Porter Delivery
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-center text-xs text-red-500 mt-3 font-bold bg-red-50 py-2 rounded">
          Failed to book. Please try again.
        </p>
      )}

      {status !== "error" && (
        <p className="text-center text-[10px] text-gray-400 mt-3 flex items-center justify-center gap-1">
          <IconAlertCircle size={12} /> Currently running in MOCK mode (No actual drivers booked)
        </p>
      )}
    </div>
  );
}
