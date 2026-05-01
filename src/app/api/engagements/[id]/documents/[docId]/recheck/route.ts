import { NextResponse } from "next/server";
import { evaluateAutoChecks, getEngagement, readDocumentBody, saveEngagement } from "@/lib/repo";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;
  const eng = await getEngagement(id);
  if (!eng) return NextResponse.json({ error: "not found" }, { status: 404 });
  const doc = eng.documents[docId];
  if (!doc) return NextResponse.json({ error: "doc not found" }, { status: 404 });
  const body = await readDocumentBody(eng.id, doc);
  eng.documents[docId] = evaluateAutoChecks(doc, body);
  await saveEngagement(eng);
  return NextResponse.json({ ok: true, doc: eng.documents[docId] });
}
