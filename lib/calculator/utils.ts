import type { LengthUnit, WeightUnit } from "./types";

export const rnd = (n: number, d = 1): number | null =>
  Number.isNaN(n) || !Number.isFinite(n) ? null : Math.round(n * 10 ** d) / 10 ** d;

export const fmt = (n: number | null, d = 1): string =>
  n === null ? "—" : (rnd(n, d)?.toLocaleString() ?? "—");

export const toCm = (v: number | null, u: "cm" | "in"): number | null =>
  !v ? null : u === "in" ? v * 2.54 : v;

export const toKg = (v: number | null, u: WeightUnit): number | null =>
  !v ? null : u === "lbs" ? v * 0.453592 : v;

export const parseNum = (v: string): number | null => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

export function getHeightCm(
  units: { height: LengthUnit },
  heightCm: string,
  heightFt: string,
  heightIn: string,
): number | null {
  if (units.height === "cm") return parseNum(heightCm);
  const ft = parseNum(heightFt) ?? 0;
  const inches = parseNum(heightIn) ?? 0;
  const total = (ft * 12 + inches) * 2.54;
  return total || null;
}

export function scoreColor(s: number): string {
  if (s >= 80) return "#00704a";
  if (s >= 65) return "#b45309";
  if (s >= 45) return "#d97706";
  return "#b91c1c";
}

export function scoreLabel(s: number): string {
  if (s >= 80) return "Excellent";
  if (s >= 65) return "Good";
  if (s >= 50) return "Fair";
  if (s >= 35) return "Poor";
  return "At Risk";
}
