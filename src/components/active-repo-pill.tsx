import Link from "next/link";
import path from "path";
import { activeRepoInfo } from "@/lib/repo";
import { Badge } from "@/components/ui/badge";
import { FolderOpen } from "lucide-react";

export async function ActiveRepoPill() {
  const info = await activeRepoInfo();
  const display = path.basename(info.repoPath) || info.repoPath;
  return (
    <Link
      href="/settings"
      className="block border rounded-md px-2 py-1.5 mt-2 hover:bg-accent text-[11px]"
      title={info.repoPath}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <FolderOpen className="h-3 w-3" />
        <span className="font-medium">Active repo</span>
        <Badge variant={info.exists ? "green" : "red"} className="ml-auto">
          {info.source}
        </Badge>
      </div>
      <div className="font-mono text-[10px] truncate text-muted-foreground" title={info.repoPath}>
        {display}
      </div>
    </Link>
  );
}
