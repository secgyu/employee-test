"use client";

import Link from "next/link";

import { CartIcon } from "@/src/components/icons";
import { useCart } from "@/src/features/cart/CartContext";

/** 헤더 장바구니 링크. 담긴 수량을 브랜드 컬러 뱃지로 표시한다. */
export function CartLink() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="장바구니"
      className="relative flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
    >
      <CartIcon className="h-6 w-6" />
      {totalCount > 0 ? (
        <span className="absolute -top-1.5 left-3.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-normal leading-none text-brand-foreground">
          {totalCount}
        </span>
      ) : null}
    </Link>
  );
}
