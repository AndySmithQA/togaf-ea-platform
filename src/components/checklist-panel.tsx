"use client";
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ChecklistItem, DocumentRecord } from "@/types";
import { Loader2, ShieldCheck, Sparkles, Stamp } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChecklistPanel({
  engagementId,
  doc,
}: {
  engagementId: string;
  doc: DocumentRecord;
}) {
  const router = useRouter();
  const [pending, setPending] = React.useState<string | null>(null);
  const [signoffComment, setSignoffComment] = React.useState("");
  const [signedBy, setSignedBy] = React.useState("");

  const auto = doc.checklist.filter((c) => c.kind === "auto");
  const manual = doc.checklist.filter((c) => c.kind === "manual");
  const allPass =
    auto.every((c) => c.autoResult === "pass") && manual.every((c) => c.checked);

  async function toggle(item: ChecklistItem, value: boolean) {
    setPending(item.id);
    try {
      const res = await fetch(`/api/engagements/${engagementId}/documents/${doc.id}/checklist`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ itemId: item.id, checked: value, by: signedBy || "Reviewer" }),
      });
      if (!res.ok) throw new Error("Failed to update checklist item");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function reEvaluate() {
    setPending("auto");
    try {
      const res = await fetch(`/api/engagements/${engagementId}/documents/${doc.id}/recheck`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Recheck failed");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function generate() {
    setPending("generate");
    try {
      const res = await fetch(`/api/engagements/${engagementId}/documents/${doc.id}/generate`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Generate failed");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function signOff() {
    if (!signedBy.trim()) {
      alert("Please enter the reviewer name signing off.");
      return;
    }
    setPending("signoff");
    try {
      const res = await fetch(`/api/engagements/${engagementId}/documents/${doc.id}/signoff`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ by: signedBy, comment: signoffComment }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "Sign-off failed");
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">EA Checklist</CardTitle>
            <CardDescription>Automatic + manual checks before sign-off.</CardDescription>
          </div>
          <Badge variant={allPass ? "green" : "amber"}>{allPass ? "Ready" : "Open items"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Automatic</div>
            <Button variant="outline" size="sm" disabled={pending === "auto"} onClick={reEvaluate}>
              {pending === "auto" ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShieldCheck className="h-3 w-3" />}
              Re-evaluate
            </Button>
          </div>
          <ul className="space-y-1.5">
            {auto.map((c) => (
              <li key={c.id} className="flex items-start gap-2">
                <span
                  className={`mt-0.5 h-3.5 w-3.5 rounded-sm shrink-0 ${
                    c.autoResult === "pass" ? "bg-rag-green" : "bg-rag-red"
                  }`}
                  aria-hidden
                />
                <span className="flex-1">{c.label}</span>
                <Badge variant={c.autoResult === "pass" ? "green" : "red"}>{c.autoResult}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Manual</div>
          <ul className="space-y-2">
            {manual.map((c) => (
              <li key={c.id} className="flex items-start gap-2">
                <Checkbox
                  id={c.id}
                  checked={c.checked}
                  disabled={pending === c.id}
                  onCheckedChange={(v) => toggle(c, Boolean(v))}
                />
                <label htmlFor={c.id} className="flex-1 cursor-pointer">
                  <div>{c.label}</div>
                  {c.checkedBy && (
                    <div className="text-[11px] text-muted-foreground">
                      By {c.checkedBy} · {c.checkedAt ? new Date(c.checkedAt).toLocaleString() : ""}
                    </div>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <section className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sign-off</div>
          {doc.signoff.signedOff ? (
            <div className="rounded border bg-rag-green/10 p-3 text-xs">
              <div className="flex items-center gap-2 font-medium">
                <Stamp className="h-4 w-4 text-rag-green" />
                Signed off by {doc.signoff.signedOffBy}
              </div>
              <div className="text-muted-foreground mt-1">
                {doc.signoff.signedOffAt ? new Date(doc.signoff.signedOffAt).toLocaleString() : ""}
              </div>
              {doc.signoff.comment && <div className="mt-2 italic">&ldquo;{doc.signoff.comment}&rdquo;</div>}
            </div>
          ) : (
            <>
              <input
                className="w-full text-xs rounded border bg-background px-2 py-1"
                placeholder="Reviewer name (e.g. Architecture Board)"
                value={signedBy}
                onChange={(e) => setSignedBy(e.target.value)}
              />
              <textarea
                className="w-full text-xs rounded border bg-background px-2 py-1 min-h-[60px]"
                placeholder="Optional comment"
                value={signoffComment}
                onChange={(e) => setSignoffComment(e.target.value)}
              />
              <Button size="sm" disabled={!allPass || pending === "signoff"} onClick={signOff}>
                {pending === "signoff" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Stamp className="h-3 w-3" />}
                Sign off & approve
              </Button>
              {!allPass && (
                <div className="text-[11px] text-muted-foreground">
                  Sign-off is gated until all auto and manual checks pass.
                </div>
              )}
            </>
          )}
        </section>

        <Separator />

        <section>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Document agent</div>
          <Button size="sm" variant="secondary" disabled={pending === "generate"} onClick={generate}>
            {pending === "generate" ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
            (Re)generate from RfAW + Vision
          </Button>
          <div className="text-[11px] text-muted-foreground mt-1.5">
            Uses the LLM if <code>OPENAI_API_KEY</code> is set; falls back to a deterministic template otherwise.
            Generation respects prior sign-offs of upstream documents.
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
