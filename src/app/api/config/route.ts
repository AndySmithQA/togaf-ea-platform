import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import {
  bundledRepoPath,
  readUserConfig,
  resolveActiveRepo,
  writeUserConfig,
  userConfigFile,
} from "@/lib/config";

export async function GET() {
  const active = await resolveActiveRepo();
  const cfg = await readUserConfig();
  return NextResponse.json({
    activeRepo: active.repoPath,
    source: active.source,
    exists: active.exists,
    bundled: bundledRepoPath(),
    recentRepos: cfg.recentRepos ?? [],
    userConfigFile: userConfigFile(),
  });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { activeRepo?: string };
  if (!body.activeRepo) {
    return NextResponse.json({ error: "activeRepo required" }, { status: 400 });
  }
  const abs = path.resolve(body.activeRepo);
  let exists = true;
  try {
    await fs.access(abs);
  } catch {
    exists = false;
  }
  if (!exists) {
    return NextResponse.json(
      { error: `Folder does not exist: ${abs}` },
      { status: 400 }
    );
  }
  const merged = await writeUserConfig({ activeRepo: abs });
  return NextResponse.json({ ok: true, ...merged });
}
