"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setIsInstalled(true);
    }
  };

  // Don't render if already installed or no prompt available
  if (isInstalled || !installPrompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 bg-[#C9A24A] text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0B2118] transition-all duration-300 shadow-lg shadow-[#C9A24A]/20"
    >
      <Download size={14} />
      Install App
    </button>
  );
}
