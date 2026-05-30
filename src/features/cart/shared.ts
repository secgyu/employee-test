import type { CartItem } from "@/src/features/cart/types";
import type { ProductCategory } from "@/src/features/products/types";

export const CART_SELECT =
  "quantity, product:products(id, name, category, price, sale_price, image_url)";

export interface CartRow {
  quantity: number;
  product: {
    id: string;
    name: string;
    category: ProductCategory;
    price: number | null;
    sale_price: number | null;
    image_url: string | null;
  } | null;
}

/** cart_items 조인 행 → CartItem (상품 삭제된 경우 null) */
export function toCartItem(row: CartRow): CartItem | null {
  if (!row.product) return null;
  return {
    id: row.product.id,
    name: row.product.name,
    category: row.product.category,
    unitPrice: row.product.sale_price ?? row.product.price ?? 0,
    quantity: row.quantity,
    imageUrl: row.product.image_url ?? undefined,
  };
}
