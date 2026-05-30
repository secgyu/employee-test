"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/src/components/icons";
import { NAV_ITEMS } from "@/src/constants/site";

/** 모바일 전용 내비게이션 (md 미만에서 햄버거 메뉴). */
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 경로 변경 시 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 메뉴 열림 동안 배경 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[100px] z-30 bg-black/30"
          />
          <nav className="fixed inset-x-0 top-[100px] z-40 border-t border-[#E9EAEC] bg-white shadow-[0px_8px_12px_rgba(0,0,0,0.08)]">
            <ul className="flex flex-col px-6 py-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "block py-4 text-[16px] font-semibold transition-colors " +
                        (isActive ? "text-brand" : "text-ink hover:text-brand")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="border-t border-[#E9EAEC]">
                <Link
                  href="/login"
                  className="block py-4 text-[16px] font-semibold text-ink transition-colors hover:text-brand"
                >
                  로그인 / 마이페이지
                </Link>
              </li>
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
}
