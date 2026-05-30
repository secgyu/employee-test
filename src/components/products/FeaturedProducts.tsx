import Link from "next/link";

import { ProductCard } from "@/src/components/products/ProductCard";
import { getProducts } from "@/src/features/products/api";

/** 홈에 노출할 최신 상품 개수 */
const FEATURED_COUNT = 8;

/**
 * 홈 "최신 상품" 섹션 (SSR).
 * 전체 상품 중 일부만 보여주고, 스토어 전체는 /products 로 연결한다.
 */
export async function FeaturedProducts() {
  const products = (await getProducts()).slice(0, FEATURED_COUNT);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-[50px]">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-[22px] font-semibold text-black">최신 상품</h2>
          <Link href="/products" className="text-[14px] font-medium text-muted transition-colors hover:text-brand">
            스토어 전체보기 →
          </Link>
        </div>

        <div className="grid grid-cols-[repeat(2,minmax(0,250px))] justify-between gap-y-9 sm:grid-cols-[repeat(3,250px)] lg:grid-cols-[repeat(4,250px)]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
