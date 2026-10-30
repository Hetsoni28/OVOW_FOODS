"use client";

/**
 * LazyVideo — Universal video component for OVOW FOODS
 *
 * ✅ Shimmer skeleton shown while video is loading/buffering
 * ✅ Skeleton fades OUT (video is always rendered, not hidden — more reliable)
 * ✅ preload="none" — browser knows the src but won't download until .load() is called
 * ✅ Only plays when scrolled into view (IntersectionObserver)
 * ✅ Pauses when scrolled off-screen (saves battery + data)
 * ✅ Works on mobile, desktop, Low Power Mode, slow connections
 * ✅ deferUntilIdle — above-the-fold videos wait for page load + idle time,
 *    so they never compete with the first paint
 * ✅ Skips the download entirely on Data Saver / 2G and for prefers-reduced-motion
 *    (the poster stays visible instead)
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
  threshold?: number;
  rootMargin?: string;
  onCanPlay?: () => void;
  /** Set false to hide the shimmer skeleton (e.g. Hero already has a static image fallback) */
  showSkeleton?: boolean;
  /** Wait for window load + browser idle before downloading (use for above-the-fold videos) */
  deferUntilIdle?: boolean;
  /** The visitor explicitly asked for this video (e.g. lightbox) — never skip it */
  userInitiated?: boolean;
}

type NetworkInformationLike = { saveData?: boolean; effectiveType?: string };

/** True when we should not download/autoplay video at all */
function prefersNoVideo(): boolean {
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Resolves after the window "load" event and the next idle period */
function whenIdleAfterLoad(cb: () => void): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if (cancelled) return;
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(cb, { timeout: 3000 });
    else timeoutId = setTimeout(cb, 1500);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    clearTimeout(timeoutId);
  };
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
  showSkeleton = true,
  deferUntilIdle = false,
  userInitiated = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loadedRef = useRef(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Background loops only — a video with controls was opened on purpose
    if (!controls && !userInitiated && prefersNoVideo()) {
      setSkeletonVisible(false); // poster (or the static image behind) stays visible
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!loadedRef.current) {
              video.load();
              loadedRef.current = true;
            }
            video.play().catch(() => {});
          } else {
            if (!video.paused) video.pause();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (!deferUntilIdle) {
      observer.observe(video);
      return () => observer.disconnect();
    }
    const cancelIdle = whenIdleAfterLoad(() => observer.observe(video));
    return () => {
      cancelIdle();
      observer.disconnect();
    };
  }, [threshold, rootMargin, deferUntilIdle, controls, userInitiated]);

  const videoSrc = src.includes('#t=') ? src : `${src}#t=0.5`;

  return (
    <>
      {/* ── Video (always rendered, always visible) ── */}
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
        // Muted background loops are decorative — keep them out of the a11y tree
        aria-hidden={controls ? undefined : true}
        tabIndex={controls ? undefined : -1}
        onCanPlay={() => {
          setSkeletonVisible(false);
          onCanPlay?.();
        }}
        className={className}
        style={{ objectFit }}
      />

      {/* ── Shimmer Skeleton overlay (only when showSkeleton=true) ── */}
      {showSkeleton && skeletonVisible && (
        <div
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(18,59,42,0.08) 0%, rgba(201,162,74,0.05) 100%)",
          }}
        >
          <div className="absolute inset-0 skeleton-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 opacity-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
        </div>
      )}
    </>
  );
}
