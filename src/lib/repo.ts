import { promises as fs } from "fs";
import path from "path";
import { DELIVERABLES_BY_ID, deliverablesForPhase, ADM_PHASES, type DeliverableDef } from "./togaf";
import { computePhaseStatus } from "./rag";
import { defaultSnapshot } from "./maturity";
import type {
  EngagementState,
  DocumentRecord,
  ChecklistItem,
  MaturitySnapshot,
} from "@/types";

const ROOT = process.cwd();
export const REPO_ROOT = path.join(ROOT, "architecture-repository");
export const ENGAGEMENTS_DIR = path.join(REPO_ROOT, "engagements");
export const DATA_DIR = path.join(ROOT, "data");
const ENG_STATE_FILE = path.join(DATA_DIR, "engagements.json");
const MATURITY_FILE = path.join(DATA_DIR, "maturity.json");

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
  const all = await readJson<Record<string, EngagementState>>(ENG_STATE_FILE, {});
  return Object.values(all).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEngagement(id: string): Promise<EngagementState | null> {
  const all = await readJson<Record<string, EngagementState>>(ENG_STATE_FILE, {});
  return all[id] ?? null;
}

export async function saveEngagement(state: EngagementState): Promise<EngagementState> {
  const all = await readJson<Record<string, EngagementState>>(ENG_STATE_FILE, {});
  state.phaseStatus = computePhaseStatus(state);
  all[state.id] = state;
  await writeJson(ENG_STATE_FILE, all);
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

export function engagementDir(id: string): string {
  return path.join(ENGAGEMENTS_DIR, id);
}

export async function readDocumentBody(id: string, doc: DocumentRecord): Promise<string> {
  try {
    const file = path.join(engagementDir(id), doc.filename);
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
  const dir = engagementDir(id);
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
  // status promotion: any body present => "draft"
  let status = doc.status;
  if (body.trim().length > 0 && status === "missing") status = "draft";
  return { ...doc, checklist: newChecklist, status };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -------------------- Maturity --------------------

export async function getMaturity(): Promise<MaturitySnapshot> {
  return readJson<MaturitySnapshot>(MATURITY_FILE, defaultSnapshot());
}

export async function saveMaturity(snapshot: MaturitySnapshot): Promise<MaturitySnapshot> {
  await writeJson(MATURITY_FILE, snapshot);
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
  const abs = path.join(REPO_ROOT, rel);
  let entries: import("fs").Dirent[];
  try {
    entries = await fs.readdir(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: RepoFile[] = [];
  for (const e of entries) {
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
  const abs = path.join(REPO_ROOT, rel);
  const normalised = path.resolve(abs);
  if (!normalised.startsWith(path.resolve(REPO_ROOT))) {
    throw new Error("Path traversal blocked");
  }
  return fs.readFile(normalised, "utf8");
}

// re-export for convenience
export { ADM_PHASES, deliverablesForPhase };
