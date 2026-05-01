import type { DeliverableDef } from "./togaf";

/**
 * Returns the system + user prompt used to generate a TOGAF deliverable.
 * The user prompt always passes the RfAW + Architecture Vision body and
 * any prior deliverables so each new doc traces back to the SoAW.
 */
export function buildPrompt(args: {
  deliverable: DeliverableDef;
  engagement: { id: string; name: string; sponsor: string };
  rfawBody?: string;
  visionBody?: string;
  soawBody?: string;
  priorDocs: { id: string; title: string; body: string }[];
}): { system: string; user: string } {
  const { deliverable, engagement, rfawBody, visionBody, soawBody, priorDocs } = args;
  const system = `You are an experienced TOGAF 10 Lead Enterprise Architect.
You produce concise, well-structured Architecture deliverables in Markdown.
Rules:
- Always start with a single H1 of the deliverable title.
- Use the EXACT section headings provided as H2.
- Be specific to the engagement context. Invent realistic but plausible details where the source documents are silent — flag every such assumption inside an "> ASSUMPTION:" blockquote.
- Use tables for catalogs, matrices and gap analyses.
- Keep it under ~700 lines of markdown.
- Never include LLM disclaimers, code fences around the whole document, or JSON.`;

  const sections = deliverable.sections.map((s) => `- ${s}`).join("\n");
  const priors = priorDocs
    .map((d) => `### ${d.title} (${d.id})\n\n${truncate(d.body, 1200)}`)
    .join("\n\n");

  const user = `Generate the **${deliverable.title}** deliverable for engagement \
"${engagement.name}" (id: ${engagement.id}, sponsor: ${engagement.sponsor}).

Required H2 sections (in this order):
${sections}

## Source: Request for Architecture Work (RfAW)
${truncate(rfawBody ?? "(not yet available)", 2000)}

## Source: Architecture Vision
${truncate(visionBody ?? "(not yet available)", 2000)}

## Source: Statement of Architecture Work (SoAW)
${truncate(soawBody ?? "(not yet available)", 2000)}

## Prior approved deliverables
${priors || "(none)"}
`;

  return { system, user };
}

function truncate(s: string, n: number): string {
  if (!s) return "";
  return s.length > n ? s.slice(0, n) + "\n…\n[truncated]" : s;
}
