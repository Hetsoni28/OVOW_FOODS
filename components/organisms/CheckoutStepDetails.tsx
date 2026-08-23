"use client";

import { motion } from "framer-motion";
import { User, Phone, MapPin, CheckCircle2 } from "lucide-react";
import {  pageAnim, childAnim  } from "@/lib/animations";
import { Field, inputCls } from "./SharedUI";
import type {  Details, Errors  } from "./CheckoutTypes";
import { ChangeEvent } from "react";

interface CheckoutStepDetailsProps {
  details: Details;
  errors: Errors;
  onChange: (field: keyof Details, value: string) => void;
  onNext: () => void;
}

export function CheckoutStepDetails({ details, errors, onChange, onNext }: CheckoutStepDetailsProps) {
  return (
    <motion.div variants={pageAnim} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <motion.div variants={childAnim} className="mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Delivery Details</h2>
        <p className="text-primary/50 text-sm">Please provide your details so we can deliver your order.</p>
      </motion.div>

      <div className="space-y-8">
        <Field id="name" label="Full Name" required error={errors.name}>
          <div className="relative group">
            <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-[#C9A24A] transition-colors" />
            <input
              id="name"
              type="text"
              value={details.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="E.g. Het Soni"
              className={`${inputCls(errors.name)} pl-8`}
            />
          </div>
        </Field>

        <Field id="mobile" label="Mobile Number" required error={errors.mobile}>
          <div className="relative group">
            <Phone size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-[#C9A24A] transition-colors" />
            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-primary/40 text-sm">+91</span>
            <input
              id="mobile"
              type="tel"
              maxLength={10}
              value={details.mobile}
              onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter 10 digit number"
              className={`${inputCls(errors.mobile)} pl-[72px]`}
            />
          </div>
        </Field>

        <Field id="address" label="Delivery Address" required error={errors.address}>
          <div className="relative group">
            <MapPin size={18} className="absolute left-0 top-3 text-primary/30 group-focus-within:text-[#C9A24A] transition-colors" />
            <textarea
              id="address"
              rows={3}
              value={details.address}
              onChange={(e) => onChange("address", e.target.value)}
              placeholder="Full delivery address with landmark"
              className={`${inputCls(errors.address)} pl-8 resize-none`}
            />
          </div>
        </Field>

        <Field id="instructions" label="Cooking/Delivery Instructions (Optional)">
          <textarea
            id="instructions"
            rows={2}
            value={details.instructions}
            onChange={(e) => onChange("instructions", e.target.value)}
            placeholder="E.g. Less spicy, call before delivery"
            className={`${inputCls()} resize-none`}
          />
        </Field>

        <motion.div variants={childAnim} className="pt-6">
          <button
            onClick={onNext}
            className="w-full flex items-center justify-between bg-primary text-white px-8 py-5 group hover:bg-[#1A4D3A] transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Continue to Payment</span>
            <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform text-[#C9A24A]" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
