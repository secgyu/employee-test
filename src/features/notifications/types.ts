/** 알림 종류 */
export type NotificationType = "order" | "promo" | "system";

/** 종류 → 화면 표시 라벨 */
export const NOTIFICATION_TYPE_LABEL: Record<NotificationType, string> = {
  order: "주문",
  promo: "혜택",
  system: "안내",
};

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  /** 표시용 날짜 (YYYY-MM-DD) */
  createdAt: string;
  read: boolean;
}
