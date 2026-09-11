import { IconCheckCircle, IconTruck, IconMapPin, IconPhone } from "@/components/atoms/Icons";
import { PorterActionClient } from "./PorterActionClient";
import { AdminLock } from "./AdminLock";

export default async function OrderActionPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await params;
  const fullId = resolvedParams.id;
  const orderRef = fullId.split("-").slice(0, 3).join("-");

  const resolvedSearchParams = await searchParams;
  const encodedPayload = resolvedSearchParams.d as string;

  let orderData = { n: "Unknown Customer", p: "Unknown Phone", a: "Unknown Address", t: "0" };

  try {
    if (encodedPayload) {
      orderData = JSON.parse(decodeURIComponent(atob(encodedPayload)));
    }
  } catch (e) {
    console.error("Failed to parse order payload", e);
  }

  return (
    <AdminLock>
      <div className="min-h-screen bg-[#0B2118] relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#C9A24A]/5 blur-[120px]" />
        </div>

        {/* Gold shimmer top */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#C9A24A] to-transparent" />

        {/* Header */}
        <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C9A24A]">OVOW FOODS</p>
            <h1 className="font-serif text-xl text-white mt-0.5">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Secure</span>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-8 space-y-4">

          {/* Order ID badge */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">New Order</p>
              <p className="font-mono text-xl font-black text-white tracking-wider">{orderRef}</p>
            </div>
            <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/30 px-4 py-2 text-right">
              <p className="text-[9px] text-[#C9A24A]/60 uppercase tracking-widest">Total</p>
              <p className="font-serif text-2xl font-black text-[#C9A24A]">₹{Number(orderData.t).toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Payment confirmed badge */}
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <IconCheckCircle size={16} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-300">Payment Marked as Completed</p>
              <p className="text-[11px] text-green-400/60 mt-0.5">Verify UPI transaction screenshot before booking delivery.</p>
            </div>
          </div>

          {/* Customer info card */}
          <div className="bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Customer Details</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Name + Address */}
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconMapPin size={14} className="text-[#C9A24A]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{orderData.n}</p>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">{orderData.a}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center pt-3 border-t border-white/5">
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconPhone size={14} className="text-[#C9A24A]" />
                </div>
                <p className="text-sm font-bold text-white tracking-wider">+91 {orderData.p}</p>
              </div>
            </div>
          </div>

          {/* Delivery method */}
          <div className="flex items-center justify-between bg-white/5 border border-white/10 px-5 py-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Delivery Method</p>
            <div className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 text-blue-300">
              <IconTruck size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Porter</span>
            </div>
          </div>

          {/* Interactive actions */}
          <PorterActionClient orderRef={orderRef} phone={orderData.p} customerName={orderData.n} />

        </main>
      </div>
    </AdminLock>
  );
}
