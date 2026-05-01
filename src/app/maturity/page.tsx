import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MaturityRadar } from "@/components/maturity-radar";
import { getMaturity } from "@/lib/repo";
import { MATURITY_LEVELS, maturityLevelName } from "@/lib/maturity";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MaturityPage() {
  const m = await getMaturity();
  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Maturity</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">EA Maturity — TOGAF ACF</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Captured {formatDate(m.capturedAt)}. Scored against the canonical 0..5 scale.
        </p>
      </header>

      <div className="grid lg:grid-cols-[420px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Capability radar</CardTitle>
            <CardDescription>Eight ACF dimensions, current scores.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <MaturityRadar scores={m.scores} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dimensions</CardTitle>
            <CardDescription>Overall score: <span className="font-semibold text-foreground">{m.overall.toFixed(1)} / 5 ({maturityLevelName(m.overall)})</span></CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground border-b">
                <tr>
                  <th className="py-2 pr-3">Dimension</th>
                  <th className="py-2 pr-3 w-20">Level</th>
                  <th className="py-2 pr-3 w-32">Name</th>
                  <th className="py-2 pr-3">Comment</th>
                </tr>
              </thead>
              <tbody>
                {m.scores.map((s) => (
                  <tr key={s.dimension} className="border-b last:border-0">
                    <td className="py-2 pr-3 font-medium">{s.dimension}</td>
                    <td className="py-2 pr-3"><Badge variant="outline">{s.level}</Badge></td>
                    <td className="py-2 pr-3 text-xs">{maturityLevelName(s.level)}</td>
                    <td className="py-2 pr-3 text-xs text-muted-foreground">{s.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maturity levels (reference)</CardTitle>
          <CardDescription>Canonical 0..5 scale used by the TOGAF ACF / ACMM.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MATURITY_LEVELS.map((lv) => (
              <div key={lv.level} className="border rounded-md p-3 bg-card">
                <div className="flex items-center gap-2"><Badge variant="outline">{lv.level}</Badge><span className="font-medium text-sm">{lv.name}</span></div>
                <div className="text-xs text-muted-foreground mt-1">{lv.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
