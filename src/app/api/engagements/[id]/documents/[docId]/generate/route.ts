import { NextResponse } from "next/server";
import { generateDeliverable } from "@/lib/llm";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const { id, docId } = await params;
  try {
    const result = await generateDeliverable({ engagementId: id, deliverableId: docId });
    return NextResponse.json({
      ok: true,
      mode: result.mode,
      doc: result.doc,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "generation failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
