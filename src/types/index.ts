import type { ADMPhase } from "@/lib/togaf";

export type RAG = "red" | "amber" | "green" | "grey";

export interface ChecklistItem {
  id: string;
  label: string;
  /**
   * "auto" — evaluated by the platform (e.g. "heading X exists in the markdown").
   * "manual" — must be ticked by a human reviewer.
   */
  kind: "auto" | "manual";
  /** For auto items: the markdown heading that must be present in the doc body. */
  requiredHeading?: string;
  checked: boolean;
  checkedBy?: string;
  checkedAt?: string;
  /** For auto items: result of the latest automatic evaluation. */
  autoResult?: "pass" | "fail";
}

export interface DocumentSignoff {
  signedOff: boolean;
  signedOffBy?: string;
  signedOffAt?: string;
  comment?: string;
}

export interface DocumentRecord {
  id: string;                 // deliverable id (e.g. "architecture-vision")
  filename: string;           // path on disk relative to engagement root
  title: string;
  phase: ADMPhase;
  status: "missing" | "draft" | "in-review" | "approved";
  generatedAt?: string;
  generator?: "template" | "llm";
  checklist: ChecklistItem[];
  signoff: DocumentSignoff;
}

export interface PhaseStatus {
  phase: ADMPhase;
  rag: RAG;
  completion: number;         // 0..1 across deliverables in this phase
  notes?: string;
}

export interface EngagementState {
  id: string;
  name: string;
  sponsor: string;
  createdAt: string;
  rfawApproved: boolean;
  rfawApprovedBy?: string;
  rfawApprovedAt?: string;
  /** The current ADM phase the engagement is active in. */
  activePhase: ADMPhase;
  documents: Record<string, DocumentRecord>;
  phaseStatus: Record<ADMPhase, PhaseStatus>;
  /** Auto-derived list of work needed at B/C/D from the RfAW + Vision. */
  bcdAssessment?: BcdAssessment;
}

export interface BcdAssessment {
  generatedFrom: { rfaw: string; vision?: string };
  generatedAt: string;
  business: BcdItem[];
  data: BcdItem[];
  application: BcdItem[];
  technology: BcdItem[];
  notes: string;
}

export interface BcdItem {
  title: string;
  rationale: string;
  effort: "S" | "M" | "L";
  risk: "low" | "medium" | "high";
}

export interface MaturityScore {
  /** TOGAF Architecture Capability Framework dimensions. */
  dimension:
    | "Architecture Governance"
    | "Architecture Capability"
    | "Architecture Skills"
    | "Architecture Method (ADM)"
    | "Reference Models & Standards"
    | "Architecture Repository"
    | "Architecture Compliance"
    | "Stakeholder Engagement";
  /** 0..5 (None / Initial / Under Development / Defined / Managed / Measured). */
  level: number;
  comment?: string;
}

export interface MaturitySnapshot {
  capturedAt: string;
  framework: "TOGAF ACF";
  scores: MaturityScore[];
  overall: number;
}
