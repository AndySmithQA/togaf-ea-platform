"use client";
import * as React from "react";
import Link from "next/link";
import { ADM_PHASES } from "@/lib/togaf";
import { ragColor } from "@/lib/rag";
import type { ADMPhase } from "@/lib/togaf";
import type { PhaseStatus, RAG } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const cx = size / 2;
  const cy = size / 2;
  const ringOuter = size * 0.46;
  const ringInner = size * 0.18;
  const center = size * 0.13;

  const phases = ADM_PHASES.filter((p) => p.id !== "RM");
  const N = phases.length;
  const segmentAngle = 360 / N;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[520px] h-auto select-none">
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
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
              <Link href={link} aria-label={`${p.name} (${rag})`}>
                <g
                  className="transition-opacity hover:opacity-90 cursor-pointer"
                  filter="url(#softShadow)"
                >
                  <path
                    d={path}
                    fill={ragColor(rag)}
                    stroke={isActive ? "hsl(var(--ring))" : "white"}
                    strokeWidth={isActive ? 3 : 1.5}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y - 4}
                    textAnchor="middle"
                    fontSize={size * 0.05}
                    fontWeight={700}
                    fill="white"
                  >
                    {p.letter}
                  </text>
                  <text
                    x={labelPos.x}
                    y={labelPos.y + size * 0.038}
                    textAnchor="middle"
                    fontSize={size * 0.022}
                    fill="white"
                    opacity={0.95}
                  >
                    {p.short}
                  </text>
                </g>
              </Link>
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
          <Link href={engagementId ? `/engagements/${engagementId}/documents` : "/adm"}>
            <g className="cursor-pointer" filter="url(#softShadow)">
              <circle
                cx={cx}
                cy={cy}
                r={center}
                fill={ragColor(phaseStatus.RM?.rag ?? "grey")}
                stroke={activePhase === "RM" ? "hsl(var(--ring))" : "white"}
                strokeWidth={activePhase === "RM" ? 3 : 1.5}
              />
              <text x={cx} y={cy - 2} textAnchor="middle" fontWeight={700} fontSize={size * 0.05} fill="white">
                RM
              </text>
              <text x={cx} y={cy + size * 0.04} textAnchor="middle" fontSize={size * 0.022} fill="white">
                Requirements
              </text>
            </g>
          </Link>
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
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}
