"use server";

import { createClient } from "@/src/lib/supabase/server";
import {
  MIN_PASSWORD_LENGTH,
  isValidEmail,
  isValidPhone,
  normalizePhone,
} from "@/src/features/auth/validation";

export interface AuthResult {
  ok: boolean;
  /** 폼 상단에 표시할 에러/안내 메시지 */
  error?: string;
  /** 가입 후 이메일 확인이 필요한 경우의 안내 메시지 */
  message?: string;
}

/** Supabase 에러 메시지를 한국어로 변환 */
function toKoreanError(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "Email not confirmed": "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.",
    "User already registered": "이미 가입된 이메일입니다.",
  };
  return map[message] ?? message;
}

export async function signInAction(input: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const email = input.email.trim();
  if (!isValidEmail(email)) return { ok: false, error: "올바른 이메일을 입력해 주세요." };
  if (!input.password) return { ok: false, error: "비밀번호를 입력해 주세요." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: input.password });

  if (error) return { ok: false, error: toKoreanError(error.message) };
  return { ok: true };
}

export async function signUpAction(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<AuthResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = normalizePhone(input.phone);

  if (!name) return { ok: false, error: "이름을 입력해 주세요." };
  if (!isValidEmail(email)) return { ok: false, error: "올바른 이메일을 입력해 주세요." };
  if (!isValidPhone(phone)) return { ok: false, error: "올바른 전화번호를 입력해 주세요." };
  if (input.password.length < MIN_PASSWORD_LENGTH)
    return { ok: false, error: `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.` };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    options: { data: { name, phone } },
  });

  if (error) return { ok: false, error: toKoreanError(error.message) };

  // 이메일 인증이 켜져 있으면 세션이 없다(메일 확인 필요).
  if (!data.session) {
    return { ok: true, message: "가입 확인 메일을 보냈습니다. 메일함에서 인증 후 로그인해 주세요." };
  }

  return { ok: true };
}

export async function signOutAction(): Promise<AuthResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateProfileAction(input: {
  name: string;
  phone: string;
}): Promise<AuthResult> {
  const name = input.name.trim();
  const phone = normalizePhone(input.phone);

  if (!name) return { ok: false, error: "이름을 입력해 주세요." };
  if (!isValidPhone(phone)) return { ok: false, error: "올바른 전화번호를 입력해 주세요." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "로그인이 필요합니다." };

  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, name, phone }, { onConflict: "id" });

  if (error) return { ok: false, error: error.message };
  return { ok: true, message: "프로필이 저장되었습니다." };
}
