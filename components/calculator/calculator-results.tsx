"use client";

import { Download, FileText } from "lucide-react";
import { memo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { BadgeColor, CalculatorResults, ClinicalCondition } from "@/lib/calculator";
import { fmt } from "@/lib/calculator";
import { cn } from "@/lib/utils";
import { ScoreArc } from "./score-arc";

const BADGE_STYLES: Record<BadgeColor, string> = {
  g: "bg-logo-green-100/80 text-logo-green-800",
  b: "bg-un-blue-100/80 text-un-blue-800",
  a: "bg-amber-100/80 text-amber-900",
  r: "bg-chocolate-cosmos-100/80 text-chocolate-cosmos-700",
  gy: "bg-ghost-white-200 text-oxford-blue-400",
};

function ResultBadgeInner({ label, color }: { label: string; color: BadgeColor }) {
  return (
    <span
      className={cn(
        "result-badge mt-1.5 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold leading-tight",
        BADGE_STYLES[color],
      )}
    >
      {label}
    </span>
  );
}

const ResultBadge = memo(ResultBadgeInner);

function MetricStat({
  label,
  value,
  unit,
  note,
  badge,
  valueClassName,
}: {
  label: string;
  value: string;
  unit?: string;
  note?: ReactNode;
  badge?: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="metric-stat min-w-0">
      <p className="metric-label text-[10px] font-semibold uppercase tracking-[0.08em] text-oxford-blue-300">
        {label}
      </p>
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1">
        <span
          className={cn(
            "metric-value font-mono text-[17px] font-semibold leading-none text-oxford-blue-500 sm:text-[18px]",
            valueClassName,
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="metric-unit text-[11px] font-medium text-oxford-blue-300">{unit}</span>
        )}
      </div>
      {note && <p className="metric-note mt-1 text-[11px] text-oxford-blue-400">{note}</p>}
      {badge}
    </div>
  );
}

const MetricStatMemo = memo(MetricStat);

const TABLE_COLS = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  7: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7",
} as const;

function MetricPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-report bg-ghost-white-50 shadow-[0_1px_2px_color-mix(in_srgb,var(--logo-green-500)_4%,transparent),0_4px_16px_color-mix(in_srgb,var(--un-blue-100)_25%,transparent)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MetricTableGrid({
  children,
  cols = 4,
  className,
}: {
  children: ReactNode;
  cols?: 3 | 4 | 5 | 6 | 7;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "metric-grid grid gap-x-5 gap-y-6 p-4 sm:gap-x-6 sm:p-5",
        TABLE_COLS[cols],
        className,
      )}
    >
      {children}
    </div>
  );
}

function MetricCell({ children }: { children: ReactNode }) {
  return <div className="metric-cell min-w-0">{children}</div>;
}

function MetricTableRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-report-divider px-4 py-4 last:border-b-0 sm:px-5 sm:py-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionInner({
  dotColor,
  title,
  subtitle,
  children,
  className,
}: {
  dotColor: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("report-section space-y-4", className)}>
      <div className="report-section-head mb-5 flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dotColor }} />
          <h3 className="report-section-title text-[11px] font-bold uppercase tracking-[0.14em] text-oxford-blue-500">
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="text-[10px] font-medium uppercase tracking-wide text-oxford-blue-300">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

const Section = memo(SectionInner);

function SubsectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="border-b border-report-divider bg-report-subsection px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-oxford-blue-400 sm:px-5">
      {children}
    </p>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="report-summary-card rounded-xl border border-report bg-ghost-white-50 px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-oxford-blue-300">
        {label}
      </p>
      <p className="report-footer-value mt-2 text-[15px] font-semibold leading-snug text-oxford-blue-500 sm:text-base">
        {value}
      </p>
    </div>
  );
}

function ClinicalNoteInner({ children }: { children: ReactNode }) {
  return (
    <div className="clinical-note rounded-xl border border-un-blue-100 bg-un-blue-50/60 px-4 py-3.5 text-[12px] leading-relaxed text-oxford-blue-500">
      {children}
    </div>
  );
}

const ClinicalNote = memo(ClinicalNoteInner);

type CalculatorResultsProps = {
  results: CalculatorResults;
  condition: ClinicalCondition;
  activity: number;
  waistCm: number | null;
  wristCm: number | null;
  muacCm: number | null;
  ubwKg: number | null;
  onExportJson: () => void;
};

function CalculatorResultsPanelInner({
  results: r,
  condition,
  activity,
  waistCm,
  wristCm,
  muacCm,
  ubwKg,
  onExportJson,
}: CalculatorResultsProps) {
  const genderLabel = r.gender === "male" ? "Male" : "Female";
  const whrThreshold = r.gender === "male" ? 0.9 : 0.85;

  const headerKpis = [
    { val: fmt(r.bmi), lbl: "BMI" },
    { val: fmt(r.teeMS, 0), lbl: "TEE" },
    { val: fmt(r.ibwH), lbl: "IBW" },
    { val: `${fmt(r.fl30 / 1000, 1)}–${fmt(r.fl35 / 1000, 1)}`, lbl: "Fluid L" },
  ];

  return (
    <div
      id="calculator-report"
      className="clinical-report scroll-mt-24 overflow-hidden rounded-2xl border border-clinical bg-ghost-white-50 shadow-clinical sm:scroll-mt-28"
    >
      <div className="clinical-report-head border-b border-white/10 bg-gradient-primary px-4 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-logo-green-100/80">
              The Nutrition Side · Clinical Assessment
            </p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-ghost-white-50 sm:text-2xl">
              Nutrition Assessment Report
            </h2>
            <p className="clinical-report-meta mt-2 flex flex-wrap gap-x-1.5 gap-y-1 text-[12px] leading-relaxed text-ghost-white-50/80 sm:text-[13px]">
              <span>{r.age} yrs</span>
              <span aria-hidden>·</span>
              <span>{genderLabel}</span>
              <span aria-hidden>·</span>
              <span>{fmt(r.hCm)} cm</span>
              <span aria-hidden>·</span>
              <span>{fmt(r.wKg)} kg</span>
              <span aria-hidden>·</span>
              <span>{r.actLabel}</span>
              {r.cLbl ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{r.cLbl}</span>
                </>
              ) : null}
              <span aria-hidden>·</span>
              <span>{r.dateStr}</span>
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-2.5">
            {headerKpis.map((kpi) => (
              <div
                key={kpi.lbl}
                className="head-kpi min-w-0 flex-1 rounded-lg bg-white/10 px-2.5 py-2 text-center sm:flex-none sm:px-3 sm:text-right"
              >
                <p className="metric-value truncate font-mono text-sm font-semibold text-logo-green-100 sm:text-base">
                  {kpi.val}
                </p>
                <p className="metric-label mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-ghost-white-50/60">
                  {kpi.lbl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="print:hidden flex flex-wrap items-center gap-2 border-b border-clinical bg-ghost-white-100/90 px-4 py-3 sm:px-7">
        <Button type="button" size="sm" onClick={() => window.print()} className="gap-1.5 text-[12px]">
          <FileText className="h-3.5 w-3.5" />
          Export PDF
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={onExportJson} className="gap-1.5 text-[12px]">
          <Download className="h-3.5 w-3.5" />
          JSON
        </Button>
      </div>

      <div className="clinical-report-body space-y-8 px-4 py-6 sm:px-7 sm:py-8">
        {/* Overview */}
        <div className="score-panel macro-panel rounded-xl bg-gradient-section-clinical px-5 py-6 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(130px,160px)_1fr] lg:items-start">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-oxford-blue-400">
                Health Score
              </p>
              <div className="my-3">
                <ScoreArc score={r.hScore} color={r.hColor} size={120} />
              </div>
              <p className="text-[14px] font-bold" style={{ color: r.hColor }}>
                {r.hLabel}
              </p>
              <p className="mt-1 text-[10px] text-oxford-blue-300">BMI · BF · WHtR</p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-oxford-blue-500">
                  Macronutrient Distribution
                </p>
                <p className="text-[10px] text-oxford-blue-300">DGA 2025–2030 · protein-first</p>
              </div>
              <div className="my-4 flex h-2.5 overflow-hidden rounded-full bg-white/80">
                <div className="bg-un-blue-500" style={{ width: `${r.actualCarbPct}%` }} />
                <div className="bg-logo-green-600" style={{ width: `${Math.min(r.protPct, 40)}%` }} />
                <div className="bg-brunswick-green-400" style={{ width: `${Math.min(r.fatPct, 40)}%` }} />
              </div>
              <MetricPanel>
                <MetricTableRow>
                  <MetricTableGrid cols={3} className="p-0 sm:p-0">
                    {[
                      { color: "bg-un-blue-500", name: "Carb", grams: fmt(r.carbG, 0), pct: `${r.actualCarbPct}%` },
                      {
                        color: "bg-logo-green-600",
                        name: "Protein",
                        grams: fmt(r.protG, 0),
                        pct: `${r.protPct}% · ${fmt(r.ppk, 1)} g/kg`,
                      },
                      { color: "bg-brunswick-green-400", name: "Fat", grams: fmt(r.fatG, 0), pct: `${r.fatPct}%` },
                    ].map((m) => (
                      <MetricCell key={m.name}>
                        <div className="flex items-center gap-1.5">
                          <span className={cn("h-2 w-2 shrink-0 rounded-full", m.color)} />
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-oxford-blue-300">
                            {m.name}
                          </p>
                        </div>
                        <p className="mt-1.5 font-mono text-[17px] font-semibold text-oxford-blue-500">
                          {m.grams} g
                        </p>
                        <p className="text-[10px] text-oxford-blue-400">{m.pct}</p>
                      </MetricCell>
                    ))}
                  </MetricTableGrid>
                </MetricTableRow>
                <MetricTableRow>
                  <MetricTableGrid cols={3} className="p-0 sm:p-0">
                    <MetricCell>
                      <MetricStat label="Fibre" value={`${r.fib}`} unit="g/d" />
                    </MetricCell>
                    <MetricCell>
                      <MetricStat
                        label="Added Sugar"
                        value="≤10"
                        unit="g/meal"
                        valueClassName="text-chocolate-cosmos-500"
                      />
                    </MetricCell>
                    <MetricCell>
                      <MetricStat label="Sat. Fat" value={`<${r.satFatG}`} unit="g/d" />
                    </MetricCell>
                  </MetricTableGrid>
                </MetricTableRow>
              </MetricPanel>
            </div>
          </div>
        </div>

        <Section dotColor="var(--logo-green-500)" title="Body Composition & Anthropometry">
          <MetricPanel>
            <MetricTableGrid cols={6}>
              <MetricCell>
                <MetricStatMemo label="Body Fat %" value={fmt(r.estBF)} unit="%" note={r.bfMethod} />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="Fat Mass" value={fmt(r.fatM)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="Fat-Free Mass" value={fmt(r.ffm)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="Lean Body Mass" value={fmt(r.lbm)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="BSA" value={fmt(r.bsa, 3)} unit="m²" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo
                  label="Frame Size"
                  value={r.frame}
                  note={wristCm ? `Wrist ${fmt(wristCm)} cm` : undefined}
                />
              </MetricCell>
              {waistCm && (
                <MetricCell>
                  <MetricStatMemo
                    label="Waist"
                    value={fmt(waistCm)}
                    unit="cm"
                    badge={
                      <ResultBadge
                        label={r.wcRisk}
                        color={r.wcRisk === "High" ? "r" : r.wcRisk === "Increased" ? "a" : "g"}
                      />
                    }
                  />
                </MetricCell>
              )}
              {r.whr && (
                <MetricCell>
                  <MetricStatMemo
                    label="Waist-Hip Ratio"
                    value={fmt(r.whr, 3)}
                    badge={
                      <ResultBadge
                        label={r.whr > whrThreshold ? "Elevated CVD" : "Low CVD"}
                        color={r.whr > whrThreshold ? "a" : "g"}
                      />
                    }
                  />
                </MetricCell>
              )}
              {r.whtr && (
                <MetricCell>
                  <MetricStatMemo
                    label="Waist-Height Ratio"
                    value={fmt(r.whtr, 3)}
                    badge={
                      <ResultBadge
                        label={r.whtr >= 0.5 ? "Elevated" : "Low risk"}
                        color={r.whtr >= 0.5 ? "a" : "g"}
                      />
                    }
                  />
                </MetricCell>
              )}
              {r.bodyShape && (
                <MetricCell>
                  <MetricStatMemo label="Body Shape" value={r.bodyShape} />
                </MetricCell>
              )}
              {muacCm && r.muacStatus && (
                <MetricCell>
                  <MetricStatMemo
                    label="MUAC"
                    value={fmt(muacCm)}
                    unit="cm"
                    badge={
                      <ResultBadge
                        label={r.muacStatus}
                        color={r.muacStatus === "Normal" ? "g" : r.muacStatus === "Overweight" ? "a" : "r"}
                      />
                    }
                  />
                </MetricCell>
              )}
            </MetricTableGrid>
          </MetricPanel>
        </Section>

        <Section dotColor="var(--brunswick-green-500)" title="Ideal & Target Body Weight">
          <MetricPanel>
            <MetricTableGrid cols={6}>
              <MetricCell>
                <MetricStatMemo label="IBW Hamwi" value={fmt(r.ibwH)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="IBW Devine" value={fmt(r.ibwD)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="IBW Robinson" value={fmt(r.ibwR)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="IBW Miller" value={fmt(r.ibwM)} unit="kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo
                  label="Adj. BW"
                  value={r.adjBW ? fmt(r.adjBW) : "N/A"}
                  unit="kg"
                  note={r.adjBW ? "BMI ≥ 30" : undefined}
                />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo
                  label="% IBW"
                  value={`${fmt(r.pIBW)}%`}
                  badge={
                    <ResultBadge
                      label={r.pIBW < 80 ? "PEM risk" : r.pIBW < 90 ? "Under" : r.pIBW > 120 ? "Above" : "Normal"}
                      color={r.pIBW < 80 ? "r" : r.pIBW < 90 ? "a" : r.pIBW > 120 ? "a" : "g"}
                    />
                  }
                />
              </MetricCell>
              {ubwKg && r.pUBW && (
                <MetricCell>
                  <MetricStatMemo
                    label="% UBW"
                    value={`${fmt(r.pUBW)}%`}
                    badge={
                      <ResultBadge
                        label={r.pUBW < 85 ? "Sig. loss" : r.pUBW < 95 ? "Mild loss" : "Stable"}
                        color={r.pUBW < 85 ? "r" : r.pUBW < 95 ? "a" : "g"}
                      />
                    }
                  />
                </MetricCell>
              )}
              {ubwKg && r.wtChg !== null && (
                <MetricCell>
                  <MetricStatMemo
                    label="Wt Change"
                    value={`${r.wtChg > 0 ? "+" : ""}${fmt(r.wtChg)}`}
                    unit="kg"
                    note={`Usual ${fmt(ubwKg)} kg`}
                  />
                </MetricCell>
              )}
            </MetricTableGrid>
          </MetricPanel>
        </Section>

        <Section dotColor="var(--logo-green-500)" title="Energy Expenditure">
          <div className="grid gap-4 lg:grid-cols-2">
            <MetricPanel>
              <SubsectionLabel>Basal Metabolic Rate</SubsectionLabel>
              <MetricTableGrid cols={4}>
                <MetricCell>
                  <MetricStatMemo label="Harris-Benedict" value={fmt(r.bmrHB, 0)} unit="kcal/d" />
                </MetricCell>
                <MetricCell>
                  <MetricStatMemo
                    label="Mifflin-St Jeor"
                    value={fmt(r.bmrMS, 0)}
                    unit="kcal/d"
                    badge={<ResultBadge label="Recommended" color="g" />}
                  />
                </MetricCell>
                <MetricCell>
                  <MetricStatMemo label="Schofield" value={fmt(r.bmrSc, 0)} unit="kcal/d" />
                </MetricCell>
                <MetricCell>
                  <MetricStatMemo label="Katch-McArdle" value={fmt(r.bmrKM, 0)} unit="kcal/d" />
                </MetricCell>
              </MetricTableGrid>
            </MetricPanel>
            <MetricPanel>
              <SubsectionLabel>Total Daily Energy</SubsectionLabel>
              <MetricTableGrid cols={4}>
                <MetricCell>
                  <MetricStatMemo label="TDEE" value={fmt(r.teeMS, 0)} unit="kcal/d" note={`×${activity}`} />
                </MetricCell>
                {r.condX > 0 && (
                  <MetricCell>
                    <MetricStatMemo
                      label="Adjusted"
                      value={fmt(r.teeAdj, 0)}
                      unit="kcal/d"
                      note={`+${r.condX} ${r.cLbl}`}
                    />
                  </MetricCell>
                )}
                <MetricCell>
                  <MetricStatMemo label="Loss target" value={fmt(r.teeLoss, 0)} unit="kcal/d" note="−500" />
                </MetricCell>
                <MetricCell>
                  <MetricStatMemo label="Gain target" value={fmt(r.teeGain, 0)} unit="kcal/d" note="+500" />
                </MetricCell>
                <MetricCell>
                  <MetricStatMemo label="kcal/kg" value={fmt(r.teeAdj / r.wKg)} unit="kcal/kg" />
                </MetricCell>
              </MetricTableGrid>
            </MetricPanel>
          </div>
        </Section>

        <Section dotColor="var(--un-blue-500)" title="Fluid Requirements">
          <MetricPanel>
            <MetricTableGrid cols={5}>
              <MetricCell>
                <MetricStatMemo
                  label="30 ml/kg"
                  value={fmt(r.fl30, 0)}
                  unit="ml/d"
                  note={`${fmt(r.fl30 / 1000, 1)} L`}
                />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo
                  label="35 ml/kg"
                  value={fmt(r.fl35, 0)}
                  unit="ml/d"
                  note={`${fmt(r.fl35 / 1000, 1)} L`}
                />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo
                  label="Holliday-Segar"
                  value={fmt(r.flHS, 0)}
                  unit="ml/d"
                  note={`${fmt(r.flHS / 1000, 1)} L`}
                />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="Minimum" value={fmt(r.wKg * 25, 0)} unit="ml/d" note="25 ml/kg" />
              </MetricCell>
              <MetricCell>
                <MetricStatMemo label="High need" value={fmt(r.wKg * 40, 0)} unit="ml/d" note="Fever/heat" />
              </MetricCell>
            </MetricTableGrid>
          </MetricPanel>
        </Section>

        {condition === "ckd" && (
          <ClinicalNote>
            <strong className="text-un-blue-800">CKD:</strong> Protein 0.6–0.8 g/kg IBW. Restrict P, K, Na. Monitor eGFR/electrolytes.
          </ClinicalNote>
        )}
        {condition === "hd" && (
          <ClinicalNote>
            <strong className="text-un-blue-800">Hemodialysis:</strong> Protein 1.2 g/kg dry weight. Strict fluid/K/PO₄/Na restriction.
          </ClinicalNote>
        )}
        {condition === "ath" && (
          <ClinicalNote>
            <strong className="text-un-blue-800">Athletic:</strong> Protein 1.6–2.0 g/kg. Periodise carbs around training.
          </ClinicalNote>
        )}
        {condition === "dm" && (
          <ClinicalNote>
            <strong className="text-un-blue-800">Diabetes:</strong> 45–60 g carb/meal. Low-GI sources. Monitor post-prandial glucose.
          </ClinicalNote>
        )}
        {["p1", "p2", "p3"].includes(condition) && (
          <ClinicalNote>
            <strong className="text-un-blue-800">Pregnancy:</strong>
            {r.condX > 0 ? ` +${r.condX} kcal/d.` : ""} Protein +25 g/d. Folate, iron, calcium, iodine, omega-3.
          </ClinicalNote>
        )}
        {condition === "lac" && (
          <ClinicalNote>
            <strong className="text-un-blue-800">Lactation:</strong> +500 kcal/d, +25 g protein/d. Extra ≥1 L fluid/d.
          </ClinicalNote>
        )}

        <div className="report-footer grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7">
          {[
            { lbl: "Date", val: r.dateStr },
            { lbl: "BMR", val: "Mifflin-St Jeor" },
            { lbl: "BF%", val: r.bfMethod },
            { lbl: "IBW", val: "Hamwi" },
            { lbl: "Protein", val: `${fmt(r.ppk, 1)} g/kg · ${fmt(r.protG, 0)} g/d` },
            { lbl: "N₂", val: `${fmt(r.nit, 1)} g/d` },
            { lbl: "BSA", val: `${fmt(r.bsa, 2)} m²` },
          ].map((item) => (
            <SummaryCard key={item.lbl} label={item.lbl} value={item.val} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const CalculatorResultsPanel = memo(CalculatorResultsPanelInner);
