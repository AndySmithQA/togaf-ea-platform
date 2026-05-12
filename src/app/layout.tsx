import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { ActiveRepoPill } from "@/components/active-repo-pill";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "TOGAF EA Platform — Northwind Retail Group",
  description:
    "TOGAF 10 Architecture Repository and Enterprise Architecture management platform: maturity dashboard, RfAW review, ADM cycle visualisation, document generation, sign-off gates and business-model views.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider delayDuration={150}>
          <div className="flex min-h-screen">
            <Nav>
              <ActiveRepoPill />
            </Nav>
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
