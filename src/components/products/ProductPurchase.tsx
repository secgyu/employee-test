"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/src/features/cart/CartContext";
import { formatKRW } from "@/src/features/products/format";

interface ProductPurchaseProps {
  id: string;
  /** 단가(할인가 우선). 없으면 수량/합계 미표시 */
  unitPrice?: number;
}

/**
 * 상세 페이지의 구매 영역 (CSR).
 * 수량 조절 + 합계 계산 + 장바구니 담기/바로 구매(장바구니 이동).
 */
export function ProductPurchase({ id, unitPrice }: ProductPurchaseProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const total = unitPrice ? unitPrice * quantity : undefined;

  async function handleAddToCart() {
    setMessage("");
    setPending(true);
    const result = await addItem(id, quantity);
    setPending(false);
    if (result.needLogin) {
      router.push("/login");
      return;
    }
    setMessage("장바구니에 담았습니다.");
  }

  async function handleBuyNow() {
    setMessage("");
    setPending(true);
    const result = await addItem(id, quantity);
    setPending(false);
    if (result.needLogin) {
      router.push("/login");
      return;
    }
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
          disabled={pending}
          className="h-12 flex-1 rounded-md border border-brand text-[15px] font-medium text-brand transition-colors hover:bg-brand/5 disabled:opacity-50"
        >
          장바구니 담기
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={pending}
          className="h-12 flex-1 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          바로 구매
        </button>
      </div>

      {message ? <p className="rounded-md bg-brand/5 px-4 py-3 text-[14px] text-brand">{message}</p> : null}
    </div>
  );
}
