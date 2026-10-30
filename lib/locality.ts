// Turns a full delivery address into a coarse, public-safe locality
// (e.g. "B-12 Shanti Apts, CG Road, Navrangpura, Ahmedabad, 380009" → "Navrangpura")
// for the homepage live ticker. Never returns house numbers or building names.

const CITY_WORDS = /^(ahmedabad|gujarat|india|amdavad)$/i;
const BUILDING_WORDS =
  /\b(flat|apartments?|apts?|society|soc|tower|towers|block|house|bungalows?|floor|near|opp|opposite|behind|plot|wing|residency|heights|complex|enclave|nagar society)\b/i;

export const DEFAULT_LOCALITY = "Ahmedabad";

export function extractLocality(address: unknown): string {
  if (typeof address !== "string") return DEFAULT_LOCALITY;

  const parts = address
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p && !/\d/.test(p) && !CITY_WORDS.test(p));

  // A single remaining segment is usually the building/street itself — too specific.
  if (parts.length < 2) return DEFAULT_LOCALITY;

  const candidate = parts[parts.length - 1];
  if (BUILDING_WORDS.test(candidate)) return DEFAULT_LOCALITY;

  const clean = candidate.replace(/[^A-Za-z .-]/g, "").replace(/\s+/g, " ").trim();
  return clean.length >= 3 && clean.length <= 24 ? clean : DEFAULT_LOCALITY;
}
