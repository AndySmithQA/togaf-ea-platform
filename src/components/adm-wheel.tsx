"use client";
import * as React from "react";
import { ADM_PHASES } from "@/lib/togaf";
import { ragColor } from "@/lib/rag";
import type { ADMPhase } from "@/lib/togaf";
import type { PhaseStatus, RAG } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export interface AdmWheelProps {
  phaseStatus: Record<ADMPhase, PhaseStatus>;
  activePhase: ADMPhase;
  size?: number;
  engagementId?: string;
}

/**
 * The TOGAF "corn circle" — ADM phases laid out as a circle with Requirements
 * Management (RM) at the centre. Each segment is coloured by RAG status.
 */
export function AdmWheel({ phaseStatus, activePhase, size = 460, engagementId }: AdmWheelProps) {
  const router = useRouter();
  const filterId = React.useId().replace(/:/g, "");
  const cx = size / 2;
  const cy = size / 2;
  const ringOuter = size * 0.46;
  const ringInner = size * 0.18;
  const center = size * 0.13;

  const phases = ADM_PHASES.filter((p) => p.id !== "RM");
  const N = phases.length;
  const segmentAngle = 360 / N;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[520px] h-auto select-none" suppressHydrationWarning>
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.18" />
        </filter>
      </defs>

      {phases.map((p, i) => {
        const status = phaseStatus[p.id];
        const rag: RAG = status?.rag ?? "grey";
        const startAngle = -90 + i * segmentAngle - segmentAngle / 2;
        const endAngle = startAngle + segmentAngle;
        const path = annularSector(cx, cy, ringInner, ringOuter, startAngle, endAngle);
        const labelAngle = startAngle + segmentAngle / 2;
        const labelR = (ringInner + ringOuter) / 2;
        const labelPos = polar(cx, cy, labelR, labelAngle);
        const isActive = p.id === activePhase;
        const link = engagementId
          ? `/engagements/${engagementId}/documents`
          : "/adm";
        return (
          <Tooltip key={p.id}>
            <TooltipTrigger asChild>
              <g
                role="link"
                tabIndex={0}
                aria-label={`${p.name} (${rag})`}
                className="transition-opacity hover:opacity-90 cursor-pointer focus-visible:outline-none"
                filter={`url(#${filterId})`}
                onClick={() => router.push(link)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(link);
                  }
                }}
              >
                <path
                  d={path}
                  fill={ragColor(rag)}
                  stroke={isActive ? "hsl(var(--ring))" : "white"}
                  strokeWidth={isActive ? 3 : 1.5}
                />
                <text
                  x={stable(labelPos.x)}
                  y={stable(labelPos.y - 4)}
                  textAnchor="middle"
                  fontSize={size * 0.05}
                  fontWeight={700}
                  fill="white"
                >
                  {p.letter}
                </text>
                <text
                  x={stable(labelPos.x)}
                  y={stable(labelPos.y + size * 0.038)}
                  textAnchor="middle"
                  fontSize={size * 0.022}
                  fill="white"
                  opacity={0.95}
                >
                  {p.short}
                </text>
              </g>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-[11px] font-medium">{p.name}</div>
              <div className="text-[10px] opacity-80">
                {status?.notes ?? "—"} · RAG: {rag}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}

      {/* Centre — Requirements Management */}
      <Tooltip>
        <TooltipTrigger asChild>
          <g
            role="link"
            tabIndex={0}
            aria-label="Requirements Management"
            className="cursor-pointer focus-visible:outline-none"
            filter={`url(#${filterId})`}
            onClick={() => router.push(engagementId ? `/engagements/${engagementId}/documents` : "/adm")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(engagementId ? `/engagements/${engagementId}/documents` : "/adm");
              }
            }}
          >
            <circle
              cx={stable(cx)}
              cy={stable(cy)}
              r={stable(center)}
              fill={ragColor(phaseStatus.RM?.rag ?? "grey")}
              stroke={activePhase === "RM" ? "hsl(var(--ring))" : "white"}
              strokeWidth={activePhase === "RM" ? 3 : 1.5}
            />
            <text
              x={stable(cx)}
              y={stable(cy - 2)}
              textAnchor="middle"
              fontWeight={700}
              fontSize={size * 0.05}
              fill="white"
            >
              RM
            </text>
            <text
              x={stable(cx)}
              y={stable(cy + size * 0.04)}
              textAnchor="middle"
              fontSize={size * 0.022}
              fill="white"
            >
              Requirements
            </text>
          </g>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-[11px] font-medium">Requirements Management</div>
          <div className="text-[10px] opacity-80">
            {phaseStatus.RM?.notes ?? "—"} · RAG: {phaseStatus.RM?.rag ?? "grey"}
          </div>
        </TooltipContent>
      </Tooltip>
    </svg>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function stable(n: number): number {
  return Number(n.toFixed(3));
}

function annularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
) {
  const p1 = polar(cx, cy, rOuter, startDeg);
  const p2 = polar(cx, cy, rOuter, endDeg);
  const p3 = polar(cx, cy, rInner, endDeg);
  const p4 = polar(cx, cy, rInner, startDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${stable(p1.x)} ${stable(p1.y)}`,
    `A ${stable(rOuter)} ${stable(rOuter)} 0 ${largeArc} 1 ${stable(p2.x)} ${stable(p2.y)}`,
    `L ${stable(p3.x)} ${stable(p3.y)}`,
    `A ${stable(rInner)} ${stable(rInner)} 0 ${largeArc} 0 ${stable(p4.x)} ${stable(p4.y)}`,
    "Z",
  ].join(" ");
}
