import type { NotificationSeed } from "@/src/features/notifications/types";

/**
 * 알림 목업 데이터.
 * 추후 Supabase 연동 시 이 배열을 API 응답으로 대체한다.
 */
export const NOTIFICATIONS: NotificationSeed[] = [
  {
    id: "n01",
    type: "promo",
    title: "2026 시즌 패스 5% 할인",
    body: "기간 한정으로 시즌 패스 전 상품을 할인된 가격에 만나보세요.",
    createdAt: "2026-05-30",
  },
  {
    id: "n02",
    type: "order",
    title: "주문이 접수되었습니다",
    body: "2026 Hidden Kice 시즌1 주문이 정상 접수되었습니다.",
    createdAt: "2026-05-29",
  },
  {
    id: "n03",
    type: "system",
    title: "개인정보처리방침 개정 안내",
    body: "2026년 6월 1일부터 적용되는 개정 내용을 확인해 주세요.",
    createdAt: "2026-05-27",
  },
  {
    id: "n04",
    type: "promo",
    title: "신규 챌린지 오픈",
    body: "새로운 챌린지에 참여하고 합격까지 함께 달려보세요.",
    createdAt: "2026-05-25",
  },
];
