import type { MaturityScore, MaturitySnapshot } from "@/types";

/**
 * TOGAF Architecture Capability Framework (ACF) maturity scoring.
 *
 * Levels follow the canonical 0–5 scale used by the ACMM (which TOGAF
 * incorporates by reference for capability assessment):
 *
 *   0 = None          — no capability or not performed
 *   1 = Initial       — ad hoc, individuals only
 *   2 = Under Devt    — repeatable, basic processes documented
 *   3 = Defined       — institutionalised, standardised
 *   4 = Managed       — measured and controlled with KPIs
 *   5 = Measured      — continuously optimised
 */

export const MATURITY_LEVELS = [
  { level: 0, name: "None", description: "Capability is absent or ad hoc with no consistency." },
  { level: 1, name: "Initial", description: "Individual heroics; some processes exist but are not repeated." },
  { level: 2, name: "Under Development", description: "Basic processes are documented and repeatable in places." },
  { level: 3, name: "Defined", description: "Institutionalised, tailored from organisation-wide standards." },
  { level: 4, name: "Managed", description: "Measured against KPIs, controlled by quantitative data." },
  { level: 5, name: "Measured", description: "Continuously improved through quantitative feedback." },
] as const;

export const ACF_DIMENSIONS: MaturityScore["dimension"][] = [
  "Architecture Governance",
  "Architecture Capability",
  "Architecture Skills",
  "Architecture Method (ADM)",
  "Reference Models & Standards",
  "Architecture Repository",
  "Architecture Compliance",
  "Stakeholder Engagement",
];

export function overallMaturity(scores: MaturityScore[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((acc, s) => acc + s.level, 0);
  return Math.round((total / scores.length) * 10) / 10;
}

export function defaultSnapshot(): MaturitySnapshot {
  const scores: MaturityScore[] = ACF_DIMENSIONS.map((dimension) => ({
    dimension,
    level: 2,
    comment: "Baseline derived from initial capability assessment.",
  }));
  return {
    capturedAt: new Date().toISOString(),
    framework: "TOGAF ACF",
    scores,
    overall: overallMaturity(scores),
  };
}

export function maturityLevelName(level: number): string {
  const lv = MATURITY_LEVELS[Math.max(0, Math.min(5, Math.round(level)))];
  return lv.name;
}
