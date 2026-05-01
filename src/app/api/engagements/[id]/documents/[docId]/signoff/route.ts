import { NextResponse } from "next/server";
import { getEngagement, saveEngagement } from "@/lib/repo";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;
  const body = (await req.json().catch(() => ({}))) as { by?: string; comment?: string };
  if (!body.by) return NextResponse.json({ error: "by required" }, { status: 400 });

  const eng = await getEngagement(id);
  if (!eng) return NextResponse.json({ error: "not found" }, { status: 404 });
  const doc = eng.documents[docId];
  if (!doc) return NextResponse.json({ error: "doc not found" }, { status: 404 });

  const autoFail = doc.checklist.some((c) => c.kind === "auto" && c.autoResult !== "pass");
  const manualFail = doc.checklist.some((c) => c.kind === "manual" && !c.checked);
  if (autoFail || manualFail) {
    return NextResponse.json(
      { error: "Cannot sign off: checklist incomplete (auto or manual items still failing)." },
      { status: 400 }
    );
  }

  doc.signoff = {
    signedOff: true,
    signedOffBy: body.by,
    signedOffAt: new Date().toISOString(),
    comment: body.comment,
  };
  doc.status = "approved";
  await saveEngagement(eng);
  return NextResponse.json({ ok: true, doc });
}
