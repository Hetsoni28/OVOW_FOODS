import { Order } from "@/types";

const ORDERS_STORAGE_KEY = "ovow_orders";

/**
 * Saves a new immutable order snapshot to local storage.
 */
export function saveOrderToStorage(order: Order): void {
  if (typeof window === "undefined") return;

  try {
    const existingOrdersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    const existingOrders: Order[] = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
    
    // Check if order already exists to prevent duplicates during strict mode double renders
    const exists = existingOrders.some((o) => o.orderId === order.orderId);
    if (!exists) {
      existingOrders.push(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
    }
  } catch (error) {
    console.error("Failed to save order to storage:", error);
  }
}

/**
 * Retrieves a specific order snapshot from local storage by Order ID.
 */
export function getOrderFromStorage(orderId: string): Order | null {
  if (typeof window === "undefined") return null;

  try {
    const existingOrdersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!existingOrdersJson) return null;

    const existingOrders: Order[] = JSON.parse(existingOrdersJson);
    return existingOrders.find((o) => o.orderId === orderId) || null;
  } catch (error) {
    console.error("Failed to retrieve order from storage:", error);
    return null;
  }
}

/**
 * Retrieves all orders for the current user.
 */
export function getAllOrdersFromStorage(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    const existingOrdersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    return existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
  } catch (error) {
    console.error("Failed to retrieve all orders from storage:", error);
    return [];
  }
}
