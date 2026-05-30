import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChallengeApplyPanel } from "@/src/components/challenges/ChallengeApplyPanel";
import { getAllChallengeIds, getChallengeById, getChallengeCurriculum } from "@/src/features/challenges/mock";
import { CHALLENGE_STATUS_LABEL, type ChallengeStatus } from "@/src/features/challenges/types";

const STATUS_TONE: Record<ChallengeStatus, string> = {
  ongoing: "bg-brand/10 text-brand",
  recruiting: "bg-emerald-50 text-emerald-600",
  closed: "bg-black/5 text-muted",
};

export function generateStaticParams() {
  return getAllChallengeIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const challenge = getChallengeById(id);
  if (!challenge) return { title: "챌린지 | HIDDEN KICE" };
  return {
    title: `${challenge.title} | HIDDEN KICE`,
    description: challenge.description,
  };
}

export default async function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challenge = getChallengeById(id);
  if (!challenge) notFound();

  const curriculum = getChallengeCurriculum(challenge);
  const progress =
    challenge.totalRounds === 0 ? 0 : Math.round((challenge.completedRounds / challenge.totalRounds) * 100);

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-[60px]">
      <Link href="/challenge" className="text-[14px] text-muted hover:text-brand">
        ← 챌린지 목록
      </Link>

      {/* 헤더 */}
      <div className="mt-6">
        <span className={`rounded-full px-3 py-1 text-[12px] font-medium ${STATUS_TONE[challenge.status]}`}>
          {CHALLENGE_STATUS_LABEL[challenge.status]}
        </span>
        <h1 className="mt-4 text-[30px] font-semibold leading-snug text-black">{challenge.title}</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink">{challenge.description}</p>
      </div>

      {/* 요약 */}
      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["기간", challenge.period],
          ["회차", `총 ${challenge.totalRounds}회차`],
          ["보상", challenge.reward],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[#E9EAEC] p-4">
            <dt className="text-[13px] text-muted">{label}</dt>
            <dd className="mt-1 text-[14px] font-medium text-black">{value}</dd>
          </div>
        ))}
      </dl>

      {/* 진행률 */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-muted">
            진행률 · {challenge.completedRounds}/{challenge.totalRounds}회차
          </span>
          <span className="font-medium text-brand">{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/5">
          <div className="h-full rounded-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* 커리큘럼 */}
      <section className="mt-12">
        <h2 className="text-[22px] font-semibold text-black">커리큘럼</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          시즌별로 구성된 시험지를 순서대로 풀며 실전 감각을 단계적으로 끌어올립니다.
        </p>

        <ol className="mt-6 space-y-4">
          {curriculum.map((season, index) => (
            <li key={season.id} className="flex gap-4 rounded-xl border border-[#E9EAEC] p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[15px] font-semibold text-brand">
                {index + 1}
              </div>
              <div>
                <p className="text-[13px] font-medium text-brand">{season.label}</p>
                <h3 className="mt-1 text-[17px] font-semibold text-black">{season.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{season.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 신청 */}
      <div className="mt-12">
        <ChallengeApplyPanel
          status={challenge.status}
          challengeTitle={challenge.title}
          baseParticipants={challenge.participants}
        />
      </div>
    </div>
  );
}
