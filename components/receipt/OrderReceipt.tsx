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
      const element = receiptRef.current;
      
      // Temporary styling for PDF generation to ensure white background and perfect width
      const originalPadding = element.style.padding;
      const originalWidth = element.style.width;
      
      element.style.padding = "40px";
      element.style.width = "800px"; // Fixed width for A4 aspect ratio approximation

      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: "#F9F6F0",
        logging: false,
      });

      // Restore styling
      element.style.padding = originalPadding;
      element.style.width = originalWidth;

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`OVOW-Invoice-${order.orderId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
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
    <div className="min-h-screen bg-[#F9F6F0] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <Link href="/menu" className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest">
          <IconChevronLeft size={16} /> Back
        </Link>
        <button suppressHydrationWarning
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 bg-[#C9A24A] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#b08b3e] transition-colors disabled:opacity-50"
        >
          <IconDownload size={16} />
          {downloading ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white shadow-2xl relative overflow-hidden"
      >
        {/* Decorative Top Border */}
        <div className="h-2 w-full bg-primary" />

        {/* The actual printable area */}
        <div ref={receiptRef} className="p-8 md:p-12 bg-white">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-primary/10 pb-8 mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <Logo className="w-16 h-16" />
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-primary">OVOW FOODS</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24A] font-bold">Taste the Wow. Experience OVOW.</p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#123B2A] font-bold mt-1">100% Pure Vegetarian</p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <h2 className="text-xs uppercase tracking-widest font-bold text-primary/40 mb-1">Order Receipt</h2>
              <p className="font-serif text-xl font-bold text-primary mb-1">#{order.orderId}</p>
              <p className="text-sm text-primary/70">
                {new Date(order.createdAt).toLocaleDateString("en-IN", { 
                  year: "numeric", month: "short", day: "numeric" 
                })} at {new Date(order.createdAt).toLocaleTimeString("en-IN", { 
                  hour: "2-digit", minute: "2-digit" 
                })}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 border-b border-primary/10 pb-8 mb-8">
            {/* Customer Details */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/40 mb-4">Customer Details</h3>
              <p className="font-bold text-primary mb-1">{order.customer.name}</p>
              <p className="text-primary/70 mb-1">+91 {order.customer.phone}</p>
              {order.customer.email && <p className="text-primary/70">{order.customer.email}</p>}
            </div>

            {/* Delivery Details */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/40 mb-4 flex items-center gap-2">
                <IconMapPin size={14} /> Delivery Address
              </h3>
              <p className="text-primary/70 leading-relaxed whitespace-pre-wrap">{order.delivery.address}</p>
              {order.delivery.instructions && (
                <div className="mt-3 bg-primary/5 p-3 text-sm text-primary/80 border-l-2 border-[#C9A24A]">
                  <span className="font-bold text-xs uppercase tracking-wider block mb-1">Instructions:</span>
                  {order.delivery.instructions}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/40 mb-4">Order Items</h3>
            <div className="w-full text-left border-collapse">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-primary/10 pb-3 mb-3 text-xs uppercase tracking-wider font-bold text-primary/40">
                <div className="col-span-6">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="space-y-4 md:space-y-0">
                {order.items.map((item) => (
                  <div key={item.productId} className="grid grid-cols-12 gap-4 items-center md:border-b md:border-primary/5 py-3 border-b border-primary/5 last:border-0">
                    <div className="col-span-12 md:col-span-6">
                      <p className="font-bold text-primary">{item.name}</p>
                      {item.servingSize && <p className="text-xs text-primary/50 mt-0.5">{item.servingSize}</p>}
                    </div>
                    <div className="col-span-4 md:col-span-2 md:text-center text-primary/80">
                      <span className="md:hidden text-xs text-primary/40 mr-2">Qty:</span>
                      {item.quantity}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right text-primary/80">
                      <span className="md:hidden text-xs text-primary/40 mr-2">Price:</span>
                      ₹{item.unitPrice}
                    </div>
                    <div className="col-span-4 md:col-span-2 text-right font-bold text-primary">
                      ₹{item.lineTotal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Summary */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-primary/10 pb-8 mb-8">
            
            {/* Left side: Payment & Delivery Method */}
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/40 mb-3">Delivery Method</h3>
                <div className="bg-primary/5 p-4 border border-primary/10">
                  <p className="font-bold text-primary mb-1">
                    {order.delivery.method === "PORTER" ? "Porter Delivery" : "Free OVOW Delivery"}
                  </p>
                  <p className="text-xs text-primary/60">
                    {order.delivery.method === "PORTER" 
                      ? "Booked and managed by OVOW Foods." 
                      : "Handled by OVOW's internal delivery fleet."}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/40 mb-3">Payment</h3>
                <div className="bg-primary/5 p-4 border border-primary/10 flex items-start gap-3">
                  <div className="mt-0.5">
                    {order.payment.verification === "VERIFIED" ? (
                      <IconCheckCircle size={18} className="text-green-600" />
                    ) : (
                      <IconClock size={18} className="text-[#C9A24A]" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-primary mb-0.5">{order.payment.method} — ₹{order.payment.amount}</p>
                    <p className={`text-xs ${order.payment.verification === "VERIFIED" ? "text-green-600" : "text-[#C9A24A]"}`}>
                      {order.payment.customerConfirmation === "CUSTOMER_MARKED_PAID" 
                        ? "Payment submitted (Under verification)" 
                        : "Payment pending"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Totals */}
            <div className="w-full md:w-1/3 min-w-[250px] bg-[#F9F6F0] p-6">
              <div className="space-y-3 mb-4 pb-4 border-b border-primary/10">
                <div className="flex justify-between text-primary/70">
                  <span>Subtotal</span>
                  <span>₹{order.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between text-primary/70">
                  <span>Delivery</span>
                  <span className="text-[#C9A24A] font-bold uppercase text-xs tracking-wider mt-1">Free</span>
                </div>
                {order.pricing.tax > 0 && (
                  <div className="flex justify-between text-primary/70">
                    <span>Tax</span>
                    <span>₹{order.pricing.tax}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-primary font-serif">
                <span className="text-xl">Total</span>
                <span className="text-3xl font-bold">₹{order.pricing.grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="font-serif text-2xl text-primary mb-2">Thank you for choosing OVOW.</p>
            <p className="text-xs text-primary/50 uppercase tracking-widest mb-6">Experience the extraordinary.</p>
            
            <div className="flex justify-center items-center gap-6 text-xs text-primary/40">
              <span>WhatsApp: +91 756 756 6214</span>
              <span className="w-1 h-1 bg-primary/20 rounded-full" />
              <span>Instagram: @ovowfoods</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
