import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AdmWheel } from "@/components/adm-wheel";
import { MaturityRadar } from "@/components/maturity-radar";
import { getMaturity, listEngagements } from "@/lib/repo";
import { computePhaseStatus } from "@/lib/rag";
import { maturityLevelName } from "@/lib/maturity";
import { ADM_PHASES } from "@/lib/togaf";
import { ArrowRight, ShieldCheck, AlertTriangle, FileCheck2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [maturity, engagements] = await Promise.all([getMaturity(), listEngagements()]);
  const primary = engagements[0];
  const ps = primary ? computePhaseStatus(primary) : ({} as ReturnType<typeof computePhaseStatus>);

  const totalDocs = primary ? Object.keys(primary.documents).length : 0;
  const approved = primary
    ? Object.values(primary.documents).filter((d) => d.status === "approved").length
    : 0;
  const inReview = primary
    ? Object.values(primary.documents).filter((d) => d.status === "in-review").length
    : 0;
  const draft = primary
    ? Object.values(primary.documents).filter((d) => d.status === "draft").length
    : 0;
  const missing = primary
    ? Object.values(primary.documents).filter((d) => d.status === "missing").length
    : 0;

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Enterprise Architecture · TOGAF® 10</div>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">Architecture Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live view of EA maturity, the ADM cycle and engagement deliverables across the enterprise.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm"><Link href="/repository">Browse repository</Link></Button>
          <Button asChild size="sm"><Link href="/engagements">View engagements <ArrowRight className="h-3.5 w-3.5" /></Link></Button>
        </div>
      </header>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>EA Maturity (TOGAF ACF)</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {maturity.overall.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/ 5</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(maturity.overall / 5) * 100} />
            <div className="text-[11px] text-muted-foreground mt-2">{maturityLevelName(maturity.overall)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active engagement</CardDescription>
            <CardTitle className="text-base">{primary?.name ?? "—"}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-0.5">
            <div>Sponsor: {primary?.sponsor ?? "—"}</div>
            <div>Started: {primary ? formatDate(primary.createdAt) : "—"}</div>
            <div>Active phase: <Badge variant="outline" className="ml-1">{primary?.activePhase ?? "—"}</Badge></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Deliverables</CardDescription>
            <CardTitle className="text-2xl">{approved}<span className="text-sm font-normal text-muted-foreground"> / {totalDocs} approved</span></CardTitle>
          </CardHeader>
          <CardContent className="text-[11px] text-muted-foreground space-y-1">
            <div className="flex justify-between"><span>In review</span><span>{inReview}</span></div>
            <div className="flex justify-between"><span>Draft</span><span>{draft}</span></div>
            <div className="flex justify-between"><span>Missing</span><span>{missing}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open compliance findings</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">0 <span className="text-xs text-muted-foreground font-normal">critical</span></CardTitle>
          </CardHeader>
          <CardContent className="text-[11px] text-muted-foreground space-y-1">
            <div className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-rag-green" /> No outstanding criticals</div>
            <div className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-rag-amber" /> 2 observations open</div>
          </CardContent>
        </Card>
      </div>

      {/* ADM corn circle + Maturity radar */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>ADM cycle — RAG by phase</CardTitle>
            <CardDescription>The TOGAF ADM &ldquo;corn circle&rdquo; coloured by RAG status from the active engagement.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {primary && (
              <AdmWheel
                phaseStatus={ps}
                activePhase={primary.activePhase}
                engagementId={primary.id}
              />
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 w-full">
              <Legend color="bg-rag-green"   label="On track" />
              <Legend color="bg-rag-amber"   label="Underway"  />
              <Legend color="bg-rag-red"     label="At risk"   />
              <Legend color="bg-rag-grey"    label="Not started" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Architecture Capability — TOGAF ACF radar</CardTitle>
            <CardDescription>Maturity by dimension (0..5). Captured {formatDate(maturity.capturedAt)}.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <MaturityRadar scores={maturity.scores} />
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs w-full">
              {maturity.scores.map((s) => (
                <div key={s.dimension} className="flex justify-between">
                  <span className="text-muted-foreground truncate pr-2">{s.dimension}</span>
                  <span className="font-mono">{s.level} · {maturityLevelName(s.level)}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 self-end">
              <Button asChild variant="ghost" size="sm"><Link href="/maturity">Open maturity →</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase status table */}
      <Card>
        <CardHeader>
          <CardTitle>Phase status — {primary?.name ?? ""}</CardTitle>
          <CardDescription>Each phase shows RAG, completion, and a deep-link to its deliverables.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground border-b">
                <tr>
                  <th className="py-2 pr-3">Phase</th>
                  <th className="py-2 pr-3">RAG</th>
                  <th className="py-2 pr-3">Completion</th>
                  <th className="py-2 pr-3 hidden md:table-cell">Notes</th>
                  <th className="py-2 pr-3 hidden lg:table-cell">Outputs</th>
                </tr>
              </thead>
              <tbody>
                {ADM_PHASES.map((p) => {
                  const s = ps[p.id];
                  const ragVariant = s?.rag ?? "grey";
                  return (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-accent/40">
                      <td className="py-2 pr-3">
                        <span className="font-mono text-xs mr-2 inline-block w-6">{p.letter}</span>
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="py-2 pr-3"><Badge variant={ragVariant as never}>{s?.rag ?? "grey"}</Badge></td>
                      <td className="py-2 pr-3 w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={(s?.completion ?? 0) * 100} className="h-1.5" />
                          <span className="text-[11px] tabular-nums w-9 text-right">{Math.round((s?.completion ?? 0) * 100)}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3 hidden md:table-cell text-xs text-muted-foreground">{s?.notes}</td>
                      <td className="py-2 pr-3 hidden lg:table-cell text-xs text-muted-foreground truncate max-w-[280px]">
                        {p.outputs.join(", ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-3">
            <Button asChild variant="outline" size="sm">
              <Link href={primary ? `/engagements/${primary.id}` : "/engagements"}>
                Open engagement <FileCheck2 className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`h-3 w-3 rounded-sm ${color}`} />
      <span>{label}</span>
    </div>
  );
}
