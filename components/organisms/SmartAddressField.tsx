"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IconMapPin } from "@/components/atoms/Icons";
import { inputCls } from "./SharedUI";
import type { Errors } from "@/lib/types";

// Nominatim result shape
interface NominatimResult {
  place_id: number;
  display_name: string;
  address: {
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
  lat: string;
  lon: string;
}

function buildAddress(addr: NominatimResult["address"]): string {
  const parts = [
    addr.road,
    addr.neighbourhood,
    addr.suburb,
    addr.village ?? addr.town ?? addr.city,
    addr.county,
    addr.state,
    addr.postcode,
  ].filter(Boolean);
  return parts.join(", ");
}

interface SmartAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SmartAddressField({ value, onChange, error }: SmartAddressFieldProps) {
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [locSuccess, setLocSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mode, setMode] = useState<"default" | "search" | "filled">(value ? "filled" : "default");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // Debounced Nominatim search
  const doSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 3) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=5&countrycodes=in`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 450);
  }, []);

  // Use Current Location
  async function handleUseLocation() {
    setLocError(null);
    setLocSuccess(false);
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data: NominatimResult = await res.json();
          const built = buildAddress(data.address);
          onChange(built);
          setLocSuccess(true);
          setMode("filled");
          setTimeout(() => setLocSuccess(false), 3000);
        } catch {
          setLocError("Could not fetch address. Please type it manually.");
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        setLocLoading(false);
        if (err.code === 1) setLocError("Location permission denied. Please type your address.");
        else setLocError("Could not get location. Please type it manually.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  function handleSelectSuggestion(result: NominatimResult) {
    const built = buildAddress(result.address);
    onChange(built);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setMode("filled");
    setLocSuccess(true);
    setTimeout(() => setLocSuccess(false), 3000);
  }

  return (
    <div ref={wrapperRef} className="space-y-3">

      {/* Smart Action Buttons — shown when no address yet */}
      {mode !== "filled" && (
        <div className="grid grid-cols-2 gap-2">
          {/* Use My Location */}
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#C9A24A]/40 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C9A24A] hover:border-[#C9A24A] hover:bg-[#C9A24A]/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait group"
          >
            {locLoading ? (
              <svg className="animate-spin w-4 h-4 text-[#C9A24A]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                <circle cx="12" cy="12" r="9" strokeDasharray="2 4" strokeLinecap="round"/>
              </svg>
            )}
            {locLoading ? "Locating…" : "Use My Location"}
          </button>

          {/* Search Address */}
          <button
            type="button"
            onClick={() => setMode("search")}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-primary/20 rounded-xl text-[11px] font-bold uppercase tracking-widest text-primary/50 hover:border-primary/40 hover:text-primary hover:bg-primary/3 transition-all duration-200 group"
          >
            <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Search Address
          </button>
        </div>
      )}

      {/* Search Input — shown when user clicked Search */}
      {mode === "search" && (
        <div className="relative">
          <div className="relative flex items-center">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            {searching && (
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin w-4 h-4 text-[#C9A24A]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            )}
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); doSearch(e.target.value); }}
              placeholder="Type your area, street or landmark…"
              className="w-full border-2 border-[#C9A24A]/40 focus:border-[#C9A24A] bg-white rounded-xl pl-10 pr-10 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none transition-colors"
            />
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-primary/10 rounded-xl shadow-xl overflow-hidden">
              {suggestions.map((s) => (
                <button
                  key={s.place_id}
                  type="button"
                  onMouseDown={() => handleSelectSuggestion(s)}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#C9A24A]/5 transition-colors text-left border-b border-primary/5 last:border-0"
                >
                  <IconMapPin size={14} className="text-[#C9A24A] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-primary/80 leading-relaxed line-clamp-2">{s.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* OR divider */}
      {(mode === "default" || mode === "search") && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-primary/8" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/25">or type manually</span>
          <div className="flex-1 h-px bg-primary/8" />
        </div>
      )}

      {/* Address Textarea — always shown, pre-filled by location/search */}
      <div className="relative group">
        <IconMapPin
          size={18}
          className={`absolute left-0 top-3 transition-colors ${locSuccess ? "text-green-500" : "text-primary/30 group-focus-within:text-[#C9A24A]"}`}
        />
        <textarea
          id="address"
          rows={3}
          value={value}
          onChange={(e) => { onChange(e.target.value); if (mode === "default") setMode("filled"); }}
          placeholder="Full delivery address with landmark"
          className={`${inputCls(error)} pl-8 resize-none transition-all`}
        />
        {/* Success tick */}
        {locSuccess && (
          <div className="absolute right-0 top-3 flex items-center gap-1 text-green-500 text-[10px] font-bold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Auto-filled
          </div>
        )}
        {/* Change address button */}
        {mode === "filled" && (
          <button
            type="button"
            onClick={() => { setMode("default"); }}
            className="absolute right-0 bottom-2 text-[9px] font-bold uppercase tracking-widest text-[#C9A24A] hover:text-[#C9A24A]/70 transition-colors"
          >
            Change
          </button>
        )}
      </div>

      {/* Location error */}
      {locError && (
        <p className="text-xs text-red-500 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
          {locError}
        </p>
      )}
    </div>
  );
}
