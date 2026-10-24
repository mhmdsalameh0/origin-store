export const TAX_RATE_LABEL = "14.975%";
export const TAX_RATE_PARTS_PER_100_000 = 14_975;
export const SHIPPING_CENTS = 499;

export type PricedOrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  dosage: string;
  quantity: number;
  unitPriceCents: number;
  lineTotalCents: number;
};

type CatalogItem = Omit<PricedOrderItem, "quantity" | "lineTotalCents">;

const orderCatalog: CatalogItem[] = [
  { productId: "fallback-tb", slug: "tb-500", name: "TB-500 5MG", image: "/images/showcase-tb-500-clean.png", dosage: "5 MG", unitPriceCents: 4_999 },
  { productId: "fallback-pre", slug: "ghk-cu", name: "GHK-CU 50MG", image: "/images/showcase-ghk-cu-clean.png", dosage: "50 MG", unitPriceCents: 4_999 },
  { productId: "fallback-protein", slug: "mots-c", name: "MOTS-C 10MG", image: "/images/showcase-mots-c-clean.png", dosage: "10 MG", unitPriceCents: 5_499 },
  { productId: "fallback-reta", slug: "retatrutide", name: "RETA 10MG", image: "/images/showcase-retatrutide-transparent.png", dosage: "10 MG", unitPriceCents: 11_900 },
  { productId: "products-page-bpc", slug: "bpc-157", name: "BPC-157 5MG", image: "/images/ChatGPT Image Aug 15, 2026, 12_01_14 PM.png", dosage: "5 MG", unitPriceCents: 4_999 },
  { productId: "products-page-bacteriostatic-water", slug: "bacteriostatic-water", name: "BAC WATER 10ML", image: "/images/Bacteriostatic Water Research Vial.png", dosage: "10 ML", unitPriceCents: 2_000 }
];

const catalogByProductId = new Map(orderCatalog.map((item) => [item.productId, item]));

export function priceOrderItem(input: {
  productId: string;
  slug: string;
  dosage: string;
  quantity: number;
  clientPriceCents: number;
}): PricedOrderItem | null {
  const product = catalogByProductId.get(input.productId);

  if (
    !product ||
    product.slug !== input.slug ||
    product.dosage !== input.dosage ||
    !Number.isSafeInteger(input.quantity) ||
    input.quantity < 1 ||
    input.quantity > 100 ||
    input.clientPriceCents !== product.unitPriceCents
  ) {
    return null;
  }

  return {
    ...product,
    quantity: input.quantity,
    lineTotalCents: product.unitPriceCents * input.quantity
  };
}

export function calculateOrderTotals(items: PricedOrderItem[]) {
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const taxCents = calculateTaxCents(subtotalCents);
  const shippingCents = SHIPPING_CENTS;

  return {
    subtotalCents,
    taxCents,
    shippingCents,
    totalCents: subtotalCents + taxCents + shippingCents
  };
}

export function calculateTaxCents(subtotalCents: number) {
  return Math.floor((subtotalCents * TAX_RATE_PARTS_PER_100_000 + 50_000) / 100_000);
}
