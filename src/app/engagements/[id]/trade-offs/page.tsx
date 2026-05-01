import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/markdown";
import { getEngagement, readDocumentBody } from "@/lib/repo";
import { ChevronLeft, ScaleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TradeOffsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eng = await getEngagement(id);
  if (!eng) notFound();
  const doc = eng.documents["trade-off-analysis"];
  const body = doc ? await readDocumentBody(eng.id, doc) : "";

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/engagements/${eng.id}`}><ChevronLeft className="h-3 w-3" /> Back to engagement</Link>
        </Button>
      </div>
      <header>
        <div className="text-[11px] font-mono text-muted-foreground">{eng.id}</div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <ScaleIcon className="h-5 w-5 text-muted-foreground" /> Trade-off analysis
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Trade-offs the Sponsor and Architecture Board are asked to accept under the recommended option.
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">{doc?.title ?? "Trade-off Analysis"}</CardTitle>
            <Badge variant={(doc?.status === "approved" ? "green" : doc?.status === "in-review" ? "amber" : "grey") as never}>
              {doc?.status ?? "missing"}
            </Badge>
          </div>
          <CardDescription>Source: <code className="text-[11px]">E-trade-off-analysis.md</code></CardDescription>
        </CardHeader>
        <CardContent>
          {body ? <Markdown>{body}</Markdown> : (
            <p className="text-sm text-muted-foreground">No trade-off analysis yet — generate it from the document workspace.</p>
          )}
          <div className="pt-3 mt-3 border-t flex justify-end">
            <Button asChild size="sm">
              <Link href={`/engagements/${eng.id}/documents/trade-off-analysis`}>Open in document workspace</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
