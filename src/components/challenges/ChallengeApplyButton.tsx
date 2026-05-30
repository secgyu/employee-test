"use client";

import { useState } from "react";

import type { ChallengeStatus } from "@/src/features/challenges/types";

export function ChallengeApplyButton({
  status,
  onJoinedChange,
}: {
  status: ChallengeStatus;
  onJoinedChange?: (joined: boolean) => void;
}) {
  const [joined, setJoined] = useState(false);

  function setJoinedAndNotify(next: boolean) {
    setJoined(next);
    onJoinedChange?.(next);
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
      onClick={() => setJoinedAndNotify(false)}
      className="h-11 w-full rounded-md border border-brand/40 text-[14px] font-medium text-brand transition-colors hover:bg-brand/5"
    >
      신청 완료 · 신청 취소
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setJoinedAndNotify(true)}
      className="h-11 w-full rounded-md bg-brand text-[14px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
    >
      신청하기
    </button>
  );
}
