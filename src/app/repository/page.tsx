import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { readRepoTree, type RepoFile } from "@/lib/repo";
import { FileText, FolderClosed } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RepositoryPage() {
  const tree = await readRepoTree();
  return (
    <div className="p-6 lg:p-10 max-w-[1400px] mx-auto space-y-6">
      <header>
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Architecture Repository</div>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">Repository browser</h1>
        <p className="text-sm text-muted-foreground mt-1">
          File tree for <code className="text-xs">architecture-repository/</code>. Structured per the TOGAF 10 Architecture Capability Framework.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Tree</CardTitle>
          <CardDescription>Click any markdown file to view it.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-0.5">
            {tree.map((node) => <Tree key={node.path} node={node} depth={0} />)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Tree({ node, depth }: { node: RepoFile; depth: number }) {
  return (
    <li>
      <div
        className="flex items-center gap-2 py-0.5"
        style={{ paddingLeft: depth * 16 }}
      >
        {node.isDirectory ? (
          <>
            <FolderClosed className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium">{node.name}</span>
          </>
        ) : (
          <>
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <Link
              className="hover:underline"
              href={`/repository/file?path=${encodeURIComponent(node.path)}`}
            >
              {node.name}
            </Link>
          </>
        )}
      </div>
      {node.children && (
        <ul>
          {node.children.map((c) => <Tree key={c.path} node={c} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}
