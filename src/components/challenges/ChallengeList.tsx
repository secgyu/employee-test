"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ChallengeApplyButton } from "@/src/components/challenges/ChallengeApplyButton";
import { CHALLENGE_STATUS_LABEL, type ChallengeStatus, type ChallengeWithState } from "@/src/features/challenges/types";

type Filter = "all" | ChallengeStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "ongoing", label: "진행중" },
  { key: "recruiting", label: "모집중" },
  { key: "closed", label: "종료" },
];

const STATUS_TONE: Record<ChallengeStatus, string> = {
  ongoing: "bg-brand/10 text-brand",
  recruiting: "bg-emerald-50 text-emerald-600",
  closed: "bg-black/5 text-muted",
};

function ChallengeCard({ challenge }: { challenge: ChallengeWithState }) {
  const [participants, setParticipants] = useState(challenge.participants);

  const progress =
    challenge.totalRounds === 0 ? 0 : Math.round((challenge.completedRounds / challenge.totalRounds) * 100);

  function handleJoinedChange(joined: boolean) {
    setParticipants((prev) => prev + (joined ? 1 : -1));
  }

  return (
    <div className="flex flex-col rounded-xl border border-[#E9EAEC] bg-white p-6">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${STATUS_TONE[challenge.status]}`}>
          {CHALLENGE_STATUS_LABEL[challenge.status]}
        </span>
        <span className="text-[13px] text-muted">참여 {participants.toLocaleString()}명</span>
      </div>

      <h3 className="mt-4 text-[18px] font-semibold text-black">
        <Link href={`/challenge/${challenge.id}`} className="hover:text-brand">
          {challenge.title}
        </Link>
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">{challenge.description}</p>

      <dl className="mt-4 space-y-1 text-[13px]">
        <div className="flex gap-2">
          <dt className="w-12 shrink-0 text-muted">기간</dt>
          <dd className="text-ink">{challenge.period}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-12 shrink-0 text-muted">보상</dt>
          <dd className="text-ink">{challenge.reward}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-muted">
            {challenge.completedRounds}/{challenge.totalRounds}회차
          </span>
          <span className="font-medium text-brand">{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5">
          <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <ChallengeApplyButton
          challengeId={challenge.id}
          status={challenge.status}
          initialJoined={challenge.joined}
          onJoinedChange={handleJoinedChange}
        />
        <Link
          href={`/challenge/${challenge.id}`}
          className="text-center text-[14px] font-medium text-brand hover:underline"
        >
          커리큘럼 자세히 보기
        </Link>
      </div>
    </div>
  );
}

export function ChallengeList({ challenges }: { challenges: ChallengeWithState[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? challenges : challenges.filter((c) => c.status === filter)),
    [filter, challenges],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`h-10 rounded-full border px-5 text-[14px] font-medium transition-colors ${
              filter === item.key
                ? "border-brand bg-brand text-brand-foreground"
                : "border-[#E9EAEC] text-muted hover:border-brand/40"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-[15px] text-muted">해당하는 챌린지가 없습니다.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}
