"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { buildUpiUri, buildQrUrl } from "@/lib/upi";
import { generateOrderRef } from "@/lib/order";
import { buildCheckoutWhatsAppMessage } from "@/lib/whatsapp";
import { COMPANY_CONFIG } from "@/lib/config";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { CheckoutEmptyState } from "@/components/organisms/CheckoutEmptyState";
import { ProgressBar } from "@/components/organisms/ProgressBar";
import { CheckoutStepDetails } from "@/components/organisms/CheckoutStepDetails";
import { CheckoutStepPayment } from "@/components/organisms/CheckoutStepPayment";
import { CheckoutStepQR } from "@/components/organisms/CheckoutStepQR";
import { CheckoutStepSuccess } from "@/components/organisms/CheckoutStepSuccess";
import type { Details, Errors, PaymentMethod } from "@/components/organisms/CheckoutTypes";

export function CheckoutClient() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrderHistory();
  const [mounted, setMounted] = useState(false);
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [details, setDetails] = useState<Details>({ name: "", mobile: "", address: "", instructions: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  
  const [orderId, setOrderId] = useState("");
  const [upiUri, setUpiUri] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const validateDetails = () => {
    const e: Errors = {};
    if (!details.name.trim()) e.name = "Name required";
    if (!details.mobile.trim() || !/^\d{10}$/.test(details.mobile)) e.mobile = "10 digits required";
    if (!details.address.trim()) e.address = "Address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToPayment = () => {
    if (!validateDetails()) return;
    if (items.length === 0 && step === 1) return <CheckoutEmptyState />;
    const ref = generateOrderRef();
    setOrderId(ref);
    if (paymentMethod === "upi") {
      setUpiUri(buildUpiUri(total, ref));
      setQrUrl(buildQrUrl(total, ref));
    }
    setStep(2);
  };

  const handleProcessOrder = (isCod: boolean) => {
    addOrder({
      id: orderId,
      items: [...items],
      total: total,
      method: isCod ? "cod" : "upi"
    });

    if (isCod) {
      clearCart();
      setStep(4);
      const msg = buildCheckoutWhatsAppMessage(items, details, total, orderId);
      window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    } else {
      setStep(3); // Go to QR code for UPI, wait for user to confirm payment
    }
  };

  const handleConfirmPayment = () => {
    clearCart();
    setStep(4);
    const msg = buildCheckoutWhatsAppMessage(items, details, total, orderId);
    window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
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
              onChange={(k, v) => setDetails({ ...details, [k]: v })}
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
              cartTotal={total}
              handleSendWhatsApp={() => {
                const msg = buildCheckoutWhatsAppMessage(items, details, total, orderId);
                window.open(`https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
