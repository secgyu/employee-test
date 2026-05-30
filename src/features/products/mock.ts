import type { Product } from "@/src/features/products/types";

/**
 * 상품 목업 데이터.
 * 추후 Supabase 연동 시 이 배열을 API 응답으로 대체한다.
 */
export const PRODUCTS: Product[] = [
  { id: "p01", name: "2026 Hidden Kice 단품 1회차", category: "single" },
  { id: "p02", name: "2026 Hidden Kice 시즌1", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p03", name: "2026 Hidden Kice 시즌2", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p04", name: "2026 Hidden Kice 시즌3", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p05", name: "2026 Hidden Kice 시즌4", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p06", name: "2026 Hidden Kice 시즌5", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p07", name: "2026 Hidden Kice 단품 2회차", category: "single" },
  { id: "p08", name: "2026 Hidden Kice 시즌6", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p09", name: "2026 Hidden Kice 단품 3회차", category: "single" },
  { id: "p10", name: "2026 Hidden Kice 시즌7", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p11", name: "2026 Hidden Kice 시즌8", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
  { id: "p12", name: "2026 Hidden Kice 시즌9", category: "pass", price: 76000, discountRate: 5, salePrice: 72200 },
];
