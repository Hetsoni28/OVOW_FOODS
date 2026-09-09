import { COMPANY_CONFIG } from "./config";
import { CartItem } from "@/types";
import { CheckoutCustomerDetails } from "./types";

function encodeMessage(msg: string): string {
  return encodeURIComponent(msg);
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeMessage(message)}`;
}

// ── ORDER ──────────────────────────────────────────────────────────────────────

export interface CustomerDetails {
  name: string;
  mobile: string;
  address: string;
  notes?: string;
}

export function buildOrderMessage(
  items: CartItem[],
  customer: CustomerDetails
): string {
  const lines = items.map(
    (item) =>
      `🔹 *${item.quantity}x* ${item.name} ${item.size ? `(${item.size})` : ""} — ₹${(
        item.price * item.quantity
      ).toLocaleString("en-IN")}`
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return [
    `✨ *NEW DIRECT ORDER | OVOW FOODS* ✨`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `*📦 ORDER SUMMARY*`,
    ...lines,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `💰 *Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `*👤 CUSTOMER DETAILS*`,
    `👤 *Name:* ${customer.name}`,
    `📱 *Mobile:* ${customer.mobile}`,
    `📍 *Delivery Address:* ${customer.address}`,
    customer.notes ? `📝 *Notes:* ${customer.notes}` : "",
    ``,
    `🌿 *Thank you for choosing OVOW FOODS!*`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}


export function openWhatsAppOrder(
  items: CartItem[],
  customer: CustomerDetails
): void {
  if (items.length === 0) return;
  const message = buildOrderMessage(items, customer);
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank");
}

// ── GENERAL INQUIRY ───────────────────────────────────────────────────────────

export function openWhatsAppInquiry(context?: string): void {
  const message = context
    ? `✨ *INQUIRY | OVOW FOODS* ✨\n\nHello! 👋\nI'd like to know more about: *${context}*`
    : `✨ *INQUIRY | OVOW FOODS* ✨\n\nHello! 👋\nI'd like to know more about your menu and ordering.`;
  window.open(buildWhatsAppUrl(message), "_blank");
}

// ── BULK ORDER INQUIRY ────────────────────────────────────────────────────────

export interface BulkInquiryDetails {
  name: string;
  mobile: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  preferredItems?: string;
  budget?: string;
  notes?: string;
}

export function openWhatsAppBulkOrder(details: BulkInquiryDetails): void {
  const message = [
    `🎉 *NEW BULK/PARTY INQUIRY | OVOW FOODS* 🎉`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `*📅 EVENT DETAILS*`,
    `✨ *Occasion:* ${details.eventType}`,
    `📆 *Date:* ${details.eventDate}`,
    `👥 *Guests:* ${details.guestCount}`,
    `📍 *Location:* ${details.location}`,
    details.budget ? `💰 *Budget:* ${details.budget}` : "",
    ``,
    `*🍽️ FOOD PREFERENCES*`,
    details.preferredItems ? `🍱 *Items:* ${details.preferredItems}` : "Not specified yet",
    details.notes ? `📝 *Notes:* ${details.notes}` : "",
    ``,
    `*👤 CONTACT INFO*`,
    `👤 *Name:* ${details.name}`,
    `📱 *Mobile:* ${details.mobile}`,
    ``,
    `🌿 *Looking forward to hosting an amazing event with OVOW FOODS!*`,
  ]
    .filter((l) => l !== undefined && l !== "")
    .join("\n");

  window.open(buildWhatsAppUrl(message), "_blank");
}

// ── CHECKOUT ORDER MESSAGE ─────────────────────────────────────────────────────

export function buildCheckoutWhatsAppMessage(
  items: CartItem[],
  customer: CheckoutCustomerDetails,
  total: number,
  orderRef: string
): string {
  const lines = items.map(
    (item) =>
      `🔹 *${item.quantity}x* ${item.name} ${item.size ? `(${item.size})` : ""} → ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
  );

  const isLater = customer.scheduleType === "later";
  const isPorter = customer.deliveryMethod === "porter";

  // Create a secure base64 payload containing the specific order details
  // so the Action Page can display them dynamically without a database!
  const payload = typeof window !== "undefined" ? btoa(encodeURIComponent(JSON.stringify({
    n: customer.name,
    p: customer.mobile,
    a: customer.address,
    t: total
  }))) : "";

  const actionLink = `${typeof window !== "undefined" ? window.location.origin : ""}/order-action/${orderRef}?d=${payload}`;

  const deliveryLine = isPorter
    ? `🟢 *PORTER DELIVERY* (Needs Booking)`
    : `🛵 *OVOW DIRECT DELIVERY*`;

  return [
    `🌟 *NEW PREMIUM ORDER | OVOW FOODS* 🌟`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🆔 *ORDER ID:* ${orderRef}`,
    ``,
    `*🚚 DELIVERY INFO*`,
    deliveryLine,
    isLater ? `⏰ *SCHEDULED FOR:* ${customer.scheduleDate} @ ${customer.scheduleTime}` : `🚀 *DELIVERY:* ASAP`,
    ``,
    `*👤 CUSTOMER DETAILS*`,
    `👤 *Name:* ${customer.name}`,
    `📱 *Mobile:* +91 ${customer.mobile}`,
    `📍 *Address:* ${customer.address}`,
    customer.instructions ? `📝 *Instructions:* ${customer.instructions}` : undefined,
    ``,
    `*📦 ORDER SUMMARY*`,
    ...lines,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🍱 *FOOD TOTAL:* ₹${total.toLocaleString("en-IN")}`,
    `🛵 *DELIVERY:* ₹0`,
    `🔖 *TAX:* ₹0`,
    `══════════════════════════════════`,
    `🎯 *GRAND TOTAL: ₹${total.toLocaleString("en-IN")}*`,
    `══════════════════════════════════`,
    ``,
    `*💳 PAYMENT STATUS*`,
    `✅ *Method:* UPI / Online`,
    `⚠️ _Please verify payment in merchant app before fulfilling._`,
    ``,
    `*🔗 ACTION LINK*`,
    `👉 Book Porter & Manage Order:`,
    actionLink,
    ``,
    `🌿 *Thank you for dining with OVOW FOODS!*`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

export function openCheckoutWhatsApp(
  items: CartItem[],
  customer: CheckoutCustomerDetails,
  total: number,
  orderRef: string
): void {
  const message = buildCheckoutWhatsAppMessage(items, customer, total, orderRef);
  window.open(buildWhatsAppUrl(message), "_blank");
}

