import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { readRepoFile } from "@/lib/repo";
import { ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RepoFilePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const { path } = await searchParams;
  if (!path) notFound();
  let body = "";
  try {
    body = await readRepoFile(path);
  } catch {
    notFound();
  }

  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/repository"><ChevronLeft className="h-3 w-3" /> Back to repository</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{path}</CardTitle>
          <CardDescription>From the architecture repository</CardDescription>
        </CardHeader>
        <CardContent>
          {body.endsWith(".md") || /[#`*\[]/.test(body) ? <Markdown>{body}</Markdown> : <pre className="text-xs">{body}</pre>}
        </CardContent>
      </Card>
    </div>
  );
}
