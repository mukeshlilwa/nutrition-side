import { memo } from "react";
import {
  Activity,
  Calculator,
  CheckCircle2,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const EQUATION_CHIPS = [
  "Harris-Benedict",
  "Mifflin-St Jeor",
  "Schofield / WHO-FAO",
  "Katch-McArdle",
  "Hamwi · Devine · Robinson",
  "Holliday-Segar",
  "US Navy BF%",
  "DGA 2025–2030",
] as const;

const HERO_STATS = [
  { value: "30+", label: "Clinical Metrics", icon: FlaskConical },
  { value: "10", label: "Evidence Equations", icon: Activity },
  { value: "100%", label: "Guideline-Aligned", icon: ShieldCheck },
] as const;

export const CalculatorHero = memo(function CalculatorHero() {
  return (
    <section className="calculator-hero relative overflow-hidden pb-4 pt-2 sm:pt-4">
      <Container size="wide">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-2xl">
            <div className="badge-clinical">
              <CheckCircle2 className="h-3.5 w-3.5 text-logo-green-500" />
              Clinical Nutrition Tools · Dietitian Platform
            </div>

            <h1 className="mt-5 text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-oxford-blue-500 lg:text-[44px]">
              The{" "}
              <span className="text-accent-gradient">Master Calculator</span>
            </h1>

            <p className="text-body mt-4 max-w-xl">
              Enter patient data once. Generate BMI, energy expenditure, macro
              targets, fluid requirements, and anthropometric indices — all from
              validated clinical equations.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {EQUATION_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="border-clinical rounded-full border bg-ghost-white-50/90 px-3 py-1 text-[11px] font-medium text-oxford-blue-400"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden w-full max-w-md flex-col gap-3 sm:flex lg:max-w-sm">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-clinical shadow-clinical flex items-center gap-4 rounded-2xl border bg-ghost-white-50/90 px-5 py-4"
              >
                <div className="bg-gradient-icon border-clinical flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                  <stat.icon className="h-5 w-5 text-logo-green-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[28px] font-bold leading-none text-logo-green-600">
                    {stat.value}
                  </p>
                  <p className="text-caption mt-1 font-semibold uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-clinical shadow-clinical mt-8 flex items-center gap-3 rounded-xl border bg-ghost-white-50/80 px-4 py-3 sm:hidden">
          <div className="bg-gradient-icon border-clinical flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
            <Calculator className="h-4 w-4 text-logo-green-600" />
          </div>
          <p className="text-body-sm">
            30+ metrics · 10 evidence-based equations · DGA 2025–2030 aligned
          </p>
        </div>
      </Container>
    </section>
  );
});
