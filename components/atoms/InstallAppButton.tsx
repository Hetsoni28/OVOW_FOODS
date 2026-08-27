"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { Download, X, Share } from "lucide-react";

// useLayoutEffect fires synchronously before paint on client (no flash).
// Falls back to useEffect on server to avoid SSR warnings.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [isMobileBrowser, setIsMobileBrowser] = useState(false);

  // Runs synchronously before first paint — no delay, no flash
  useIsomorphicLayoutEffect(() => {
    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    const mobile = /android|iphone|ipad|ipod|mobile/i.test(ua);
    setIsIOS(ios);
    setIsMobileBrowser(mobile);

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true);

    if (isStandalone) setIsInstalled(true);
  }, []);

  // Async: listen for Android/Chrome install prompt event
  // Fallback: if no prompt after 3s on non-iOS mobile, show manual guide
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    // Samsung Internet / Firefox / Opera fallback — show manual guide if
    // the native prompt never fires within 3 seconds
    const fallbackTimer = setTimeout(() => {
      setInstallPrompt((prev) => {
        if (!prev) setShowAndroidGuide(true);
        return prev;
      });
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleAndroidInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setIsInstalled(true);
    }
  };

  // Don't show if already installed as PWA
  if (isInstalled) return null;

  // ── iOS: Show custom guide button ──────────────────────────────────────────
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 bg-[#C9A24A] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all duration-300 shadow-lg shadow-[#C9A24A]/20 rounded-full"
        >
          <Download size={14} />
          Install App
        </button>

        {/* iOS Installation Guide Popup */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-[99999] flex items-end justify-center p-4 pb-8">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowIOSGuide(false)}
            />
            {/* Card */}
            <div className="relative w-full max-w-sm bg-[#0d2d20] rounded-2xl p-6 shadow-2xl border border-white/10 z-10">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#C9A24A]/20 rounded-full flex items-center justify-center">
                  <Download size={18} className="text-[#C9A24A]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Install OVOW FOODS</p>
                  <p className="text-white/50 text-xs">Add to your Home Screen</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-white text-sm font-medium flex items-center gap-1">
                      Tap the Share button <Share size={14} className="text-[#C9A24A]" />
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">At the bottom of your Safari browser</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-white text-sm font-medium">Tap &quot;Add to Home Screen&quot;</p>
                    <p className="text-white/50 text-xs mt-0.5">Scroll down in the Share menu to find it</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-white text-sm font-medium">Tap &quot;Add&quot;</p>
                    <p className="text-white/50 text-xs mt-0.5">OVOW FOODS will appear on your Home Screen!</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full bg-[#C9A24A] hover:bg-[#b8912e] text-white font-bold py-3 rounded-full text-sm tracking-widest uppercase transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ── Android/Chrome: Native install prompt ──────────────────────────────────
  // If native prompt available, use it
  if (installPrompt) {
    return (
      <button
        onClick={handleAndroidInstall}
        className="flex items-center gap-2 bg-[#C9A24A] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all duration-300 shadow-lg shadow-[#C9A24A]/20 rounded-full"
      >
        <Download size={14} />
        Install App
      </button>
    );
  }

  // ── Samsung Internet / Firefox / Opera fallback ─────────────────────────────
  // Show manual guide for Android mobiles where beforeinstallprompt didn't fire
  if (isMobileBrowser && showAndroidGuide) {
    return (
      <>
        <button
          onClick={() => setShowAndroidGuide(true)}
          className="flex items-center gap-2 bg-[#C9A24A] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all duration-300 shadow-lg shadow-[#C9A24A]/20 rounded-full"
        >
          <Download size={14} />
          Install App
        </button>

        <div className="fixed inset-0 z-[99999] flex items-end justify-center p-4 pb-8">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAndroidGuide(false)}
          />
          <div className="relative w-full max-w-sm bg-[#0d2d20] rounded-2xl p-6 shadow-2xl border border-white/10 z-10">
            <button
              onClick={() => setShowAndroidGuide(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#C9A24A]/20 rounded-full flex items-center justify-center">
                <Download size={18} className="text-[#C9A24A]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Install OVOW FOODS</p>
                <p className="text-white/50 text-xs">Add to your Home Screen</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <p className="text-white text-sm font-medium">Open your browser menu</p>
                  <p className="text-white/50 text-xs mt-0.5">Tap the ⋮ or ☰ menu icon in your browser</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <p className="text-white text-sm font-medium">Tap &quot;Add to Home Screen&quot;</p>
                  <p className="text-white/50 text-xs mt-0.5">Or &quot;Install App&quot; / &quot;Add to phone&quot;</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <div>
                  <p className="text-white text-sm font-medium">Tap &quot;Add&quot; to confirm</p>
                  <p className="text-white/50 text-xs mt-0.5">OVOW FOODS will be on your Home Screen!</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="mt-6 w-full bg-[#C9A24A] hover:bg-[#b8912e] text-white font-bold py-3 rounded-full text-sm tracking-widest uppercase transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </>
    );
  }

  // Not a mobile device or no install support — hide
  return null;
}
