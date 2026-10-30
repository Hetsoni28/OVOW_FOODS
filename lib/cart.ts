import { CartItem } from "@/types";

const CART_KEY = "ovow_cart";

type LineKeyFields = Pick<CartItem, "slug" | "variant" | "addons" | "extras">;

/**
 * Identity of a cart line. Two items only merge into one line when the dish,
 * preparation style, raita choice and paid extras all match — otherwise e.g.
 * a plain Biryani would be merged into (and priced as) a Biryani + Extra Cheese.
 */
export function getLineKey(item: LineKeyFields): string {
  const variant = item.variant ?? "regular";
  const raita = item.addons?.wantsRaita ? "raita" : "";
  const extras = (item.extras ?? []).map((e) => e.name).sort().join("+");
  return [item.slug, variant, raita, extras].join("|");
}

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Could not save cart:", e);
  }
}

export function clearStoredCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error("Could not clear cart:", e);
  }
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
