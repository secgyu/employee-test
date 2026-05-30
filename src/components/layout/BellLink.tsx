"use client";

import Link from "next/link";

import { BellIcon } from "@/src/components/icons";
import { useNotifications } from "@/src/features/notifications/NotificationContext";

/** 헤더 알림 링크. 미읽음 개수를 브랜드 컬러 뱃지로 표시한다. */
export function BellLink() {
  const { unreadCount } = useNotifications();

  return (
    <Link
      href="/notifications"
      aria-label="알림"
      className="relative flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
    >
      <BellIcon className="h-6 w-6" />
      {unreadCount > 0 ? (
        <span className="absolute -top-1.5 left-3.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-normal leading-none text-brand-foreground">
          {unreadCount}
        </span>
      ) : null}
    </Link>
  );
}
