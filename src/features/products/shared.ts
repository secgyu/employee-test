import type { Product, ProductCategory } from "@/src/features/products/types";

/** Supabase products 행 (snake_case) */
export interface ProductRow {
  id: string;
  name: string;
  category: ProductCategory;
  price: number | null;
  discount_rate: number | null;
  sale_price: number | null;
  image_url: string | null;
  sort_order: number;
}

/** 조회 시 사용할 컬럼 목록 */
export const PRODUCT_SELECT = "id, name, category, price, discount_rate, sale_price, image_url, sort_order";

/** DB 행 → 앱 Product 모델 변환 (null → undefined) */
export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price ?? undefined,
    discountRate: row.discount_rate ?? undefined,
    salePrice: row.sale_price ?? undefined,
    imageUrl: row.image_url ?? undefined,
  };
}
