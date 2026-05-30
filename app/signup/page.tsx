import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "회원가입 | HIDDEN KICE",
};

export default function SignupPage() {
  return <PagePlaceholder title="회원가입" />;
}
