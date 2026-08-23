/**
 * Generates a unique client-side order reference.
 * Format: OVOW-YYMMDD-XXXX  (e.g. OVOW-240826-K7P4)
 */
export function generateOrderRef(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars (0/O, 1/I)
  const rand = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `OVOW-${yy}${mm}${dd}-${rand}`;
}
