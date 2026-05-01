import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/markdown";
import { getEngagement, readDocumentBody } from "@/lib/repo";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

const CANVAS_BLOCKS: { key: string; title: string; col: string; row: string }[] = [
  { key: "Key Partnerships",         title: "Key Partnerships",       col: "col-span-1", row: "row-span-2" },
  { key: "Key Activities",           title: "Key Activities",         col: "col-span-1", row: "row-span-1" },
  { key: "Value Propositions",       title: "Value Propositions",     col: "col-span-1", row: "row-span-2" },
  { key: "Customer Relationships",   title: "Customer Relationships", col: "col-span-1", row: "row-span-1" },
  { key: "Customer Segments",        title: "Customer Segments",      col: "col-span-1", row: "row-span-2" },
  { key: "Key Resources",            title: "Key Resources",          col: "col-span-1", row: "row-span-1" },
  { key: "Channels",                 title: "Channels",               col: "col-span-1", row: "row-span-1" },
  { key: "Cost Structure",           title: "Cost Structure",         col: "col-span-2", row: "row-span-1" },
  { key: "Revenue Streams",          title: "Revenue Streams",        col: "col-span-3", row: "row-span-1" },
];

function extractSection(md: string, heading: string): string {
  const re = new RegExp(`(^|\\n)#{1,6}\\s+${escape(heading)}\\s*\\n([\\s\\S]*?)(?=\\n#{1,6}\\s|$)`, "i");
  const m = md.match(re);
  return (m?.[2] ?? "").trim();
}

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function BusinessModelsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const doc = eng.documents["business-models"];
  const body = doc ? await readDocumentBody(eng.id, doc) : "";

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/engagements/${eng.id}`}><ChevronLeft className="h-3 w-3" /> Back to engagement</Link>
        </Button>
      </div>
      <header className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="text-[11px] font-mono text-muted-foreground">{eng.id}</div>
          <h1 className="text-2xl font-semibold tracking-tight">Business model</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Business Model Canvas derived from the SoAW + Vision + Change Request.
          </p>
        </div>
        <Badge variant={(doc?.status === "approved" ? "green" : doc?.status === "in-review" ? "amber" : "grey") as never}>
          {doc?.status ?? "missing"}
        </Badge>
      </header>

      {body ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Business Model Canvas</CardTitle>
            <CardDescription>Click any block to view its source markdown extract.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 min-h-[460px]">
              {CANVAS_BLOCKS.map((b) => {
                const content = extractSection(body, b.key);
                return (
                  <div key={b.key} className={`${b.col} ${b.row} border rounded-md p-2 bg-card overflow-hidden flex flex-col`}>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">{b.title}</div>
                    <div className="text-[11px] flex-1 overflow-y-auto prose-doc">
                      {content ? <Markdown>{content}</Markdown> : <span className="text-muted-foreground italic">empty</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-sm text-muted-foreground p-6 text-center">
            No business model document yet. Generate one from the document workspace.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Full business-model document</CardTitle>
          <CardDescription>Source: <code className="text-[11px]">E-business-models.md</code></CardDescription>
        </CardHeader>
        <CardContent>
          {body ? <Markdown>{body}</Markdown> : <p className="text-sm text-muted-foreground">No content yet.</p>}
          <div className="pt-3 mt-3 border-t flex justify-end">
            <Button asChild size="sm">
              <Link href={`/engagements/${eng.id}/documents/business-models`}>Open in document workspace</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
