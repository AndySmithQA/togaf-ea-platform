import Link from "next/link";
import { notFound } from "next/navigation";
import { getEngagement } from "@/lib/repo";
import { ADM_PHASES, deliverablesForPhase } from "@/lib/togaf";
import { computePhaseStatus } from "@/lib/rag";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DocumentsListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const ps = computePhaseStatus(eng);

  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-[1400px] mx-auto">
      <header>
        <div className="text-[11px] font-mono text-muted-foreground">{eng.id}</div>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">Deliverables</h1>
        <p className="text-sm text-muted-foreground mt-1">All TOGAF 10 deliverables in scope for this engagement.</p>
      </header>

      <div className="space-y-4">
        {ADM_PHASES.map((p) => {
          const status = ps[p.id];
          const dels = deliverablesForPhase(p.id);
          if (dels.length === 0) return null;
          return (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Badge variant={status?.rag as never}>{status?.rag}</Badge>
                  <CardTitle className="text-base">Phase {p.letter} — {p.name}</CardTitle>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {Math.round((status?.completion ?? 0) * 100)}% approved
                  </span>
                </div>
                <Progress value={(status?.completion ?? 0) * 100} className="h-1 mt-1" />
                <CardDescription className="mt-2">{p.purpose}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {dels.map((d) => {
                    const doc = eng.documents[d.id];
                    return (
                      <Link
                        key={d.id}
                        href={`/engagements/${eng.id}/documents/${d.id}`}
                        className="flex flex-col gap-1 p-3 rounded border hover:bg-accent text-sm bg-background"
                      >
                        <div className="flex items-center gap-2">
                          <DocStatusIcon status={doc?.status ?? "missing"} />
                          <span className="font-medium truncate flex-1">{d.title}</span>
                          <Badge variant={statusVariant(doc?.status ?? "missing")} className="ml-auto">{doc?.status ?? "missing"}</Badge>
                        </div>
                        <div className="text-[11px] text-muted-foreground line-clamp-2">{d.description}</div>
                        {doc?.generatedAt && (
                          <div className="text-[10px] text-muted-foreground">
                            Generated {formatDate(doc.generatedAt)} · {doc.generator}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function statusVariant(s: "missing" | "draft" | "in-review" | "approved") {
  return s === "approved" ? "green" : s === "in-review" ? "amber" : s === "draft" ? "amber" : "grey";
}
function DocStatusIcon({ status }: { status: "missing" | "draft" | "in-review" | "approved" }) {
  switch (status) {
    case "approved":  return <CheckCircle2 className="h-4 w-4 text-rag-green shrink-0" />;
    case "in-review": return <Clock        className="h-4 w-4 text-rag-amber shrink-0" />;
    case "draft":     return <AlertCircle  className="h-4 w-4 text-rag-amber shrink-0" />;
    default:          return <Circle       className="h-4 w-4 text-rag-grey shrink-0" />;
  }
}
