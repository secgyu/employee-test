import Link from "next/link";

import { formatKRW } from "@/src/features/products/format";
import { CATEGORY_LABEL, type Product } from "@/src/features/products/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, category, name, price, discountRate, salePrice } = product;

  return (
    <Link href={`/products/${id}`} className="group flex flex-col">
      <div className="flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[6px] border border-[#E9EAEC] bg-white transition-shadow group-hover:shadow-md">
        <span className="text-sm text-black/20">이미지 준비중</span>
      </div>

      <p className="mt-2.5 text-[16px] font-semibold leading-[1.6] text-muted">{CATEGORY_LABEL[category]}</p>

      <p className="text-[16px] font-semibold leading-[1.6] text-black transition-colors group-hover:text-brand">
        {name}
      </p>

      {price ? (
        <div className="mt-1">
          <p className="text-[14px] font-medium leading-normal text-[#B2B6BD] line-through">{formatKRW(price)}</p>
          <p className="flex items-center gap-1.5 text-[16px] font-semibold leading-[1.6]">
            {discountRate ? <span className="text-[#FA622F]">{discountRate}%</span> : null}
            {salePrice ? <span className="text-black">{formatKRW(salePrice)}</span> : null}
          </p>
        </div>
      ) : null}
    </Link>
  );
}
