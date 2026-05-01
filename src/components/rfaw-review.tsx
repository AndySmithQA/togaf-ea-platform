"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export function RfawApproveButton({ engagementId, approved }: { engagementId: string; approved: boolean }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const [reviewer, setReviewer] = React.useState("");

  async function approve() {
    if (!reviewer.trim()) {
      alert("Enter the reviewer / Architecture Board representative.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch(`/api/engagements/${engagementId}/rfaw-approve`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ by: reviewer }),
      });
      if (!res.ok) {
        alert((await res.json().catch(() => ({ error: "Approve failed" }))).error);
      } else {
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  if (approved) {
    return (
      <div className="rounded border bg-rag-green/10 p-3 text-xs flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-rag-green" /> RfAW already approved.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full text-xs rounded border bg-background px-2 py-1"
        placeholder="Approver name (e.g. Architecture Board)"
        value={reviewer}
        onChange={(e) => setReviewer(e.target.value)}
      />
      <Button size="sm" disabled={pending} onClick={approve}>
        {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
        Approve RfAW & derive B/C/D
      </Button>
      <div className="text-[11px] text-muted-foreground">
        Approval triggers an automatic B/C/D assessment using the RfAW + Vision (LLM if configured).
      </div>
    </div>
  );
}

export function RegenerateBcdButton({ engagementId }: { engagementId: string }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  async function go() {
    setPending(true);
    try {
      const res = await fetch(`/api/engagements/${engagementId}/bcd-assess`, { method: "POST" });
      if (!res.ok) alert("Failed to regenerate B/C/D assessment");
      router.refresh();
    } finally { setPending(false); }
  }
  return (
    <Button size="sm" variant="secondary" disabled={pending} onClick={go}>
      {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
      Re-derive B/C/D needs
    </Button>
  );
}
