import { COMPANY_CONFIG } from "./config";

/**
 * Builds a UPI payment URI with the dynamic order amount.
 * Standard UPI deep-link format per NPCI spec.
 */
export function buildUpiUri(amount: number, orderRef: string): string {
  // UPI apps are notoriously strict. URLSearchParams encodes '@' as '%40'
  // and spaces as '+', which causes apps like GPay to drop the intent completely.
  // We must leave 'pa' unencoded (so '@' remains) and use '%20' for spaces.
  const pa = COMPANY_CONFIG.upiId.trim();
  const pn = encodeURIComponent("OVOW FOODS");
  const am = amount.toFixed(2); // UPI requires 2 decimal places
  const cu = "INR";
  const tn = encodeURIComponent(`Order ${orderRef}`);

  return `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=${cu}&tn=${tn}`;
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
