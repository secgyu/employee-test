import type { Metadata } from "next";

import { CartView } from "@/src/components/cart/CartView";

export const metadata: Metadata = {
  title: "장바구니 | HIDDEN KICE",
};

export default function CartPage() {
  return <CartView />;
}
