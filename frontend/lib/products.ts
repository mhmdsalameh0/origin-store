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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
  const response = await fetch(`${apiUrl}/products`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return response.json() as Promise<ProductsResponse>;
}
