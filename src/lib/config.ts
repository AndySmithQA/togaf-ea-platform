import { promises as fs } from "fs";
import path from "path";
import os from "os";

/**
 * Active-repo resolution.
 *
 * The TOGAF EA Platform can target any folder on disk as the "current
 * Architecture Repository". Resolution priority (highest first):
 *
 *   1. Runtime override stored in ~/.togaf-ea/config.json
 *      (set from the in-app Settings page).
 *   2. EA_REPO_PATH environment variable.
 *   3. Bundled example: <process.cwd()>/architecture-repository
 *      (so the platform works out-of-the-box with the Northwind demo).
 *
 * State (engagements.json, maturity.json) lives under
 *   <repo>/.togaf/state/
 * which keeps the markdown clean for git review and lets multiple repos
 * each carry their own engagement state.
 */

export interface PlatformConfig {
  activeRepo: string;
  recentRepos: string[];
}

const USER_CONFIG_DIR = path.join(os.homedir(), ".togaf-ea");
const USER_CONFIG_FILE = path.join(USER_CONFIG_DIR, "config.json");

const BUNDLED_REPO = path.join(process.cwd(), "architecture-repository");

export async function readUserConfig(): Promise<Partial<PlatformConfig>> {
  try {
    const raw = await fs.readFile(USER_CONFIG_FILE, "utf8");
    return JSON.parse(raw) as Partial<PlatformConfig>;
  } catch {
    return {};
  }
}

export async function writeUserConfig(cfg: Partial<PlatformConfig>): Promise<PlatformConfig> {
  await fs.mkdir(USER_CONFIG_DIR, { recursive: true });
  const current = await readUserConfig();
  const merged: PlatformConfig = {
    activeRepo: cfg.activeRepo ?? current.activeRepo ?? BUNDLED_REPO,
    recentRepos: dedupe([
      ...(cfg.activeRepo ? [cfg.activeRepo] : []),
      ...(current.recentRepos ?? []),
      ...(cfg.recentRepos ?? []),
    ]).slice(0, 8),
  };
  await fs.writeFile(USER_CONFIG_FILE, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}

function dedupe(xs: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of xs) {
    const norm = path.resolve(x);
    if (!seen.has(norm)) {
      seen.add(norm);
      out.push(norm);
    }
  }
  return out;
}

/**
 * Resolve the active repo path right now. Always returns an absolute path.
 */
export async function resolveActiveRepo(): Promise<{
  repoPath: string;
  source: "user-config" | "env" | "bundled";
  exists: boolean;
}> {
  const user = await readUserConfig();
  if (user.activeRepo) {
    const repoPath = path.resolve(user.activeRepo);
    return { repoPath, source: "user-config", exists: await pathExists(repoPath) };
  }
  const envVal = process.env.EA_REPO_PATH?.trim();
  if (envVal) {
    const repoPath = path.resolve(envVal);
    return { repoPath, source: "env", exists: await pathExists(repoPath) };
  }
  return { repoPath: BUNDLED_REPO, source: "bundled", exists: await pathExists(BUNDLED_REPO) };
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

/** Where engagement / maturity state lives for a given repo. */
export function stateDirFor(repoPath: string): string {
  return path.join(repoPath, ".togaf", "state");
}

export function engagementsFileFor(repoPath: string): string {
  return path.join(stateDirFor(repoPath), "engagements.json");
}

export function maturityFileFor(repoPath: string): string {
  return path.join(stateDirFor(repoPath), "maturity.json");
}

export function userConfigFile(): string {
  return USER_CONFIG_FILE;
}

export function bundledRepoPath(): string {
  return BUNDLED_REPO;
}
