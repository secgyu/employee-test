"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { TextField } from "@/src/components/auth/TextField";
import { createOrderAction } from "@/src/features/orders/actions";
import { useCart } from "@/src/features/cart/CartContext";
import { useNotifications } from "@/src/features/notifications/NotificationContext";
import { isValidPhone } from "@/src/features/auth/validation";

interface FieldErrors {
  name?: string;
  phone?: string;
}

export function CheckoutForm({ defaultName, defaultPhone }: { defaultName: string; defaultPhone: string }) {
  const router = useRouter();
  const { reload: reloadCart } = useCart();
  const { reload: reloadNoti } = useNotifications();
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(defaultPhone);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "받는 분 이름을 입력해 주세요.";
    if (!isValidPhone(phone)) nextErrors.phone = "올바른 전화번호를 입력해 주세요. (예: 010-1234-5678)";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      const result = await createOrderAction({ recipientName: name, recipientPhone: phone });
      if (!result.ok) {
        setFormError(result.error ?? "주문에 실패했습니다.");
        return;
      }
      reloadCart();
      reloadNoti();
      router.refresh();
      router.push("/orders");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <h2 className="text-[18px] font-semibold text-black">배송 정보</h2>
      <TextField
        id="recipient-name"
        label="받는 분"
        value={name}
        onChange={setName}
        placeholder="이름 입력"
        autoComplete="name"
        error={errors.name}
      />
      <TextField
        id="recipient-phone"
        label="연락처"
        type="tel"
        value={phone}
        onChange={setPhone}
        placeholder="010-1234-5678"
        autoComplete="tel"
        error={errors.phone}
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-12 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "주문 처리 중..." : "주문 완료하기"}
      </button>

      {formError ? <p className="rounded-md bg-red-50 px-4 py-3 text-[14px] text-red-500">{formError}</p> : null}
      <p className="text-[13px] text-muted">* 결제(PG) 연동 없이 주문 기록만 생성되는 데모입니다.</p>
    </form>
  );
}
