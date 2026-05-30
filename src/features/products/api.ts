import { createClient } from "@/src/lib/supabase/server";
import { PRODUCT_SELECT, mapProductRow, type ProductRow } from "@/src/features/products/shared";
import type { Product } from "@/src/features/products/types";

/** 전체 상품 조회 (sort_order 순). 서버 컴포넌트용. */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("sort_order", { ascending: true });

  return ((data as ProductRow[] | null) ?? []).map(mapProductRow);
}

/** id로 상품 단건 조회. 없으면 null. 서버 컴포넌트용. */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  return data ? mapProductRow(data as ProductRow) : null;
}
