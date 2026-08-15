import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ordersRouter } from "./routes/orders.js";
import { productsRouter } from "./routes/products.js";

dotenv.config();

const app = express();
const productionOrigin = process.env.FRONTEND_ORIGIN;
const localOrigin = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const allowedOrigin = productionOrigin ?? localOrigin;

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === allowedOrigin) {
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
