"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { NOTIFICATIONS } from "@/src/features/notifications/mock";
import type { AppNotification, NotificationSeed, NotificationType } from "@/src/features/notifications/types";

interface NewNotificationInput {
  type: NotificationType;
  title: string;
  body: string;
}

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  addNotification: (input: NewNotificationInput) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);
const STORAGE_KEY = "hk-read-notifications";
const ADDED_KEY = "hk-added-notifications";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * 알림 전역 상태 (CSR).
 * 읽은 알림 id와 동적으로 추가된 알림을 localStorage에 보존한다.
 * 기본 목록은 목업(추후 Supabase)으로부터 파생.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [readIds, setReadIds] = useState<string[]>([]);
  const [added, setAdded] = useState<NotificationSeed[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawRead = localStorage.getItem(STORAGE_KEY);
      if (rawRead) setReadIds(JSON.parse(rawRead) as string[]);
      const rawAdded = localStorage.getItem(ADDED_KEY);
      if (rawAdded) setAdded(JSON.parse(rawAdded) as NotificationSeed[]);
    } catch {
      // 손상된 데이터는 무시
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(ADDED_KEY, JSON.stringify(added));
  }, [added, loaded]);

  const notifications = useMemo<AppNotification[]>(
    () => [...added, ...NOTIFICATIONS].map((item) => ({ ...item, read: readIds.includes(item.id) })),
    [added, readIds],
  );

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds(notifications.map((item) => item.id));
  }, [notifications]);

  const addNotification = useCallback((input: NewNotificationInput) => {
    const seed: NotificationSeed = {
      id: `local-${Date.now()}`,
      type: input.type,
      title: input.title,
      body: input.body,
      createdAt: todayString(),
    };
    setAdded((prev) => [seed, ...prev]);
  }, []);

  const value = useMemo(
    () => ({ notifications, unreadCount, markRead, markAllRead, addNotification }),
    [notifications, unreadCount, markRead, markAllRead, addNotification],
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
