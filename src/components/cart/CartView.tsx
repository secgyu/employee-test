"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/src/features/cart/CartContext";
import { formatKRW } from "@/src/features/products/format";
import { CATEGORY_LABEL } from "@/src/features/products/types";

/** 장바구니 페이지 (CSR). 담긴 상품 목록 / 수량 조절 / 삭제 / 합계. */
export function CartView() {
  const { items, totalPrice, removeItem, setQuantity, clear, loading, isLoggedIn } = useCart();

  if (loading) {
    return (
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-[120px] text-center">
        <h1 className="text-[28px] font-semibold text-black">장바구니</h1>
        <p className="text-[15px] text-muted">불러오는 중...</p>
      </section>
    );
  }

  if (!isLoggedIn) {
    return (
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-[120px] text-center">
        <h1 className="text-[28px] font-semibold text-black">장바구니</h1>
        <p className="text-[15px] text-muted">장바구니는 로그인 후 이용할 수 있습니다.</p>
        <Link
          href="/login"
          className="mt-2 h-12 rounded-md bg-brand px-6 text-[15px] font-medium leading-[48px] text-brand-foreground transition-opacity hover:opacity-90"
        >
          로그인하기
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-[120px] text-center">
        <h1 className="text-[28px] font-semibold text-black">장바구니</h1>
        <p className="text-[15px] text-muted">장바구니가 비어 있습니다.</p>
        <Link
          href="/products"
          className="mt-2 h-12 rounded-md bg-brand px-6 text-[15px] font-medium leading-[48px] text-brand-foreground transition-opacity hover:opacity-90"
        >
          스토어로 이동
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-[50px]">
      <div className="mb-8 flex items-end justify-between">
        <h1 className="text-[28px] font-semibold text-black">장바구니</h1>
        <button type="button" onClick={clear} className="text-[14px] text-muted transition-colors hover:text-brand">
          전체 비우기
        </button>
      </div>

      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-5 border-t border-[#E9EAEC] py-5 last:border-b">
            {/* 썸네일 */}
            <div className="relative h-[88px] w-[70px] shrink-0 overflow-hidden rounded-[6px] border border-[#E9EAEC] bg-neutral-100">
              {item.imageUrl ? (
                <Image src={item.imageUrl} alt={item.name} fill sizes="70px" className="object-cover" />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[14px] text-muted">{CATEGORY_LABEL[item.category]}</p>
              <Link
                href={`/products/${item.id}`}
                className="line-clamp-1 text-[16px] font-semibold text-black transition-colors hover:text-brand"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-[15px] font-medium text-black">{formatKRW(item.unitPrice)}</p>
            </div>

            {/* 수량 */}
            <div className="flex items-center rounded-md border border-[#E9EAEC]">
              <button
                type="button"
                aria-label="수량 감소"
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                className="flex h-9 w-9 items-center justify-center text-lg text-ink transition-colors hover:text-brand"
              >
                −
              </button>
              <span className="w-10 text-center text-[15px] tabular-nums">{item.quantity}</span>
              <button
                type="button"
                aria-label="수량 증가"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                className="flex h-9 w-9 items-center justify-center text-lg text-ink transition-colors hover:text-brand"
              >
                +
              </button>
            </div>

            {/* 소계 */}
            <p className="w-28 shrink-0 text-right text-[16px] font-semibold text-black">
              {formatKRW(item.unitPrice * item.quantity)}
            </p>

            <button
              type="button"
              aria-label="삭제"
              onClick={() => removeItem(item.id)}
              className="shrink-0 text-[14px] text-muted transition-colors hover:text-red-500"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-end gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-[16px] text-ink">총 결제금액</span>
          <span className="text-[26px] font-semibold text-brand">{formatKRW(totalPrice)}</span>
        </div>
        <Link
          href="/checkout"
          className="flex h-12 w-full items-center justify-center rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 sm:w-[280px]"
        >
          주문하기
        </Link>
      </div>
    </section>
  );
}
