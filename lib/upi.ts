import { COMPANY_CONFIG } from "./config";

/**
 * Builds a UPI payment URI with the dynamic order amount.
 * Standard UPI deep-link format per NPCI spec.
 */
export function buildUpiUri(amount: number, orderRef: string): string {
  const params = new URLSearchParams({
    pa: COMPANY_CONFIG.upiId,
    pn: "OVOW FOODS",
    am: amount.toFixed(2),   // UPI requires 2 decimal places
    cu: "INR",
    tn: `OVOW Order ${orderRef}`,
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Returns a URL to qrserver.com that generates a QR image for the UPI URI.
 * Uses the free public API — no npm package needed.
 * Size 300x300, medium error correction.
 */
export function buildQrUrl(amount: number, orderRef: string): string {
  const uri = buildUpiUri(amount, orderRef);
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&ecc=M&data=${encodeURIComponent(uri)}`;
}
