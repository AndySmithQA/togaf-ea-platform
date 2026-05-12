import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SettingsForm } from "@/components/settings-form";
import { activeRepoInfo } from "@/lib/repo";
import { readUserConfig, bundledRepoPath, userConfigFile } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const info = await activeRepoInfo();
  const userCfg = await readUserConfig();

  return (
    <div className="p-6 lg:p-10 max-w-[1100px] mx-auto space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Settings</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">Active repository</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pick the folder the platform should treat as the current Architecture Repository. The dashboard, ADM
          wheel, deliverables, sign-offs and slash-command outputs all act on this folder.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Currently active</CardTitle>
          <CardDescription>Resolved at request time. Settings UI overrides env, env overrides bundled.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={info.source === "bundled" ? "outline" : "green"}>{info.source}</Badge>
            <Badge variant={info.exists ? "green" : "red"}>{info.exists ? "exists" : "missing"}</Badge>
            <code className="text-[12px] break-all bg-muted px-2 py-1 rounded">{info.repoPath}</code>
          </div>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            <li>State directory: <code className="text-[11px]">{info.stateDir}</code></li>
            <li>Engagements file: <code className="text-[11px]">{info.engagementsFile}</code></li>
            <li>Maturity file: <code className="text-[11px]">{info.maturityFile}</code></li>
            <li>User config: <code className="text-[11px]">{userConfigFile()}</code></li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Switch repository</CardTitle>
          <CardDescription>
            Paste an absolute path. Use the bundled example to roll back to the Northwind demo at any time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm
            currentPath={info.repoPath}
            bundledPath={bundledRepoPath()}
            recents={userCfg.recentRepos ?? []}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resolution priority</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Settings UI override (this page) — persisted to <code className="text-[11px]">~/.togaf-ea/config.json</code>.</li>
            <li>The <code>EA_REPO_PATH</code> environment variable.</li>
            <li>Bundled example repository (<code className="text-[11px]">{bundledRepoPath()}</code>).</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-3">
            Tip: when you run <code>togaf init &lt;folder&gt;</code> from the CLI, the platform doesn&apos;t auto-switch
            to the new folder. Open this page and point the dashboard at it explicitly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
