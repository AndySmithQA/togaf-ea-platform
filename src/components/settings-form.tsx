"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2, FolderInput, Undo2 } from "lucide-react";

export function SettingsForm({
  currentPath,
  bundledPath,
  recents,
}: {
  currentPath: string;
  bundledPath: string;
  recents: string[];
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(currentPath);
  const [pending, setPending] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  async function apply(p: string) {
    setErr(null);
    setPending(true);
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ activeRepo: p }),
      });
      const j = await res.json();
      if (!res.ok) {
        setErr(j.error || "Failed to switch repository");
      } else {
        setValue(p);
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="flex-1 text-sm rounded border bg-background px-3 py-2 font-mono"
          placeholder="/absolute/path/to/architecture-repository"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => apply(value)} disabled={pending || !value.trim()}>
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FolderInput className="h-3.5 w-3.5" />}
          Use this folder
        </Button>
      </div>
      {err && <div className="text-xs text-rag-red">{err}</div>}

      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="sm" onClick={() => apply(bundledPath)} disabled={pending}>
          <Undo2 className="h-3 w-3" />
          Reset to bundled example
        </Button>
        <span className="text-[11px] text-muted-foreground">{bundledPath}</span>
      </div>

      {recents.length > 0 && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Recent</div>
          <ul className="space-y-1">
            {recents.map((r) => (
              <li key={r}>
                <button
                  className="w-full text-left text-xs font-mono p-2 border rounded hover:bg-accent break-all"
                  onClick={() => apply(r)}
                  disabled={pending}
                >
                  {r}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
