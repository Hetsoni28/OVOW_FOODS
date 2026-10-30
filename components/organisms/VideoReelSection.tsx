"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { SectionLabel } from "@/components/molecules/SectionLabel";
import { IconVolume2, IconVolumeX } from "@/components/atoms/Icons";

const videos = [
  {
    src: "/videos/brand-cooking.mp4",
    poster: "/images/brand-cooking-poster.jpg",
    title: "The art of cooking",
    subtitle: "Crafted with love",
  },
  {
    src: "/videos/food-montage.mp4",
    poster: "/images/food-montage-poster.jpg",
    title: "A vegetarian feast",
    subtitle: "Pure & premium",
  },
  {
    src: "/videos/paneer-commercial.mp4",
    poster: "/images/paneer-commercial-poster.jpg",
    title: "Paneer butter masala",
    subtitle: "A house favourite",
  },
  {
    src: "/videos/food-prep.mp4",
    poster: "/images/food-prep-poster.jpg",
    title: "From kitchen to you",
    subtitle: "Made fresh daily",
  },
];

export function VideoReelSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const active = videos[activeIdx];

  return (
    <section className="grain bg-[#0B2118] py-24 text-white md:py-32">
      <div className="container-x relative z-[2]">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04" tone="dark">Behind the scenes</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl leading-[1] tracking-[-0.02em] md:text-7xl">
              Watch the <em className="text-[#E9D9AE]">kitchen</em> at work
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Four short films from our kitchen in Ahmedabad. Tap a chapter to switch.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Stage */}
          <div className="relative aspect-[4/3] overflow-hidden bg-black/30 md:aspect-video lg:col-span-8">
            <LazyVideo
              key={active.src}
              src={active.src}
              poster={active.poster}
              muted={muted}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0B2118]/85 via-transparent to-transparent" />
            {/* Touch-blocker: stops Android opening the native player */}
            <div className="absolute inset-0" onClick={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A24A]">
                    Chapter {String(activeIdx + 1).padStart(2, "0")} · {active.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl md:text-4xl">{active.title}</h3>
                </motion.div>
              </AnimatePresence>
              <button
                suppressHydrationWarning
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute video" : "Mute video"}
                aria-pressed={!muted}
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-[#0B2118]"
              >
                {muted ? <IconVolumeX size={16} /> : <IconVolume2 size={16} />}
              </button>
            </div>
          </div>

          {/* Chapters */}
          <ol className="flex flex-col border-t border-white/15 lg:col-span-4">
            {videos.map((v, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={v.src} className="border-b border-white/15">
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveIdx(i)}
                    aria-pressed={isActive}
                    aria-label={`Play chapter ${i + 1}: ${v.title}`}
                    className="group relative grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-3 py-5 text-left lg:py-6"
                  >
                    {/* Active marker */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-px bg-[#C9A24A] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-10"}`}
                    />
                    <span className={`font-serif text-lg italic ${isActive ? "text-[#C9A24A]" : "text-white/60"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block font-serif text-xl transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                        {v.title}
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-white/60">{v.subtitle}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
