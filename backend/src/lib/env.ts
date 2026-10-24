import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export function loadBackendEnv() {
  dotenv.config({ path: resolve(backendRoot, ".env") });

  if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
    const developmentUrl = new URL(process.env.DATABASE_URL);
    developmentUrl.pathname = "/origin_store_dev";
    process.env.DATABASE_URL = developmentUrl.toString();
  }
}
