import { IconCheckCircle, IconTruck, IconMapPin } from "@/components/atoms/Icons";
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-[#0B2118] p-6 text-center relative">
          <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-green-500/30">
            Secure Link
          </div>
          <h1 className="font-serif text-2xl text-[#C9A24A]">OVOW FOODS</h1>
          <p className="text-white/60 text-xs mt-1 tracking-widest uppercase">Admin Action Portal</p>
        </div>

        <AdminLock>
          <div className="p-6 space-y-6">
            
            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order Ref</p>
                  <p className="font-bold text-gray-900">{orderRef}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="font-bold text-gray-900 text-lg">₹{Number(orderData.t).toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex items-center gap-3 p-3 bg-green-50 text-green-800 rounded-lg border border-green-100">
                <IconCheckCircle size={18} className="text-green-600" />
                <div>
                  <p className="text-sm font-bold">Payment Marked Completed</p>
                  <p className="text-xs text-green-700/80">Please verify UPI transaction before booking.</p>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Delivery Method</p>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                    <IconTruck size={14} /> PORTER
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                  {/* Address */}
                  <div className="flex gap-3">
                    <IconMapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{orderData.n}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {orderData.a}
                      </p>
                    </div>
                  </div>
                  
                  {/* Contact — copy handled in client */}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-bold text-gray-900">+91 {orderData.p}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Actions — client component */}
            <PorterActionClient orderRef={orderRef} phone={orderData.p} customerName={orderData.n} />

          </div>
        </AdminLock>
      </div>
    </div>
  );
}
