import { PrismaClient } from "@prisma/client";
import { isDatabaseConfigured } from "../src/lib/databaseConfig.js";
import { loadBackendEnv } from "../src/lib/env.js";

loadBackendEnv();

if (!isDatabaseConfigured()) {
  console.error(
    "Seed skipped: set backend/.env DATABASE_URL to a real PostgreSQL connection string first."
  );
  process.exit(1);
}

const prisma = new PrismaClient();

const products = [
  {
    slug: "ghk-cu-50",
    name: "GHK-CU 50MG",
    category: "Cellular Research",
    description: "Original placeholder research compound card for the Home product strip.",
    priceCents: 2066,
    imageTone: "crimson",
    accentColor: "#6f7d52",
    badge: "Research",
    sortOrder: 1
  },
  {
    slug: "mots-10",
    name: "MOTS-C 10MG",
    category: "Circadian Research",
    description: "Original placeholder research compound card for the Home product strip.",
    priceCents: 2066,
    imageTone: "ivory",
    accentColor: "#d7c7a4",
    badge: "Research",
    sortOrder: 2
  },
  {
    slug: "reta-10",
    name: "RETA 10MG",
    category: "Dermal Research",
    description: "Original placeholder research compound card for the Home product strip.",
    priceCents: 2066,
    imageTone: "sage",
    accentColor: "#a9b38c",
    badge: "Research",
    sortOrder: 3
  },
  {
    slug: "tb-5",
    name: "TB-500 5MG",
    category: "Neuro Research",
    description: "Original placeholder research compound card for the Home product strip.",
    priceCents: 2066,
    imageTone: "white",
    accentColor: "#8d9a6e",
    badge: "Research",
    sortOrder: 4
  },
  {
    slug: "bpc-157",
    name: "BPC-157 5MG",
    category: "Regenerative Research",
    description: "A high-purity research compound prepared for regenerative research applications.",
    priceCents: 4999,
    imageTone: "sage",
    accentColor: "#8ec67c",
    badge: "Research",
    sortOrder: 5
  },
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water 10ML",
    category: "Research Supplies",
    description: "Bacteriostatic water containing 0.9% benzyl alcohol, supplied in a 10 mL vial for laboratory research preparation.",
    priceCents: 1200,
    imageTone: "blue",
    accentColor: "#0877b5",
    badge: "Research Supply",
    sortOrder: 6
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
