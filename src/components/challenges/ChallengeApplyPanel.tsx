"use client";

import { useState } from "react";

import { ChallengeApplyButton } from "@/src/components/challenges/ChallengeApplyButton";
import type { ChallengeStatus } from "@/src/features/challenges/types";

export function ChallengeApplyPanel({
  status,
  baseParticipants,
}: {
  status: ChallengeStatus;
  baseParticipants: number;
}) {
  const [joined, setJoined] = useState(false);
  const participants = baseParticipants + (joined ? 1 : 0);

  return (
    <div className="rounded-xl border border-[#E9EAEC] p-6">
      <p className="text-[14px] text-ink">
        현재 <span className="font-semibold text-brand">{participants.toLocaleString()}명</span>이 참여하고 있어요.
      </p>
      <div className="mt-4 max-w-[320px]">
        <ChallengeApplyButton status={status} onJoinedChange={setJoined} />
      </div>
    </div>
  );
}
