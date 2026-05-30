import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "장바구니 | HIDDEN KICE",
};

export default function CartPage() {
  return <PagePlaceholder title="장바구니" description="담은 상품이 여기에 표시됩니다." />;
}
