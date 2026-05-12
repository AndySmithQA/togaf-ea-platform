import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { promises as fs } from "fs";
import path from "path";
import { Terminal } from "lucide-react";

export const dynamic = "force-dynamic";

interface CommandRow {
  name: string;
  description: string;
  argumentHint?: string;
}

const PHASE_GROUPS: Array<{ title: string; phase: string; cmds: string[] }> = [
  { title: "Meta", phase: "—", cmds: ["init", "status", "check", "signoff", "maturity", "principles", "help"] },
  { title: "Phase A — Architecture Vision", phase: "A", cmds: ["rfaw", "vision", "soaw", "stakeholders", "scenarios", "comms", "bcd"] },
  { title: "Phase B — Business", phase: "B", cmds: ["business", "add"] },
  { title: "Phase C — Information", phase: "C", cmds: ["data", "application"] },
  { title: "Phase D — Technology", phase: "D", cmds: ["technology"] },
  { title: "Phase E — Opportunities & Solutions", phase: "E", cmds: ["roadmap", "gaps", "abbs", "sbbs", "tradeoffs", "canvas"] },
  { title: "Phase F — Migration Planning", phase: "F", cmds: ["migration"] },
  { title: "Phase G — Implementation Governance", phase: "G", cmds: ["governance", "contract", "compliance"] },
  { title: "Phase H — Change Management", phase: "H", cmds: ["changes"] },
  { title: "Requirements Management", phase: "RM", cmds: ["reqs"] },
];

async function loadCommand(name: string): Promise<CommandRow | null> {
  try {
    const p = path.join(process.cwd(), "commands", "togaf", `${name}.md`);
    const raw = await fs.readFile(p, "utf8");
    const m = raw.match(/^---\s+([\s\S]*?)\s+---/);
    let description = "";
    let argumentHint: string | undefined;
    if (m) {
      const fm = m[1];
      description = (fm.match(/^description:\s*(.*)$/m)?.[1] || "").trim();
      argumentHint = (fm.match(/^argument-hint:\s*"?([^"]*)"?/m)?.[1] || "").trim() || undefined;
    }
    return { name, description, argumentHint };
  } catch {
    return null;
  }
}

export default async function CommandsPage() {
  const all = await Promise.all(
    PHASE_GROUPS.flatMap((g) => g.cmds).map(loadCommand)
  );
  const byName = new Map<string, CommandRow>();
  all.filter((x): x is CommandRow => Boolean(x)).forEach((c) => byName.set(c.name, c));

  return (
    <div className="p-6 lg:p-10 max-w-[1100px] mx-auto space-y-6">
      <header>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Terminal className="h-3.5 w-3.5" /> Slash commands
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">TOGAF slash commands</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Spec-Kit-style. Drive the entire TOGAF 10 ADM cycle from your IDE. Install with
          <code className="mx-1 text-[12px] bg-muted px-1 py-0.5 rounded">togaf init &lt;folder&gt;</code>
          and invoke as <code className="text-[12px] bg-muted px-1 py-0.5 rounded">/togaf:&lt;name&gt;</code>
          in Cursor or Claude Code, or <code className="text-[12px] bg-muted px-1 py-0.5 rounded">/togaf-&lt;name&gt;</code>
          in GitHub Copilot Chat.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Install into a folder</CardTitle>
          <CardDescription>From your terminal — zero runtime dependencies.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="text-[12px] bg-muted p-3 rounded overflow-x-auto whitespace-pre">
{`# Install everything (Cursor + Claude + Copilot prompts)
togaf init ./my-ea-repo

# Install with the bundled Northwind Retail example
togaf init ./my-ea-repo --example

# Cursor only, no example
togaf init . --ide=cursor --no-skeleton

# Refresh slash commands + templates without touching the repo skeleton
togaf upgrade .

# Launch this dashboard against any folder
togaf serve ./my-ea-repo --port=3000`}
          </pre>
        </CardContent>
      </Card>

      {PHASE_GROUPS.map((g) => (
        <Card key={g.title}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{g.title}</CardTitle>
              <Badge variant="outline" className="text-[10px]">{g.phase}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1.5">
              {g.cmds.map((c) => {
                const row = byName.get(c);
                return (
                  <div key={c} className="grid grid-cols-[16rem_1fr] gap-3 py-1 border-b last:border-0 text-sm items-baseline">
                    <code className="text-[12px] bg-muted px-2 py-1 rounded inline-block">/togaf:{c}</code>
                    <div>
                      <div>{row?.description ?? ""}</div>
                      {row?.argumentHint && (
                        <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{row.argumentHint}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
