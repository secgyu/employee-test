"use client";

import { useNotifications } from "@/src/features/notifications/NotificationContext";
import { NOTIFICATION_TYPE_LABEL } from "@/src/features/notifications/types";

/** YYYY-MM-DD → YYYY.MM.DD (하이드레이션 안전한 결정적 포맷) */
function formatDate(value: string) {
  return value.replaceAll("-", ".");
}

/** 알림 페이지 (CSR). 목록 + 미읽음 표시 + 클릭 시 읽음 처리 + 모두 읽음. */
export function NotificationList() {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  return (
    <section className="mx-auto w-full max-w-[760px] px-4 py-[50px]">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-[28px] font-semibold text-black">알림</h1>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className="text-[14px] text-muted transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
        >
          모두 읽음
        </button>
      </div>

      <ul className="flex flex-col">
        {notifications.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => markRead(item.id)}
              className={
                "flex w-full items-start gap-3 border-t border-[#E9EAEC] px-2 py-5 text-left transition-colors last:border-b hover:bg-black/2 " +
                (item.read ? "" : "bg-brand/4")
              }
            >
              {/* 미읽음 점 */}
              <span
                aria-hidden="true"
                className={"mt-2 h-2 w-2 shrink-0 rounded-full " + (item.read ? "bg-transparent" : "bg-brand")}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 text-[12px] font-medium text-ink">
                    {NOTIFICATION_TYPE_LABEL[item.type]}
                  </span>
                  <span
                    className={
                      "truncate text-[16px] " + (item.read ? "font-medium text-ink" : "font-semibold text-black")
                    }
                  >
                    {item.title}
                  </span>
                </div>
                <p className="mt-1 text-[14px] leading-normal text-muted">{item.body}</p>
              </div>

              <span className="shrink-0 text-[13px] text-muted">{formatDate(item.createdAt)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
