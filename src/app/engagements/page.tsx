import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listEngagements } from "@/lib/repo";
import { computePhaseStatus } from "@/lib/rag";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EngagementsPage() {
  const engagements = await listEngagements();
  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-[1400px] mx-auto">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Engagements</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">ADM Engagements</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Each engagement is one cycle of the TOGAF Architecture Development Method.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {engagements.map((e) => {
          const ps = computePhaseStatus(e);
          const total = Object.keys(e.documents).length;
          const approved = Object.values(e.documents).filter((d) => d.status === "approved").length;
          return (
            <Card key={e.id}>
              <CardHeader>
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{e.id}</div>
                    <CardTitle className="mt-1">{e.name}</CardTitle>
                    <CardDescription className="mt-1">Sponsor: {e.sponsor}</CardDescription>
                  </div>
                  <Badge variant="outline">Phase {e.activePhase}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                  <span>Started {formatDate(e.createdAt)}</span>
                  <span>RfAW {e.rfawApproved ? <Badge variant="green" className="ml-1">Approved</Badge> : <Badge variant="amber" className="ml-1">Pending</Badge>}</span>
                  <span>Deliverables: <strong className="text-foreground">{approved}/{total}</strong> approved</span>
                </div>
                <div className="grid grid-cols-11 gap-1">
                  {Object.entries(ps).map(([phase, s]) => (
                    <div
                      key={phase}
                      title={`${phase}: ${s.rag} (${Math.round(s.completion * 100)}%)`}
                      className={`h-3 rounded-sm bg-rag-${s.rag}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm"><Link href={`/engagements/${e.id}`}>Open</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link href={`/engagements/${e.id}/rfaw`}>RfAW</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link href={`/engagements/${e.id}/documents`}>Documents</Link></Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
