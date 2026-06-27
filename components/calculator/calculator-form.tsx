"use client";

import {
  AlertTriangle,
  ClipboardCheck,
  HeartPulse,
  Loader2,
  Ruler,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { FieldError, FormAlert } from "@/components/auth/form-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  hasFieldErrors,
  validateRequiredFields,
  type FieldUnits,
  type FormState,
  type RequiredFieldErrors,
  type UnitPreset,
} from "@/lib/calculator";
import {
  CM_IN_OPTIONS,
  HEIGHT_OPTIONS,
  KG_LBS_OPTIONS,
  PRESET_OPTIONS,
  SegmentedToggle,
  UnitToggle,
} from "./unit-toggle";

const DEFAULT_UNITS: FieldUnits = {
  height: "cm",
  weight: "kg",
  waist: "cm",
  hip: "cm",
  neck: "cm",
  wrist: "cm",
  muac: "cm",
  ubw: "kg",
};

const IMPERIAL_UNITS: FieldUnits = {
  height: "ftin",
  weight: "lbs",
  waist: "in",
  hip: "in",
  neck: "in",
  wrist: "in",
  muac: "in",
  ubw: "lbs",
};

export const DEFAULT_FORM: FormState = {
  age: "",
  gender: "",
  activity: "1.55",
  condition: "none",
  ethnicity: "gen",
  heightCm: "",
  heightFt: "",
  heightIn: "",
  weight: "",
  waist: "",
  hip: "",
  neck: "",
  wrist: "",
  muac: "",
  elbow: "",
  bodyFatPct: "",
  ubw: "",
};

const SELECT_CLASS = cn(
  "flex h-11 w-full appearance-none rounded-lg border bg-ghost-white-50 px-3 text-[14px] text-oxford-blue-500",
  "bg-[length:10px_6px] bg-[position:right_12px_center] bg-no-repeat",
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logo-green-500/30",
);

const INPUT_CLASS = "h-11 bg-ghost-white-50 pr-10 text-[14px]";

function fieldBorder(hasError: boolean) {
  return hasError
    ? "border-chocolate-cosmos-300 focus-visible:ring-chocolate-cosmos-300/40"
    : "border-clinical focus-visible:ring-logo-green-500/30";
}

const EQUATIONS = [
  "Harris-Benedict · Mifflin-St Jeor",
  "Schofield / WHO-FAO · Katch-McArdle",
  "Hamwi · Devine · Robinson · Miller",
  "US Navy BF% · Deurenberg · Boer LBM",
  "Holliday-Segar · DGA 2025–2030",
] as const;

function readForm(formEl: HTMLFormElement): FormState {
  const fd = new FormData(formEl);
  const str = (key: string) => (fd.get(key) as string | null) ?? "";
  return {
    age: str("age"),
    gender: str("gender") as FormState["gender"],
    activity: str("activity") || "1.55",
    condition: (str("condition") || "none") as FormState["condition"],
    ethnicity: (str("ethnicity") || "gen") as FormState["ethnicity"],
    heightCm: str("heightCm"),
    heightFt: str("heightFt"),
    heightIn: str("heightIn"),
    weight: str("weight"),
    waist: str("waist"),
    hip: str("hip"),
    neck: str("neck"),
    wrist: str("wrist"),
    muac: str("muac"),
    elbow: str("elbow"),
    bodyFatPct: str("bodyFatPct"),
    ubw: str("ubw"),
  };
}

type CalculatorFormProps = {
  formKey: number;
  onCalculate: (data: { form: FormState; units: FieldUnits }) => void | Promise<void>;
  onClear: () => void;
  isCalculating?: boolean;
  apiError?: string | null;
};

export function CalculatorForm({
  formKey,
  onCalculate,
  onClear,
  isCalculating = false,
  apiError = null,
}: CalculatorFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [units, setUnits] = useState<FieldUnits>(DEFAULT_UNITS);
  const [unitPreset, setUnitPreset] = useState<UnitPreset>("metric");
  const [fieldErrors, setFieldErrors] = useState<RequiredFieldErrors>({});

  const clearFieldError = useCallback((field: keyof RequiredFieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const setUnit = useCallback(<K extends keyof FieldUnits>(field: K, value: FieldUnits[K]) => {
    setUnits((prev) => ({ ...prev, [field]: value }));
    if (field === "height") clearFieldError("height");
    if (field === "weight") clearFieldError("weight");
  }, [clearFieldError]);

  const handlePreset = useCallback((preset: UnitPreset) => {
    setUnitPreset(preset);
    setUnits(preset === "metric" ? { ...DEFAULT_UNITS } : { ...IMPERIAL_UNITS });
    clearFieldError("height");
    clearFieldError("weight");
  }, [clearFieldError]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formRef.current || isCalculating) return;

      const form = readForm(formRef.current);
      const errors = validateRequiredFields(form, units);

      if (hasFieldErrors(errors)) {
        setFieldErrors(errors);
        requestAnimationFrame(() => {
          formRef.current
            ?.querySelector<HTMLElement>("[data-field-error='true']")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        return;
      }

      setFieldErrors({});
      await onCalculate({ form, units });
    },
    [isCalculating, onCalculate, units],
  );

  const handleClearClick = useCallback(() => {
    setFieldErrors({});
    onClear();
  }, [onClear]);

  return (
    <form
      key={formKey}
      ref={formRef}
      onSubmit={handleSubmit}
      className="calculator-form-panel border-clinical shadow-logo overflow-hidden rounded-2xl border bg-ghost-white-50"
    >
      {/* Panel header */}
      <div className="border-clinical relative overflow-hidden border-b bg-gradient-to-br from-logo-green-50 via-ghost-white-50 to-un-blue-50 px-4 py-5 sm:px-8 sm:py-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-logo-green-100/40" />
        <div className="pointer-events-none absolute -bottom-6 right-24 h-20 w-20 rounded-full bg-un-blue-100/50" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-icon border-clinical shadow-clinical flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
              <ClipboardCheck className="h-5 w-5 text-logo-green-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-eyebrow">Patient Intake</p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-oxford-blue-500">
                Client Information
              </h2>
              <p className="text-body-sm mt-1">
                All measurements · Individual unit control per field
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 sm:items-end">
            <span className="text-caption font-semibold uppercase tracking-wide">
              Unit preset
            </span>
            <SegmentedToggle
              options={PRESET_OPTIONS}
              value={unitPreset}
              onChange={handlePreset}
            />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {(hasFieldErrors(fieldErrors) || apiError) && (
          <div className="mb-6 space-y-3">
            {hasFieldErrors(fieldErrors) && (
              <FormAlert>
                Please complete all required fields in Basic Anthropometrics before
                running the assessment.
              </FormAlert>
            )}
            {apiError && <FormAlert>{apiError}</FormAlert>}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
          <FormSection
            id="calc-section-anthropometrics"
            icon={UserRound}
            iconClass="text-logo-green-600"
            title="Basic Anthropometrics"
            tag="required"
            accent="from-logo-green-50/80 to-ghost-white-50"
          >
            <div className="mb-4 grid grid-cols-2 gap-3">
              <Field label="Age" required error={fieldErrors.age}>
                <UnitInput
                  name="age"
                  unit="yrs"
                  placeholder="35"
                  min={1}
                  max={120}
                  hasError={!!fieldErrors.age}
                  onInput={() => clearFieldError("age")}
                />
              </Field>
              <Field label="Gender" required error={fieldErrors.gender}>
                <SelectInput
                  name="gender"
                  defaultValue=""
                  hasError={!!fieldErrors.gender}
                  onChange={() => clearFieldError("gender")}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </SelectInput>
              </Field>
            </div>

            <Field
              label="Height"
              required
              error={fieldErrors.height}
              unitToggle={
                <UnitToggle
                  options={HEIGHT_OPTIONS}
                  value={units.height}
                  onChange={(v) => setUnit("height", v)}
                />
              }
            >
              {units.height === "cm" ? (
                <UnitInput
                  name="heightCm"
                  unit="cm"
                  placeholder="170"
                  min={50}
                  max={250}
                  hasError={!!fieldErrors.height}
                  onInput={() => clearFieldError("height")}
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <UnitInput
                    name="heightFt"
                    unit="ft"
                    placeholder="5"
                    min={1}
                    max={8}
                    hasError={!!fieldErrors.height}
                    onInput={() => clearFieldError("height")}
                  />
                  <UnitInput
                    name="heightIn"
                    unit="in"
                    placeholder="7"
                    min={0}
                    max={11}
                    hasError={!!fieldErrors.height}
                    onInput={() => clearFieldError("height")}
                  />
                </div>
              )}
            </Field>

            <Field
              label="Weight"
              required
              error={fieldErrors.weight}
              unitToggle={
                <UnitToggle
                  options={KG_LBS_OPTIONS}
                  value={units.weight}
                  onChange={(v) => setUnit("weight", v)}
                />
              }
            >
              <UnitInput
                name="weight"
                unit={units.weight}
                placeholder={units.weight === "kg" ? "70" : "154"}
                min={1}
                max={500}
                hasError={!!fieldErrors.weight}
                onInput={() => clearFieldError("weight")}
              />
            </Field>

            <Field label="Activity Level">
              <SelectInput name="activity" defaultValue="1.55">
                <option value="1.2">Sedentary — no exercise</option>
                <option value="1.375">Lightly Active — 1–3×/wk</option>
                <option value="1.55">Moderately Active — 3–5×/wk</option>
                <option value="1.725">Very Active — 6–7×/wk</option>
                <option value="1.9">Extra Active — athlete / labour</option>
              </SelectInput>
            </Field>
          </FormSection>

          <FormSection
            icon={Ruler}
            iconClass="text-un-blue-600"
            title="Body Circumferences"
            tag="optional"
            accent="from-un-blue-50/70 to-ghost-white-50"
          >
            <Field
              label="Waist"
              unitToggle={
                <UnitToggle
                  options={CM_IN_OPTIONS}
                  value={units.waist}
                  onChange={(v) => setUnit("waist", v)}
                />
              }
            >
              <UnitInput name="waist" unit={units.waist} placeholder="85" />
            </Field>

            <Field
              label="Hip"
              unitToggle={
                <UnitToggle
                  options={CM_IN_OPTIONS}
                  value={units.hip}
                  onChange={(v) => setUnit("hip", v)}
                />
              }
            >
              <UnitInput name="hip" unit={units.hip} placeholder="100" />
            </Field>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <Field
                label="Neck"
                unitToggle={
                  <UnitToggle
                    options={CM_IN_OPTIONS}
                    value={units.neck}
                    onChange={(v) => setUnit("neck", v)}
                  />
                }
              >
                <UnitInput name="neck" unit={units.neck} placeholder="38" />
              </Field>
              <Field
                label="Wrist"
                unitToggle={
                  <UnitToggle
                    options={CM_IN_OPTIONS}
                    value={units.wrist}
                    onChange={(v) => setUnit("wrist", v)}
                  />
                }
              >
                <UnitInput name="wrist" unit={units.wrist} placeholder="17" />
              </Field>
            </div>

            <Field
              label="MUAC"
              unitToggle={
                <UnitToggle
                  options={CM_IN_OPTIONS}
                  value={units.muac}
                  onChange={(v) => setUnit("muac", v)}
                />
              }
            >
              <UnitInput name="muac" unit={units.muac} placeholder="30" />
            </Field>

            <Field label="Elbow Breadth">
              <UnitInput name="elbow" unit="mm" placeholder="65" />
            </Field>
          </FormSection>

          <FormSection
            icon={HeartPulse}
            iconClass="text-brunswick-green-500"
            title="Clinical Parameters"
            tag="optional"
            accent="from-brunswick-green-50/60 to-ghost-white-50"
          >
            <Field label="Known Body Fat %">
              <UnitInput name="bodyFatPct" unit="%" placeholder="22" min={1} max={70} step={0.1} />
            </Field>

            <Field
              label="Usual Body Weight"
              unitToggle={
                <UnitToggle
                  options={KG_LBS_OPTIONS}
                  value={units.ubw}
                  onChange={(v) => setUnit("ubw", v)}
                />
              }
            >
              <UnitInput
                name="ubw"
                unit={units.ubw}
                placeholder={units.ubw === "kg" ? "75" : "165"}
              />
            </Field>

            <Field label="Clinical Condition">
              <SelectInput name="condition" defaultValue="none">
                <option value="none">None / Healthy Adult</option>
                <option value="p1">Pregnancy — 1st Trimester</option>
                <option value="p2">Pregnancy — 2nd Trimester</option>
                <option value="p3">Pregnancy — 3rd Trimester</option>
                <option value="lac">Lactation (0–6 months)</option>
                <option value="ckd">Chronic Kidney Disease</option>
                <option value="hd">Hemodialysis</option>
                <option value="dm">Type 2 Diabetes</option>
                <option value="old">Elderly (&gt;65 years)</option>
                <option value="ath">Athlete / High Performance</option>
              </SelectInput>
            </Field>

            <Field label="Ethnicity">
              <SelectInput name="ethnicity" defaultValue="gen">
                <option value="gen">General / Caucasian</option>
                <option value="asi">Asian / South Asian (WHO cutoffs)</option>
                <option value="afr">African / Caribbean</option>
              </SelectInput>
            </Field>
          </FormSection>

          <FormSection
            icon={ClipboardCheck}
            iconClass="text-logo-green-600"
            title="Run Assessment"
            accent="from-logo-green-50/50 via-un-blue-50/30 to-ghost-white-50"
          >
            <Button
              type="submit"
              size="lg"
              className="shadow-logo h-[52px] w-full text-[15px]"
              disabled={isCalculating}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                "Calculate All Metrics"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-3 h-11 w-full"
              onClick={handleClearClick}
            >
              Clear all fields
            </Button>

            <div className="border-clinical mt-4 flex gap-3 rounded-xl border bg-chocolate-cosmos-50/30 px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-chocolate-cosmos-400" />
              <p className="text-body-sm leading-relaxed">
                <strong className="font-semibold text-chocolate-cosmos-500">
                  Clinical use only.
                </strong>{" "}
                For qualified dietitians. Interpret alongside full clinical and biochemical
                assessment.
              </p>
            </div>

            <div className="border-clinical mt-3 rounded-xl border bg-logo-green-50/50 px-4 py-3">
              <p className="text-eyebrow mb-2">Equations Used</p>
              {EQUATIONS.map((line) => (
                <p key={line} className="text-body-sm flex items-start gap-1.5 py-0.5">
                  <span className="font-bold text-logo-green-600">✓</span>
                  {line}
                </p>
              ))}
            </div>
          </FormSection>
        </div>
      </div>
    </form>
  );
}

function FormSection({
  id,
  icon: Icon,
  iconClass,
  title,
  tag,
  accent,
  children,
}: {
  id?: string;
  icon: LucideIcon;
  iconClass: string;
  title: string;
  tag?: "required" | "optional";
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "border-clinical shadow-clinical rounded-xl border bg-gradient-to-b p-5",
        accent,
      )}
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="bg-gradient-icon border-clinical flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
          <Icon className={cn("h-4 w-4", iconClass)} strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-oxford-blue-500">
              {title}
            </h3>
            {tag === "required" && (
              <span className="rounded-full bg-logo-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-logo-green-700">
                Required
              </span>
            )}
            {tag === "optional" && (
              <span className="rounded-full bg-un-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-un-blue-700">
                Optional
              </span>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  error,
  unitToggle,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  unitToggle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4" data-field-error={error ? "true" : undefined}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <Label className="text-[13px] font-medium text-oxford-blue-500">
          {label}
          {required && <span className="ml-0.5 text-logo-green-600">*</span>}
        </Label>
        {unitToggle}
      </div>
      {children}
      <div className="mt-1">
        <FieldError message={error} />
      </div>
    </div>
  );
}

function SelectInput({
  name,
  defaultValue,
  hasError,
  onChange,
  children,
}: {
  name: string;
  defaultValue?: string;
  hasError?: boolean;
  onChange?: () => void;
  children: React.ReactNode;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      className={cn(SELECT_CLASS, "border", fieldBorder(!!hasError))}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23668093'/%3E%3C/svg%3E")`,
      }}
    >
      {children}
    </select>
  );
}

function UnitInput({
  name,
  unit,
  placeholder,
  min,
  max,
  step,
  hasError,
  onInput,
}: {
  name: string;
  unit: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  hasError?: boolean;
  onInput?: () => void;
}) {
  return (
    <div className="relative">
      <Input
        type="number"
        name={name}
        defaultValue=""
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onInput={onInput}
        className={cn(INPUT_CLASS, "border", fieldBorder(!!hasError))}
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded bg-ghost-white-200 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-oxford-blue-300">
        {unit}
      </span>
    </div>
  );
}

export { DEFAULT_UNITS, IMPERIAL_UNITS };
