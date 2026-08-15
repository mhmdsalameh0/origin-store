import { apiUrl } from "./api";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  imageTone: string;
  accentColor: string;
  badge?: string | null;
  sortOrder: number;
};

export type ProductsResponse = {
  source: "database" | "fallback";
  products: Product[];
};

export async function fetchProducts(signal?: AbortSignal): Promise<ProductsResponse> {
  const response = await fetch(apiUrl("/products"), { signal });

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return response.json() as Promise<ProductsResponse>;
}
