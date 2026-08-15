import { Router } from "express";
import { isDatabaseConfigured } from "../lib/databaseConfig.js";
import { fallbackProducts } from "../lib/fallbackProducts.js";
import { prisma } from "../lib/prisma.js";

export const productsRouter = Router();

productsRouter.get("/", async (_req, res) => {
  if (!isDatabaseConfigured()) {
    res.json({ source: "fallback", products: fallbackProducts });
    return;
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }]
    });

    res.json({
      source: products.length > 0 ? "database" : "fallback",
      products: products.length > 0 ? products : fallbackProducts
    });
  } catch (error) {
    console.error("Product API fallback:", error);
    res.status(200).json({ source: "fallback", products: fallbackProducts });
  }
});
