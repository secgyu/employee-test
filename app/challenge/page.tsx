import type { Metadata } from "next";
import Link from "next/link";

import { ChallengeList } from "@/src/components/challenges/ChallengeList";
import { getChallenges, getLeaderboard } from "@/src/features/challenges/api";

export const metadata: Metadata = {
  title: "챌린지 | HIDDEN KICE",
  description: "매주 실전모의고사를 풀고 자동채점으로 인증하며 함께 완주하는 히든카이스 학습 챌린지입니다.",
};

/** 참여 방식 */
const STEPS = [
  {
    step: "01",
    title: "챌린지 신청",
    body: "목표에 맞는 챌린지를 골라 신청하고, 보유한 시즌 패스로 회차를 준비합니다.",
  },
  {
    step: "02",
    title: "풀이 & 인증",
    body: "매주 정해진 회차를 실전처럼 풀고, 자동채점 결과로 성적을 인증합니다.",
  },
  {
    step: "03",
    title: "완주 & 리워드",
    body: "목표를 달성하면 할인 쿠폰·굿즈·출제자 첨삭 등 리워드를 받습니다.",
  },
];

export default async function ChallengePage() {
  const [challenges, leaderboard] = await Promise.all([getChallenges(), getLeaderboard()]);

  return (
    <div>
      {/* 히어로 */}
      <section className="w-full bg-brand/5">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[80px]">
          <p className="text-[14px] font-semibold tracking-wide text-brand">CHALLENGE</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-snug text-black">
            혼자 풀지 말고,
            <br />
            끝까지 함께 완주하세요
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-ink">
            실전모의고사는 사두고 미루기 쉽습니다. 히든카이스 챌린지는 매주 한 회차씩 함께 풀고 자동채점으로 인증하며,
            끝까지 완주할 수 있도록 페이스를 만들어 드립니다. 같은 목표를 가진 수험생들과 리더보드에서 동기부여도 받아
            보세요.
          </p>
        </div>
      </section>

      {/* 참여 방식 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">이렇게 참여합니다</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="rounded-xl border border-[#E9EAEC] p-6">
              <p className="text-[15px] font-semibold text-brand">{item.step}</p>
              <h3 className="mt-3 text-[18px] font-semibold text-black">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 챌린지 목록 */}
      <section className="w-full bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
          <h2 className="text-[24px] font-semibold text-black">참여할 수 있는 챌린지</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            지금 진행 중이거나 모집 중인 챌린지에 참여해 보세요.
          </p>
          <div className="mt-8">
            <ChallengeList challenges={challenges} />
          </div>
        </div>
      </section>

      {/* 리더보드 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">이번 주 리더보드</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          시즌1~7 완주 챌린지의 자동채점 평균 표준점수 상위 참여자입니다.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-[#E9EAEC]">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-black/2 text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">순위</th>
                <th className="px-5 py-3 font-medium">닉네임</th>
                <th className="px-5 py-3 text-right font-medium">평균 표준점수</th>
                <th className="px-5 py-3 text-right font-medium">연속 인증</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F2F4]">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="text-ink">
                  <td className="px-5 py-3 font-semibold text-brand">{entry.rank}</td>
                  <td className="px-5 py-3">{entry.nickname}</td>
                  <td className="px-5 py-3 text-right">{entry.averageScore}</td>
                  <td className="px-5 py-3 text-right">{entry.streakWeeks}주</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex h-12 items-center rounded-md bg-brand px-7 text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            시즌 패스 보러가기
          </Link>
        </div>
      </section>
    </div>
  );
}
