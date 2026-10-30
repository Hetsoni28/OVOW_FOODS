"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import { CartItem, Product } from "@/types";
import { loadCart, saveCart, clearStoredCart, getCartTotal, getCartCount, getLineKey } from "@/lib/cart";

// ── State & Actions ───────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; lineKey: string }
  | { type: "INCREMENT"; lineKey: string }
  | { type: "DECREMENT"; lineKey: string }
  | { type: "CLEAR" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "LOAD"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "LOAD":
      return { ...state, items: action.items };

    case "ADD_ITEM": {
      // Same dish + same variant/raita/extras → one line; anything different → its own line
      const key = getLineKey(action.product);
      const existing = state.items.some((i) => getLineKey(i) === key);
      const items = existing
        ? state.items.map((i) => (getLineKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i))
        : [...state.items, { ...action.product, quantity: 1 }];
      return { ...state, items };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => getLineKey(i) !== action.lineKey),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          getLineKey(i) === action.lineKey ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            getLineKey(i) === action.lineKey ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN_DRAWER":
      return { ...state, isOpen: true };

    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  count: number;
  addItem: (product: Omit<CartItem, "quantity">) => void;
  /** All three take a line key from getLineKey(item) */
  removeItem: (lineKey: string) => void;
  increment: (lineKey: string) => void;
  decrement: (lineKey: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on first mount
  useEffect(() => {
    dispatch({ type: "LOAD", items: loadCart() });
    setHydrated(true);
  }, []);

  // Persist cart whenever it changes (after hydration)
  useEffect(() => {
    if (hydrated) saveCart(state.items);
  }, [state.items, hydrated]);

  const addItem = useCallback((product: Omit<CartItem, "quantity">) => dispatch({ type: "ADD_ITEM", product }), []);
  const removeItem = useCallback((lineKey: string) => dispatch({ type: "REMOVE_ITEM", lineKey }), []);
  const increment = useCallback((lineKey: string) => dispatch({ type: "INCREMENT", lineKey }), []);
  const decrement = useCallback((lineKey: string) => dispatch({ type: "DECREMENT", lineKey }), []);
  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
    clearStoredCart();
  }, []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_DRAWER" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        total: getCartTotal(state.items),
        count: getCartCount(state.items),
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
