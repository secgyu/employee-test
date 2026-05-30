"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { NOTIFICATIONS } from "@/src/features/notifications/mock";
import type { AppNotification } from "@/src/features/notifications/types";

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);
const STORAGE_KEY = "hk-read-notifications";

/**
 * 알림 전역 상태 (CSR).
 * 읽은 알림 id를 localStorage에 보존한다. 목록 자체는 목업(추후 Supabase)으로부터 파생.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [readIds, setReadIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReadIds(JSON.parse(raw) as string[]);
    } catch {
      // 손상된 데이터는 무시
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds, loaded]);

  const notifications = useMemo<AppNotification[]>(
    () => NOTIFICATIONS.map((item) => ({ ...item, read: readIds.includes(item.id) })),
    [readIds],
  );

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds(NOTIFICATIONS.map((item) => item.id));
  }, []);

  const value = useMemo(
    () => ({ notifications, unreadCount, markRead, markAllRead }),
    [notifications, unreadCount, markRead, markAllRead],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications는 NotificationProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
