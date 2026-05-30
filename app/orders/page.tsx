import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getProfile } from "@/src/features/auth/profile";
import { getOrders } from "@/src/features/orders/api";
import { ORDER_STATUS_LABEL } from "@/src/features/orders/types";
import { formatKRW } from "@/src/features/products/format";

export const metadata: Metadata = {
  title: "주문 내역 | HIDDEN KICE",
};

function formatDate(value: string) {
  return value.slice(0, 10).replaceAll("-", ".");
}

export default async function OrdersPage() {
  const profile = await getProfile();
  if (!profile) redirect("/login");

  const orders = await getOrders();

  if (orders.length === 0) {
    return (
      <section className="mx-auto flex w-full max-w-[760px] flex-col items-center gap-4 px-4 py-[120px] text-center">
        <h1 className="text-[28px] font-semibold text-black">주문 내역</h1>
        <p className="text-[15px] text-muted">아직 주문 내역이 없습니다.</p>
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
    <section className="mx-auto w-full max-w-[760px] px-4 py-[50px]">
      <h1 className="mb-8 text-[28px] font-semibold text-black">주문 내역</h1>

      <ul className="flex flex-col gap-6">
        {orders.map((order) => (
          <li key={order.id} className="rounded-2xl border border-[#E9EAEC] p-6">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-muted">{formatDate(order.createdAt)}</span>
              <span className="rounded-full bg-brand/5 px-3 py-1 text-[13px] font-medium text-brand">
                {ORDER_STATUS_LABEL[order.status]}
              </span>
            </div>

            <ul className="mt-4 flex flex-col divide-y divide-[#F1F2F4]">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3">
                  <span className="min-w-0 flex-1 truncate text-[15px] text-ink">
                    {item.name} <span className="text-muted">× {item.quantity}</span>
                  </span>
                  <span className="ml-4 shrink-0 text-[15px] text-black">
                    {formatKRW(item.unitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-[#E9EAEC] pt-4">
              <span className="text-[14px] text-muted">
                받는 분 {order.recipientName} · {order.recipientPhone}
              </span>
              <span className="text-[18px] font-semibold text-black">{formatKRW(order.totalAmount)}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
