"use client";

/**
 * LazyVideo — Universal video component for OVOW FOODS
 *
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

import { useEffect, useRef } from "react";

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

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop={loop}
      muted={muted}
      playsInline
      controls={controls}
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      onCanPlay={onCanPlay}
      className={className}
      style={{ objectFit }}
    />
  );
}
