"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { toggleApplicationAction } from "@/src/features/challenges/actions";
import { useNotifications } from "@/src/features/notifications/NotificationContext";
import type { ChallengeStatus } from "@/src/features/challenges/types";

export function ChallengeApplyButton({
  challengeId,
  status,
  initialJoined,
  onJoinedChange,
}: {
  challengeId: string;
  status: ChallengeStatus;
  initialJoined: boolean;
  onJoinedChange?: (joined: boolean) => void;
}) {
  const router = useRouter();
  const { reload } = useNotifications();
  const [joined, setJoined] = useState(initialJoined);
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      const result = await toggleApplicationAction(challengeId);
      if (result.needLogin) {
        router.push("/login");
        return;
      }
      if (!result.ok) return;

      const next = Boolean(result.joined);
      setJoined(next);
      onJoinedChange?.(next);
      if (next) reload();
    });
  }

  if (status !== "recruiting") {
    return (
      <button
        type="button"
        disabled
        className="h-11 w-full cursor-not-allowed rounded-md border border-[#E9EAEC] text-[14px] font-medium text-muted"
      >
        {status === "ongoing" ? "모집 마감" : "종료된 챌린지"}
      </button>
    );
  }

  return joined ? (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="h-11 w-full rounded-md border border-brand/40 text-[14px] font-medium text-brand transition-colors hover:bg-brand/5 disabled:opacity-50"
    >
      {pending ? "처리 중..." : "신청 완료 · 신청 취소"}
    </button>
  ) : (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="h-11 w-full rounded-md bg-brand text-[14px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "처리 중..." : "신청하기"}
    </button>
  );
}
