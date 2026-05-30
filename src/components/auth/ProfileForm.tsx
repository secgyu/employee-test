"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { TextField } from "@/src/components/auth/TextField";
import { updateProfileAction } from "@/src/features/auth/actions";
import { formatPhone, isValidPhone } from "@/src/features/auth/validation";

interface FieldErrors {
  name?: string;
  phone?: string;
}

export function ProfileForm({ initialName, initialPhone }: { initialName: string; initialPhone: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone ? formatPhone(initialPhone) : "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    setMessage("");

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "이름을 입력해 주세요.";
    if (!isValidPhone(phone)) nextErrors.phone = "올바른 전화번호를 입력해 주세요. (예: 010-1234-5678)";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      const result = await updateProfileAction({ name, phone });
      if (!result.ok) {
        setFormError(result.error ?? "저장에 실패했습니다.");
        return;
      }
      setMessage(result.message ?? "저장되었습니다.");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <TextField
        id="profile-name"
        label="이름"
        value={name}
        onChange={setName}
        placeholder="이름 입력"
        autoComplete="name"
        error={errors.name}
      />
      <TextField
        id="profile-phone"
        label="전화번호"
        type="tel"
        value={phone}
        onChange={setPhone}
        placeholder="010-1234-5678 (배송 안내용)"
        autoComplete="tel"
        error={errors.phone}
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-12 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "저장 중..." : "변경사항 저장"}
      </button>

      {formError ? <p className="rounded-md bg-red-50 px-4 py-3 text-[14px] text-red-500">{formError}</p> : null}
      {message ? <p className="rounded-md bg-brand/5 px-4 py-3 text-[14px] text-brand">{message}</p> : null}
    </form>
  );
}
