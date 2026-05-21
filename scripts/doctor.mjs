import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = "127.0.0.1";
const port = 5180;

const checks = [];

function addCheck(name, status, message) {
  checks.push({ name, status, message });
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function getNpmVersion() {
  const command =
    process.platform === "win32"
      ? ["cmd.exe", ["/d", "/s", "/c", "npm --version"]]
      : ["npm", ["--version"]];

  const { stdout } = await execFileAsync(command[0], command[1], {
    cwd: rootDir,
    windowsHide: true,
  });

  return stdout.trim();
}

function checkPort() {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve({
          status: "warn",
          message: `${host}:${port} is already in use. If the site is not open, stop the existing process or use another port.`,
        });
        return;
      }

      resolve({
        status: "fail",
        message: `Could not check ${host}:${port}: ${error.message}`,
      });
    });

    server.once("listening", () => {
      server.close(() => {
        resolve({
          status: "ok",
          message: `${host}:${port} is available.`,
        });
      });
    });

    server.listen(port, host);
  });
}

async function checkImport(packageName, label = packageName) {
  try {
    const script = `
      try {
        const mod = await import(${JSON.stringify(packageName)});
        const version = mod.version ?? mod.default?.version ?? "";
        console.log(version || "loaded");
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
    `;
    const { stdout } = await execFileAsync(
      process.execPath,
      ["--input-type=module", "-e", script],
      { cwd: rootDir, windowsHide: true }
    );
    const version = stdout.trim();
    addCheck(
      label,
      "ok",
      version && version !== "loaded"
        ? `${label} loads correctly (${version}).`
        : `${label} loads correctly.`
    );
  } catch (error) {
    const detail =
      error.stderr?.trim().split(/\r?\n/)[0] ||
      error.message ||
      "unknown load error";
    addCheck(
      label,
      "fail",
      `${label} could not load for this OS: ${detail}`
    );
  }
}

function printCheck({ name, status, message }) {
  const prefix = status === "ok" ? "OK" : status === "warn" ? "WARN" : "FAIL";
  console.log(`[${prefix}] ${name}: ${message}`);
}

console.log("BEATART local environment doctor");
console.log(`Project: ${rootDir}`);
console.log(`OS: ${os.platform()} ${os.release()} (${os.arch()})`);
console.log(`Node: ${process.version}`);

try {
  const npmVersion = await getNpmVersion();
  addCheck("npm", "ok", `npm ${npmVersion}`);
} catch (error) {
  addCheck("npm", "fail", `npm could not be executed: ${error.message}`);
}

addCheck(
  "package-lock.json",
  (await exists("package-lock.json")) ? "ok" : "fail",
  (await exists("package-lock.json"))
    ? "Lockfile is present."
    : "Lockfile is missing. Keep package-lock.json synced across Windows and macOS."
);

addCheck(
  "node_modules",
  (await exists("node_modules")) ? "ok" : "fail",
  (await exists("node_modules"))
    ? "node_modules is present for this machine."
    : "node_modules is missing. Run npm run setup."
);

if (await exists("node_modules")) {
  await checkImport("vite", "Vite");
  await checkImport("rollup", "Rollup");
  await checkImport("esbuild", "esbuild");
}

const portResult = await checkPort();
addCheck("dev port", portResult.status, portResult.message);

console.log("");
for (const check of checks) {
  printCheck(check);
}

const hasFailures = checks.some((check) => check.status === "fail");

console.log("");
if (hasFailures) {
  console.log("Suggested repair flow:");
  console.log("  npm run clean:local");
  console.log("  npm run setup");
  console.log("  npm run dev");
  console.log("");
  console.log("Note: node_modules contains OS-specific native packages for Vite/Rollup/esbuild.");
  console.log("When this Google Drive folder syncs between Windows and macOS, rebuild dependencies on each device.");
  process.exitCode = 1;
} else {
  console.log("Environment looks ready. Start the site with:");
  console.log("  npm run dev");
}
