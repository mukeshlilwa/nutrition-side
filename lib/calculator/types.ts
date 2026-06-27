export type Gender = "male" | "female";
export type LengthUnit = "cm" | "in" | "ftin";
export type WeightUnit = "kg" | "lbs";
export type Ethnicity = "gen" | "asi" | "afr";
export type ClinicalCondition =
  | "none"
  | "p1"
  | "p2"
  | "p3"
  | "lac"
  | "ckd"
  | "hd"
  | "dm"
  | "old"
  | "ath";

export type UnitPreset = "metric" | "imperial";

export type FieldUnits = {
  height: LengthUnit;
  weight: WeightUnit;
  waist: "cm" | "in";
  hip: "cm" | "in";
  neck: "cm" | "in";
  wrist: "cm" | "in";
  muac: "cm" | "in";
  ubw: WeightUnit;
};

export type CalculatorInput = {
  age: number;
  gender: Gender;
  activity: number;
  condition: ClinicalCondition;
  ethnicity: Ethnicity;
  heightCm: number;
  weightKg: number;
  waistCm: number | null;
  hipCm: number | null;
  neckCm: number | null;
  wristCm: number | null;
  muacCm: number | null;
  elbowMm: number | null;
  bodyFatPct: number | null;
  ubwKg: number | null;
};

export type BadgeColor = "g" | "b" | "a" | "r" | "gy";

export type BmiClass = {
  label: string;
  color: BadgeColor;
};

export type CalculatorResults = {
  age: number;
  gender: Gender;
  hCm: number;
  wKg: number;
  bmi: number;
  bmiClass: BmiClass;
  estBF: number;
  bfMethod: string;
  fatM: number;
  ffm: number;
  lbm: number;
  bsa: number;
  frame: string;
  ibwH: number;
  ibwD: number;
  ibwR: number;
  ibwM: number;
  adjBW: number | null;
  pIBW: number;
  pUBW: number | null;
  wtChg: number | null;
  bmrHB: number;
  bmrMS: number;
  bmrSc: number;
  bmrKM: number;
  teeMS: number;
  teeAdj: number;
  teeLoss: number;
  teeGain: number;
  condX: number;
  ppk: number;
  protG: number;
  carbG: number;
  fatG: number;
  protPct: number;
  fatPct: number;
  actualCarbPct: number;
  satFatG: number;
  fib: number;
  nit: number;
  fl30: number;
  fl35: number;
  flHS: number;
  whr: number | null;
  whtr: number | null;
  wcRisk: string;
  bodyShape: string | null;
  muacStatus: string | null;
  hScore: number;
  hColor: string;
  hLabel: string;
  actLabel: string;
  cLbl: string;
  dateStr: string;
};

export type FormState = {
  age: string;
  gender: Gender | "";
  activity: string;
  condition: ClinicalCondition;
  ethnicity: Ethnicity;
  heightCm: string;
  heightFt: string;
  heightIn: string;
  weight: string;
  waist: string;
  hip: string;
  neck: string;
  wrist: string;
  muac: string;
  elbow: string;
  bodyFatPct: string;
  ubw: string;
};
