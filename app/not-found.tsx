import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[600px] flex-col items-center px-4 py-[120px] text-center">
      <p className="text-[64px] font-bold leading-none text-brand">404</p>
      <h1 className="mt-6 text-[24px] font-semibold text-black">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand px-7 text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          홈으로 가기
        </Link>
        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center rounded-md border border-[#E9EAEC] px-7 text-[15px] font-medium text-ink transition-colors hover:border-brand/40"
        >
          스토어 둘러보기
        </Link>
      </div>
    </section>
  );
}
