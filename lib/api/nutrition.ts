import { apiRequest } from "@/lib/api/client";
import type {
  BadgeColor,
  CalculatorInput,
  CalculatorResults,
  Gender,
} from "@/lib/calculator/types";

export type NutritionCalculateRequest = {
  age: number;
  gender: Gender;
  height_cm: number;
  weight_kg: number;
  activity_factor: number;
  waist_cm: number;
  hip_cm: number;
  neck_cm: number;
  wrist_cm: number;
  muac_cm: number;
  elbow_mm: number;
  body_fat_percent: number;
  usual_body_weight_kg: number;
  condition: string;
  ethnicity: string;
};

export type NutritionCalculateResponse = {
  date: string;
  activity_label: string;
  body_composition: {
    bmi: number;
    bmi_category: string;
    bmi_category_code: string;
    body_fat_percent: number;
    body_fat_method: string;
    fat_mass_kg: number;
    fat_free_mass_kg: number;
    lean_body_mass_kg: number;
    bsa_m2: number;
    frame_size: string;
    waist_risk: string;
    whr: number | null;
    whr_risk: string;
    whtr: number | null;
    whtr_risk: string;
    body_shape: string | null;
    muac_status: string | null;
  };
  weight_targets: {
    ibw_hamwi_kg: number;
    ibw_devine_kg: number;
    ibw_robinson_kg: number;
    ibw_miller_kg: number;
    adjusted_bw_kg: number | null;
    pct_ibw: number;
    pct_ubw: number | null;
    weight_change_kg: number | null;
  };
  energy_expenditure: {
    bmr_harris_benedict_kcal: number;
    bmr_mifflin_st_jeor_kcal: number;
    bmr_schofield_who_kcal: number;
    bmr_katch_mcardle_kcal: number;
    tdee_kcal: number;
    tdee_condition_adjusted_kcal: number;
    condition_extra_kcal: number;
    tdee_weight_loss_kcal: number;
    tdee_weight_gain_kcal: number;
    kcal_per_kg_bw: number;
  };
  macronutrients: {
    protein_g_per_kg: number;
    protein_g_day: number;
    protein_pct: number;
    carb_g_day: number;
    carb_pct: number;
    fat_g_day: number;
    fat_pct: number;
    sat_fat_max_g_day: number;
    fibre_g_day: number;
    nitrogen_g_day: number;
  };
  fluid_requirements: {
    ml_30_per_kg: number;
    ml_35_per_kg: number;
    holliday_segar_ml: number;
    minimum_ml: number;
    high_need_ml: number;
  };
  health_score: {
    score: number;
    label: string;
    color: string;
  };
  clinical: {
    condition_code: string;
    condition_label: string;
    protocol_note: string | null;
  };
};

type ResultContext = {
  age: number;
  gender: Gender;
  hCm: number;
  wKg: number;
};

function toApiRequest(input: CalculatorInput): NutritionCalculateRequest {
  return {
    age: input.age,
    gender: input.gender,
    height_cm: input.heightCm,
    weight_kg: input.weightKg,
    activity_factor: input.activity,
    waist_cm: input.waistCm ?? 0,
    hip_cm: input.hipCm ?? 0,
    neck_cm: input.neckCm ?? 0,
    wrist_cm: input.wristCm ?? 0,
    muac_cm: input.muacCm ?? 0,
    elbow_mm: input.elbowMm ?? 0,
    body_fat_percent: input.bodyFatPct ?? 0,
    usual_body_weight_kg: input.ubwKg ?? 0,
    condition: input.condition,
    ethnicity: input.ethnicity,
  };
}

export function mapApiResponseToResults(
  api: NutritionCalculateResponse,
  ctx: ResultContext,
): CalculatorResults {
  const bc = api.body_composition;
  const wt = api.weight_targets;
  const ee = api.energy_expenditure;
  const mac = api.macronutrients;
  const fl = api.fluid_requirements;
  const hs = api.health_score;

  return {
    age: ctx.age,
    gender: ctx.gender,
    hCm: ctx.hCm,
    wKg: ctx.wKg,
    bmi: bc.bmi,
    bmiClass: {
      label: bc.bmi_category,
      color: bc.bmi_category_code as BadgeColor,
    },
    estBF: bc.body_fat_percent,
    bfMethod: bc.body_fat_method,
    fatM: bc.fat_mass_kg,
    ffm: bc.fat_free_mass_kg,
    lbm: bc.lean_body_mass_kg,
    bsa: bc.bsa_m2,
    frame: bc.frame_size,
    ibwH: wt.ibw_hamwi_kg,
    ibwD: wt.ibw_devine_kg,
    ibwR: wt.ibw_robinson_kg,
    ibwM: wt.ibw_miller_kg,
    adjBW: wt.adjusted_bw_kg,
    pIBW: wt.pct_ibw,
    pUBW: wt.pct_ubw,
    wtChg: wt.weight_change_kg,
    bmrHB: ee.bmr_harris_benedict_kcal,
    bmrMS: ee.bmr_mifflin_st_jeor_kcal,
    bmrSc: ee.bmr_schofield_who_kcal,
    bmrKM: ee.bmr_katch_mcardle_kcal,
    teeMS: ee.tdee_kcal,
    teeAdj: ee.tdee_condition_adjusted_kcal,
    teeLoss: ee.tdee_weight_loss_kcal,
    teeGain: ee.tdee_weight_gain_kcal,
    condX: ee.condition_extra_kcal,
    ppk: mac.protein_g_per_kg,
    protG: mac.protein_g_day,
    carbG: mac.carb_g_day,
    fatG: mac.fat_g_day,
    protPct: mac.protein_pct,
    fatPct: mac.fat_pct,
    actualCarbPct: mac.carb_pct,
    satFatG: mac.sat_fat_max_g_day,
    fib: mac.fibre_g_day,
    nit: mac.nitrogen_g_day,
    fl30: fl.ml_30_per_kg,
    fl35: fl.ml_35_per_kg,
    flHS: fl.holliday_segar_ml,
    whr: bc.whr,
    whtr: bc.whtr,
    wcRisk: bc.waist_risk,
    bodyShape: bc.body_shape,
    muacStatus: bc.muac_status,
    hScore: hs.score,
    hColor: hs.color,
    hLabel: hs.label,
    actLabel: api.activity_label,
    cLbl: api.clinical.condition_label,
    dateStr: api.date,
  };
}

export function calculateNutrition(input: CalculatorInput) {
  return apiRequest<NutritionCalculateResponse>("/nutrition/calculate", {
    method: "POST",
    body: toApiRequest(input),
    auth: true,
  });
}
