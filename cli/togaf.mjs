#!/usr/bin/env node
/**
 * togaf — TOGAF 10 EA toolkit CLI
 *
 * Spec-Kit-style: drops a set of slash commands and an Architecture Repository
 * skeleton into any folder you choose, then optionally serves the dashboard
 * pointed at that folder.
 *
 * Subcommands:
 *   togaf init [path]         install slash commands + skeleton in [path] (default: cwd)
 *   togaf serve [path]        run the dashboard webapp pointed at [path]
 *   togaf upgrade [path]      refresh slash commands + templates only
 *   togaf check [path]        run automatic TOGAF section-heading checks across [path]
 *   togaf status [path]       print ADM RAG status for [path]
 *   togaf where               print resolved paths and config
 *
 * Flags for `init`:
 *   --here                    install into current working directory (alias for "togaf init .")
 *   --example                 also copy the Northwind Retail example engagement
 *   --no-skeleton             do not write the Architecture Repository skeleton
 *   --no-templates            do not write .togaf/templates
 *   --ide=cursor,claude,copilot   pick which IDE adapters to install (default: all three)
 *   --force                   overwrite existing files
 *
 * Zero runtime dependencies: uses only Node 18+ built-ins.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_ROOT = path.resolve(__dirname, "..");
const VERSION = "0.2.0";

// ---------------------------------------------------------------------------
// arg parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const cmd = argv[0];
  const args = { _: [], flags: {} };
  for (let i = 1; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq !== -1) {
        args.flags[a.slice(2, eq)] = a.slice(eq + 1);
      } else {
        args.flags[a.slice(2)] = true;
      }
    } else {
      args._.push(a);
    }
  }
  return { cmd, ...args };
}

// ---------------------------------------------------------------------------
// IO helpers
// ---------------------------------------------------------------------------

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

/**
 * If the given path is a parent of an `architecture-repository/` folder, return that
 * subfolder; otherwise return the path unchanged. This lets users pass either the
 * project root (containing architecture-repository) OR the architecture-repository
 * folder itself, and the CLI does the right thing.
 */
async function resolveRepoRoot(p) {
  const sub = path.join(p, "architecture-repository");
  if (await exists(sub)) return sub;
  return p;
}

async function copyDir(src, dst, { force = false } = {}) {
  await ensureDir(dst);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) {
      await copyDir(s, d, { force });
    } else {
      if (!force && await exists(d)) {
        log("skip (exists)", path.relative(process.cwd(), d));
        continue;
      }
      await ensureDir(path.dirname(d));
      await fs.copyFile(s, d);
      log("write", path.relative(process.cwd(), d));
    }
  }
}

async function copyFile(src, dst, { force = false } = {}) {
  if (!force && await exists(dst)) {
    log("skip (exists)", path.relative(process.cwd(), dst));
    return;
  }
  await ensureDir(path.dirname(dst));
  await fs.copyFile(src, dst);
  log("write", path.relative(process.cwd(), dst));
}

// ---------------------------------------------------------------------------
// IDE adapters
// ---------------------------------------------------------------------------

/** Where each IDE expects its slash commands to live, given the target repo. */
function ideTargets(targetDir) {
  return {
    cursor: {
      label: "Cursor IDE",
      dir: path.join(targetDir, ".cursor", "commands", "togaf"),
      // Cursor renders sub-folder commands as namespaced /togaf:<name>
      transform: (name, body) => ({ filename: `${name}.md`, body }),
    },
    claude: {
      label: "Claude Code",
      dir: path.join(targetDir, ".claude", "commands", "togaf"),
      transform: (name, body) => ({ filename: `${name}.md`, body }),
    },
    copilot: {
      label: "GitHub Copilot",
      dir: path.join(targetDir, ".github", "prompts"),
      transform: (name, body) => ({
        filename: `togaf-${name}.prompt.md`,
        body,
      }),
    },
  };
}

const ALL_IDES = ["cursor", "claude", "copilot"];

function parseIdeFlag(value) {
  if (value === undefined || value === true) return ALL_IDES;
  return String(value)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => ALL_IDES.includes(s));
}

// ---------------------------------------------------------------------------
// init
// ---------------------------------------------------------------------------

async function cmdInit(argsArr, flags) {
  const here = flags.here ? "." : argsArr[0] || ".";
  const targetDir = path.resolve(here);
  await ensureDir(targetDir);

  const ides = parseIdeFlag(flags.ide);
  const installSkeleton = !flags["no-skeleton"];
  const installTemplates = !flags["no-templates"];
  const installExample = Boolean(flags.example);
  const force = Boolean(flags.force);

  banner();
  info("Target folder       :", targetDir);
  info("IDE adapters        :", ides.join(", "));
  info("Architecture skeleton:", installSkeleton ? "yes" : "no");
  info("TOGAF templates     :", installTemplates ? "yes" : "no");
  info("Example engagement  :", installExample ? "yes (Northwind Retail)" : "no");
  info("Overwrite existing  :", force ? "yes" : "no");
  console.log();

  // 1. slash commands per IDE
  const commandsDir = path.join(PKG_ROOT, "commands", "togaf");
  if (await exists(commandsDir)) {
    const cmdFiles = (await fs.readdir(commandsDir)).filter((f) => f.endsWith(".md"));
    const targets = ideTargets(targetDir);
    for (const ide of ides) {
      const t = targets[ide];
      if (!t) continue;
      header(`Installing slash commands for ${t.label}`);
      await ensureDir(t.dir);
      for (const f of cmdFiles) {
        const body = await fs.readFile(path.join(commandsDir, f), "utf8");
        const name = f.replace(/\.md$/, "");
        const { filename, body: out } = t.transform(name, body);
        const outPath = path.join(t.dir, filename);
        if (!force && await exists(outPath)) {
          log("skip (exists)", path.relative(process.cwd(), outPath));
          continue;
        }
        await ensureDir(path.dirname(outPath));
        await fs.writeFile(outPath, out, "utf8");
        log("write", path.relative(process.cwd(), outPath));
      }
    }
    console.log();
  } else {
    warn(`No commands found at ${commandsDir} — skipping IDE adapters.`);
  }

  // 2. .togaf/templates (TOGAF deliverable templates referenced by slash commands)
  if (installTemplates) {
    const tplSrc = path.join(PKG_ROOT, "templates");
    const tplDst = path.join(targetDir, ".togaf", "templates");
    if (await exists(tplSrc)) {
      header("Installing TOGAF templates");
      await copyDir(tplSrc, tplDst, { force });
      console.log();
    }
  }

  // 3. Architecture Repository skeleton
  if (installSkeleton) {
    const skelSrc = path.join(PKG_ROOT, "skeleton", "architecture-repository");
    const skelDst = path.join(targetDir, "architecture-repository");
    if (await exists(skelSrc)) {
      header("Installing Architecture Repository skeleton");
      await copyDir(skelSrc, skelDst, { force });
      console.log();
    } else {
      warn(`No skeleton at ${skelSrc} — skipping.`);
    }
  }

  // 4. Example engagement (Northwind Retail) on demand
  if (installExample) {
    const exSrc = path.join(PKG_ROOT, "examples", "northwind-retail", "architecture-repository");
    const exDst = path.join(targetDir, "architecture-repository");
    if (await exists(exSrc)) {
      header("Installing Northwind Retail example");
      await copyDir(exSrc, exDst, { force });
      console.log();
    } else {
      warn(`No example at ${exSrc} — skipping.`);
    }
  }

  // 5. Tiny project marker so subsequent CLI calls know they're in a togaf repo
  const markerPath = path.join(targetDir, ".togaf", "togaf.json");
  if (force || !(await exists(markerPath))) {
    await ensureDir(path.dirname(markerPath));
    await fs.writeFile(markerPath, JSON.stringify({
      version: VERSION,
      installedAt: new Date().toISOString(),
      ides,
      hasSkeleton: installSkeleton,
      hasExample: installExample,
    }, null, 2), "utf8");
    log("write", path.relative(process.cwd(), markerPath));
    console.log();
  }

  ok("Done.");
  console.log(`
Next steps:

  1. Open this folder in your IDE:
       ${rel(targetDir)}

  2. In Cursor       : type  /togaf:init
     In Claude Code  : type  /togaf:init
     In GitHub Copilot Chat (with prompts enabled): type  /togaf-init

  3. From any TOGAF repo, launch the dashboard pointed at this folder:
       togaf serve "${targetDir}"

  4. Or set it permanently from the dashboard's Settings page.
`);
}

// ---------------------------------------------------------------------------
// serve
// ---------------------------------------------------------------------------

async function cmdServe(argsArr, flags) {
  const raw = path.resolve(argsArr[0] || ".");
  const target = await resolveRepoRoot(raw);
  const port = String(flags.port || process.env.PORT || 3000);
  banner();
  if (target !== raw) info("Resolved input            :", `${raw} → ${target}`);
  info("Serving dashboard for repo:", target);
  info("Port                       :", port);

  // Persist active repo for the running process and across runs.
  await persistActiveRepo(target);

  const env = { ...process.env, EA_REPO_PATH: target, PORT: port };
  const isProd = await exists(path.join(PKG_ROOT, ".next"));
  const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
  const args = isProd ? ["next", "start", "-p", port] : ["next", "dev", "-p", port];
  console.log();
  ok(`${isProd ? "next start" : "next dev"} ...`);
  const child = spawn(cmd, args, { cwd: PKG_ROOT, env, stdio: "inherit" });
  child.on("exit", (code) => process.exit(code ?? 0));
}

// ---------------------------------------------------------------------------
// upgrade
// ---------------------------------------------------------------------------

async function cmdUpgrade(argsArr, flags) {
  // Same as `init --no-skeleton --no-templates? actually we DO want to refresh templates.`
  await cmdInit(argsArr, { ...flags, "no-skeleton": true, force: true });
}

// ---------------------------------------------------------------------------
// check (auto checks)
// ---------------------------------------------------------------------------

async function cmdCheck(argsArr) {
  const raw = path.resolve(argsArr[0] || ".");
  const target = await resolveRepoRoot(raw);
  banner();
  if (target !== raw) info("Resolved input:", `${raw} → ${target}`);
  info("Checking repo:", target);
  console.log();

  const stateFile = path.join(target, ".togaf", "state", "engagements.json");
  if (!(await exists(stateFile))) {
    warn("No engagement state found at " + stateFile);
    warn("Run `/togaf:init` inside your IDE to bootstrap an engagement.");
    process.exit(0);
  }
  const state = JSON.parse(await fs.readFile(stateFile, "utf8"));
  let totalAuto = 0, totalAutoPass = 0, totalManual = 0, totalManualPass = 0;
  for (const eng of Object.values(state)) {
    if (!eng || typeof eng !== "object") continue;
    console.log(`\nEngagement: ${eng.name} (${eng.id}) · active phase ${eng.activePhase}`);
    for (const doc of Object.values(eng.documents || {})) {
      const docPath = path.join(target, "engagements", eng.id, doc.filename);
      const body = (await exists(docPath)) ? await fs.readFile(docPath, "utf8") : "";
      const auto = doc.checklist.filter((c) => c.kind === "auto");
      const manual = doc.checklist.filter((c) => c.kind === "manual");
      const autoPass = auto.filter((c) => {
        if (!c.requiredHeading) return true;
        const re = new RegExp("(^|\\n)#{1,6}\\s+" + escapeRe(c.requiredHeading) + "\\s*(\\n|$)", "i");
        return re.test(body);
      }).length;
      const manualPass = manual.filter((c) => c.checked).length;
      totalAuto += auto.length; totalAutoPass += autoPass;
      totalManual += manual.length; totalManualPass += manualPass;
      const status = doc.signoff?.signedOff ? "✓ signed-off" : `auto ${autoPass}/${auto.length} · manual ${manualPass}/${manual.length}`;
      console.log(`  ${pad(doc.phase, 4)}  ${pad(doc.id, 42)}  ${status}`);
    }
  }
  console.log(`\nTotals: auto ${totalAutoPass}/${totalAuto} · manual ${totalManualPass}/${totalManual}`);
}

// ---------------------------------------------------------------------------
// status (RAG)
// ---------------------------------------------------------------------------

async function cmdStatus(argsArr) {
  const raw = path.resolve(argsArr[0] || ".");
  const target = await resolveRepoRoot(raw);
  const stateFile = path.join(target, ".togaf", "state", "engagements.json");
  if (!(await exists(stateFile))) {
    warn("No engagement state found at " + stateFile);
    return;
  }
  const state = JSON.parse(await fs.readFile(stateFile, "utf8"));
  banner();
  if (target !== raw) info("Resolved input:", `${raw} → ${target}`);
  for (const eng of Object.values(state)) {
    if (!eng || typeof eng !== "object") continue;
    console.log(`\nEngagement: ${eng.name} (${eng.id}) — active phase ${eng.activePhase}`);
    const groups = {};
    for (const doc of Object.values(eng.documents)) {
      groups[doc.phase] ||= [];
      groups[doc.phase].push(doc);
    }
    const PHASE_ORDER = ["P", "A", "B", "C-D", "C-A", "D", "E", "F", "G", "H", "RM"];
    for (const phase of PHASE_ORDER) {
      const docs = groups[phase] || [];
      if (docs.length === 0) continue;
      const approved = docs.filter((d) => d.status === "approved").length;
      const drafted  = docs.filter((d) => d.status !== "missing").length;
      let rag = "grey";
      if (approved === docs.length) rag = "green";
      else if (drafted > 0) rag = "amber";
      else rag = "red";
      console.log(`  ${pad(phase, 4)}  ${ragBadge(rag)}  ${pad(approved + "/" + docs.length, 6)} approved`);
    }
  }
}

function ragBadge(r) {
  switch (r) {
    case "green": return "\x1b[42m\x1b[30m GREEN \x1b[0m";
    case "amber": return "\x1b[43m\x1b[30m AMBER \x1b[0m";
    case "red":   return "\x1b[41m\x1b[37m  RED  \x1b[0m";
    default:      return "\x1b[100m\x1b[37m GREY  \x1b[0m";
  }
}

// ---------------------------------------------------------------------------
// where
// ---------------------------------------------------------------------------

async function cmdWhere() {
  const cfgFile = path.join(os.homedir(), ".togaf-ea", "config.json");
  let cfg = {};
  try { cfg = JSON.parse(await fs.readFile(cfgFile, "utf8")); } catch {}
  banner();
  console.log("Package install dir :", PKG_ROOT);
  console.log("Bundled commands    :", path.join(PKG_ROOT, "commands", "togaf"));
  console.log("Bundled templates   :", path.join(PKG_ROOT, "templates"));
  console.log("Bundled skeleton    :", path.join(PKG_ROOT, "skeleton", "architecture-repository"));
  console.log("Bundled example     :", path.join(PKG_ROOT, "examples", "northwind-retail", "architecture-repository"));
  console.log("Bundled demo state  :", path.join(PKG_ROOT, "architecture-repository", ".togaf", "state"));
  console.log();
  console.log("User config file    :", cfgFile);
  console.log("Active repo (config):", cfg.activeRepo || "(unset)");
  console.log("EA_REPO_PATH env    :", process.env.EA_REPO_PATH || "(unset)");
  console.log();
}

// ---------------------------------------------------------------------------
// utils
// ---------------------------------------------------------------------------

async function persistActiveRepo(p) {
  const dir = path.join(os.homedir(), ".togaf-ea");
  await ensureDir(dir);
  const file = path.join(dir, "config.json");
  let cfg = {};
  try { cfg = JSON.parse(await fs.readFile(file, "utf8")); } catch {}
  const recents = Array.isArray(cfg.recentRepos) ? cfg.recentRepos : [];
  const recentsNew = [p, ...recents.filter((r) => path.resolve(r) !== path.resolve(p))].slice(0, 8);
  await fs.writeFile(file, JSON.stringify({ ...cfg, activeRepo: p, recentRepos: recentsNew }, null, 2), "utf8");
}

function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pad(s, n) { s = String(s); return s.length >= n ? s : s + " ".repeat(n - s.length); }
function rel(p) { try { return path.relative(process.cwd(), p) || "."; } catch { return p; } }

function banner() {
  console.log(`\n  togaf v${VERSION}  —  TOGAF 10 EA toolkit\n`);
}
function header(s) { console.log(`\x1b[1m▎ ${s}\x1b[0m`); }
function log(verb, p) { console.log(`  ${verb.padEnd(14)}  ${p}`); }
function info(label, value) { console.log(`  \x1b[2m${label.padEnd(20)}\x1b[0m ${value}`); }
function ok(s) { console.log(`\x1b[32m✓\x1b[0m ${s}`); }
function warn(s) { console.warn(`\x1b[33m!\x1b[0m ${s}`); }
function fail(s) { console.error(`\x1b[31m✗\x1b[0m ${s}`); }

function help() {
  console.log(`
  togaf v${VERSION}  —  TOGAF 10 EA toolkit (Spec-Kit-style)

  Usage:
    togaf <command> [args] [flags]

  Commands:
    init [path]       Install slash commands + Architecture Repository skeleton
                      into [path] (default: current folder).
                      Flags: --here  --example  --no-skeleton  --no-templates
                             --ide=cursor,claude,copilot   --force
    serve [path]      Run the dashboard webapp pointed at [path].
                      Flags: --port=3000
    upgrade [path]    Refresh slash commands + templates only (overwrites).
    check [path]      Run TOGAF auto-checks across [path]'s engagements.
    status [path]     Print ADM RAG status across [path]'s engagements.
    where             Print resolved paths and config.
    help              Show this help.

  Examples:
    togaf init my-ea-repo --example          install with Northwind example
    togaf init . --ide=cursor                Cursor only, no example
    togaf serve ./my-ea-repo                 launch dashboard against folder
    togaf check .                            auto-check current folder
`);
}

// ---------------------------------------------------------------------------
// dispatch
// ---------------------------------------------------------------------------

(async () => {
  const { cmd, _: argsArr, flags } = parseArgs(process.argv.slice(2));
  try {
    switch (cmd) {
      case "init":    await cmdInit(argsArr, flags); break;
      case "serve":   await cmdServe(argsArr, flags); break;
      case "upgrade": await cmdUpgrade(argsArr, flags); break;
      case "check":   await cmdCheck(argsArr); break;
      case "status":  await cmdStatus(argsArr); break;
      case "where":   await cmdWhere(); break;
      case "help":
      case "--help":
      case "-h":
      case undefined: help(); break;
      default:
        fail(`Unknown command: ${cmd}`);
        help();
        process.exit(2);
    }
  } catch (e) {
    fail(e?.message || String(e));
    if (process.env.DEBUG) console.error(e);
    process.exit(1);
  }
})();
