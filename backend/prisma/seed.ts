import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { isDatabaseConfigured } from "../src/lib/databaseConfig.js";

dotenv.config();

if (!isDatabaseConfigured()) {
  console.error(
    "Seed skipped: set backend/.env DATABASE_URL to a real Neon PostgreSQL connection string first."
  );
  process.exit(1);
}

const prisma = new PrismaClient();

const products = [
  {
    slug: "ghk-cu-50",
    name: "GHK-CU 50 MG",
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
    name: "Mots - MOTS-10",
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
    name: "Reta - RT-10",
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
    name: "TB - TB-5",
    category: "Neuro Research",
    description: "Original placeholder research compound card for the Home product strip.",
    priceCents: 2066,
    imageTone: "white",
    accentColor: "#8d9a6e",
    badge: "Research",
    sortOrder: 4
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
