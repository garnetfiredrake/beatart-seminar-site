import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  "node_modules",
  "dist",
  ".vite",
  "vite-dev.log",
  "vite-dev.err.log",
  "vite-preview.log",
  "vite-preview.err.log",
];

function resolveTarget(relativePath) {
  const absolutePath = path.resolve(rootDir, relativePath);
  const relativeFromRoot = path.relative(rootDir, absolutePath);

  if (
    relativeFromRoot.startsWith("..") ||
    path.isAbsolute(relativeFromRoot) ||
    relativeFromRoot === ""
  ) {
    throw new Error(`Refusing to remove path outside project root: ${absolutePath}`);
  }

  return absolutePath;
}

console.log("Cleaning local generated files...");

for (const target of targets) {
  const absolutePath = resolveTarget(target);
  await fs.rm(absolutePath, { recursive: true, force: true });
  console.log(`Removed ${target}`);
}

console.log("");
console.log("Done. Reinstall platform-specific dependencies with:");
console.log("  npm run setup");
