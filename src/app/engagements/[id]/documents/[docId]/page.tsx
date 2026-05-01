import Link from "next/link";
import { notFound } from "next/navigation";
import { getEngagement, readDocumentBody } from "@/lib/repo";
import { DELIVERABLES_BY_ID } from "@/lib/togaf";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { ChecklistPanel } from "@/components/checklist-panel";
import { ChevronLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string; docId: string }>;
}) {
  const { id, docId } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const def = DELIVERABLES_BY_ID[docId];
  const doc = eng.documents[docId];
  if (!def || !doc) notFound();

  const body = await readDocumentBody(eng.id, doc);

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/engagements/${eng.id}/documents`}><ChevronLeft className="h-3 w-3" /> Back to deliverables</Link>
        </Button>
      </div>
      <header className="flex flex-wrap items-end gap-3 justify-between">
        <div>
          <div className="text-[11px] font-mono text-muted-foreground">
            {eng.id} · phase {def.phase}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{def.title}</h1>
          <p className="text-sm text-muted-foreground max-w-3xl mt-1">{def.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={badgeFor(doc.status) as never}>{doc.status}</Badge>
          {doc.generatedAt && (
            <span className="text-[11px] text-muted-foreground">Generated {formatDate(doc.generatedAt)} · {doc.generator}</span>
          )}
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Document body</CardTitle>
            <CardDescription>
              Source: <code className="text-[11px]">architecture-repository/engagements/{eng.id}/{doc.filename}</code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {body ? (
              <Markdown>{body}</Markdown>
            ) : (
              <div className="text-sm text-muted-foreground p-6 text-center border-dashed border rounded">
                This document has not been authored yet. Use the agent in the side panel to (re)generate it from the
                RfAW + Vision + prior approved deliverables.
              </div>
            )}
          </CardContent>
        </Card>

        <ChecklistPanel engagementId={eng.id} doc={doc} />
      </div>
    </div>
  );
}

function badgeFor(s: string) {
  return s === "approved" ? "green" : s === "in-review" ? "amber" : s === "draft" ? "amber" : "grey";
}
