"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { TextField } from "@/src/components/auth/TextField";
import { signInAction } from "@/src/features/auth/actions";
import { useNotifications } from "@/src/features/notifications/NotificationContext";
import { isValidEmail } from "@/src/features/auth/validation";

interface FieldErrors {
  email?: string;
  password?: string;
}

/** 로그인 폼 (CSR). 클라이언트 검증 후 Supabase 서버 액션으로 인증한다. */
export function LoginForm() {
  const router = useRouter();
  const { reload } = useNotifications();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    const nextErrors: FieldErrors = {};
    if (!isValidEmail(email)) nextErrors.email = "올바른 이메일을 입력해 주세요.";
    if (!password) nextErrors.password = "비밀번호를 입력해 주세요.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    startTransition(async () => {
      const result = await signInAction({ email, password });
      if (result.ok) {
        reload();
        router.refresh();
        router.push("/");
      } else {
        setFormError(result.error ?? "로그인에 실패했습니다.");
      }
    });
  }

  return (
    <section className="mx-auto flex w-full max-w-[420px] flex-col px-4 py-[80px]">
      <h1 className="text-[28px] font-semibold text-black">로그인</h1>
      <p className="mt-2 text-[15px] text-muted">HIDDEN KICE 계정으로 로그인하세요.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
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
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="비밀번호 입력"
          autoComplete="current-password"
          error={errors.password}
        />

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-12 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {formError ? <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-[14px] text-red-500">{formError}</p> : null}

      <p className="mt-6 text-center text-[14px] text-muted">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="font-medium text-brand hover:underline">
          회원가입
        </Link>
      </p>
    </section>
  );
}
