import type { Metadata } from "next";

import { LoginForm } from "@/src/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "로그인 | HIDDEN KICE",
};

export default function LoginPage() {
  return <LoginForm />;
}
