export type ProductCategory = "pass" | "single";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  pass: "패스",
  single: "단품",
};

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price?: number;
  discountRate?: number;
  salePrice?: number;
}
