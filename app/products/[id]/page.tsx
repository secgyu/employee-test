import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductPurchase } from "@/src/components/products/ProductPurchase";
import { getProductById } from "@/src/features/products/api";
import { formatKRW } from "@/src/features/products/format";
import { CATEGORY_LABEL } from "@/src/features/products/types";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  return {
    title: product ? `${product.name} | HIDDEN KICE` : "상품을 찾을 수 없습니다",
  };
}

/** 상품 상세 페이지 (SSR). 구매 영역만 클라이언트 컴포넌트로 분리. */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const { category, name, price, discountRate, salePrice, imageUrl } = product;
  const unitPrice = salePrice ?? price;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-[50px]">
      <nav className="mb-8 text-[14px] text-muted">
        <Link href="/products" className="transition-colors hover:text-brand">
          ← 스토어로 돌아가기
        </Link>
      </nav>

      <div className="grid gap-12 md:grid-cols-2">
        {/* 이미지 */}
        <div className="relative flex aspect-25/32 w-full items-center justify-center overflow-hidden rounded-[6px] border border-[#E9EAEC] bg-white">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="text-sm text-black/20">이미지 준비중</span>
          )}
        </div>

        {/* 정보 */}
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold text-muted">{CATEGORY_LABEL[category]}</p>
          <h1 className="mt-2 text-[28px] font-semibold leading-snug text-black">{name}</h1>

          <div className="mt-6">
            {price ? (
              <>
                <p className="text-[16px] font-medium text-[#B2B6BD] line-through">{formatKRW(price)}</p>
                <p className="mt-1 flex items-baseline gap-2">
                  {discountRate ? (
                    <span className="text-[24px] font-semibold text-[#FA622F]">{discountRate}%</span>
                  ) : null}
                  <span className="text-[28px] font-semibold text-black">{formatKRW(salePrice ?? price)}</span>
                </p>
              </>
            ) : (
              <p className="text-[18px] font-medium text-ink">가격 문의</p>
            )}
          </div>

          <div className="mt-8">
            <ProductPurchase id={product.id} name={name} category={category} unitPrice={unitPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}
