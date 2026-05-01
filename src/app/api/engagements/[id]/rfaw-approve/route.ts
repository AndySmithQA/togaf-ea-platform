import { NextResponse } from "next/server";
import { getEngagement, saveEngagement } from "@/lib/repo";
import { generateBcdAssessment } from "@/lib/llm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { by?: string };
  const eng = await getEngagement(id);
  if (!eng) return NextResponse.json({ error: "not found" }, { status: 404 });
  eng.rfawApproved = true;
  eng.rfawApprovedBy = body.by || "Architecture Board";
  eng.rfawApprovedAt = new Date().toISOString();
  await saveEngagement(eng);
  // After RfAW approval, derive B/C/D needs.
  const assessment = await generateBcdAssessment(id);
  return NextResponse.json({ ok: true, rfawApproved: true, assessment });
}
