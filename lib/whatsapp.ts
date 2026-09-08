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
      `  • ${item.name} (${item.size}) × ${item.quantity}  ₹${(
        item.price * item.quantity
      ).toLocaleString("en-IN")}`
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return [
    `Hello OVOW FOODS! 👋`,
    ``,
    `I'd like to place an order:`,
    ``,
    ...lines,
    ``,
    `─────────────────────`,
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`,
    `─────────────────────`,
    ``,
    `📋 My Details:`,
    `Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    `Delivery Address: ${customer.address}`,
    customer.notes ? `Notes: ${customer.notes}` : "",
    ``,
    `Thank you! 🙏`,
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
    ? `Hello OVOW FOODS! 👋\n\nI'd like to know more about: ${context}`
    : `Hello OVOW FOODS! 👋\n\nI'd like to know more about your menu and ordering.`;
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
    `Hello OVOW FOODS! 👋`,
    ``,
    `I'd like to enquire about a bulk/party order:`,
    ``,
    `📅 Event: ${details.eventType}`,
    `📆 Date: ${details.eventDate}`,
    `👥 Guests: ${details.guestCount}`,
    `📍 Location: ${details.location}`,
    details.preferredItems ? `🍱 Preferred Items: ${details.preferredItems}` : "",
    details.budget ? `💰 Budget: ${details.budget}` : "",
    details.notes ? `📝 Notes: ${details.notes}` : "",
    ``,
    `📋 My Details:`,
    `Name: ${details.name}`,
    `Mobile: ${details.mobile}`,
    ``,
    `Please contact me to discuss further. Thank you! 🙏`,
  ]
    .filter((l) => l !== undefined)
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
      `  ${item.quantity} × ${item.name}${item.size ? ` (${item.size})` : ""}  →  ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
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
    ? `🚚 PORTER DELIVERY (Booked by OVOW)`
    : `🛵 OVOW FREE DELIVERY`;

  return [
    `🟢 NEW OVOW ORDER`,
    ``,
    `ORDER ID: ${orderRef}`,
    ``,
    `─── DELIVERY ────────────────────────────`,
    deliveryLine,
    isLater ? `⏰ SCHEDULED ORDER` : `🚨 ASAP`,
    isLater ? `📅 Date: ${customer.scheduleDate}` : undefined,
    isLater ? `🕒 Time: ${customer.scheduleTime}` : undefined,
    ``,
    `─── CUSTOMER ────────────────────────────`,
    `Name: ${customer.name}`,
    `Mobile: +91 ${customer.mobile}`,
    `Address: ${customer.address}`,
    customer.instructions ? `Notes: ${customer.instructions}` : undefined,
    ``,
    `─── ITEMS ───────────────────────────────`,
    ...lines,
    `─────────────────────────────────────────`,
    `FOOD TOTAL: ₹${total.toLocaleString("en-IN")}`,
    `DELIVERY: ₹0`,
    `TAX: ₹0`,
    `TOTAL: ₹${total.toLocaleString("en-IN")}`,
    ``,
    `─── PAYMENT ─────────────────────────────`,
    `Method: UPI`,
    `Status: Customer marked payment as completed`,
    `⚠️ Please verify UPI payment before fulfilling.`,
    ``,
    `BOOK PORTER:`,
    actionLink,
    ``,
    `Thank you! 🙏`,
    `OVOW FOODS`,
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

