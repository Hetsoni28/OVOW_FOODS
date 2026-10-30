"use client";

import { useState } from "react";
import Image from "next/image";
import { LazyVideo } from "@/components/atoms/LazyVideo";
import { IconPlay, IconVolume2, IconVolumeX } from "@/components/atoms/Icons";

const videos = [
  {
    src: "/videos/brand-cooking.mp4",
    poster: "/images/brand-cooking-poster.jpg",
    title: "The Art of Cooking",
    subtitle: "Crafted with love",
  },
  {
    src: "/videos/food-montage.mp4",
    poster: "/images/food-montage-poster.jpg",
    title: "A Vegetarian Feast",
    subtitle: "Pure & Premium",
  },
  {
    src: "/videos/paneer-commercial.mp4",
    poster: "/images/paneer-commercial-poster.jpg",
    title: "Paneer Butter Masala",
    subtitle: "Our Signature Dish",
  },
  {
    src: "/videos/food-prep.mp4",
    poster: "/images/food-prep-poster.jpg",
    title: "From Kitchen to You",
    subtitle: "Made Fresh Daily",
  },
];

export function VideoReelSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  function handleChangeVideo(i: number) {
    setActiveIdx(i);
  }

  const active = videos[activeIdx];

  return (
    <section className="bg-[#0B2118] py-0 overflow-hidden">
      {/* Section label */}
      <div className="container-x pt-16 pb-8">
        <p className="text-[#C9A24A] text-[10px] uppercase tracking-[0.35em] font-bold mb-3">
          ✦ Behind the Scenes
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
          Watch the <span className="text-[#C9A24A]">Magic.</span>
        </h2>
      </div>

      {/* Main video player — downloads only when scrolled into view */}
      <div className="relative aspect-[4/3] md:aspect-[21/9] bg-[#0B2118] overflow-hidden">
        <LazyVideo
          key={active.src}
          src={active.src}
          poster={active.poster}
          muted={muted}
          className="absolute inset-0 w-full h-full object-cover z-[1] pointer-events-none"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118]/80 via-transparent to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2118]/30 via-transparent to-transparent z-[2]" />

        {/* Invisible touch-blocker: prevents Android from stealing taps and opening native video player */}
        <div
          className="absolute inset-0 z-[3]"
          onClick={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
        />

        {/* Title overlay */}
        <div className="absolute bottom-8 left-0 right-0 container-x flex items-end justify-between z-[4]">
          <div>
            <p className="text-[#C9A24A] text-[10px] uppercase tracking-widest font-bold mb-1">
              {active.subtitle}
            </p>
            <h3 className="font-serif text-2xl md:text-4xl text-white">
              {active.title}
            </h3>
          </div>
          {/* Mute toggle */}
          <button suppressHydrationWarning
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            {muted ? <IconVolumeX size={16} /> : <IconVolume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="container-x py-6">
        <div className="grid grid-cols-4 gap-3">
          {videos.map((v, i) => (
            <button suppressHydrationWarning
              key={v.src}
              onClick={() => handleChangeVideo(i)}
              aria-label={`Play ${v.title}`}
              aria-pressed={i === activeIdx}
              className={`relative aspect-video overflow-hidden transition-all duration-300 bg-white/5 ${
                i === activeIdx
                  ? "ring-2 ring-[#C9A24A] opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              {/* Poster image as thumbnail — no video download for the strip */}
              <Image
                src={v.poster}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {i === activeIdx ? (
                  <div className="w-6 h-6 rounded-full bg-[#C9A24A] flex items-center justify-center">
                    <IconPlay size={10} fill="white" className="text-white ml-0.5" />
                  </div>
                ) : (
                  <IconPlay size={14} className="text-white/80" />
                )}
              </div>
              <p className="absolute bottom-1 left-0 right-0 text-center text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-1 truncate">
                {v.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
