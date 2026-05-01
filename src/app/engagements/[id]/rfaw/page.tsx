import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { RfawApproveButton, RegenerateBcdButton } from "@/components/rfaw-review";
import { getEngagement, readDocumentBody } from "@/lib/repo";
import { formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RfawPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const rfaw = eng.documents["request-for-architecture-work"];
  const vision = eng.documents["architecture-vision"];
  const rfawBody = rfaw ? await readDocumentBody(eng.id, rfaw) : "";
  const visionBody = vision ? await readDocumentBody(eng.id, vision) : "";
  const a = eng.bcdAssessment;

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
          <h1 className="text-2xl font-semibold tracking-tight">RfAW review &amp; B/C/D assessment</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Approve the Request for Architecture Work, then automatically derive what needs to happen at ADM Phases B, C and D.
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Request for Architecture Work</CardTitle>
                <Badge variant={rfaw?.status === "approved" ? "green" : "amber"}>
                  {rfaw?.status ?? "missing"}
                </Badge>
              </div>
              <CardDescription>
                Source: <code className="text-[11px]">A-request-for-architecture-work.md</code>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rfawBody ? <Markdown>{rfawBody}</Markdown> : <p className="text-sm text-muted-foreground">No RfAW yet.</p>}
            </CardContent>
          </Card>
          {visionBody && (
            <Card>
              <CardHeader>
                <CardTitle>Architecture Vision (for context)</CardTitle>
                <CardDescription>The Vision provides the target the assessment is anchored to.</CardDescription>
              </CardHeader>
              <CardContent><Markdown>{visionBody}</Markdown></CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Approve RfAW</CardTitle>
              <CardDescription>Approval triggers B/C/D auto-assessment.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="text-xs">
                Status: <Badge variant={eng.rfawApproved ? "green" : "amber"}>{eng.rfawApproved ? "Approved" : "Pending"}</Badge>
              </div>
              {eng.rfawApprovedBy && (
                <div className="text-[11px] text-muted-foreground">
                  By {eng.rfawApprovedBy} · {eng.rfawApprovedAt && formatDate(eng.rfawApprovedAt)}
                </div>
              )}
              <RfawApproveButton engagementId={eng.id} approved={eng.rfawApproved} />
              <div className="pt-2 border-t mt-2">
                <RegenerateBcdButton engagementId={eng.id} />
              </div>
            </CardContent>
          </Card>

          {a && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">B/C/D needs assessment</CardTitle>
                <CardDescription>
                  Derived {formatDate(a.generatedAt)} from RfAW{a.generatedFrom.vision ? " + Vision" : ""}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-xs italic text-muted-foreground">{a.notes}</p>
                <BcdSection title="Phase B — Business" items={a.business} />
                <BcdSection title="Phase C — Data" items={a.data} />
                <BcdSection title="Phase C — Application" items={a.application} />
                <BcdSection title="Phase D — Technology" items={a.technology} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function BcdSection({ title, items }: { title: string; items: { title: string; rationale: string; effort: "S"|"M"|"L"; risk: "low"|"medium"|"high" }[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{title}</div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="border rounded p-2 bg-background">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[13px] flex-1">{it.title}</span>
              <Badge variant="outline">effort {it.effort}</Badge>
              <Badge variant={it.risk === "high" ? "red" : it.risk === "medium" ? "amber" : "green"}>{it.risk}</Badge>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">{it.rationale}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
