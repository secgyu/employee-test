import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "히든카이스 소개 | HIDDEN KICE",
};

export default function AboutPage() {
  return <PagePlaceholder title="히든카이스 소개" />;
}
