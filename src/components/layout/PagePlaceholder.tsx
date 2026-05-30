interface PagePlaceholderProps {
  title: string;
  description?: string;
}

/** 아직 구현 전인 페이지의 공통 자리표시자. 헤더/푸터 사이 본문에 사용한다. */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center gap-3 px-4 py-[120px] text-center">
      <h1 className="text-[32px] font-semibold leading-tight text-black">{title}</h1>
      <p className="text-[15px] text-muted">{description ?? "준비 중인 페이지입니다."}</p>
    </section>
  );
}
