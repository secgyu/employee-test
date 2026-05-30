import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "히든카이스 소개 | HIDDEN KICE",
  description: "히든카이스는 수능 수학 실전모의고사를 직접 출제·발간하는 전문 브랜드입니다.",
};

/** 핵심 가치 */
const VALUES = [
  {
    title: "100% 자체 출제",
    body: "문항 공모 없이 출제자가 직접 모든 문항을 만들고 시험지를 구성합니다.",
  },
  {
    title: "편향 없는 구성",
    body: "특정 스타일에 치우치지 않고, 예측할 수 없는 실전에 대비하는 다양한 시험지를 제공합니다.",
  },
  {
    title: "시즌제 커리큘럼",
    body: "SEASON 1~7까지 평가원 경향을 반영해 단계적으로 실전 감각을 완성합니다.",
  },
];

/** 제공 서비스 */
const SERVICES = [
  {
    title: "자동채점 서비스",
    body: "답안을 입력하면 등급·백분위·표준점수를 자동으로 산출합니다. 회원 데이터와 출제자의 분석이 반영된 신뢰도 높은 등급컷을 제공합니다.",
  },
  {
    title: "Q&A 게시판",
    body: "해설지를 봐도 이해되지 않는 문제는 출제자와 실력이 검증된 조교가 직접 답변해 드립니다.",
  },
  {
    title: "실물 OMR 카드",
    body: "OMR 카드까지 동봉하여 진짜 수능을 보는 듯한 실전 연습 환경을 완벽하게 재현합니다.",
  },
  {
    title: "가이드북 제공",
    body: "시즌별 학습을 돕는 가이드북으로 무엇을, 어떻게 풀어야 하는지 방향을 잡아 드립니다.",
  },
];

/** 핵심 지표 */
const STATS = [
  { value: "10년+", label: "실전모의고사 출제 경력" },
  { value: "100%", label: "자체 출제 문항" },
  { value: "SEASON 1–7", label: "시즌제 커리큘럼" },
];

export default function AboutPage() {
  return (
    <div>
      {/* 히어로 */}
      <section className="w-full bg-brand/5">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[80px]">
          <p className="text-[14px] font-semibold tracking-wide text-brand">HIDDEN KICE</p>
          <h1 className="mt-3 text-[34px] font-semibold leading-snug text-black">
            수능 수학 실전모의고사,
            <br />
            진짜 실전을 연습합니다
          </h1>
          <p className="mt-5 max-w-[640px] text-[16px] leading-relaxed text-ink">
            히든카이스(Hidden Kice)는 수능 수학 영역 실전모의고사를 직접 출제·발간하는 전문 브랜드입니다. 대표이자
            출제자인 안영호는 문항 공모 없이 모든 문항을 스스로 출제하고 시험지를 직접 구성하여, 학생들에게 진짜 실전에
            가까운 시험지를 제공합니다.
          </p>
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">왜 히든카이스인가</h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink">
          수험생 시절, 시중의 많은 모의고사를 풀어 보았지만 실제 수능 시험지 앞에서는 늘 큰 괴리감을 느꼈습니다. 수학
          문제 30개를 채워 넣었다고 해서 실전모의고사가 되는 것은 아니라는 생각, 그래서 학생들에게 정말 필요한
          실전모의고사를 직접 만들기로 결심했습니다. 그 마음 그대로, 지금도 한결같이 모든 문항을 직접 출제하고 시험지를
          구성하고 있습니다.
        </p>
        <blockquote className="mt-6 border-l-4 border-brand pl-5 text-[17px] font-medium leading-relaxed text-black">
          “특정 스타일에 치우친 시험지는 만들지 않습니다. 수능이 어떻게 출제될지 누구도 알 수 없기에, 다양한 상황에
          대비할 수 있는 시험지를 종합비타민처럼 챙겨 드립니다.”
        </blockquote>

        {/* 지표 */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[#E9EAEC] px-6 py-7">
              <p className="text-[28px] font-semibold text-brand">{stat.value}</p>
              <p className="mt-1 text-[14px] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="w-full bg-[#fafafa]">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
          <h2 className="text-[24px] font-semibold text-black">히든카이스의 약속</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-[#E9EAEC] bg-white p-6">
                <h3 className="text-[18px] font-semibold text-black">{value.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 */}
      <section className="mx-auto w-full max-w-[1000px] px-4 py-[70px]">
        <h2 className="text-[24px] font-semibold text-black">함께 제공되는 서비스</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-xl border border-[#E9EAEC] p-6">
              <h3 className="text-[18px] font-semibold text-black">{service.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{service.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex h-12 items-center rounded-md bg-brand px-7 text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            실전모의고사 보러가기
          </Link>
        </div>
      </section>
    </div>
  );
}
