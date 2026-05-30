import { HeroCarousel } from "@/src/components/home/HeroCarousel";
import { FeaturedProducts } from "@/src/components/products/FeaturedProducts";

/** 홈 (SSR). 히어로 배너 + 최신 상품. 전체 스토어는 /products. */
export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <FeaturedProducts />
    </div>
  );
}
