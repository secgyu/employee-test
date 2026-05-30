"use client";

import Link from "next/link";
import { useState } from "react";

import { TextField } from "@/src/components/auth/TextField";
import { MIN_PASSWORD_LENGTH, isValidEmail } from "@/src/features/auth/validation";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

/** 회원가입 폼 (CSR). 유효성 검사 후 제출. 실제 가입은 Supabase 연동 시 처리. */
export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = "이름을 입력해 주세요.";
    if (!isValidEmail(email)) nextErrors.email = "올바른 이메일을 입력해 주세요.";
    if (password.length < MIN_PASSWORD_LENGTH)
      nextErrors.password = `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
    if (password !== passwordConfirm) nextErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setMessage("회원가입 기능은 Supabase 연동 후 제공됩니다. (데모)");
    }
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
          className="mt-2 h-12 rounded-md bg-brand text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          회원가입
        </button>
      </form>

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
