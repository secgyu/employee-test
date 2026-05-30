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

export const FOOTER_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
] as const;

export const COMPANY = {
  name: "(주)히든카이스",
  ceo: "안영호",
  registrationNumber: "735-87-02522",
  registrationCheckUrl:
    "https://www.ftc.go.kr/bizCommPop.do?wrkr_no=7358702522",
  address: "경기도 고양시 일산서구 일현로 97-11, 56F",
  mailOrderNumber: "제 2024-고양일산서-1209",
  email: "Hidden_kice@naver.com",
  copyrightYear: 2026,
} as const;
