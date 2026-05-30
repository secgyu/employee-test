import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/src/components/layout/NavLinks";
import { CartIcon, BellIcon, UserIcon } from "@/src/components/icons";
import { SITE } from "@/src/constants/site";
import logo from "@/src/assets/logo.png";

interface IconButtonProps {
  label: string;
  badge?: number;
  children: React.ReactNode;
}

// 우측 아이콘 버튼 (장바구니/알림)
function IconButton({ label, badge, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
    >
      {children}
      {badge ? (
        <span className="absolute -top-1.5 left-3.5 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-normal leading-none text-brand-foreground">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-[100px] w-full items-center justify-center bg-white px-4 shadow-[0px_3px_4px_rgba(0,0,0,0.12)]">
      <div className="flex h-20 w-full max-w-[1280px] items-center justify-between gap-8">
        <div className="flex flex-1 items-center gap-10 lg:gap-[100px]">
          <Link href="/" aria-label={SITE.brand} className="shrink-0">
            <Image src={logo} alt={SITE.brand} priority className="h-[18px] w-auto" />
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-6 text-ink">
          <IconButton label="장바구니" badge={1}>
            <CartIcon className="h-6 w-6" />
          </IconButton>
          <IconButton label="알림" badge={1}>
            <BellIcon className="h-6 w-6" />
          </IconButton>
          <button
            type="button"
            aria-label="마이페이지"
            className="flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-brand"
          >
            <UserIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
