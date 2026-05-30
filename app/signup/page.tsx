import type { Metadata } from "next";

import { SignupForm } from "@/src/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "회원가입 | HIDDEN KICE",
};

export default function SignupPage() {
  return <SignupForm />;
}
