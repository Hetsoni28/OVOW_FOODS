"use client";

/**
 * LazyVideo — Universal video component for OVOW FOODS
 *
 * Solves ALL video performance issues permanently:
 * ✅ Only downloads when scrolled into view (IntersectionObserver)
 * ✅ Plays when visible, pauses when off-screen (saves battery + bandwidth)
 * ✅ Shows poster frame instantly (zero black/green flash)
 * ✅ Handles autoplay policy gracefully (muted start)
 * ✅ preload="none" until needed — never wastes bandwidth on off-screen videos
 * ✅ Works on mobile, desktop, Low Power Mode, slow connections
 *
 * Usage:
 *   <LazyVideo src="/videos/my-video.mp4" className="w-full h-full object-cover" />
 *   <LazyVideo src="/videos/my-video.mp4" poster="/images/thumb.jpg" loop={false} controls />
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
  /** How much of the element must be visible to trigger load/play (0-1) */
  threshold?: number;
  /** Root margin for early loading — loads before fully visible */
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
  const [isInView, setIsInView] = useState(false);
  const [srcLoaded, setSrcLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element entered viewport — load and play
            setIsInView(true);
            if (!srcLoaded) {
              video.src = src;
              video.load();
              setSrcLoaded(true);
            }
            video.play().catch(() => {
              // Autoplay blocked — video stays paused, poster visible. No crash.
            });
          } else {
            // Element left viewport — pause to save resources
            setIsInView(false);
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, srcLoaded, threshold, rootMargin]);

  return (
    <video
      ref={videoRef}
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
