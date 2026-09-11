"use client";

import { useState } from "react";
import { IconPlus, IconMinus, IconCheck, IconShoppingBag, IconArrowRight, IconBellOff, IconStatusAvailable, IconStatusLimited, IconStatusSoldOut, IconSwaminarayan } from "@/components/atoms/Icons";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export function AddToCartBlock({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [floatingPop, setFloatingPop] = useState<number | null>(null);
  const [wantsRaita, setWantsRaita] = useState(true);
  const [variant, setVariant] = useState<'regular' | 'swaminarayan'>('regular');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Global paid extras — available on every product
  const EXTRAS_LIST = [
    { id: 'paneer', name: 'Extra Paneer', emoji: '🧀', price: 50, desc: 'Rich, soft paneer cubes' },
    { id: 'cheese', name: 'Extra Cheese', emoji: '🫕', price: 50, desc: 'Melted cheese topping' },
    { id: 'raita', name: 'Extra Raita', emoji: '🥣', price: 79, desc: 'Freshly prepared boondi raita' },
  ];

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const extrasTotal = EXTRAS_LIST.filter((e) => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const totalPerUnit = product.price + extrasTotal;

  // Resolve status: new field takes priority, legacy boolean as fallback
  const status = product.availabilityStatus ?? (product.available === false ? 'soldout' : 'available');
  const isSoldOut = status === 'soldout';
  const isLimited = status === 'limited';

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAdd = () => {
    if (isSoldOut) return;
    const chosenExtras = EXTRAS_LIST.filter((e) => selectedExtras.includes(e.id)).map((e) => ({ name: e.name, price: e.price }));
    for (let i = 0; i < quantity; i++) {
      addItem({
        ...product,
        price: product.price + extrasTotal, // bake extras price into cart item price
        variant,
        addons: product.includedRaita ? { wantsRaita } : undefined,
        extras: chosenExtras.length > 0 ? chosenExtras : undefined,
      });
    }
    setAdded(true);
    setFloatingPop(quantity);

    setTimeout(() => setFloatingPop(null), 1000);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
      openCart();
    }, 800);
  };

  // ── SOLD OUT STATE ─────────────────────────────────────────────────────────
  if (isSoldOut) {
    return (
      <div className="mt-12 pt-8 border-t border-primary/10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2.5 w-fit">
            <IconStatusSoldOut size={12} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-600">
              Currently Unavailable
            </span>
          </div>
          <div className="bg-primary/[0.03] border border-primary/[0.08] p-5">
            <div className="flex items-start gap-3">
              <IconBellOff size={18} className="text-primary/30 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-primary/70">
                  We&apos;re preparing something delicious.
                </p>
                <p className="text-xs text-primary/40 mt-1 leading-relaxed">
                  This item is temporarily unavailable. Please check back soon or explore our other dishes.
                </p>
              </div>
            </div>
          </div>
          <button
            disabled
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary/5 text-primary/25 cursor-not-allowed border border-primary/[0.08]"
          >
            <IconShoppingBag size={18} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              Not Available Right Now
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ── AVAILABLE / LIMITED STATE ───────────────────────────────────────
  return (
    <div className="mt-12 pt-8 border-t border-primary/10">

      {/* ── Availability Status Banner ── */}
      {isLimited ? (
        <div className="flex items-center gap-2 mb-6 bg-amber-50 border border-amber-200 px-4 py-2.5">
          <IconStatusLimited size={13} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700">
            Limited Availability Today — Order soon!
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 mb-6">
          <IconStatusAvailable size={13} />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2E7D4F]">
            Freshly Available Today
          </span>
        </div>
      )}

      {/* ── SWAMINARAYAN VARIANT SELECTOR — shows on every product ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">
          Preparation Style
        </p>
        <div className="grid grid-cols-2 gap-3">
          {/* Regular Option */}
          <button
            onClick={() => setVariant('regular')}
            className={`relative flex flex-col items-center justify-center gap-2.5 p-4 border-2 transition-all duration-300 ${
              variant === 'regular'
                ? 'border-[#C9A24A] bg-[#C9A24A]/5'
                : 'border-primary/10 hover:border-primary/25 bg-white'
            }`}
          >
            {/* Veg indicator dot */}
            <div className="flex items-center justify-center w-6 h-6 border border-[#2E7D4F] rounded-sm bg-white">
              <div className="w-3 h-3 rounded-full bg-[#2E7D4F]" />
            </div>
            <div className="text-center">
              <p className={`text-xs font-bold uppercase tracking-widest ${
                variant === 'regular' ? 'text-primary' : 'text-primary/60'
              }`}>
                Regular
              </p>
              <p className="text-[9px] text-primary/40 mt-0.5">With onion &amp; garlic</p>
            </div>
            {variant === 'regular' && (
              <motion.div
                layoutId="variant-indicator"
                className="absolute inset-0 border-2 border-[#C9A24A] pointer-events-none"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>

          {/* Swaminarayan Option */}
          <button
            onClick={() => setVariant('swaminarayan')}
            className={`relative flex flex-col items-center justify-center gap-2.5 p-4 border-2 transition-all duration-300 ${
              variant === 'swaminarayan'
                ? 'border-[#0B2118] bg-[#0B2118]/5'
                : 'border-primary/10 hover:border-[#0B2118]/40 bg-white'
            }`}
          >
            {/* Real Swaminarayan icon */}
            <IconSwaminarayan size={32} />
            <div className="text-center">
              <p className={`text-[9px] font-black uppercase tracking-[0.18em] mt-1 ${
                variant === 'swaminarayan' ? 'text-[#0B2118]' : 'text-primary/50'
              }`}>
                Swaminarayan
              </p>
              <p className="text-[8px] text-primary/35 mt-0.5">No onion or garlic</p>
            </div>
            {variant === 'swaminarayan' && (
              <motion.div
                layoutId="variant-indicator"
                className="absolute inset-0 border-2 border-[#0B2118] pointer-events-none"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        </div>
      </motion.div>

      {/* ── FREE RAITA ADD-ON ─── */}
      {product.includedRaita && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-3">
            Add-ons
          </p>
          <button
            onClick={() => setWantsRaita((v) => !v)}
            className={`w-full flex items-center gap-4 p-4 border-2 transition-all duration-300 text-left group ${
              wantsRaita
                ? "border-[#C9A24A] bg-[#C9A24A]/5 shadow-[0_0_20px_rgba(201,162,74,0.12)]"
                : "border-primary/10 hover:border-primary/30 bg-white"
            }`}
          >
            {/* Custom Checkbox */}
            <div
              className={`w-6 h-6 flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
                wantsRaita
                  ? "border-[#C9A24A] bg-[#C9A24A]"
                  : "border-primary/20 bg-white group-hover:border-primary/40"
              }`}
            >
              <AnimatePresence>
                {wantsRaita && (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <IconCheck size={14} strokeWidth={3} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold text-sm ${wantsRaita ? "text-primary" : "text-primary/70"}`}>
                  🥣 Add Raita
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-green-100 text-green-700 border border-green-200">
                  FREE
                </span>
              </div>
              <p className="text-xs text-primary/50 mt-0.5">
                Freshly prepared boondi raita — the perfect companion to your biryani
              </p>
            </div>

            {/* Price */}
            <span className={`text-base font-serif font-bold flex-shrink-0 ${wantsRaita ? "text-green-600" : "text-primary/30"}`}>
              ₹0
            </span>
          </button>
        </motion.div>
      )}

      {/* ── EXTRAS SELECTOR ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">
            Add Extras
          </p>
          {selectedExtras.length > 0 && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A24A]">
              +₹{extrasTotal} added
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {EXTRAS_LIST.map((extra) => {
            const isSelected = selectedExtras.includes(extra.id);
            return (
              <button
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 border-2 transition-all duration-300 text-left group ${
                  isSelected
                    ? 'border-[#C9A24A] bg-[#C9A24A]/5 shadow-[0_0_15px_rgba(201,162,74,0.1)]'
                    : 'border-primary/10 hover:border-primary/25 bg-white'
                }`}
              >
                {/* Custom Checkbox */}
                <div className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center transition-all duration-200 ${
                  isSelected ? 'border-[#C9A24A] bg-[#C9A24A]' : 'border-primary/20 group-hover:border-primary/40'
                }`}>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <IconCheck size={12} strokeWidth={3} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Emoji */}
                <span className="text-xl flex-shrink-0">{extra.emoji}</span>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-primary/70'}`}>
                    {extra.name}
                  </p>
                  <p className="text-[10px] text-primary/40 mt-0.5">{extra.desc}</p>
                </div>

                {/* Price */}
                <span className={`text-sm font-serif font-bold flex-shrink-0 ${
                  isSelected ? 'text-[#C9A24A]' : 'text-primary/30'
                }`}>
                  +₹{extra.price}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* ── QUANTITY + ADD BUTTON ─── */}
      <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-5">

        {/* Quantity Selector */}
        <div className="flex items-center gap-6 bg-white/60 backdrop-blur-md px-6 py-3 rounded-none border border-primary/10 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrease}
            className="w-10 h-10 rounded-none bg-primary/5 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:hover:bg-primary/5"
            disabled={quantity <= 1}
          >
            <IconMinus size={18} strokeWidth={2.5} />
          </motion.button>

          <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={quantity}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute font-serif text-2xl font-bold text-primary"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrease}
            className="w-10 h-10 rounded-none bg-primary/5 flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <IconPlus size={18} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={!added ? { scale: 1.02, y: -2 } : {}}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          disabled={added}
          suppressHydrationWarning
          className={`group relative overflow-hidden flex-1 w-full flex items-center justify-between px-8 py-4 rounded-none transition-all duration-500 shadow-xl ${
            added
              ? "bg-[#25D366] shadow-[#25D366]/30 text-white"
              : "bg-[#C9A24A] shadow-[#C9A24A]/20 text-white hover:bg-[#0B2118] hover:shadow-[#0B2118]/20"
          }`}
        >
          {!added && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
          )}

          <div className="flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              {added ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <IconCheck size={20} strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div key="bag" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <IconShoppingBag size={20} className="text-white/80" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              {added ? "Added to Cart" : "Add to Order"}
            </span>
          </div>

          <AnimatePresence>
            {floatingPop !== null && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{ opacity: 1, y: -60, scale: 1.5 }}
                exit={{ opacity: 0, y: -80, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/2 left-1/4 text-white font-serif font-bold text-2xl pointer-events-none drop-shadow-xl"
              >
                +{floatingPop}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {!added && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-px h-6 bg-white/20" />
                <span className="font-serif text-xl font-bold tracking-wider">
                  ₹{(totalPerUnit * quantity).toLocaleString("en-IN")}
                </span>
                <IconArrowRight size={16} className="text-white/50" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
