import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="text-center space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">404</div>
        <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-sm text-muted-foreground">The page you requested doesn&apos;t exist or was moved.</p>
        <Button asChild><Link href="/">Back to dashboard</Link></Button>
      </div>
    </div>
  );
}
