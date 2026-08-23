"use client";

import { useState, useEffect } from "react";
import type { CartItem } from "@/types";

export interface PastOrder {
  id: string;
  date: string; // ISO string
  items: CartItem[];
  total: number;
  method: "upi" | "cod";
}

const STORAGE_KEY = "ovow_order_history";

export function useOrderHistory() {
  const [orders, setOrders] = useState<PastOrder[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load order history", e);
    }
  }, []);

  const addOrder = (order: Omit<PastOrder, "date">) => {
    try {
      const newOrder: PastOrder = { ...order, date: new Date().toISOString() };
      setOrders((prev) => {
        const updated = [newOrder, ...prev].slice(0, 50); // Keep last 50 orders max
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error("Failed to save order", e);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setOrders([]);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  return { orders, mounted, addOrder, clearHistory };
}
