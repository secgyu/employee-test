"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/src/constants/site";

/** 전역 내비게이션 링크. 현재 경로를 활성 메뉴로 강조한다. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "whitespace-nowrap text-[18px] font-semibold leading-[1.6] transition-colors " +
              (isActive ? "text-brand" : "text-muted hover:text-brand")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
