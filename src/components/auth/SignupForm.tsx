"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { TextField } from "@/src/components/auth/TextField";
import { signUpAction } from "@/src/features/auth/actions";
import { useCart } from "@/src/features/cart/CartContext";
import { useNotifications } from "@/src/features/notifications/NotificationContext";
import { MIN_PASSWORD_LENGTH, isValidEmail, isValidPhone } from "@/src/features/auth/validation";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  passwordConfirm?: string;
}

/** 회원가입 폼 (CSR). 클라이언트 검증 후 Supabase 서버 액션으로 가입한다. */
export function SignupForm() {
  const router = useRouter();
  const { reload } = useNotifications();
  const { reload: reloadCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
    if (!isValidEmail(email)) nextErrors.email = "올바른 이메일을 입력해 주세요.";
    if (!isValidPhone(phone)) nextErrors.phone = "올바른 전화번호를 입력해 주세요. (예: 010-1234-5678)";
    if (password.length < MIN_PASSWORD_LENGTH)
      nextErrors.password = `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
    if (password !== passwordConfirm) nextErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      const result = await signUpAction({ name, email, phone, password });
      if (!result.ok) {
        setFormError(result.error ?? "회원가입에 실패했습니다.");
        return;
      }
      if (result.message) {
        setMessage(result.message);
        return;
      }
      // 세션이 즉시 생성된 경우(이메일 인증 비활성) 홈으로 이동
      // 가입 환영 알림은 DB 트리거가 생성하므로 reload로 불러온다.
      reload();
      reloadCart();
      router.refresh();
      router.push("/");
    });
  }

  return (
    <section className="mx-auto flex w-full max-w-[420px] flex-col px-4 py-[80px]">
      <h1 className="text-[28px] font-semibold text-black">회원가입</h1>
      <p className="mt-2 text-[15px] text-muted">HIDDEN KICE 계정을 만들어 보세요.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
        <TextField
          id="name"
          label="이름"
          value={name}
          onChange={setName}
          placeholder="이름 입력"
          autoComplete="name"
          error={errors.name}
        />
        <TextField
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="example@hiddenkice.com"
          autoComplete="email"
          error={errors.email}
        />
        <TextField
          id="phone"
          label="전화번호"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="010-1234-5678 (배송 안내용)"
          autoComplete="tel"
          error={errors.phone}
        />
        <TextField
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder={`최소 ${MIN_PASSWORD_LENGTH}자 이상`}
          autoComplete="new-password"
          error={errors.password}
        />
        <TextField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          placeholder="비밀번호 재입력"
          autoComplete="new-password"
          error={errors.passwordConfirm}
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-12 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "처리 중..." : "회원가입"}
        </button>
      </form>

      {formError ? <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-[14px] text-red-500">{formError}</p> : null}
      {message ? <p className="mt-4 rounded-md bg-brand/5 px-4 py-3 text-[14px] text-brand">{message}</p> : null}

      <p className="mt-6 text-center text-[14px] text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-brand hover:underline">
          로그인
        </Link>
      </p>
    </section>
  );
}
