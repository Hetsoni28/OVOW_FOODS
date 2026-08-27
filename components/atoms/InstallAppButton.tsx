"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { Download, X, Share } from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Shared popup component to avoid duplication
function InstallGuidePopup({
  isIOS,
  onClose,
}: {
  isIOS: boolean;
  onClose: () => void;
}) {
  // Close on scroll
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-end justify-center p-4 pb-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Card */}
      <div className="relative w-full max-w-sm bg-[#0d2d20] rounded-2xl p-6 shadow-2xl border border-white/10 z-10">
        {/* X close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-[#C9A24A]/20 flex items-center justify-center">
            <Download size={18} className="text-[#C9A24A]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Install OVOW FOODS</p>
            <p className="text-white/50 text-xs">Add to your Home Screen</p>
          </div>
        </div>

        <div className="space-y-4">
          {isIOS ? (
            <>
              <Step n={1} title={<>Tap the Share button <Share size={14} className="text-[#C9A24A] inline" /></>} sub="At the bottom of your Safari browser" />
              <Step n={2} title='Tap "Add to Home Screen"' sub="Scroll down in the Share menu to find it" />
              <Step n={3} title='Tap "Add"' sub="OVOW FOODS will appear on your Home Screen!" />
            </>
          ) : (
            <>
              <Step n={1} title="Open your browser menu" sub="Tap the ⋮ or ☰ menu icon in your browser" />
              <Step n={2} title='Tap "Add to Home Screen"' sub='Or "Install App" / "Add to phone"' />
              <Step n={3} title='Tap "Add" to confirm' sub="OVOW FOODS will be on your Home Screen!" />
            </>
          )}
        </div>

        {/* Got it + Cancel buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/20 text-white/60 hover:text-white hover:border-white/40 font-semibold py-3 text-sm tracking-widest uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#C9A24A] hover:bg-[#b8912e] text-white font-bold py-3 text-sm tracking-widest uppercase transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, sub }: { n: number; title: React.ReactNode; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-6 h-6 bg-[#C9A24A] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {n}
      </span>
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-white/50 text-xs mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobileBrowser, setIsMobileBrowser] = useState(false);
  // Separate: whether to show the fallback BUTTON (no popup yet)
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  // Separate: whether to show the guide POPUP (only on user tap)
  const [showPopup, setShowPopup] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iphone|ipad|ipod/i.test(ua));
    setIsMobileBrowser(/android|iphone|ipad|ipod|mobile/i.test(ua));

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true);
    if (isStandalone) setIsInstalled(true);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    // After 3s: if no native prompt, just show the BUTTON (NOT the popup)
    const fallbackTimer = setTimeout(() => {
      setInstallPrompt((prev) => {
        if (!prev) setShowFallbackButton(true);
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

  if (isInstalled) return null;

  const buttonCls =
    "flex items-center gap-2 bg-[#C9A24A] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all duration-300 shadow-lg shadow-[#C9A24A]/20";

  // ── iOS ────────────────────────────────────────────────────────────────────
  if (isIOS) {
    return (
      <>
        <button onClick={() => setShowPopup(true)} className={buttonCls}>
          <Download size={14} /> Install App
        </button>
        {showPopup && <InstallGuidePopup isIOS onClose={() => setShowPopup(false)} />}
      </>
    );
  }

  // ── Android/Chrome native prompt ───────────────────────────────────────────
  if (installPrompt) {
    return (
      <button onClick={handleAndroidInstall} className={buttonCls}>
        <Download size={14} /> Install App
      </button>
    );
  }

  // ── Samsung / Firefox / Opera fallback ─────────────────────────────────────
  if (isMobileBrowser && showFallbackButton) {
    return (
      <>
        {/* Button is always visible; popup only opens on tap */}
        <button onClick={() => setShowPopup(true)} className={buttonCls}>
          <Download size={14} /> Install App
        </button>
        {showPopup && <InstallGuidePopup isIOS={false} onClose={() => setShowPopup(false)} />}
      </>
    );
  }

  return null;
}
