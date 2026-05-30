"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/src/lib/supabase/client";
import { CART_SELECT, toCartItem, type CartRow } from "@/src/features/cart/shared";
import type { CartItem } from "@/src/features/cart/types";

interface AddResult {
  ok: boolean;
  /** 비로그인 상태라 담지 못한 경우 true */
  needLogin?: boolean;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  loading: boolean;
  isLoggedIn: boolean;
  addItem: (productId: string, quantity?: number) => Promise<AddResult>;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  reload: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * 장바구니 전역 상태 (CSR, Supabase DB 기반).
 * 로그인 사용자의 cart_items를 products와 조인해 조회/수정한다.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const load = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setIsLoggedIn(Boolean(user));

    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase.from("cart_items").select(CART_SELECT).order("created_at", { ascending: true });

    const rows = (data as unknown as CartRow[] | null) ?? [];
    setItems(rows.map(toCartItem).filter((item): item is CartItem => item !== null));
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void load();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load();
    });
    return () => subscription.unsubscribe();
  }, [load, supabase]);

  const addItem = useCallback(
    async (productId: string, quantity = 1): Promise<AddResult> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { ok: false, needLogin: true };

      const { data: existing } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + quantity })
          .eq("user_id", user.id)
          .eq("product_id", productId);
      } else {
        await supabase.from("cart_items").insert({ user_id: user.id, product_id: productId, quantity });
      }

      await load();
      return { ok: true };
    },
    [supabase, load],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      setItems((prev) => prev.filter((entry) => entry.id !== productId));
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("cart_items").delete().eq("user_id", user.id).eq("product_id", productId);
    },
    [supabase],
  );

  const setQuantity = useCallback(
    async (productId: string, quantity: number) => {
      const next = Math.max(1, quantity);
      setItems((prev) => prev.map((entry) => (entry.id === productId ? { ...entry, quantity: next } : entry)));
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("cart_items").update({ quantity: next }).eq("user_id", user.id).eq("product_id", productId);
    },
    [supabase],
  );

  const clear = useCallback(async () => {
    setItems([]);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("cart_items").delete().eq("user_id", user.id);
  }, [supabase]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  const totalCount = useMemo(() => items.reduce((sum, entry) => sum + entry.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      loading,
      isLoggedIn,
      addItem,
      removeItem,
      setQuantity,
      clear,
      reload,
    }),
    [items, totalCount, totalPrice, loading, isLoggedIn, addItem, removeItem, setQuantity, clear, reload],
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
