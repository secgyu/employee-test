import { redirect } from "next/navigation";

/** 루트 진입 시 스토어(/products)로 이동시킨다. */
export default function HomePage() {
  redirect("/products");
}
