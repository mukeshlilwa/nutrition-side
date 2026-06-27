"use client";

import { memo, useEffect, useRef } from "react";

type ScoreArcProps = {
  score: number;
  color: string;
  size?: number;
};

function ScoreArcInner({ score, color, size = 200 }: ScoreArcProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineWidth = Math.max(8, Math.round(size * 0.07));
  const fontSize = Math.round(size * 0.26);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2;
    const cy = H / 2;
    const r = Math.min(W, H) * 0.38;
    const sA = Math.PI * 0.75;
    const eA = Math.PI * 2.25;
    const range = eA - sA;
    const pct = score / 100;

    ctx.beginPath();
    ctx.arc(cx, cy, r, sA, eA);
    ctx.strokeStyle = "rgba(0,0,0,.07)";
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();

    if (pct > 0.01) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, sA, sA + range * Math.min(pct, 1));
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }, [score, color, lineWidth]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} width={size} height={size} className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none" style={{ fontSize, color }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export const ScoreArc = memo(ScoreArcInner);
