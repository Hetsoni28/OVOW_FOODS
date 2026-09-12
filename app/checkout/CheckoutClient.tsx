"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { buildUpiUri, buildQrUrl } from "@/lib/upi";
import { generateOrderRef } from "@/lib/order";
import { buildCheckoutWhatsAppMessage } from "@/lib/whatsapp";
import { COMPANY_CONFIG } from "@/lib/config";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { saveOrderToStorage } from "@/lib/storage";
import { CheckoutEmptyState } from "@/components/organisms/CheckoutEmptyState";
import { ProgressBar } from "@/components/organisms/ProgressBar";
import { CheckoutStepDetails } from "@/components/organisms/CheckoutStepDetails";
import { CheckoutStepPayment } from "@/components/organisms/CheckoutStepPayment";
import { CheckoutStepQR } from "@/components/organisms/CheckoutStepQR";
import { CheckoutStepSuccess } from "@/components/organisms/CheckoutStepSuccess";
import type { Details, Errors, PaymentMethod } from "@/lib/types";
import type { CartItem } from "@/types";

export function CheckoutClient() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [mounted, setMounted] = useState(false);
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [details, setDetails] = useState<Details>({ 
    name: "", 
    mobile: "", 
    address: "", 
    instructions: "",
    scheduleType: "asap",
    deliveryMethod: "porter",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  
  const [orderId, setOrderId] = useState("");
  const [upiUri, setUpiUri] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [finalCart, setFinalCart] = useState<{items: CartItem[], total: number, method: "upi" | "cod"} | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const validateDetails = () => {
    const e: Errors = {};
    if (!details.name.trim()) e.name = "Name required";
    if (!details.mobile.trim() || !/^\d{10}$/.test(details.mobile)) e.mobile = "10 digits required";
    if (!details.address.trim()) e.address = "Address required";
    if (details.scheduleType === "later") {
      if (!details.scheduleDate) e.scheduleDate = "Date required";
      if (!details.scheduleTime) e.scheduleTime = "Time required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToPayment = () => {
    if (!validateDetails()) return;
    if (items.length === 0 && step === 1) return;
    const ref = generateOrderRef();
    setOrderId(ref);
    if (paymentMethod === "upi") {
      setUpiUri(buildUpiUri(total, ref));
      setQrUrl(buildQrUrl(total, ref));
    }
    setStep(2);
  };

  const saveSnapshot = (method: "UPI" | "COD", confirmed: boolean) => {
    const orderSnapshot = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: details.name,
        phone: details.mobile,
      },
      delivery: {
        address: details.address,
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "XXXXXX",
        instructions: details.instructions,
        method: details.deliveryMethod === "porter" ? "PORTER" as const : "OVOW_FREE_DELIVERY" as const,
      },
      items: items.map(item => ({
        productId: item._id || item.slug,
        name: item.name,
        quantity: item.quantity,
        servingSize: item.servingSize,
        unitPrice: item.price,
        lineTotal: item.price * item.quantity
      })),
      pricing: {
        subtotal: total,
        deliveryFee: 0,
        discount: 0,
        tax: 0,
        grandTotal: total
      },
      payment: {
        method,
        amount: total,
        customerConfirmation: confirmed ? "CUSTOMER_MARKED_PAID" as const : "NOT_CONFIRMED" as const,
        verification: "PENDING" as const,
      },
      orderStatus: "RECEIVED" as const
    };
    saveOrderToStorage(orderSnapshot);
  };

  // Fire anonymised order event to Sanity for the homepage live ticker
  // Runs in background — never blocks the checkout flow
  const fireOrderEvent = (method: "cod" | "upi") => {
    fetch("/api/order-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        area: details.address,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        paymentMethod: method,
      }),
    }).catch(() => {}); // silently ignore errors — non-critical
  };

  const handleProcessOrder = (isCod: boolean) => {
    addOrder({
      id: orderId,
      items: [...items],
      total: total,
      method: isCod ? "cod" : "upi"
    });

    if (isCod) {
      saveSnapshot("COD", false);
      setFinalCart({ items: [...items], total, method: "cod" });
      clearCart();
      fireOrderEvent("cod");
      setStep(4);
    } else {
      setStep(3); // Go to QR code for UPI, wait for user to confirm payment
    }
  };

  const handleConfirmPayment = () => {
    saveSnapshot("UPI", true);
    setFinalCart({ items: [...items], total, method: "upi" });
    clearCart();
    fireOrderEvent("upi");
    setStep(4);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-32 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </main>
    );
  }

  if (items.length === 0 && step === 1) return <CheckoutEmptyState />;

  return (
    <main className="min-h-screen bg-[#F9F6F0] pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <ProgressBar step={step} />
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <CheckoutStepDetails
              key="step1"
              details={details}
              errors={errors}
              onChange={(k, v) => setDetails(prev => ({ ...prev, [k]: v }))}
              onScheduleReset={() => setDetails(prev => ({ ...prev, scheduleType: "asap", scheduleDate: "", scheduleTime: "" }))}
              onNext={goToPayment}
            />
          )}
          {step === 2 && (
            <CheckoutStepPayment
              key="step2"
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cart={items}
              cartTotal={total}
              handleSendWhatsApp={handleProcessOrder}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <CheckoutStepQR
              key="step3"
              orderId={orderId}
              cartTotal={total}
              qrUrl={qrUrl}
              upiUri={upiUri}
              cart={items}
              onConfirmPayment={handleConfirmPayment}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <CheckoutStepSuccess
              key="step4"
              orderId={orderId}
              cartTotal={finalCart?.total || 0}
              handleSendWhatsApp={() => {
                if (!finalCart) return;
                const msg = buildCheckoutWhatsAppMessage(finalCart.items, details, finalCart.total, orderId, finalCart.method);
                window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
