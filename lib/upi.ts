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
 * UPI Reference Number (UTR / RRN): every UPI payment gets a 12-digit number,
 * shown in the payer's app as "UPI Ref No", "UTR" or "UPI transaction ID".
 * The merchant can search for it in their bank / UPI app to confirm the money arrived.
 */
export const UTR_LENGTH = 12;

export function normalizeUtr(input: string): string {
  return input.replace(/\D/g, "").slice(0, UTR_LENGTH);
}

export function isValidUtr(utr: string): boolean {
  return /^\d{12}$/.test(utr);
}
