import { COMPANY_CONFIG } from "./config";

/**
 * Builds a UPI payment URI with the dynamic order amount.
 * Standard UPI deep-link format per NPCI spec.
 */
export function buildUpiUri(amount: number, orderRef: string): string {
  // We must use raw string concatenation because URLSearchParams encodes '@' as '%40'
  // which breaks many UPI apps.
  // We MUST NOT include 'mc' or 'tr' because for merchant accounts (@okbizaxis), 
  // GPay will expect a cryptographic 'sign' parameter if it sees 'mc'. If missing, 
  // it blocks auto-filling the amount for security.
  const pa = COMPANY_CONFIG.upiId.trim();
  const pn = encodeURIComponent("OVOW FOODS");
  const am = amount.toFixed(2);
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
