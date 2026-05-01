import OpenAI from "openai";
import { DELIVERABLES_BY_ID, type DeliverableDef } from "./togaf";
import { buildPrompt } from "./prompts";
import {
  getEngagement,
  readDocumentBody,
  saveEngagement,
  writeDocumentBody,
  evaluateAutoChecks,
} from "./repo";
import type { BcdAssessment, EngagementState } from "@/types";

function client(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL?.trim() || undefined,
  });
}

export const LLM_MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

/**
 * Generate a deliverable for an engagement and persist it.
 *
 * - When OPENAI_API_KEY is set: live LLM call.
 * - When unset: deterministic template stub so the platform stays usable
 *   without an API key. Either way the markdown lands on disk and
 *   auto-checks are re-evaluated.
 */
export async function generateDeliverable(args: {
  engagementId: string;
  deliverableId: string;
}): Promise<{ doc: EngagementState["documents"][string]; mode: "llm" | "template"; body: string }> {
  const eng = await getEngagement(args.engagementId);
  if (!eng) throw new Error(`Engagement not found: ${args.engagementId}`);
  const def = DELIVERABLES_BY_ID[args.deliverableId];
  if (!def) throw new Error(`Unknown deliverable: ${args.deliverableId}`);

  const rfaw = eng.documents["request-for-architecture-work"];
  const vision = eng.documents["architecture-vision"];
  const soaw = eng.documents["statement-of-architecture-work"];

  const rfawBody = rfaw ? await readDocumentBody(eng.id, rfaw) : "";
  const visionBody = vision ? await readDocumentBody(eng.id, vision) : "";
  const soawBody = soaw ? await readDocumentBody(eng.id, soaw) : "";

  const priorDocs: { id: string; title: string; body: string }[] = [];
  for (const id of Object.keys(eng.documents)) {
    if (id === args.deliverableId) continue;
    const d = eng.documents[id];
    if (d.status === "approved") {
      const body = await readDocumentBody(eng.id, d);
      if (body) priorDocs.push({ id, title: d.title, body });
    }
  }

  const c = client();
  let body: string;
  let mode: "llm" | "template" = "template";

  if (c) {
    const { system, user } = buildPrompt({
      deliverable: def,
      engagement: { id: eng.id, name: eng.name, sponsor: eng.sponsor },
      rfawBody,
      visionBody,
      soawBody,
      priorDocs,
    });
    try {
      const completion = await c.chat.completions.create({
        model: LLM_MODEL,
        temperature: 0.4,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      });
      body = completion.choices[0]?.message?.content?.trim() || "";
      mode = "llm";
    } catch (err) {
      console.error("LLM generation failed, falling back to template:", err);
      body = templateBody(def, eng);
    }
  } else {
    body = templateBody(def, eng);
  }

  await writeDocumentBody(eng.id, eng.documents[args.deliverableId], body);
  let updated = evaluateAutoChecks(eng.documents[args.deliverableId], body);
  updated = { ...updated, generatedAt: new Date().toISOString(), generator: mode, status: "in-review" };
  eng.documents[args.deliverableId] = updated;
  const saved = await saveEngagement(eng);
  return { doc: saved.documents[args.deliverableId], mode, body };
}

function templateBody(def: DeliverableDef, eng: EngagementState): string {
  const lines: string[] = [];
  lines.push(`# ${def.title}`);
  lines.push("");
  lines.push(`> Engagement: **${eng.name}** (${eng.id}) · Sponsor: ${eng.sponsor}`);
  lines.push(`> Generated: ${new Date().toISOString()} · Mode: deterministic template`);
  lines.push("");
  lines.push(`_${def.description}_`);
  lines.push("");
  for (const s of def.sections) {
    lines.push(`## ${s}`);
    lines.push("");
    lines.push("> ASSUMPTION: Replace with engagement-specific content.");
    lines.push("");
    lines.push(`*To be developed by the EA team for ${eng.name}.*`);
    lines.push("");
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// BCD assessment (Phases B, C, D needs derived from RfAW + Vision)
// ---------------------------------------------------------------------------

export async function generateBcdAssessment(engagementId: string): Promise<BcdAssessment> {
  const eng = await getEngagement(engagementId);
  if (!eng) throw new Error(`Engagement not found: ${engagementId}`);
  const rfaw = eng.documents["request-for-architecture-work"];
  const vision = eng.documents["architecture-vision"];
  const rfawBody = rfaw ? await readDocumentBody(eng.id, rfaw) : "";
  const visionBody = vision ? await readDocumentBody(eng.id, vision) : "";

  const c = client();
  let assessment: BcdAssessment;

  if (c) {
    const sys = `You are a TOGAF 10 Lead Architect. Given a Request for Architecture Work and an Architecture Vision, list the work needed at ADM Phases B (Business), C (Data + Application) and D (Technology) to satisfy the Vision. Respond ONLY with valid JSON of the shape:
{
  "business": [{"title":"...","rationale":"...","effort":"S|M|L","risk":"low|medium|high"}],
  "data":     [{"title":"...","rationale":"...","effort":"S|M|L","risk":"low|medium|high"}],
  "application": [{"title":"...","rationale":"...","effort":"S|M|L","risk":"low|medium|high"}],
  "technology": [{"title":"...","rationale":"...","effort":"S|M|L","risk":"low|medium|high"}],
  "notes": "executive summary, max 5 sentences"
}
6–10 items per domain.`;
    const user = `## Request for Architecture Work\n${rfawBody}\n\n## Architecture Vision\n${visionBody}`;
    try {
      const completion = await c.chat.completions.create({
        model: LLM_MODEL,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
      });
      const raw = completion.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(raw);
      assessment = {
        generatedFrom: { rfaw: "request-for-architecture-work", vision: "architecture-vision" },
        generatedAt: new Date().toISOString(),
        business: parsed.business ?? [],
        data: parsed.data ?? [],
        application: parsed.application ?? [],
        technology: parsed.technology ?? [],
        notes: parsed.notes ?? "",
      };
    } catch (err) {
      console.error("BCD generation failed; using template:", err);
      assessment = templateBcd();
    }
  } else {
    assessment = templateBcd();
  }
  eng.bcdAssessment = assessment;
  await saveEngagement(eng);
  return assessment;
}

function templateBcd(): BcdAssessment {
  return {
    generatedFrom: { rfaw: "request-for-architecture-work", vision: "architecture-vision" },
    generatedAt: new Date().toISOString(),
    business: [
      { title: "Define target operating model for omnichannel sales", rationale: "RfAW calls out fragmented channel ownership.", effort: "L", risk: "high" },
      { title: "Map customer value streams across digital/store/contact-centre", rationale: "Vision requires single customer view.", effort: "M", risk: "medium" },
      { title: "Re-baseline business capability model", rationale: "Existing capability map is 4 years stale.", effort: "M", risk: "low" },
      { title: "Define KPI tree linked to OKRs", rationale: "Vision lists outcome KPIs that lack measurement.", effort: "S", risk: "low" },
    ],
    data: [
      { title: "Single Customer Identity (golden record)", rationale: "Required to unify orders across channels.", effort: "L", risk: "high" },
      { title: "Master data governance for product catalog", rationale: "Catalog drift between e-com and POS today.", effort: "M", risk: "medium" },
      { title: "Event taxonomy for order lifecycle", rationale: "Needed for real-time order orchestration.", effort: "M", risk: "medium" },
      { title: "PII data classification and retention policy", rationale: "GDPR exposure flagged in RfAW.", effort: "S", risk: "high" },
    ],
    application: [
      { title: "Headless commerce platform selection", rationale: "Vision target: composable storefronts.", effort: "L", risk: "high" },
      { title: "Order orchestration service (OMS) modernisation", rationale: "Existing monolith is the bottleneck.", effort: "L", risk: "high" },
      { title: "API gateway and BFF pattern adoption", rationale: "Decouple channel apps from core services.", effort: "M", risk: "medium" },
      { title: "Customer Identity & Access Management (CIAM)", rationale: "Required for unified login.", effort: "M", risk: "medium" },
      { title: "Decommission legacy CRM portal", rationale: "Replaced by new CIAM + service desk integration.", effort: "S", risk: "low" },
    ],
    technology: [
      { title: "Cloud landing zone (multi-account, hub-and-spoke)", rationale: "Vision targets cloud-first deployment.", effort: "L", risk: "medium" },
      { title: "Event streaming backbone (Kafka or equivalent)", rationale: "Underpins event-driven order lifecycle.", effort: "M", risk: "medium" },
      { title: "Container platform (Kubernetes) with golden paths", rationale: "Standardise compute for new microservices.", effort: "M", risk: "medium" },
      { title: "Observability stack (logs/metrics/traces)", rationale: "Currently siloed per app team.", effort: "M", risk: "low" },
      { title: "Zero-trust network reference design", rationale: "Mandated by Architecture Principles.", effort: "M", risk: "medium" },
    ],
    notes:
      "Phases B–D will deliver the foundational building blocks for an omnichannel commerce capability. Highest-risk items are CIAM, OMS modernisation and the Single Customer Identity — these should drive the Phase E roadmap sequencing.",
  };
}
