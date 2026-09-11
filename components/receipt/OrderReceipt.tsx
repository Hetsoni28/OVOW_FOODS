"use client";

import { useEffect, useRef, useState } from "react";
import { Order } from "@/types";
import { getOrderFromStorage } from "@/lib/storage";
import { Logo } from "@/components/atoms/Logo";
import { IconCheckCircle, IconDownload, IconChevronLeft, IconMapPin, IconReceiptText, IconClock } from "@/components/atoms/Icons";
import Link from "next/link";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

export function OrderReceipt({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load from localStorage
    const savedOrder = getOrderFromStorage(orderId);
    if (savedOrder) {
      setOrder(savedOrder);
    }
    setLoading(false);
  }, [orderId]);

  const handleDownloadPDF = async () => {
    if (!receiptRef.current || !order) return;
    setDownloading(true);

    try {
      const original = receiptRef.current;

      // Clone off-screen so we don't mess with the visible UI
      const clone = original.cloneNode(true) as HTMLElement;
      clone.style.cssText = [
        "position:fixed",
        "top:-9999px",
        "left:0",
        "width:800px",
        "padding:48px",
        "background:#ffffff",
        "overflow:visible",
        "box-shadow:none",
      ].join(";");

      // ── Strip CSS that html2canvas cannot render ──────────────────────
      // 1. Remove blur / opacity from watermark logo
      clone.querySelectorAll<HTMLElement>('[class*="blur"]').forEach(el => {
        el.style.filter = "none";
        el.style.opacity = "0"; // just hide it; it's decorative
      });

      // 2. Fix mix-blend-multiply on stamp (replace with normal + lower opacity)
      clone.querySelectorAll<HTMLElement>('[class*="mix-blend"]').forEach(el => {
        el.style.mixBlendMode = "normal";
        el.style.opacity = "0.07";
      });

      // 3. Remove mask-image from ticket edges (they're purely decorative)
      clone.querySelectorAll<HTMLElement>('[class*="ovow-ticket-edge"]').forEach(el => {
        el.style.display = "none";
      });

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OVOW-Invoice-${order.orderId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F6F0] p-4 text-center">
        <IconReceiptText size={48} className="text-primary/20 mb-4" />
        <h1 className="font-serif text-3xl text-primary mb-2">Receipt Not Found</h1>
        <p className="text-primary/60 mb-8 max-w-md">
          We couldn&apos;t find this order on your device. If you cleared your browser data or used a different device, the receipt cannot be displayed.
        </p>
        <Link href="/" className="bg-primary text-white px-8 py-4 uppercase text-xs font-bold tracking-widest hover:bg-primary/90 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] py-12 px-4 sm:px-6 flex flex-col items-center">
      {/* Top Action Bar */}
      <div className="w-full max-w-3xl mb-8 flex justify-between items-center px-2">
        <Link href="/menu" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
          <IconChevronLeft size={16} /> Back
        </Link>
        <button suppressHydrationWarning
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#C9A24A] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#b08b3e] transition-all shadow-[0_4px_14px_rgba(201,162,74,0.3)] hover:shadow-[0_6px_20px_rgba(201,162,74,0.4)] disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5"
        >
          <IconDownload size={16} />
          {downloading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl relative"
      >
        {/* Decorative Ticket Edge (Top) */}
        <div className="ovow-ticket-edge h-3 w-full bg-[radial-gradient(circle,transparent_4px,#ffffff_5px)] bg-[length:12px_12px] bg-bottom" style={{ maskImage: "linear-gradient(to bottom, transparent 40%, black 41%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 40%, black 41%)" }} />

        {/* The actual printable area */}
        <div id="ovow-receipt-printable" ref={receiptRef} className="p-8 md:p-14 bg-white relative shadow-[0_20px_50px_rgba(18,59,42,0.06)] overflow-hidden">
          
          {/* Faint Watermark Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-[0.02] pointer-events-none">
            <Logo className="w-[120%] h-auto grayscale blur-[2px]" />
          </div>

          {/* Rubber Stamp Effect */}
          <div className="ovow-stamp absolute top-48 right-8 md:right-20 pointer-events-none opacity-10 rotate-[-15deg] z-0 select-none">
            {(order.payment.method === "COD" || order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID") ? (
              <div className="border-[6px] border-green-700 text-green-700 px-8 py-3 text-5xl font-black uppercase tracking-[0.2em] mix-blend-multiply">CONFIRMED</div>
            ) : (
              <div className="border-[6px] border-[#C9A24A] text-[#C9A24A] px-8 py-3 text-5xl font-black uppercase tracking-[0.2em] mix-blend-multiply">PENDING</div>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col items-center border-b-[2px] border-dashed border-primary/20 pb-8 mb-8 relative z-10">
            <Logo className="w-20 h-20 mb-5" />
            <h1 className="font-serif text-4xl font-bold tracking-tight text-primary">OVOW FOODS</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A24A] font-bold mt-2">Taste the Wow. Experience OVOW.</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-primary/40 font-bold mt-1">100% Pure Vegetarian</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-5 mt-7 text-xs text-primary/70 font-mono bg-[#F9F6F0] border border-primary/10 px-6 py-2.5">
              <span>{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase()}</span>
              <span className="w-1 h-1 bg-primary/20 rounded-full" />
              <span>{new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
              <span className="w-1 h-1 bg-primary/20 rounded-full" />
              <span className="font-bold text-primary">ORD: {order.orderId}</span>
            </div>
          </div>

          {/* Customer & Delivery Section */}
          <div className="grid md:grid-cols-2 gap-10 border-b-[2px] border-dashed border-primary/20 pb-8 mb-8 relative z-10">
            {/* Customer Details */}
            <div className="bg-[#F9F6F0] p-6 border border-primary/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-4 border-b border-primary/10 pb-2">Billed To</h3>
              <p className="font-bold text-primary text-lg mb-1">{order.customer.name}</p>
              <p className="text-primary/70 text-sm font-mono mb-1">+91 {order.customer.phone}</p>
              {order.customer.email && <p className="text-primary/60 text-sm">{order.customer.email}</p>}
            </div>

            {/* Delivery Details */}
            <div className="bg-[#F9F6F0] p-6 border border-primary/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                <IconMapPin size={12} /> Delivery Address
              </h3>
              <p className="text-primary leading-relaxed text-sm whitespace-pre-wrap">{order.delivery.address}</p>
              {order.delivery.instructions && (
                <div className="mt-4 bg-white p-3 border-l-2 border-[#C9A24A]">
                  <span className="font-bold text-[9px] uppercase tracking-widest text-primary/40 block mb-1">Instructions</span>
                  <span className="text-xs text-primary/80 italic">{order.delivery.instructions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-4 pl-2">Order Summary</h3>
            <div className="w-full text-left">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b-2 border-primary/80 pb-3 mb-4 text-[10px] uppercase tracking-[0.15em] font-bold text-primary/60 pl-2 pr-2">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-0">
                {order.items.map((item, idx) => (
                  <div key={item.productId} className={`grid grid-cols-12 gap-4 items-center py-4 px-2 ${idx !== order.items.length - 1 ? 'border-b border-dashed border-primary/15' : ''}`}>
                    <div className="col-span-12 md:col-span-6">
                      <p className="font-bold text-primary text-base">{item.name}</p>
                      {item.servingSize && <p className="text-[11px] text-primary/50 mt-1 uppercase tracking-wider">{item.servingSize}</p>}
                    </div>
                    <div className="col-span-4 md:col-span-2 md:text-center text-primary font-mono text-sm">
                      <span className="md:hidden text-[10px] text-primary/40 mr-2 uppercase tracking-widest">Qty:</span>
                      {item.quantity}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right text-primary font-mono text-sm">
                      <span className="md:hidden text-[10px] text-primary/40 mr-2 uppercase tracking-widest">Price:</span>
                      ₹{item.unitPrice}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right font-bold text-primary text-lg">
                      ₹{item.lineTotal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Summary section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-t-[2px] border-dashed border-primary/20 pt-8 pb-8 mb-8 relative z-10">
            
            {/* Left side: Payment & Delivery Method */}
            <div className="w-full lg:w-[55%] space-y-6">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-3 pl-2">Logistics</h3>
                <div className="bg-white border-2 border-primary/5 p-4 flex gap-4 items-center">
                  <div className="w-10 h-10 bg-[#F9F6F0] rounded-full flex items-center justify-center border border-primary/10">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm uppercase tracking-wide">
                      {order.delivery.method === "PORTER" ? "Porter Delivery" : "Free OVOW Delivery"}
                    </p>
                    <p className="text-[11px] text-primary/50 mt-0.5">
                      {order.delivery.method === "PORTER" 
                        ? "Managed by OVOW logistics team" 
                        : "Handled by internal delivery fleet"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40 mb-3 pl-2">Transaction</h3>
                <div className={`border-2 p-4 flex items-start gap-4 transition-colors ${
                    (order.payment.method === "COD" || order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID")
                      ? "border-green-600/20 bg-green-50/30"
                      : "border-[#C9A24A]/30 bg-[#C9A24A]/5"
                  }`}
                >
                  <div className="mt-1">
                    {(order.payment.method === "COD" || order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID") ? (
                      <IconCheckCircle size={22} className="text-green-600" />
                    ) : (
                      <IconClock size={22} className="text-[#C9A24A]" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm mb-1 uppercase tracking-wide">
                      {order.payment.method === "COD" ? "Cash on Delivery" : "UPI / QR Payment"} <span className="text-primary/40 mx-2">—</span> ₹{order.payment.amount.toLocaleString("en-IN")}
                    </p>
                    <p className={`text-xs font-medium ${
                      (order.payment.method === "COD" || order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID")
                        ? "text-green-700"
                        : "text-[#C9A24A]"
                    }`}>
                      {order.payment.method === "COD"
                        ? "✓ Payment to be collected on arrival"
                        : order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID"
                          ? "✓ Payment marked done. Awaiting verification."
                          : "Awaiting confirmation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Totals Box */}
            <div className="w-full lg:w-[40%] bg-primary p-7 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5 border-b border-white/10 pb-2">Order Total</h3>
              
              <div className="space-y-4 mb-5 pb-5 border-b border-white/10 text-sm">
                <div className="flex justify-between items-center text-white/80">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{order.pricing.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-white/80">
                  <span>Delivery</span>
                  <span className="text-[#C9A24A] font-black uppercase text-[10px] tracking-widest bg-[#C9A24A]/10 px-2 py-1 border border-[#C9A24A]/30">Free</span>
                </div>
                {order.pricing.tax > 0 && (
                  <div className="flex justify-between items-center text-white/80">
                    <span>Tax</span>
                    <span className="font-mono">₹{order.pricing.tax.toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end">
                <span className="text-white/60 text-xs uppercase tracking-widest">Grand Total</span>
                <span className="text-4xl font-black font-serif text-[#C9A24A]">₹{order.pricing.grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Footer & Barcode */}
          <div className="text-center pt-4 relative z-10 flex flex-col items-center">
            
            {/* Fake POS Barcode */}
            <div className="flex justify-center mb-6 opacity-30">
              <svg width="240" height="40" viewBox="0 0 200 40" fill="currentColor" className="text-primary">
                <rect x="0" y="0" width="4" height="40" />
                <rect x="6" y="0" width="2" height="40" />
                <rect x="12" y="0" width="6" height="40" />
                <rect x="22" y="0" width="2" height="40" />
                <rect x="28" y="0" width="8" height="40" />
                <rect x="40" y="0" width="2" height="40" />
                <rect x="46" y="0" width="6" height="40" />
                <rect x="54" y="0" width="2" height="40" />
                <rect x="60" y="0" width="4" height="40" />
                <rect x="68" y="0" width="6" height="40" />
                <rect x="78" y="0" width="2" height="40" />
                <rect x="84" y="0" width="8" height="40" />
                <rect x="96" y="0" width="2" height="40" />
                <rect x="102" y="0" width="4" height="40" />
                <rect x="110" y="0" width="2" height="40" />
                <rect x="116" y="0" width="6" height="40" />
                <rect x="126" y="0" width="8" height="40" />
                <rect x="138" y="0" width="2" height="40" />
                <rect x="144" y="0" width="6" height="40" />
                <rect x="154" y="0" width="2" height="40" />
                <rect x="160" y="0" width="8" height="40" />
                <rect x="172" y="0" width="4" height="40" />
                <rect x="180" y="0" width="2" height="40" />
                <rect x="186" y="0" width="6" height="40" />
                <rect x="196" y="0" width="4" height="40" />
              </svg>
            </div>

            <p className="font-serif text-2xl text-primary mb-2">Thank you for choosing OVOW.</p>
            <p className="text-[10px] text-primary/40 uppercase tracking-[0.25em] mb-6 font-bold">Experience the extraordinary.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[10px] font-bold tracking-wider text-primary/50">
              <span className="uppercase text-primary/70">WhatsApp: +91 756 756 6214</span>
              <span className="w-1.5 h-1.5 bg-[#C9A24A]/40 rounded-full hidden sm:block" />
              <span className="uppercase text-primary/70">Insta: @ovowfoods</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Ticket Edge (Bottom) */}
        <div className="h-3 w-full bg-[radial-gradient(circle,transparent_4px,#ffffff_5px)] bg-[length:12px_12px] bg-top rotate-180" style={{ maskImage: "linear-gradient(to bottom, transparent 40%, black 41%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 40%, black 41%)" }} />
      </motion.div>
    </div>
  );
}
