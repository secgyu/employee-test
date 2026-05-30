import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CheckoutForm } from "@/src/components/checkout/CheckoutForm";
import { getCartItems } from "@/src/features/cart/api";
import { getProfile } from "@/src/features/auth/profile";
import { formatKRW } from "@/src/features/products/format";
import { formatPhone } from "@/src/features/auth/validation";

export const metadata: Metadata = {
  title: "주문하기 | HIDDEN KICE",
};

export default async function CheckoutPage() {
  const [items, profile] = await Promise.all([getCartItems(), getProfile()]);

  if (!profile) redirect("/login");
  if (items.length === 0) redirect("/cart");

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <section className="mx-auto w-full max-w-[760px] px-4 py-[50px]">
      <h1 className="mb-8 text-[28px] font-semibold text-black">주문하기</h1>

      <div className="rounded-2xl border border-[#E9EAEC] p-6">
        <h2 className="text-[18px] font-semibold text-black">주문 상품</h2>
        <ul className="mt-4 flex flex-col divide-y divide-[#F1F2F4]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3">
              <span className="min-w-0 flex-1 truncate text-[15px] text-ink">
                {item.name} <span className="text-muted">× {item.quantity}</span>
              </span>
              <span className="ml-4 shrink-0 text-[15px] font-medium text-black">
                {formatKRW(item.unitPrice * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-[#E9EAEC] pt-4">
          <span className="text-[16px] text-ink">총 결제금액</span>
          <span className="text-[24px] font-semibold text-brand">{formatKRW(total)}</span>
        </div>
      </div>

      <div className="mt-8">
        <CheckoutForm defaultName={profile.name ?? ""} defaultPhone={profile.phone ? formatPhone(profile.phone) : ""} />
      </div>
    </section>
  );
}
