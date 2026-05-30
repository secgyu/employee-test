import type { Metadata } from "next";

import { COMPANY, SITE } from "@/src/constants/site";

export const metadata: Metadata = {
  title: "이용약관 | HIDDEN KICE",
  description: "히든카이스 서비스 이용약관입니다.",
};

const SECTIONS = [
  {
    title: "제1조 (목적)",
    body: `본 약관은 ${COMPANY.name}(이하 "회사")이 제공하는 ${SITE.brand} 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정하는 것을 목적으로 합니다.`,
  },
  {
    title: "제2조 (정의)",
    body: '"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 서비스를 지속적으로 이용할 수 있는 자를 말합니다.',
  },
  {
    title: "제3조 (약관의 효력 및 변경)",
    body: "본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 변경 시 적용일자 및 변경사유를 명시하여 사전에 공지합니다.",
  },
  {
    title: "제4조 (서비스의 제공)",
    body: "회사는 실전모의고사 콘텐츠 판매, 자동채점, 학습 챌린지 등 서비스를 제공합니다. 회사는 서비스의 내용을 변경할 수 있으며, 변경 시 그 내용을 사전에 공지합니다.",
  },
  {
    title: "제5조 (이용자의 의무)",
    body: "이용자는 관계 법령, 본 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항을 준수하여야 하며, 회사의 업무에 방해되는 행위를 하여서는 안 됩니다. 구매한 콘텐츠를 무단으로 복제·배포하는 행위는 금지됩니다.",
  },
  {
    title: "제6조 (결제 및 환불)",
    body: "서비스의 이용요금 및 환불 정책은 관련 법령 및 회사의 환불 규정에 따릅니다. 디지털 콘텐츠의 특성상 열람·다운로드가 시작된 경우 환불이 제한될 수 있습니다.",
  },
  {
    title: "제7조 (책임의 제한)",
    body: "회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 본 약관에 명시되지 않은 사항은 관계 법령 및 상관례에 따릅니다.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-[60px]">
      <h1 className="text-[30px] font-semibold text-black">이용약관</h1>
      <p className="mt-3 text-[15px] text-muted">최종 개정일: 2026년 1월 1일</p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-[18px] font-semibold text-ink">{section.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
