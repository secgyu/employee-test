"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/src/features/cart/CartContext";
import { formatKRW } from "@/src/features/products/format";
import type { ProductCategory } from "@/src/features/products/types";

interface ProductPurchaseProps {
  id: string;
  name: string;
  category: ProductCategory;
  /** 단가(할인가 우선). 없으면 수량/합계 미표시 */
  unitPrice?: number;
}

/**
 * 상세 페이지의 구매 영역 (CSR).
 * 수량 조절 + 합계 계산 + 장바구니 담기/바로 구매(장바구니 이동).
 */
export function ProductPurchase({ id, name, category, unitPrice }: ProductPurchaseProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const total = unitPrice ? unitPrice * quantity : undefined;

  function handleAddToCart() {
    addItem({ id, name, category, unitPrice: unitPrice ?? 0 }, quantity);
    setMessage("장바구니에 담았습니다.");
  }

  function handleBuyNow() {
    addItem({ id, name, category, unitPrice: unitPrice ?? 0 }, quantity);
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-5">
      {unitPrice ? (
        <div className="flex items-center justify-between border-y border-[#E9EAEC] py-4">
          <span className="text-[15px] text-ink">수량</span>
          <div className="flex items-center rounded-md border border-[#E9EAEC]">
            <button
              type="button"
              aria-label="수량 감소"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="flex h-9 w-9 items-center justify-center text-lg text-ink transition-colors hover:text-brand"
            >
              −
            </button>
            <span className="w-10 text-center text-[15px] tabular-nums">{quantity}</span>
            <button
              type="button"
              aria-label="수량 증가"
              onClick={() => setQuantity((value) => value + 1)}
              className="flex h-9 w-9 items-center justify-center text-lg text-ink transition-colors hover:text-brand"
            >
              +
            </button>
          </div>
        </div>
      ) : null}

      {total !== undefined ? (
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] text-ink">총 상품금액</span>
          <span className="text-[22px] font-semibold text-brand">{formatKRW(total)}</span>
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-12 flex-1 rounded-md border border-brand text-[15px] font-medium text-brand transition-colors hover:bg-brand/5"
        >
          장바구니 담기
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="h-12 flex-1 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          바로 구매
        </button>
      </div>

      {message ? <p className="rounded-md bg-brand/5 px-4 py-3 text-[14px] text-brand">{message}</p> : null}
    </div>
  );
}
