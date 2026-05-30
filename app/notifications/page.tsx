import type { Metadata } from "next";

import { PagePlaceholder } from "@/src/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "알림 | HIDDEN KICE",
};

export default function NotificationsPage() {
  return <PagePlaceholder title="알림" description="새로운 알림이 여기에 표시됩니다." />;
}
