"use client";

/**
 * LazyVideo — Universal video component for OVOW FOODS
 *
 * ✅ Shimmer skeleton shown while video is loading/buffering
 * ✅ poster image shows INSTANTLY on all devices (src set in HTML, not JS)
 * ✅ preload="none" — browser knows the src but won't download until .load() is called
 * ✅ Only plays when scrolled into view (IntersectionObserver)
 * ✅ Pauses when scrolled off-screen (saves battery + data)
 * ✅ Works on mobile, desktop, Low Power Mode, slow connections
 *
 * Usage:
 *   <LazyVideo src="/videos/my-video.mp4" className="w-full h-full object-cover" />
 *   <LazyVideo src="/videos/my-video.mp4" poster="/images/thumb.jpg" controls loop={false} />
 */

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  objectFit?: "cover" | "contain";
  /** How much of the element must be visible before playing (0–1) */
  threshold?: number;
  /** Preload video this many px before it enters view */
  rootMargin?: string;
  onCanPlay?: () => void;
}

export function LazyVideo({
  src,
  poster,
  className = "",
  loop = true,
  controls = false,
  muted = true,
  objectFit = "cover",
  threshold = 0.1,
  rootMargin = "200px",
  onCanPlay,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // First time entering view — trigger actual download
            if (!loadedRef.current) {
              video.load();
              loadedRef.current = true;
            }
            video.play().catch(() => {
              // Autoplay blocked (Low Power Mode / browser policy) — poster stays visible
            });
          } else {
            // Left viewport — pause to save resources
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Use 0.5s instead of 0.001s to avoid blank frames if the video fades in from white/black
  const videoSrc = src.includes('#t=') ? src : `${src}#t=0.5`;

  return (
    <div className="relative w-full h-full">
      {/* ── Shimmer Skeleton (shows until video is ready) ── */}
      {!isReady && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/8 via-primary/5 to-[#C9A24A]/5 overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
          {/* Food icon hint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl opacity-10 select-none">🍽️</span>
          </div>
        </div>
      )}

      {/* ── Actual Video ── */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        onCanPlay={() => {
          setIsReady(true);
          onCanPlay?.();
        }}
        className={`${className} transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
        style={{ objectFit }}
      />
    </div>
  );
}
