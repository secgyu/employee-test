import type { Metadata } from "next";

import { COMPANY } from "@/src/constants/site";

export const metadata: Metadata = {
  title: "개인정보처리방침 | HIDDEN KICE",
  description: "히든카이스 개인정보처리방침입니다.",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보 항목",
    body: "회사는 회원가입, 서비스 이용, 주문·배송을 위해 다음의 개인정보를 수집합니다. 필수항목: 이메일, 비밀번호, 이름, 휴대전화번호. 주문 시: 받는 분 이름, 연락처, 배송지 정보.",
  },
  {
    title: "2. 개인정보의 수집 및 이용목적",
    body: "수집한 개인정보는 회원 식별 및 관리, 콘텐츠 제공 및 주문·배송 처리, 자동채점·챌린지 등 서비스 운영, 고객 문의 응대 및 공지사항 전달을 위해 이용됩니다.",
  },
  {
    title: "3. 개인정보의 보유 및 이용기간",
    body: "회원 탈퇴 시 지체 없이 파기하는 것을 원칙으로 합니다. 다만 관계 법령(전자상거래법 등)에 따라 거래기록 등 일정 정보는 법정 기간 동안 보관할 수 있습니다.",
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: "회사는 이용자의 개인정보를 본 방침에서 고지한 범위 내에서만 이용하며, 이용자의 사전 동의 없이 범위를 초과하여 이용하거나 제3자에게 제공하지 않습니다. 단, 법령에 의한 경우는 예외로 합니다.",
  },
  {
    title: "5. 개인정보의 파기절차 및 방법",
    body: "보유기간이 경과하거나 처리목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구가 불가능한 방법으로 삭제하며, 출력물은 분쇄하거나 소각합니다.",
  },
  {
    title: "6. 이용자의 권리",
    body: "이용자는 언제든지 자신의 개인정보를 조회·수정할 수 있으며, 회원 탈퇴를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.",
  },
  {
    title: "7. 개인정보 보호책임자",
    body: `개인정보 관련 문의는 아래로 연락해 주시기 바랍니다. 이메일: ${COMPANY.email} / 전화: ${COMPANY.phone}`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-[60px]">
      <h1 className="text-[30px] font-semibold text-black">개인정보처리방침</h1>
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
