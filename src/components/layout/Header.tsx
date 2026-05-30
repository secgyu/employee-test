import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/src/components/layout/NavLinks";
import { CartLink } from "@/src/components/layout/CartLink";
import { BellIcon, UserIcon } from "@/src/components/icons";
import { SITE } from "@/src/constants/site";
import logo from "@/src/assets/logo.png";

interface IconLinkProps {
  label: string;
  href: string;
  badge?: number;
  children: React.ReactNode;
}

// 우측 아이콘 링크 (장바구니/알림/마이페이지)
function IconLink({ label, href, badge, children }: IconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
    >
      {children}
      {badge ? (
        <span className="absolute -top-1.5 left-3.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-normal leading-none text-brand-foreground">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-[100px] w-full items-center justify-center bg-white px-4 shadow-[0px_3px_4px_rgba(0,0,0,0.12)]">
      <div className="flex h-20 w-full max-w-[1280px] items-center justify-between gap-8">
        <div className="flex flex-1 items-center gap-10 lg:gap-[100px]">
          <Link href="/" aria-label={SITE.brand} className="shrink-0">
            <Image src={logo} alt={SITE.brand} className="h-[18px] w-auto" />
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-6 text-ink">
          <CartLink />
          <IconLink label="알림" href="/notifications" badge={1}>
            <BellIcon className="h-6 w-6" />
          </IconLink>
          <IconLink label="마이페이지" href="/login">
            <UserIcon className="h-6 w-6" />
          </IconLink>
        </div>
      </div>
    </header>
  );
}
