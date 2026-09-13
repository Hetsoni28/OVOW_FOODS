"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IconMapPin } from "@/components/atoms/Icons";
import { inputCls } from "./SharedUI";
import type { Errors } from "@/lib/types";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
// Photon (komoot) — much faster/more accurate than Nominatim for autocomplete
interface PhotonFeature {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] };
  properties: {
    osm_id?: number;
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    district?: string;
    county?: string;
    state?: string;
    country?: string;
    suburb?: string;
    neighbourhood?: string;
  };
}

// BigDataCloud reverse geocode
interface BDCResult {
  locality: string;
  city: string;
  principalSubdivision: string;
  postcode: string;
  localityInfo?: {
    administrative?: { name: string; adminLevel: number }[];
    informative?: { name: string; description?: string }[];
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Address formatters
───────────────────────────────────────────────────────────────────────────── */
function buildFromPhoton(p: PhotonFeature["properties"]): string {
  const parts: string[] = [];
  if (p.housenumber && p.street) parts.push(`${p.housenumber}, ${p.street}`);
  else if (p.street)             parts.push(p.street);
  const local = p.neighbourhood || p.suburb || p.district;
  if (local && local !== p.city) parts.push(local);
  if (p.name && !parts.some(x => x.includes(p.name!))) parts.unshift(p.name);
  if (p.city)     parts.push(p.city);
  if (p.state)    parts.push(p.state);
  if (p.postcode) parts.push(p.postcode);
  // dedupe adjacent duplicates
  return parts.filter((v, i, a) => v && a.indexOf(v) === i).join(", ");
}

function buildFromBDC(data: BDCResult): string {
  const parts: string[] = [];

  // Try to get the most specific local area name
  const admin = data.localityInfo?.administrative ?? [];
  const informative = data.localityInfo?.informative ?? [];

  // Neighbourhood / ward (adminLevel 10–12)
  const ward = admin.find(a => a.adminLevel >= 10)?.name;
  if (ward) parts.push(ward);

  // Locality (specific area like "Navrangpura", "Satellite")
  if (data.locality && data.locality !== data.city) parts.push(data.locality);

  // Informative area (roads, places of interest)
  const poi = informative.find(i => i.description?.toLowerCase().includes("road") || i.description?.toLowerCase().includes("street"));
  if (poi && !parts.includes(poi.name)) parts.push(poi.name);

  // City
  if (data.city) parts.push(data.city);

  // State
  if (data.principalSubdivision) parts.push(data.principalSubdivision);

  // Pincode
  if (data.postcode) parts.push(data.postcode);

  return parts.filter(Boolean).join(", ");
}

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
interface SmartAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SmartAddressField({ value, onChange, error }: SmartAddressFieldProps) {
  const [locLoading, setLocLoading]   = useState(false);
  const [locError, setLocError]       = useState<string | null>(null);
  const [locSuccess, setLocSuccess]   = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [searching, setSearching]     = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mode, setMode] = useState<"default" | "search" | "filled">(value ? "filled" : "default");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  /* ── GPS + Reverse Geocode ───────────────────────────────────────── */
  async function reverseGeocode(lat: number, lon: number): Promise<string> {
    // PRIMARY: BigDataCloud — best free option for India, returns locality info
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      if (res.ok) {
        const data: BDCResult = await res.json();
        const built = buildFromBDC(data);
        if (built && built.length > 8) return built;
      }
    } catch { /* fall through */ }

    // FALLBACK: Photon reverse geocode
    try {
      const res = await fetch(
        `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}&lang=en&limit=1`
      );
      if (res.ok) {
        const data: { features: PhotonFeature[] } = await res.json();
        if (data.features.length > 0)
          return buildFromPhoton(data.features[0].properties);
      }
    } catch { /* fall through */ }

    return "";
  }

  async function handleUseLocation() {
    setLocError(null);
    setLocSuccess(false);
    if (!navigator.geolocation) {
      setLocError("Location not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const address = await reverseGeocode(coords.latitude, coords.longitude);
          if (!address) {
            setLocError("Could not detect address. Please type or search manually.");
          } else {
            onChange(address);
            setLocSuccess(true);
            setMode("filled");
            setTimeout(() => setLocSuccess(false), 4000);
          }
        } catch {
          setLocError("Error fetching address. Please type it manually.");
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        setLocLoading(false);
        const msgs: Record<number, string> = {
          1: "Permission denied. Please allow location access.",
          2: "Location unavailable. Try again or type manually.",
          3: "Location timed out. Try again.",
        };
        setLocError(msgs[err.code] ?? "Could not get location.");
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
    );
  }

  /* ── Photon Search ───────────────────────────────────────────────── */
  const doSearch = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 3) { setSuggestions([]); setShowSuggestions(false); return; }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        // India bounding box: SW(8.4, 68.7) NE(37.6, 97.4)
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=7&lang=en&bbox=68.7,8.4,97.4,37.6`;
        const res = await fetch(url);
        const data: { features: PhotonFeature[] } = await res.json();

        // Filter to India only (safety)
        const india = data.features.filter(
          f => !f.properties.country || f.properties.country === "India"
        );
        setSuggestions(india);
        setShowSuggestions(india.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setSearching(false);
      }
    }, 380);
  }, []);

  function handleSelect(f: PhotonFeature) {
    const built = buildFromPhoton(f.properties);
    onChange(built || f.properties.name || "");
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setLocSuccess(true);
    setMode("filled");
    setTimeout(() => setLocSuccess(false), 4000);
  }

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <div ref={wrapperRef} className="space-y-3">

      {/* Action buttons */}
      {mode !== "filled" && (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={handleUseLocation} disabled={locLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#C9A24A]/40 rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C9A24A] hover:border-[#C9A24A] hover:bg-[#C9A24A]/5 transition-all disabled:opacity-50 disabled:cursor-wait group">
            {locLoading
              ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              : <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="8" strokeDasharray="3 3"/></svg>
            }
            {locLoading ? "Locating…" : "Use My Location"}
          </button>

          <button type="button" onClick={() => { setMode("search"); setLocError(null); }}
            className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-primary/20 rounded-xl text-[11px] font-bold uppercase tracking-widest text-primary/50 hover:border-primary/40 hover:text-primary transition-all group">
            <svg className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            Search Address
          </button>
        </div>
      )}

      {/* Search input with Photon autocomplete */}
      {mode === "search" && (
        <div className="relative">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            {searching && <svg className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin w-4 h-4 text-[#C9A24A]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
            <input autoFocus type="text" value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); doSearch(e.target.value); }}
              placeholder="Type area, building, street or landmark…"
              className="w-full border-2 border-[#C9A24A]/40 focus:border-[#C9A24A] bg-white rounded-xl pl-10 pr-10 py-3 text-sm text-primary placeholder:text-primary/30 focus:outline-none transition-colors"/>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-primary/10 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
              {suggestions.map((f, i) => {
                const p = f.properties;
                const title = p.name || p.street || p.neighbourhood || p.suburb || p.city || "Location";
                const subtitle = buildFromPhoton(p);
                return (
                  <button key={i} type="button" onMouseDown={() => handleSelect(f)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#C9A24A]/5 transition-colors text-left border-b border-primary/[0.06] last:border-0">
                    <IconMapPin size={13} className="text-[#C9A24A] mt-0.5 flex-shrink-0"/>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-primary leading-snug truncate">{title}</p>
                      {subtitle && subtitle !== title && (
                        <p className="text-[10px] text-primary/40 leading-snug mt-0.5 truncate">{subtitle}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* OR divider */}
      {(mode === "default" || mode === "search") && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-primary/8"/>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/25">or type manually</span>
          <div className="flex-1 h-px bg-primary/8"/>
        </div>
      )}

      {/* Editable textarea */}
      <div className="relative group">
        <IconMapPin size={18} className={`absolute left-0 top-3 pointer-events-none transition-colors ${locSuccess ? "text-green-500" : "text-primary/30 group-focus-within:text-[#C9A24A]"}`}/>
        <textarea id="address" rows={3} value={value}
          onChange={(e) => { onChange(e.target.value); if (mode === "default" && e.target.value) setMode("filled"); }}
          placeholder="Full delivery address with landmark"
          className={`${inputCls(error)} pl-8 resize-none`}/>
        {locSuccess && (
          <div className="absolute right-1 top-2.5 flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Auto-filled</span>
          </div>
        )}
        {mode === "filled" && !locSuccess && (
          <button type="button" onClick={() => { setMode("default"); setLocError(null); }}
            className="absolute right-0 bottom-2 text-[9px] font-bold uppercase tracking-widest text-[#C9A24A] hover:opacity-70 transition-opacity">
            Change
          </button>
        )}
      </div>

      {/* Error */}
      {locError && (
        <p className="text-xs text-red-500 flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
          {locError}
        </p>
      )}
    </div>
  );
}
