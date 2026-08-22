"use client";

import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    src: "/videos/brand-cooking.mp4",
    poster: "/images/hero-poster.jpg",
    title: "The Art of Cooking",
    subtitle: "Crafted with love",
  },
  {
    src: "/videos/food-montage.mp4",
    poster: "/images/hero-poster.jpg",
    title: "A Vegetarian Feast",
    subtitle: "Pure & Premium",
  },
  {
    src: "/videos/paneer-commercial.mp4",
    poster: "/images/hero-poster.jpg",
    title: "Paneer Butter Masala",
    subtitle: "Our Signature Dish",
  },
  {
    src: "/videos/food-prep.mp4",
    poster: "/images/hero-poster.jpg",
    title: "From Kitchen to You",
    subtitle: "Made Fresh Daily",
  },
];

export function VideoReelSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleChangeVideo(i: number) {
    setActiveIdx(i);
    setVideoLoaded(false);
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

      {/* Main video player */}
      <div className="relative aspect-video md:aspect-[21/9] bg-[#0B2118] overflow-hidden">
        {/* Skeleton shimmer — shows while video is loading on mobile */}
        {!videoLoaded && (
          <div className="absolute inset-0 z-0 bg-white/5 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        )}

        {/* Video — fades in smoothly when ready */}
        <video
          ref={videoRef}
          key={active.src}
          src={active.src}
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover opacity-90 z-[1] transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118]/80 via-transparent to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2118]/30 via-transparent to-transparent z-[2]" />

        {/* Title overlay */}
        <div className="absolute bottom-8 left-0 right-0 container-x flex items-end justify-between z-[3]">
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
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
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
              className={`relative aspect-video overflow-hidden transition-all duration-300 bg-white/5 ${
                i === activeIdx
                  ? "ring-2 ring-[#C9A24A] opacity-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              {/* Skeleton shimmer for thumbnails */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              {/* Video frame for thumbnail */}
              <video
                src={`${v.src}#t=0.001`}
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {i === activeIdx ? (
                  <div className="w-6 h-6 rounded-full bg-[#C9A24A] flex items-center justify-center">
                    <Play size={10} fill="white" className="text-white ml-0.5" />
                  </div>
                ) : (
                  <Play size={14} className="text-white/80" />
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
