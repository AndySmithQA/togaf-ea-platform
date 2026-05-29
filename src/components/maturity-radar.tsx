"use client";
import * as React from "react";
import type { MaturityScore } from "@/types";

export function MaturityRadar({
  scores,
  size = 360,
  max = 5,
}: {
  scores: MaturityScore[];
  size?: number;
  max?: number;
}) {
  const padding = 72;
  const canvas = size + padding * 2;
  const cx = padding + size / 2;
  const cy = padding + size / 2;
  const r = size * 0.38;
  const N = scores.length;
  if (N === 0) return null;

  const points = scores.map((s, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    const ratio = Math.max(0, Math.min(1, s.level / max));
    return {
      x: cx + r * ratio * Math.cos(ang),
      y: cy + r * ratio * Math.sin(ang),
      ax: cx + r * Math.cos(ang),
      ay: cy + r * Math.sin(ang),
      label: s.dimension,
      level: s.level,
    };
  });

  const ringRatios = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <svg viewBox={`0 0 ${canvas} ${canvas}`} className="w-full max-w-[520px] h-auto">
      {ringRatios.map((rr, i) => {
        const pts = scores.map((_, j) => {
          const ang = -Math.PI / 2 + (j * 2 * Math.PI) / N;
          return `${cx + r * rr * Math.cos(ang)},${cy + r * rr * Math.sin(ang)}`;
        });
        return (
          <polygon
            key={i}
            points={pts.join(" ")}
            fill="none"
            stroke="hsl(var(--border))"
            strokeDasharray={i === ringRatios.length - 1 ? undefined : "2 3"}
          />
        );
      })}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="hsl(var(--border))" strokeWidth={0.5} />
      ))}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="hsl(var(--ring) / 0.18)"
        stroke="hsl(var(--ring))"
        strokeWidth={1.5}
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="hsl(var(--ring))" />
      ))}
      {points.map((p, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N;
        const lx = cx + (r + 16) * Math.cos(ang);
        const ly = cy + (r + 16) * Math.sin(ang);
        const anchor = Math.cos(ang) > 0.3 ? "start" : Math.cos(ang) < -0.3 ? "end" : "middle";
        const label = shortDim(p.label);
        return (
          <text
            key={`l-${i}`}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={10}
            fill="hsl(var(--foreground))"
          >
            {label}
            <tspan dx={3} fontWeight={700}>{p.level}</tspan>
          </text>
        );
      })}
    </svg>
  );
}

function shortDim(d: string): string {
  return d
    .replace("Architecture ", "")
    .replace(" (ADM)", "")
    .replace("Reference Models & Standards", "Ref Models")
    .replace("Stakeholder Engagement", "Stakeholder Eng.");
}
