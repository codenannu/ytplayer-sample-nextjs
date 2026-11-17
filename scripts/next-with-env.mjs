#!/usr/bin/env node
/**
 * Run next with PORT / HOSTNAME / NODE_ENV from `.env*` (same contract as yt-player demo).
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);
const DEFAULT_PORT = "3001";

const ENV_FILES = [".env", ".env.local", ".env.development", ".env.development.local"];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const body = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = body.indexOf("=");
    if (eq <= 0) continue;
    const key = body.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    let value = body.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

function loadEnv() {
  const merged = {};
  for (const name of ENV_FILES) Object.assign(merged, parseEnvFile(path.join(root, name)));
  return merged;
}

function pick(fileEnv, name, fallback) {
  if (process.env[name]) return process.env[name];
  if (fileEnv[name]) return fileEnv[name];
  return fallback;
}

function resolveHost(fileEnv) {
  const fromFile = (fileEnv.HOSTNAME || fileEnv.HOST || "").trim();
  if (fromFile) return fromFile;
  if (process.env.HOST) return process.env.HOST.trim();
  const osHost = (process.env.HOSTNAME || "").trim();
  if (
    osHost === "0.0.0.0" ||
    osHost === "127.0.0.1" ||
    osHost === "localhost" ||
    /^\d{1,3}(?:\.\d{1,3}){3}$/.test(osHost)
  ) {
    return osHost;
  }
  return "0.0.0.0";
}

const [command, ...extra] = process.argv.slice(2);
if (command !== "dev" && command !== "start") {
  console.error("Usage: node scripts/next-with-env.mjs dev|start");
  process.exit(1);
}

const fileEnv = loadEnv();
const env = { ...process.env, ...fileEnv };
if (process.env.NODE_ENV) {
  env.NODE_ENV = process.env.NODE_ENV;
} else if (command === "start") {
  env.NODE_ENV = "production";
} else {
  env.NODE_ENV = pick(fileEnv, "NODE_ENV", "development");
}
env.PORT = pick(fileEnv, "PORT", DEFAULT_PORT);
env.HOSTNAME = resolveHost(fileEnv);
env.HOST = env.HOSTNAME;

const nextBin = require.resolve("next/dist/bin/next", { paths: [root] });
const child = spawn(
  process.execPath,
  [nextBin, command, "--port", String(env.PORT), "--hostname", String(env.HOSTNAME), ...extra],
  { cwd: root, env, stdio: "inherit" },
);
child.on("exit", (code) => process.exit(code ?? 1));
