"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import {
  ApiError,
  calculateNutrition,
  mapApiResponseToResults,
} from "@/lib/api";
import {
  getHeightCm,
  parseNum,
  toCm,
  toKg,
  type CalculatorInput,
  type CalculatorResults,
  type ClinicalCondition,
  type FieldUnits,
  type FormState,
} from "@/lib/calculator";
import { SESSION_CHANGE_EVENT, notifySessionChange } from "@/lib/auth/navigation";
import { clearSession } from "@/lib/auth/session";
import { getLoginHref } from "@/config/routes";
import { CalculatorBackground } from "./calculator-background";
import { CalculatorForm } from "./calculator-form";
import { CalculatorHero } from "./calculator-hero";

const CalculatorResultsPanel = dynamic(
  () =>
    import("./calculator-results").then((m) => ({
      default: m.CalculatorResultsPanel,
    })),
  { ssr: false },
);

function scrollToReportPanel() {
  const report = document.getElementById("calculator-report");
  if (!report) return false;

  report.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

type ResultsMeta = {
  condition: ClinicalCondition;
  activity: number;
  waistCm: number | null;
  wristCm: number | null;
  muacCm: number | null;
  ubwKg: number | null;
};

type PendingCalculation = {
  input: CalculatorInput;
  meta: ResultsMeta;
};

function buildCalculatorInput(
  form: FormState,
  units: FieldUnits,
): PendingCalculation | null {
  const age = parseNum(form.age);
  const gender = form.gender;
  const hCm = getHeightCm(units, form.heightCm, form.heightFt, form.heightIn);
  const wKg = toKg(parseNum(form.weight), units.weight);

  if (!age || !gender || !hCm || !wKg) return null;

  const waistCm = toCm(parseNum(form.waist), units.waist);
  const hipCm = toCm(parseNum(form.hip), units.hip);
  const neckCm = toCm(parseNum(form.neck), units.neck);
  const wristCm = toCm(parseNum(form.wrist), units.wrist);
  const muacCm = toCm(parseNum(form.muac), units.muac);
  const ubwKg = toKg(parseNum(form.ubw), units.ubw);

  return {
    input: {
      age,
      gender,
      activity: parseFloat(form.activity),
      condition: form.condition,
      ethnicity: form.ethnicity,
      heightCm: hCm,
      weightKg: wKg,
      waistCm,
      hipCm,
      neckCm,
      wristCm,
      muacCm,
      elbowMm: parseNum(form.elbow),
      bodyFatPct: parseNum(form.bodyFatPct),
      ubwKg,
    },
    meta: {
      condition: form.condition,
      activity: parseFloat(form.activity),
      waistCm,
      wristCm,
      muacCm,
      ubwKg,
    },
  };
}

export function CalculatorClient() {
  const router = useRouter();
  const [formKey, setFormKey] = useState(0);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [meta, setMeta] = useState<ResultsMeta | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);
  const pendingRef = useRef<PendingCalculation | null>(null);

  const showResults = useCallback((calculated: CalculatorResults, nextMeta: ResultsMeta) => {
    setResults(calculated);
    setMeta(nextMeta);
  }, []);

  useEffect(() => {
    if (!results) return;

    let attempts = 0;
    let frameId = 0;

    const tryScroll = () => {
      if (scrollToReportPanel() || attempts++ >= 20) return;
      frameId = requestAnimationFrame(tryScroll);
    };

    frameId = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frameId);
  }, [results]);

  const runCalculation = useCallback(
    async (pending: PendingCalculation) => {
      setIsCalculating(true);
      setCalcError(null);

      try {
        const apiResponse = await calculateNutrition(pending.input);
        const calculated = mapApiResponseToResults(apiResponse, {
          age: pending.input.age,
          gender: pending.input.gender,
          hCm: pending.input.heightCm,
          wKg: pending.input.weightKg,
        });

        pendingRef.current = null;
        showResults(calculated, pending.meta);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearSession();
          notifySessionChange();
          pendingRef.current = pending;
          setCalcError("Your session expired. Please sign in again to calculate.");
          router.replace(getLoginHref("/calculator"));
          return;
        }

        if (error instanceof ApiError) {
          setCalcError(error.message);
        } else {
          setCalcError("Unable to calculate. Please try again.");
        }
      } finally {
        setIsCalculating(false);
      }
    },
    [router, showResults],
  );

  const handleCalculate = useCallback(
    async ({ form, units }: { form: FormState; units: FieldUnits }) => {
      const pending = buildCalculatorInput(form, units);
      if (!pending) {
        setCalcError("Please complete all required fields before calculating.");
        return;
      }

      await runCalculation(pending);
    },
    [runCalculation],
  );

  useEffect(() => {
    function handleSessionChange() {
      const pending = pendingRef.current;
      if (!pending) return;
      void runCalculation(pending);
    }

    window.addEventListener(SESSION_CHANGE_EVENT, handleSessionChange);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, handleSessionChange);
  }, [runCalculation]);

  const handleClear = useCallback(() => {
    setFormKey((k) => k + 1);
    setResults(null);
    setMeta(null);
    setCalcError(null);
    pendingRef.current = null;
  }, []);

  const handleExportJson = useCallback(() => {
    if (!results) return;
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TNS_Assessment_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [results]);

  return (
    <div className="relative min-h-screen">
      <CalculatorBackground />
      <CalculatorHero />

      <Container size="wide" className="relative space-y-8 pb-24 pt-2">
        <CalculatorForm
          formKey={formKey}
          onCalculate={handleCalculate}
          onClear={handleClear}
          isCalculating={isCalculating}
          apiError={calcError}
        />

        {results && meta && (
          <CalculatorResultsPanel
            results={results}
            condition={meta.condition}
            activity={meta.activity}
            waistCm={meta.waistCm}
            wristCm={meta.wristCm}
            muacCm={meta.muacCm}
            ubwKg={meta.ubwKg}
            onExportJson={handleExportJson}
          />
        )}
      </Container>
    </div>
  );
}
