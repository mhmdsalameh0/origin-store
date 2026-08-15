import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const processes = [
  ["backend", ["run", "dev", "--workspace", "backend"]],
  ["frontend", ["run", "dev", "--workspace", "frontend"]]
];

const children = processes.map(([name, args]) => {
  const child = spawn(npmCommand, args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    shell: false
  });

  child.on("exit", (code, signal) => {
    if (code && code !== 0) {
      console.error(`${name} dev server exited with code ${code}`);
    }

    if (signal) {
      console.error(`${name} dev server stopped by ${signal}`);
    }
  });

  return child;
});

function stopAll() {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
}

process.on("SIGINT", () => {
  stopAll();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopAll();
  process.exit(0);
});
