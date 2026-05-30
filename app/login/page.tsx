import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "로그인 | HIDDEN KICE",
};

export default function LoginPage() {
  return <PagePlaceholder title="로그인" />;
}
