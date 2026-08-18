export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  category: string;
  dose: string;
  price: string;
  priceCents: number;
  createdAt: string;
  image: string;
  accent: string;
  imageClassName: string;
  description: string;
  dosageOptions: string[];
  sku: string;
  additionalInformation: Record<string, string>;
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "fallback-tb",
    slug: "tb-500",
    name: "TB-500",
    displayName: "TB - TB-5",
    category: "Neuro Research",
    dose: "5 MG",
    price: "$49.99",
    priceCents: 4999,
    createdAt: "2026-08-11T00:00:00.000Z",
    image: "/images/showcase-tb-500-clean.png",
    accent: "#1289d9",
    imageClassName: "h-[285px]",
    description: "A premium research peptide supplied for neuro research use with Origin documentation standards.",
    dosageOptions: ["10 MG", "20 MG"],
    sku: "TB-5",
    additionalInformation: {
      Purity: "99%+",
      Category: "Neuro Research",
      Storage: "Store according to laboratory protocol."
    }
  },
  {
    id: "fallback-pre",
    slug: "ghk-cu",
    name: "GHK-CU",
    displayName: "GHK-CU 50 MG",
    category: "Cellular Research",
    dose: "50 MG",
    price: "$49.99",
    priceCents: 4999,
    createdAt: "2026-08-12T00:00:00.000Z",
    image: "/images/showcase-ghk-cu-clean.png",
    accent: "#6f46b8",
    imageClassName: "h-[285px]",
    description: "A high-purity research peptide presented with clear documentation for cellular research workflows.",
    dosageOptions: ["10 MG"],
    sku: "GHK-CU-50",
    additionalInformation: {
      Purity: "99%+",
      Category: "Cellular Research",
      Storage: "Store according to laboratory protocol."
    }
  },
  {
    id: "fallback-protein",
    slug: "mots-c",
    name: "MOTS-C",
    displayName: "MOTS - MOTS-10",
    category: "Circadian Research",
    dose: "10 MG",
    price: "$54.99",
    priceCents: 5499,
    createdAt: "2026-08-13T00:00:00.000Z",
    image: "/images/showcase-mots-c-clean.png",
    accent: "#087936",
    imageClassName: "h-[285px]",
    description: "A precisely formulated research compound for circadian research applications.",
    dosageOptions: ["10 MG", "20 MG"],
    sku: "MOTS-10",
    additionalInformation: {
      Purity: "99%+",
      Category: "Circadian Research",
      Storage: "Store according to laboratory protocol."
    }
  },
  {
    id: "fallback-reta",
    slug: "retatrutide",
    name: "Retatrutide",
    displayName: "RETA - RT-10 OU GLP-3",
    category: "Dermal Research",
    dose: "10 MG",
    price: "$119.00",
    priceCents: 11900,
    createdAt: "2026-08-14T00:00:00.000Z",
    image: "/images/showcase-retatrutide-clean.png",
    accent: "#df1f2d",
    imageClassName: "h-[285px]",
    description: "A documented research peptide option prepared for dermal research protocols.",
    dosageOptions: ["10 MG", "20 MG"],
    sku: "RETA-10",
    additionalInformation: {
      Purity: "99%+",
      Category: "Dermal Research",
      Storage: "Store according to laboratory protocol."
    }
  }
];

export const bpcProduct: CatalogProduct = {
  id: "products-page-bpc",
  slug: "bpc-157",
  name: "BPC-157",
  displayName: "BPC - BP-5",
  category: "Regenerative Research",
  dose: "5 MG",
  price: "$49.99",
  priceCents: 4999,
  createdAt: "2026-08-15T00:00:00.000Z",
  image: "/images/ChatGPT Image Aug 15, 2026, 12_01_14 PM.png",
  accent: "#8ec67c",
  imageClassName: "h-[285px]",
  description: "A high-purity research compound prepared for regenerative research applications.",
  dosageOptions: ["5 MG", "10 MG"],
  sku: "BPC-BP-5",
  additionalInformation: {
    Purity: "99%+",
    Category: "Regenerative Research",
    Storage: "Store according to laboratory protocol."
  }
};

export const productsPageProducts: CatalogProduct[] = [...catalogProducts, bpcProduct];

export function getProductBySlug(slug: string) {
  return productsPageProducts.find((product) => product.slug === slug);
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(priceCents / 100);
}
