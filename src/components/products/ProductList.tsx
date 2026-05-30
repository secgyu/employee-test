"use client";

import { useEffect, useMemo, useState } from "react";

import { ProductCard } from "@/src/components/products/ProductCard";
import { createClient } from "@/src/lib/supabase/client";
import { PRODUCT_SELECT, mapProductRow, type ProductRow } from "@/src/features/products/shared";
import type { Product, ProductCategory } from "@/src/features/products/types";

type TabKey = "all" | ProductCategory;

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "pass", label: "패스" },
  { key: "single", label: "단품" },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 상품 리스트 (CSR).
 * - 마운트 시 Supabase에서 상품을 조회한다.
 * - 검색어/카테고리 탭으로 클라이언트에서 즉시 필터링한다.
 */
export function ProductList() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabKey>("all");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    void supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (!active) return;
        setAllProducts(((data as ProductRow[] | null) ?? []).map(mapProductRow));
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const products = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return allProducts.filter((product) => {
      const matchesTab = tab === "all" || product.category === tab;
      const matchesQuery = product.name.toLowerCase().includes(keyword);
      return matchesTab && matchesQuery;
    });
  }, [allProducts, query, tab]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-[50px]">
        <div className="flex h-[42px] flex-wrap items-center justify-end gap-[17px]">
          <div className="flex h-[42px] w-[250px] items-center gap-2 rounded-[6px] border border-[#CED0D4] px-2 focus-within:border-brand">
            <SearchIcon className="h-4 w-4 shrink-0 text-[#979CA5]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="검색"
              aria-label="상품 검색"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#979CA5]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="shrink-0 text-[#979CA5] transition-colors hover:text-ink"
              >
                <ClearIcon className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex h-[26px] items-center gap-[11px] text-[14px]">
            {TABS.map((item, index) => (
              <span key={item.key} className="flex items-center gap-[11px]">
                {index > 0 ? <span className="text-[#CED0D4]">|</span> : null}
                <button
                  type="button"
                  onClick={() => setTab(item.key)}
                  className={
                    "transition-colors " + (tab === item.key ? "font-medium text-ink" : "text-[#B2B6BD] hover:text-ink")
                  }
                >
                  {item.label}
                </button>
              </span>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="py-20 text-center text-sm text-black/40">상품을 불러오는 중...</p>
        ) : products.length > 0 ? (
          <div className="mt-10 grid justify-between gap-y-9 grid-cols-[repeat(2,minmax(0,250px))] sm:grid-cols-[repeat(3,250px)] lg:grid-cols-[repeat(4,250px)]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center text-sm text-black/40">검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
