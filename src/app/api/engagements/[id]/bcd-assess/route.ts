import { NextResponse } from "next/server";
import { generateBcdAssessment } from "@/lib/llm";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const a = await generateBcdAssessment(id);
    return NextResponse.json({ ok: true, assessment: a });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
