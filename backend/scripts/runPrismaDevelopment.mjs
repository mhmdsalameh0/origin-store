import dotenv from "dotenv";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: resolve(backendRoot, ".env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured in backend/.env.");
}

const developmentUrl = new URL(process.env.DATABASE_URL);
developmentUrl.pathname = "/origin_store_dev";

const prismaCli = resolve(backendRoot, "../node_modules/prisma/build/index.js");
const child = spawn(process.execPath, [prismaCli, ...process.argv.slice(2)], {
  cwd: backendRoot,
  env: {
    ...process.env,
    DATABASE_URL: developmentUrl.toString(),
    NODE_ENV: "development"
  },
  stdio: "inherit"
});

child.on("error", (error) => {
  console.error(`Development Prisma command failed: ${error.message}`);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Development Prisma command stopped by ${signal}.`);
    process.exitCode = 1;
    return;
  }

  process.exitCode = code ?? 1;
});
