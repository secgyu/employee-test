"use server";

import { createClient } from "@/src/lib/supabase/server";
import { CART_SELECT, toCartItem, type CartRow } from "@/src/features/cart/shared";
import { isValidPhone, normalizePhone } from "@/src/features/auth/validation";
import { formatKRW } from "@/src/features/products/format";

export interface CreateOrderResult {
  ok: boolean;
  error?: string;
  orderId?: string;
}

/**
 * 장바구니를 주문으로 전환한다. (결제 PG 없이 주문 기록만 생성)
 * - 금액은 서버에서 DB 가격으로 다시 계산(클라이언트 값 신뢰 X)
 * - 주문 생성 후 장바구니 비우기 + 주문 알림 생성
 */
export async function createOrderAction(input: {
  recipientName: string;
  recipientPhone: string;
}): Promise<CreateOrderResult> {
  const recipientName = input.recipientName.trim();
  const recipientPhone = normalizePhone(input.recipientPhone);

  if (!recipientName) return { ok: false, error: "받는 분 이름을 입력해 주세요." };
  if (!isValidPhone(recipientPhone)) return { ok: false, error: "올바른 전화번호를 입력해 주세요." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  // 1) 서버에서 장바구니 재조회 (가격 신뢰성 확보)
  const { data: cartData } = await supabase.from("cart_items").select(CART_SELECT);
  const items = ((cartData as unknown as CartRow[] | null) ?? [])
    .map(toCartItem)
    .filter((item): item is NonNullable<ReturnType<typeof toCartItem>> => item !== null);

  if (items.length === 0) return { ok: false, error: "장바구니가 비어 있습니다." };

  const totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // 2) 주문 헤더 생성
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      total_amount: totalAmount,
      status: "paid",
    })
    .select("id")
    .single();

  if (orderError || !order) return { ok: false, error: orderError?.message ?? "주문 생성에 실패했습니다." };

  // 3) 주문 상세 생성 (가격/이름 스냅샷)
  const { error: itemsError } = await supabase.from("order_items").insert(
    items.map((item) => ({
      order_id: order.id,
      user_id: user.id,
      product_id: item.id,
      name: item.name,
      unit_price: item.unitPrice,
      quantity: item.quantity,
    })),
  );

  if (itemsError) return { ok: false, error: itemsError.message };

  // 4) 장바구니 비우기
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  // 5) 주문 알림 생성
  await supabase.from("notifications").insert({
    user_id: user.id,
    type: "order",
    title: "주문이 완료되었습니다",
    body: `총 ${formatKRW(totalAmount)} 주문이 정상 접수되었습니다.`,
  });

  return { ok: true, orderId: order.id };
}
