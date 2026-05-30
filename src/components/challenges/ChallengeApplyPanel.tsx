"use client";

import { useState } from "react";

import { ChallengeApplyButton } from "@/src/components/challenges/ChallengeApplyButton";
import type { ChallengeStatus } from "@/src/features/challenges/types";

export function ChallengeApplyPanel({
  challengeId,
  status,
  initialJoined,
  baseParticipants,
}: {
  challengeId: string;
  status: ChallengeStatus;
  initialJoined: boolean;
  baseParticipants: number;
}) {
  const [participants, setParticipants] = useState(baseParticipants);

  function handleJoinedChange(joined: boolean) {
    setParticipants((prev) => prev + (joined ? 1 : -1));
  }

  return (
    <div className="rounded-xl border border-[#E9EAEC] p-6">
      <p className="text-[14px] text-ink">
        현재 <span className="font-semibold text-brand">{participants.toLocaleString()}명</span>이 참여하고 있어요.
      </p>
      <div className="mt-4 max-w-[320px]">
        <ChallengeApplyButton
          challengeId={challengeId}
          status={status}
          initialJoined={initialJoined}
          onJoinedChange={handleJoinedChange}
        />
      </div>
    </div>
  );
}
