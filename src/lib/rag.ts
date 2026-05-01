import { ADM_PHASES, deliverablesForPhase, type ADMPhase } from "./togaf";
import type { EngagementState, PhaseStatus, RAG } from "@/types";

/**
 * Compute RAG status per ADM phase.
 *
 *   green  = all deliverables for the phase are signed off
 *   amber  = at least one deliverable is in-review or draft
 *   red    = phase has been entered (active or earlier in the cycle order)
 *            but no deliverables yet exist
 *   grey   = phase has not yet been entered
 */
export function computePhaseStatus(state: EngagementState): Record<ADMPhase, PhaseStatus> {
  const orderedActive = phaseOrderUpTo(state.activePhase);
  const out: Record<string, PhaseStatus> = {};

  for (const p of ADM_PHASES) {
    const dels = deliverablesForPhase(p.id);
    const docs = dels
      .map((d) => state.documents[d.id])
      .filter((d): d is NonNullable<typeof d> => Boolean(d));

    const total = dels.length || 1;
    const approved = docs.filter((d) => d.status === "approved").length;
    const drafted = docs.filter((d) => d.status !== "missing").length;
    const completion = approved / total;

    let rag: RAG;
    const phaseEntered = orderedActive.includes(p.id);
    if (drafted === 0 && !phaseEntered) rag = "grey";
    else if (drafted === 0 && phaseEntered) rag = "red";
    else if (approved === total) rag = "green";
    else rag = "amber";

    out[p.id] = {
      phase: p.id,
      rag,
      completion,
      notes:
        approved === total
          ? "All deliverables approved."
          : `${approved}/${total} approved · ${drafted}/${total} drafted`,
    };
  }
  return out as Record<ADMPhase, PhaseStatus>;
}

/** Linear order in which the ADM phases are typically entered. */
export const PHASE_ORDER: ADMPhase[] = [
  "P", "A", "B", "C-D", "C-A", "D", "E", "F", "G", "H",
];

function phaseOrderUpTo(active: ADMPhase): ADMPhase[] {
  const idx = PHASE_ORDER.indexOf(active);
  if (idx === -1) return PHASE_ORDER;
  return PHASE_ORDER.slice(0, idx + 1);
}

export function ragColor(rag: RAG): string {
  switch (rag) {
    case "red": return "hsl(0 84% 55%)";
    case "amber": return "hsl(35 95% 55%)";
    case "green": return "hsl(142 70% 42%)";
    case "grey": return "hsl(220 10% 60%)";
  }
}

export function ragLabel(rag: RAG): string {
  return { red: "Red", amber: "Amber", green: "Green", grey: "Not started" }[rag];
}
