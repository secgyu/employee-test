import type { ProductCategory } from "@/src/features/products/types";

/** 장바구니 담긴 상품 1건 */
export interface CartItem {
  id: string;
  name: string;
  category: ProductCategory;
  /** 단가(할인가 우선). 가격 미정 상품은 0 */
  unitPrice: number;
  quantity: number;
}
