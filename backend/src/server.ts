import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ordersRouter } from "./routes/orders.js";
import { productsRouter } from "./routes/products.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:3000"
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Origin Store API running on http://localhost:${port}`);
});
