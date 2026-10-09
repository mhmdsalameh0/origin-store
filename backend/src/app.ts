import cors from "cors";
import express from "express";
import { loadBackendEnv } from "./lib/env.js";
import { ordersRouter } from "./routes/orders.js";
import { productsRouter } from "./routes/products.js";

loadBackendEnv();

const app = express();
const productionOrigins = (process.env.FRONTEND_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localOrigin = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const knownProductionOrigins = ["https://www.originrestored.com", "https://originrestored.com"];
const allowedOrigins = new Set([...productionOrigins, ...knownProductionOrigins, ...(localOrigin ? [localOrigin] : [])]);
const previewOriginPattern = /^https:\/\/origin-store-frontend(?:-[a-z0-9-]+)*\.vercel\.app$/i;

function isAllowedOrigin(origin: string) {
  return allowedOrigins.has(origin) || previewOriginPattern.test(origin);
}

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

export { app };
