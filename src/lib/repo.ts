import { promises as fs } from "fs";
import path from "path";
import { DELIVERABLES_BY_ID, deliverablesForPhase, ADM_PHASES, type DeliverableDef } from "./togaf";
import { computePhaseStatus } from "./rag";
import { defaultSnapshot } from "./maturity";
import {
  resolveActiveRepo,
  engagementsFileFor,
  maturityFileFor,
  stateDirFor,
} from "./config";
import type {
  EngagementState,
  DocumentRecord,
  ChecklistItem,
  MaturitySnapshot,
} from "@/types";

/**
 * All filesystem access goes through here. The active Architecture Repository
 * is resolved fresh per call (so changes from the Settings page take effect
 * immediately without restarting the server).
 */

async function repoPath(): Promise<string> {
  return (await resolveActiveRepo()).repoPath;
}

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

export async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(file: string, data: unknown): Promise<void> {
  await ensureDir(path.dirname(file));
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// -------------------- Engagements --------------------

export async function listEngagements(): Promise<EngagementState[]> {
  const file = engagementsFileFor(await repoPath());
  const all = await readJson<Record<string, EngagementState>>(file, {});
  return Object.values(all).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEngagement(id: string): Promise<EngagementState | null> {
  const file = engagementsFileFor(await repoPath());
  const all = await readJson<Record<string, EngagementState>>(file, {});
  return all[id] ?? null;
}

export async function saveEngagement(state: EngagementState): Promise<EngagementState> {
  const file = engagementsFileFor(await repoPath());
  const all = await readJson<Record<string, EngagementState>>(file, {});
  state.phaseStatus = computePhaseStatus(state);
  all[state.id] = state;
  await writeJson(file, all);
  return state;
}

export function emptyDocumentFor(deliverable: DeliverableDef): DocumentRecord {
  const checklist: ChecklistItem[] = [
    ...deliverable.requiredHeadings.map((h, i) => ({
      id: `auto-${i}`,
      label: `Section "${h}" present`,
      kind: "auto" as const,
      requiredHeading: h,
      checked: false,
      autoResult: "fail" as const,
    })),
    {
      id: "manual-stakeholder-review",
      label: "Reviewed with named stakeholders",
      kind: "manual",
      checked: false,
    },
    {
      id: "manual-traceability",
      label: "Traceability to RfAW / Vision confirmed",
      kind: "manual",
      checked: false,
    },
    {
      id: "manual-tradeoffs",
      label: "Trade-offs documented and accepted",
      kind: "manual",
      checked: false,
    },
    {
      id: "manual-board",
      label: "Architecture Board endorsement recorded",
      kind: "manual",
      checked: false,
    },
  ];
  return {
    id: deliverable.id,
    filename: `${deliverable.phase}-${deliverable.id}.md`,
    title: deliverable.title,
    phase: deliverable.phase,
    status: "missing",
    checklist,
    signoff: { signedOff: false },
  };
}

export function bootstrapEngagement(args: {
  id: string;
  name: string;
  sponsor: string;
}): EngagementState {
  const docs: Record<string, DocumentRecord> = {};
  for (const d of Object.values(DELIVERABLES_BY_ID)) {
    docs[d.id] = emptyDocumentFor(d);
  }
  const state: EngagementState = {
    id: args.id,
    name: args.name,
    sponsor: args.sponsor,
    createdAt: new Date().toISOString(),
    rfawApproved: false,
    activePhase: "A",
    documents: docs,
    phaseStatus: {} as EngagementState["phaseStatus"],
  };
  state.phaseStatus = computePhaseStatus(state);
  return state;
}

export async function engagementsRoot(): Promise<string> {
  return path.join(await repoPath(), "engagements");
}

export async function engagementDir(id: string): Promise<string> {
  return path.join(await engagementsRoot(), id);
}

export async function readDocumentBody(id: string, doc: DocumentRecord): Promise<string> {
  try {
    const file = path.join(await engagementDir(id), doc.filename);
    return await fs.readFile(file, "utf8");
  } catch {
    return "";
  }
}

export async function writeDocumentBody(
  id: string,
  doc: DocumentRecord,
  body: string
): Promise<void> {
  const dir = await engagementDir(id);
  await ensureDir(dir);
  const file = path.join(dir, doc.filename);
  await fs.writeFile(file, body, "utf8");
}

/** Re-evaluate auto checks against the current document body. */
export function evaluateAutoChecks(doc: DocumentRecord, body: string): DocumentRecord {
  const newChecklist = doc.checklist.map((c) => {
    if (c.kind !== "auto" || !c.requiredHeading) return c;
    const re = new RegExp(`(^|\\n)#{1,6}\\s+${escapeRegex(c.requiredHeading)}\\s*(\\n|$)`, "i");
    const pass = re.test(body);
    const autoResult: "pass" | "fail" = pass ? "pass" : "fail";
    return { ...c, autoResult, checked: pass };
  });
  let status = doc.status;
  if (body.trim().length > 0 && status === "missing") status = "draft";
  return { ...doc, checklist: newChecklist, status };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -------------------- Maturity --------------------

export async function getMaturity(): Promise<MaturitySnapshot> {
  return readJson<MaturitySnapshot>(maturityFileFor(await repoPath()), defaultSnapshot());
}

export async function saveMaturity(snapshot: MaturitySnapshot): Promise<MaturitySnapshot> {
  await writeJson(maturityFileFor(await repoPath()), snapshot);
  return snapshot;
}

// -------------------- Repo browsing --------------------

export interface RepoFile {
  name: string;
  path: string;          // workspace-relative
  isDirectory: boolean;
  children?: RepoFile[];
}

export async function readRepoTree(rel = ""): Promise<RepoFile[]> {
  const root = await repoPath();
  const abs = path.join(root, rel);
  let entries: import("fs").Dirent[];
  try {
    entries = await fs.readdir(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: RepoFile[] = [];
  for (const e of entries) {
    if (e.name === ".togaf" || e.name === ".git" || e.name === "node_modules") continue;
    const childRel = path.join(rel, e.name);
    if (e.isDirectory()) {
      out.push({
        name: e.name,
        path: childRel,
        isDirectory: true,
        children: await readRepoTree(childRel),
      });
    } else {
      out.push({ name: e.name, path: childRel, isDirectory: false });
    }
  }
  return out.sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory) || a.name.localeCompare(b.name));
}

export async function readRepoFile(rel: string): Promise<string> {
  const root = await repoPath();
  const abs = path.join(root, rel);
  const normalised = path.resolve(abs);
  if (!normalised.startsWith(path.resolve(root))) {
    throw new Error("Path traversal blocked");
  }
  return fs.readFile(normalised, "utf8");
}

// -------------------- Helpers --------------------

export async function activeRepoInfo() {
  const r = await resolveActiveRepo();
  return {
    ...r,
    stateDir: stateDirFor(r.repoPath),
    engagementsFile: engagementsFileFor(r.repoPath),
    maturityFile: maturityFileFor(r.repoPath),
  };
}

export { ADM_PHASES, deliverablesForPhase };
