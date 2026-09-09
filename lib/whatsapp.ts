import { COMPANY_CONFIG } from "./config";
import { CartItem } from "@/types";
import { CheckoutCustomerDetails } from "./types";

function encodeMessage(msg: string): string {
  return encodeURIComponent(msg);
}

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY_CONFIG.whatsapp}?text=${encodeMessage(message)}`;
}

// \u2500\u2500 ORDER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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
      `\ud83d\udd39 *${item.quantity}x* ${item.name} ${item.size ? `(${item.size})` : ""} \u2014 \u20b9${(
        item.price * item.quantity
      ).toLocaleString("en-IN")}`
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return [
    `\u2728 *NEW DIRECT ORDER | OVOW FOODS* \u2728`,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    ``,
    `*\ud83d\udce6 ORDER SUMMARY*`,
    ...lines,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    `\ud83d\udcb0 *Subtotal:* \u20b9${subtotal.toLocaleString("en-IN")}`,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    ``,
    `*\ud83d\udc64 CUSTOMER DETAILS*`,
    `\ud83d\udc64 *Name:* ${customer.name}`,
    `\ud83d\udcf1 *Mobile:* ${customer.mobile}`,
    `\ud83d\udccd *Delivery Address:* ${customer.address}`,
    customer.notes ? `\ud83d\udcdd *Notes:* ${customer.notes}` : "",
    ``,
    `\ud83c\udf3f *Thank you for choosing OVOW FOODS!*`,
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

// \u2500\u2500 GENERAL INQUIRY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export function openWhatsAppInquiry(context?: string): void {
  const message = context
    ? `\u2728 *INQUIRY | OVOW FOODS* \u2728\n\nHello! \ud83d\udc4b\nI'd like to know more about: *${context}*`
    : `\u2728 *INQUIRY | OVOW FOODS* \u2728\n\nHello! \ud83d\udc4b\nI'd like to know more about your menu and ordering.`;
  window.open(buildWhatsAppUrl(message), "_blank");
}

// \u2500\u2500 BULK ORDER INQUIRY \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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
    `\ud83c\udf89 *NEW BULK/PARTY INQUIRY | OVOW FOODS* \ud83c\udf89`,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    ``,
    `*\ud83d\udcc5 EVENT DETAILS*`,
    `\u2728 *Occasion:* ${details.eventType}`,
    `\ud83d\udcc6 *Date:* ${details.eventDate}`,
    `\ud83d\udc65 *Guests:* ${details.guestCount}`,
    `\ud83d\udccd *Location:* ${details.location}`,
    details.budget ? `\ud83d\udcb0 *Budget:* ${details.budget}` : "",
    ``,
    `*\ud83c\udf7d\ufe0f FOOD PREFERENCES*`,
    details.preferredItems ? `\ud83c\udf71 *Items:* ${details.preferredItems}` : "Not specified yet",
    details.notes ? `\ud83d\udcdd *Notes:* ${details.notes}` : "",
    ``,
    `*\ud83d\udc64 CONTACT INFO*`,
    `\ud83d\udc64 *Name:* ${details.name}`,
    `\ud83d\udcf1 *Mobile:* ${details.mobile}`,
    ``,
    `\ud83c\udf3f *Looking forward to hosting an amazing event with OVOW FOODS!*`,
  ]
    .filter((l) => l !== undefined && l !== "")
    .join("\n");

  window.open(buildWhatsAppUrl(message), "_blank");
}

// \u2500\u2500 CHECKOUT ORDER MESSAGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export function buildCheckoutWhatsAppMessage(
  items: CartItem[],
  customer: CheckoutCustomerDetails,
  total: number,
  orderRef: string
): string {
  const lines = items.map(
    (item) =>
      `\ud83d\udd39 *${item.quantity}x* ${item.name} ${item.size ? `(${item.size})` : ""} \u2192 \u20b9${(item.price * item.quantity).toLocaleString("en-IN")}`
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
    ? `\ud83d\udfe2 *PORTER DELIVERY* (Needs Booking)`
    : `\ud83d\udef5 *OVOW DIRECT DELIVERY*`;

  return [
    `\ud83c\udf1f *NEW PREMIUM ORDER | OVOW FOODS* \ud83c\udf1f`,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    `\ud83c\udd94 *ORDER ID:* ${orderRef}`,
    ``,
    `*\ud83d\ude9a DELIVERY INFO*`,
    deliveryLine,
    isLater ? `\u23f0 *SCHEDULED FOR:* ${customer.scheduleDate} @ ${customer.scheduleTime}` : `\ud83d\ude80 *DELIVERY:* ASAP`,
    ``,
    `*\ud83d\udc64 CUSTOMER DETAILS*`,
    `\ud83d\udc64 *Name:* ${customer.name}`,
    `\ud83d\udcf1 *Mobile:* +91 ${customer.mobile}`,
    `\ud83d\udccd *Address:* ${customer.address}`,
    customer.instructions ? `\ud83d\udcdd *Instructions:* ${customer.instructions}` : undefined,
    ``,
    `*\ud83d\udce6 ORDER SUMMARY*`,
    ...lines,
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501`,
    `\ud83c\udf71 *FOOD TOTAL:* \u20b9${total.toLocaleString("en-IN")}`,
    `\ud83d\udef5 *DELIVERY:* \u20b90`,
    `\ud83d\udd16 *TAX:* \u20b90`,
    `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`,
    `\ud83c\udfaf *GRAND TOTAL: \u20b9${total.toLocaleString("en-IN")}*`,
    `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`,
    ``,
    `*\ud83d\udcb3 PAYMENT STATUS*`,
    `\u2705 *Method:* UPI / Online`,
    `\u26a0\ufe0f _Please verify payment in merchant app before fulfilling._`,
    ``,
    `\ud83d\udcf8 *PAYMENT SCREENSHOT REQUIRED*`,
    `_Please attach your payment screenshot to this message before hitting send!_`,
    ``,
    `*\ud83d\udd17 ACTION LINK*`,
    `\ud83d\udc49 Book Porter & Manage Order:`,
    actionLink,
    ``,
    `\ud83c\udf3f *Thank you for dining with OVOW FOODS!*`,
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

