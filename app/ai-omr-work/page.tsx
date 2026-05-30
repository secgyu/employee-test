import type { Metadata } from "next";

import { OmrScoreDemo } from "@/src/components/omr/OmrScoreDemo";

export const metadata: Metadata = {
  title: "AI OMR WORK | HIDDEN KICE",
  description: "답안만 입력하면 등급·백분위·표준점수를 자동으로 산출하는 히든카이스 자동채점 서비스입니다.",
};

/** 채점 흐름 */
const STEPS = [
  {
    step: "01",
    title: "답안 입력",
    body: "OMR 카드로 푼 답안을 회차별로 그대로 입력합니다.",
  },
  {
    step: "02",
    title: "자동 채점",
    body: "입력 즉시 정답과 대조해 원점수를 자동으로 계산합니다.",
  },
  {
    step: "03",
    title: "성적 분석",
    body: "등급·백분위·표준점수로 지금 내 위치를 정확히 확인합니다.",
  },
];

/** 특징 */
const FEATURES = [
  {
    title: "신뢰할 수 있는 등급컷",
    body: "마구잡이로 만든 컷이 아닙니다. 자동채점을 이용한 회원들의 응시 데이터와 출제자의 통계적 분석이 함께 반영됩니다.",
  },
  {
    title: "회차별 위치 추적",
    body: "매 회차마다 내 등급과 백분위가 어떻게 변하는지 누적해서 확인하며 약점을 점검할 수 있습니다.",
  },
  {
    title: "실물 OMR 카드 재현",
    body: "시험지에 OMR 카드까지 동봉되어, 진짜 수능을 보는 듯한 실전 환경에서 마킹부터 연습합니다.",
  },
];

export default function AiOmrWorkPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="w-full bg-brand/5">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[80px]">
          <p className="text-[14px] font-semibold tracking-wide text-brand">AI OMR WORK</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-snug text-black">
            답안만 입력하면,
            <br />
            등급·백분위·표준점수까지 자동으로
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-ink">
            매 회차마다 내 위치가 궁금하지 않으셨나요? 답안을 입력하면 자동으로 채점하여 등급, 백분위, 표준점수를
            알려드립니다. 채점 결과의 기준이 되는 등급컷은 자동채점 서비스를 이용한 회원들의 데이터와 출제자의 분석이
            담겨 있으므로 믿고 활용하셔도 좋습니다.
          </p>
        </div>
      </section>

      {/* 채점 흐름 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">이렇게 동작합니다</h2>
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

      {/* 체험 위젯 */}
      <section className="w-full bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
          <h2 className="text-[24px] font-semibold text-black">자동채점 체험하기</h2>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-muted">
            OMR 카드처럼 답안을 마킹하고 채점하면, 등급·백분위·표준점수가 어떻게 산출되는지 미리 체험해 볼 수 있습니다.
          </p>
          <div className="mt-8">
            <OmrScoreDemo />
          </div>
        </div>
      </section>

      {/* 특징 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">왜 자동채점인가</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-[#E9EAEC] p-6">
              <h3 className="text-[18px] font-semibold text-black">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
