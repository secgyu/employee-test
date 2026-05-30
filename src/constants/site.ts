export const SITE = {
  name: "employee-test",
  brand: "HIDDEN KICE",
  title: "HIDDEN KICE | 스토어",
  description: "Next.js + Supabase 로 구현한 상품 스토어",
} as const;

export const NAV_ITEMS = [
  { label: "스토어", href: "/products" },
  { label: "AI OMR WORK", href: "/ai-omr-work" },
  { label: "챌린지", href: "/challenge" },
  { label: "히든카이스 소개", href: "/about" },
] as const;
