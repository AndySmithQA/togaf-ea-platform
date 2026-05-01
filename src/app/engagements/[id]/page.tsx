import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AdmWheel } from "@/components/adm-wheel";
import { getEngagement } from "@/lib/repo";
import { computePhaseStatus } from "@/lib/rag";
import { ADM_PHASES, deliverablesForPhase } from "@/lib/togaf";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EngagementOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const ps = computePhaseStatus(eng);

  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-[11px] font-mono text-muted-foreground">{eng.id}</div>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">{eng.name}</h1>
          <div className="text-sm text-muted-foreground mt-1">
            Sponsor: {eng.sponsor} · Started {formatDate(eng.createdAt)} · Active phase{" "}
            <Badge variant="outline" className="ml-1">{eng.activePhase}</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm"><Link href={`/engagements/${eng.id}/rfaw`}>RfAW review</Link></Button>
          <Button asChild variant="outline" size="sm"><Link href={`/engagements/${eng.id}/documents`}>Documents</Link></Button>
          <Button asChild variant="outline" size="sm"><Link href={`/engagements/${eng.id}/trade-offs`}>Trade-offs</Link></Button>
          <Button asChild variant="outline" size="sm"><Link href={`/engagements/${eng.id}/business-models`}>Business model</Link></Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ADM cycle status</CardTitle>
            <CardDescription>Click any phase to jump to its deliverables.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <AdmWheel
              phaseStatus={ps}
              activePhase={eng.activePhase}
              engagementId={eng.id}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RfAW status</CardTitle>
            <CardDescription>Trigger of this ADM cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {eng.rfawApproved ? <Badge variant="green">Approved</Badge> : <Badge variant="amber">Pending review</Badge>}
              {eng.rfawApprovedAt && <span className="text-xs text-muted-foreground">{formatDate(eng.rfawApprovedAt)}</span>}
            </div>
            {eng.rfawApprovedBy && <div className="text-xs text-muted-foreground">By {eng.rfawApprovedBy}</div>}
            <div className="pt-2">
              <Button asChild size="sm"><Link href={`/engagements/${eng.id}/rfaw`}>Open RfAW</Link></Button>
            </div>
            {eng.bcdAssessment && (
              <div className="pt-3 text-xs text-muted-foreground border-t mt-3">
                <div className="font-medium text-foreground mb-1">B/C/D auto-assessment ready</div>
                <div>Generated {formatDate(eng.bcdAssessment.generatedAt)}</div>
                <ul className="mt-1 list-disc pl-4 space-y-0.5">
                  <li>{eng.bcdAssessment.business.length} business items</li>
                  <li>{eng.bcdAssessment.data.length} data items</li>
                  <li>{eng.bcdAssessment.application.length} application items</li>
                  <li>{eng.bcdAssessment.technology.length} technology items</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Deliverables by phase</CardTitle>
          <CardDescription>Per-phase rollup of approval status, with quick access to any document.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ADM_PHASES.map((p) => {
            const status = ps[p.id];
            const dels = deliverablesForPhase(p.id);
            return (
              <div key={p.id} className="border rounded-md p-3">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={status?.rag as never}>{status?.rag}</Badge>
                  <div className="font-medium text-sm">Phase {p.letter} — {p.name}</div>
                  <div className="text-xs text-muted-foreground ml-auto">{Math.round((status?.completion ?? 0) * 100)}% approved</div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {dels.map((d) => {
                    const doc = eng.documents[d.id];
                    return (
                      <Link
                        key={d.id}
                        href={`/engagements/${eng.id}/documents/${d.id}`}
                        className="flex items-center gap-2 p-2 rounded hover:bg-accent text-sm border bg-background"
                      >
                        <DocStatusIcon status={doc?.status ?? "missing"} />
                        <span className="truncate flex-1">{d.title}</span>
                      </Link>
                    );
                  })}
                </div>
                <Progress value={(status?.completion ?? 0) * 100} className="h-1 mt-3" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function DocStatusIcon({ status }: { status: "missing" | "draft" | "in-review" | "approved" }) {
  switch (status) {
    case "approved":  return <CheckCircle2 className="h-4 w-4 text-rag-green shrink-0" />;
    case "in-review": return <Clock        className="h-4 w-4 text-rag-amber shrink-0" />;
    case "draft":     return <AlertCircle  className="h-4 w-4 text-rag-amber shrink-0" />;
    default:          return <Circle       className="h-4 w-4 text-rag-grey shrink-0" />;
  }
}
