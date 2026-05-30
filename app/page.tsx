import { HeroCarousel } from "@/src/components/home/HeroCarousel";
import { ProductList } from "@/src/components/products/ProductList";

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <ProductList />
    </div>
  );
}
