import type { Metadata } from "next";

import { NotificationList } from "@/src/components/notifications/NotificationList";

export const metadata: Metadata = {
  title: "알림 | HIDDEN KICE",
};

export default function NotificationsPage() {
  return <NotificationList />;
}
