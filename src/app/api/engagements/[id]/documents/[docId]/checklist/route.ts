import { NextResponse } from "next/server";
import { getEngagement, saveEngagement } from "@/lib/repo";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;
  const body = (await req.json().catch(() => ({}))) as {
    itemId?: string;
    checked?: boolean;
    by?: string;
  };
  if (!body.itemId) return NextResponse.json({ error: "itemId required" }, { status: 400 });

  const eng = await getEngagement(id);
  if (!eng) return NextResponse.json({ error: "not found" }, { status: 404 });
  const doc = eng.documents[docId];
  if (!doc) return NextResponse.json({ error: "doc not found" }, { status: 404 });

  const item = doc.checklist.find((c) => c.id === body.itemId);
  if (!item) return NextResponse.json({ error: "item not found" }, { status: 404 });
  if (item.kind !== "manual") {
    return NextResponse.json({ error: "auto items are not manually toggleable" }, { status: 400 });
  }
  item.checked = Boolean(body.checked);
  item.checkedBy = item.checked ? body.by || "Reviewer" : undefined;
  item.checkedAt = item.checked ? new Date().toISOString() : undefined;
  await saveEngagement(eng);
  return NextResponse.json({ ok: true, item });
}
