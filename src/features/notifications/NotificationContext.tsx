"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/src/lib/supabase/client";
import type { AppNotification, NotificationType } from "@/src/features/notifications/types";

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
  addNotification: (input: NewNotificationInput) => Promise<void>;
  reload: () => void;
}

interface NotificationRow {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

const SELECT = "id, type, title, body, read, created_at";

function toNotification(row: NotificationRow): AppNotification {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    createdAt: row.created_at.slice(0, 10),
    read: row.read,
  };
}

/**
 * 알림 전역 상태 (CSR, Supabase DB 기반).
 * 로그인한 사용자의 notifications 테이블을 조회/추가/읽음 처리한다.
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const supabaseRef = useRef(createClient());
  const supabase = supabaseRef.current;
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const load = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setNotifications([]);
      return;
    }

    const { data } = await supabase.from("notifications").select(SELECT).order("created_at", { ascending: false });

    setNotifications(((data as NotificationRow[] | null) ?? []).map(toNotification));
  }, [supabase]);

  useEffect(() => {
    void load();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void load();
    });
    return () => subscription.unsubscribe();
  }, [load, supabase]);

  const addNotification = useCallback(
    async (input: NewNotificationInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("notifications")
        .insert({ user_id: user.id, type: input.type, title: input.title, body: input.body })
        .select(SELECT)
        .single();

      if (data) setNotifications((prev) => [toNotification(data as NotificationRow), ...prev]);
    },
    [supabase],
  );

  const markRead = useCallback(
    async (id: string) => {
      setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id);
      if (error) {
        console.error("알림 읽음 처리 실패:", error.message);
        void load();
      }
    },
    [supabase, load],
  );

  const markAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    const { error } = await supabase.from("notifications").update({ read: true }).eq("read", false);
    if (error) {
      console.error("알림 모두 읽음 처리 실패:", error.message);
      void load();
    }
  }, [supabase, load]);

  const reload = useCallback(() => {
    void load();
  }, [load]);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  const value = useMemo(
    () => ({ notifications, unreadCount, markRead, markAllRead, addNotification, reload }),
    [notifications, unreadCount, markRead, markAllRead, addNotification, reload],
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
