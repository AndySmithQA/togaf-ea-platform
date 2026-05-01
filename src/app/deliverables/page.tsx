import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ADM_PHASES, deliverablesForPhase } from "@/lib/togaf";

export const dynamic = "force-dynamic";

export default function DeliverablesPage() {
  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Reference</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">TOGAF 10 deliverable catalog</h1>
        <p className="text-sm text-muted-foreground mt-1">
          The canonical TOGAF 10 deliverable set used by this platform, organised by ADM phase.
        </p>
      </header>

      <div className="space-y-4">
        {ADM_PHASES.map((p) => {
          const dels = deliverablesForPhase(p.id);
          if (dels.length === 0) return null;
          return (
            <Card key={p.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Phase {p.letter}</Badge>
                  <CardTitle className="text-base">{p.name}</CardTitle>
                </div>
                <CardDescription className="mt-1">{p.purpose}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {dels.map((d) => (
                    <li key={d.id} className="border rounded p-3 bg-background">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{d.title}</span>
                        <code className="ml-auto text-[11px] text-muted-foreground">{d.id}</code>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{d.description}</div>
                      <div className="mt-2 text-[11px]">
                        <span className="font-semibold uppercase tracking-wider text-muted-foreground mr-2">Sections:</span>
                        {d.sections.join(" · ")}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
