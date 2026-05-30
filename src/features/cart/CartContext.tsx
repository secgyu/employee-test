"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { CartItem } from "@/src/features/cart/types";

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hk-cart";

/**
 * 장바구니 전역 상태 (CSR).
 * localStorage에 보존해 새로고침 후에도 유지한다.
 * 추후 Supabase 연동 시 저장소만 교체하면 된다.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // 손상된 데이터는 무시
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) => (entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry));
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => prev.map((entry) => (entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalCount = useMemo(() => items.reduce((sum, entry) => sum + entry.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, totalCount, totalPrice, addItem, removeItem, setQuantity, clear }),
    [items, totalCount, totalPrice, addItem, removeItem, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart는 CartProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
