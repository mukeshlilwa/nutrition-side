"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

type ToggleOption<T extends string> = { value: T; label: string };

type UnitToggleProps<T extends string> = {
  options: readonly ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

function UnitToggleInner<T extends string>({
  options,
  value,
  onChange,
  className,
}: UnitToggleProps<T>) {
  return (
    <div
      className={cn(
        "border-clinical flex gap-0.5 rounded-full border bg-ghost-white-100 p-0.5",
        className,
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold transition-colors",
            value === opt.value
              ? "bg-logo-green-600 text-ghost-white-50 shadow-sm"
              : "text-oxford-blue-300 hover:text-oxford-blue-500",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export const UnitToggle = memo(UnitToggleInner) as typeof UnitToggleInner;

type SegmentedToggleProps<T extends string> = {
  options: readonly ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

function SegmentedToggleInner<T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <div className="border-clinical flex gap-0.5 rounded-full border bg-ghost-white-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors",
            value === opt.value
              ? "bg-gradient-primary text-ghost-white-50 shadow-sm"
              : "text-oxford-blue-400 hover:text-oxford-blue-500",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export const SegmentedToggle = memo(SegmentedToggleInner) as typeof SegmentedToggleInner;

export const CM_IN_OPTIONS = [
  { value: "cm" as const, label: "cm" },
  { value: "in" as const, label: "in" },
] as const;

export const KG_LBS_OPTIONS = [
  { value: "kg" as const, label: "kg" },
  { value: "lbs" as const, label: "lbs" },
] as const;

export const HEIGHT_OPTIONS = [
  { value: "cm" as const, label: "cm" },
  { value: "ftin" as const, label: "ft/in" },
] as const;

export const PRESET_OPTIONS = [
  { value: "metric" as const, label: "Metric" },
  { value: "imperial" as const, label: "Imperial" },
] as const;
