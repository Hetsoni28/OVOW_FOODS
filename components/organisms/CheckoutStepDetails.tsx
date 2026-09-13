"use client";

import { IconUser, IconPhone, IconMapPin, IconCheckCircle, IconClock, IconTruck, IconCalendar } from "@/components/atoms/Icons";
import { Field, inputCls } from "./SharedUI";
import { SmartAddressField } from "./SmartAddressField";
import type { Details, Errors } from "@/lib/types";
import { useMemo } from "react";

interface CheckoutStepDetailsProps {
  details: Details;
  errors: Errors;
  onChange: (field: keyof Details, value: string) => void;
  onScheduleReset: () => void;
  onNext: () => void;
}

export function CheckoutStepDetails({ details, errors, onChange, onScheduleReset, onNext }: CheckoutStepDetailsProps) {
  const availableDates = useMemo(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      const label = i === 0 ? `Today (${dateStr})` : i === 1 ? `Tomorrow (${dateStr})` : dateStr;
      dates.push(label);
    }
    return dates;
  }, []);

  const timeSlots = [
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM",
  ];

  const isLater = details.scheduleType === "later";

  return (
    <div className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5">
      <div className="mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Delivery Details</h2>
        <p className="text-primary/50 text-sm">Please provide your details so we can deliver your order.</p>
      </div>

      <div className="space-y-8">

        {/* ── Delivery Method ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-3">Delivery</p>
          <div className="flex items-center gap-4 p-4 border-2 border-[#C9A24A] bg-[#C9A24A]/5 rounded-lg">
            <div className="p-2 rounded-full bg-[#C9A24A] text-white flex-shrink-0">
              <IconTruck size={16} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-primary">Porter Delivery</p>
              <p className="text-xs text-primary/50 mt-0.5">Booked and managed by OVOW for you</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#2E7D4F]">FREE</p>
              <p className="text-xs text-primary/40">₹0</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#C9A24A] flex items-center justify-center flex-shrink-0">
              <IconCheckCircle size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* ── Schedule Toggle ── */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-primary/5 rounded-lg">
          <button suppressHydrationWarning
            type="button"
            onClick={onScheduleReset}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
              !isLater
                ? "bg-white text-primary shadow-sm"
                : "text-primary/40 hover:text-primary"
            }`}
          >
            {/* Lightning bolt — hand-crafted SVG */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 1L2 8.5H7.5L6.5 14L13 6.5H7.5L8.5 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            Deliver ASAP
          </button>
          <button suppressHydrationWarning
            type="button"
            onClick={() => onChange("scheduleType", "later")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
              isLater
                ? "bg-white text-primary shadow-sm"
                : "text-primary/40 hover:text-primary"
            }`}
          >
            {/* Calendar — hand-crafted SVG */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="3" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M1 6.5H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M5 1.5V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M10 1.5V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="5" cy="9.5" r="0.8" fill="currentColor" />
              <circle cx="7.5" cy="9.5" r="0.8" fill="currentColor" />
              <circle cx="10" cy="9.5" r="0.8" fill="currentColor" />
            </svg>
            Schedule for Later
          </button>
        </div>

        {/* ── Date & Time Dropdowns ── */}
        {isLater && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50 border border-[#C9A24A]/20 rounded-lg">
            <div className="col-span-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A24A] mb-1">
              <IconCalendar size={14} />
              Choose Delivery Slot
            </div>
            <Field id="scheduleDate" label="Select Date" required error={errors.scheduleDate}>
              <div className="relative">
                <IconCalendar size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                <select
                  id="scheduleDate"
                  value={details.scheduleDate || ""}
                  onChange={(e) => onChange("scheduleDate", e.target.value)}
                  className={`${inputCls(errors.scheduleDate)} pl-8 bg-white appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Choose a day</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>
            </Field>

            <Field id="scheduleTime" label="Select Time Window" required error={errors.scheduleTime}>
              <div className="relative">
                <IconClock size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
                <select
                  id="scheduleTime"
                  value={details.scheduleTime || ""}
                  onChange={(e) => onChange("scheduleTime", e.target.value)}
                  className={`${inputCls(errors.scheduleTime)} pl-8 bg-white appearance-none cursor-pointer`}
                >
                  <option value="" disabled>Choose a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </Field>
          </div>
        )}

        {/* ── Name ── */}
        <Field id="name" label="Full Name" required error={errors.name}>
          <div className="relative group">
            <IconUser size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-[#C9A24A] transition-colors" />
            <input
              id="name"
              type="text"
              value={details.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Type your name"
              className={`${inputCls(errors.name)} pl-8`}
            />
          </div>
        </Field>

        {/* ── Mobile ── */}
        <Field id="mobile" label="Mobile Number" required error={errors.mobile}>
          <div className="relative group">
            <IconPhone size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-[#C9A24A] transition-colors" />
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

        {/* ── Address ── */}
        <Field id="address" label="Delivery Address" required error={errors.address}>
          <SmartAddressField
            value={details.address}
            onChange={(val) => onChange("address", val)}
            error={errors.address}
          />
        </Field>

        {/* ── Instructions ── */}
        <Field id="instructions" label="Cooking / Delivery Instructions (Optional)">
          <textarea
            id="instructions"
            rows={2}
            value={details.instructions ?? ""}
            onChange={(e) => onChange("instructions", e.target.value)}
            placeholder="E.g. Less spicy, call before delivery"
            className={`${inputCls()} resize-none`}
          />
        </Field>

        {/* ── CTA ── */}
        <button suppressHydrationWarning
          type="button"
          onClick={onNext}
          className="w-full flex items-center justify-between bg-[#C9A24A] text-white px-8 py-5 group hover:bg-[#0B2118] transition-all hover:shadow-xl hover:shadow-[#0B2118]/20 hover:-translate-y-0.5 mt-2"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Continue to Payment</span>
          <IconCheckCircle size={20} className="group-hover:scale-110 transition-transform text-white" />
        </button>

      </div>
    </div>
  );
}
