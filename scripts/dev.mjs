import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? process.env.ComSpec || "cmd.exe" : "npm";
const processes = [
  ["backend", ["run", "dev", "--workspace", "backend"]],
  ["frontend", ["run", "dev", "--workspace", "frontend"]]
];
const exited = new WeakSet();

function npmArgs(args) {
  return isWindows ? ["/d", "/s", "/c", "npm.cmd", ...args] : args;
}

const children = processes.map(([name, args]) => {
  const child = spawn(npmCommand, npmArgs(args), {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
    shell: false
  });

  child.on("error", (error) => {
    console.error(`${name} dev server failed to start: ${error.message}`);
  });

  child.on("exit", (code, signal) => {
    exited.add(child);

    if (code && code !== 0) {
      console.error(`${name} dev server exited with code ${code}`);
    }

    if (signal) {
      console.error(`${name} dev server stopped by ${signal}`);
    }
  });

  return child;
});

function waitForExit(child) {
  if (exited.has(child)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(resolve, 5000);

    child.once("exit", resolve);
    child.once("exit", () => clearTimeout(timeout));
  });
}

function stopWindowsProcessTree(child) {
  if (!child.pid || exited.has(child)) {
    return;
  }

  const gracefulKill = spawn("taskkill", ["/pid", String(child.pid), "/T"], {
    stdio: "ignore",
    windowsHide: true
  });

  gracefulKill.on("error", () => {
    if (!exited.has(child)) {
      child.kill("SIGINT");
    }
  });
}

async function stopAll(signal) {
  for (const child of children) {
    if (exited.has(child)) {
      continue;
    }

    if (isWindows) {
      stopWindowsProcessTree(child);
    } else {
      child.kill(signal);
    }
  }

  await Promise.all(children.map(waitForExit));
}

let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  await stopAll(signal);
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
