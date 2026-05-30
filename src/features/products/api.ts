import { PRODUCTS } from "@/src/features/products/mock";
import type { Product } from "@/src/features/products/types";

/** id로 상품 단건 조회. 없으면 undefined. (추후 Supabase 쿼리로 교체) */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/** 전체 상품 id 목록. 정적 경로 생성(generateStaticParams)에 사용. */
export function getAllProductIds(): string[] {
  return PRODUCTS.map((product) => product.id);
}
