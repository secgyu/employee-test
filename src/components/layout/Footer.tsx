import Link from "next/link";

import { COMPANY, FOOTER_LINKS } from "@/src/constants/site";

function Divider() {
  return <span className="text-[#d9dce1]">|</span>;
}

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto flex h-[180px] w-full max-w-[1440px] flex-col justify-center gap-2.5 px-[60px]">
        <nav className="flex items-center gap-3 text-[14px] font-medium leading-normal text-[#b2b6bd]">
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-3">
              {i > 0 ? <Divider /> : null}
              <Link href={link.href} className="transition-colors hover:text-brand">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="space-y-1 text-[14px] font-medium leading-normal text-[#b2b6bd]">
          <p className="flex flex-wrap items-center gap-x-2">
            <span>{COMPANY.name}</span>
            <Divider />
            <span>대표: {COMPANY.ceo}</span>
            <Divider />
            <span>
              사업자등록번호: {COMPANY.registrationNumber}{" "}
              <a
                href={COMPANY.registrationCheckUrl}
                target="_blank"
                rel="noreferrer"
                className="underline transition-colors hover:text-brand"
              >
                (사업자정보확인)
              </a>
            </span>
          </p>
          <p className="flex flex-wrap items-center gap-x-2">
            <span>주소: {COMPANY.address}</span>
            <Divider />
            <span>통신판매업신고: {COMPANY.mailOrderNumber}</span>
            <Divider />
            <span>이메일: {COMPANY.email}</span>
          </p>
        </div>

        <p className="text-[14px] font-medium leading-normal text-[#b2b6bd]">
          Copyright © {COMPANY.copyrightYear} 히든카이스. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
