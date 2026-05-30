import { createClient } from "@/src/lib/supabase/server";
import { CART_SELECT, toCartItem, type CartRow } from "@/src/features/cart/shared";
import type { CartItem } from "@/src/features/cart/types";

/** 현재 로그인 사용자의 장바구니 항목 (서버용). 미로그인 시 빈 배열. */
export async function getCartItems(): Promise<CartItem[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("cart_items")
    .select(CART_SELECT)
    .order("created_at", { ascending: true });

  const rows = (data as unknown as CartRow[] | null) ?? [];
  return rows.map(toCartItem).filter((item): item is CartItem => item !== null);
}
