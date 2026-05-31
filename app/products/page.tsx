import type { Metadata } from "next";

import { HeroCarousel } from "@/src/components/home/HeroCarousel";
import { ProductList } from "@/src/components/products/ProductList";

export const metadata: Metadata = {
  title: "스토어 | HIDDEN KICE",
};

/** 스토어 페이지. 히어로 배너 + 전체 상품 목록(CSR ProductList)으로 검색/필터링한다. */
export default function ProductsPage() {
  return (
    <div>
      <HeroCarousel />
      <ProductList />
    </div>
  );
}
