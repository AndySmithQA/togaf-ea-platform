"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, GitBranch, FileStack, Gauge, Library, Workflow } from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/engagements", label: "Engagements", icon: GitBranch },
  { href: "/adm", label: "ADM Cycle", icon: Workflow },
  { href: "/maturity", label: "Maturity", icon: Gauge },
  { href: "/repository", label: "Repository", icon: Library },
  { href: "/deliverables", label: "Deliverables", icon: FileStack },
];

export function Nav() {
  const path = usePathname() ?? "";
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r bg-card/40 px-3 py-4">
      <Link href="/" className="px-2 mb-5 group">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold text-xs">EA</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">TOGAF EA Platform</div>
            <div className="text-[10px] text-muted-foreground">Northwind Retail Group</div>
          </div>
        </div>
      </Link>
      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                active && "bg-accent text-accent-foreground font-medium"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-2 text-[10px] text-muted-foreground space-y-1">
        <div>Built on TOGAF® Standard, 10th Ed.</div>
        <div>Mock-up &middot; not for production use</div>
      </div>
    </aside>
  );
}
