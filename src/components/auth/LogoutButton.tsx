"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { signOutAction } from "@/src/features/auth/actions";
import { useNotifications } from "@/src/features/notifications/NotificationContext";

export function LogoutButton() {
  const router = useRouter();
  const { reload } = useNotifications();
  const [pending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await signOutAction();
      reload();
      router.refresh();
      router.push("/");
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className="h-12 rounded-md border border-[#E9EAEC] px-6 text-[15px] font-medium text-ink transition-colors hover:border-brand/40 disabled:opacity-50"
    >
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
