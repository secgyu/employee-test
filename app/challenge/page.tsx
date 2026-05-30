import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "챌린지 | HIDDEN KICE",
};

export default function ChallengePage() {
  return <PagePlaceholder title="챌린지" />;
}
