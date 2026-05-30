"use server";

import { createClient } from "@/src/lib/supabase/server";
import { isValidPhone, normalizePhone } from "@/src/features/auth/validation";

export interface CreateOrderResult {
  ok: boolean;
  error?: string;
  orderId?: string;
}

/**
 * 장바구니를 주문으로 전환한다. (결제 PG 없이 주문 기록만 생성)
 * - 주문 헤더/상세 + 장바구니 비우기 + 알림을 DB 함수(create_order)에서
 *   단일 트랜잭션으로 처리해 부분 실패로 인한 정합성 문제를 방지한다.
 * - 금액은 함수 내부에서 DB 가격으로 재계산(클라이언트 값 신뢰 X).
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
  const { data, error } = await supabase.rpc("create_order", {
    p_recipient_name: recipientName,
    p_recipient_phone: recipientPhone,
  });

  if (error) {
    if (error.message.includes("AUTH_REQUIRED")) return { ok: false, error: "로그인이 필요합니다." };
    if (error.message.includes("CART_EMPTY")) return { ok: false, error: "장바구니가 비어 있습니다." };
    return { ok: false, error: error.message };
  }

  return { ok: true, orderId: data as string };
}
