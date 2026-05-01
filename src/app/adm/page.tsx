import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdmWheel } from "@/components/adm-wheel";
import { ADM_PHASES, deliverablesForPhase } from "@/lib/togaf";
import { computePhaseStatus } from "@/lib/rag";
import { listEngagements } from "@/lib/repo";

export const dynamic = "force-dynamic";

export default async function AdmPage() {
  const engagements = await listEngagements();
  const eng = engagements[0];
  const ps = eng ? computePhaseStatus(eng) : ({} as ReturnType<typeof computePhaseStatus>);

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">ADM Cycle</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">Architecture Development Method</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Reference view of the TOGAF ADM. RAG colouring reflects the active engagement.
        </p>
      </header>

      <div className="grid lg:grid-cols-[480px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ADM corn circle</CardTitle>
            <CardDescription>{eng ? eng.name : "no active engagement"}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {eng && <AdmWheel phaseStatus={ps} activePhase={eng.activePhase} engagementId={eng.id} />}
          </CardContent>
        </Card>

        <div className="space-y-3">
          {ADM_PHASES.map((p) => {
            const dels = deliverablesForPhase(p.id);
            const status = ps[p.id];
            return (
              <Card key={p.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant={(status?.rag ?? "grey") as never}>{status?.rag ?? "grey"}</Badge>
                    <CardTitle className="text-base">Phase {p.letter} — {p.name}</CardTitle>
                  </div>
                  <CardDescription className="mt-1">{p.purpose}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Steps</div>
                    <ol className="list-decimal pl-5 text-xs space-y-0.5">
                      {p.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Deliverables</div>
                    <div className="flex flex-wrap gap-1.5">
                      {dels.map((d) => (
                        <Link
                          key={d.id}
                          href={eng ? `/engagements/${eng.id}/documents/${d.id}` : "/deliverables"}
                          className="text-[11px] border rounded px-2 py-0.5 hover:bg-accent"
                        >
                          {d.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
