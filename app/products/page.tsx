import type { Metadata } from "next";

import { ProductList } from "@/src/components/products/ProductList";

export const metadata: Metadata = {
  title: "스토어 | HIDDEN KICE",
};

/** 스토어 페이지. 전체 상품 목록은 CSR(ProductList)로 검색/필터링한다. */
export default function ProductsPage() {
  return <ProductList />;
}
