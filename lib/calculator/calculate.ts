import type {
  BmiClass,
  CalculatorInput,
  CalculatorResults,
  ClinicalCondition,
  Ethnicity,
  Gender,
} from "./types";
import { rnd, scoreColor, scoreLabel } from "./utils";

function schofield(w: number, h: number, a: number, g: Gender): number {
  if (g === "male") {
    if (a < 3) return 0.167 * w + 15.174 * h - 617.6;
    if (a < 10) return 19.59 * w + 130.3 * h + 414.9;
    if (a < 18) return 16.25 * w + 137.2 * h + 515.5;
    if (a < 30) return 15.057 * w + 692.2;
    if (a < 60) return 11.472 * w + 873.1;
    return 11.711 * w + 587.7;
  }
  if (a < 3) return 16.252 * w + 10.232 * h - 413.5;
  if (a < 10) return 16.969 * w + 161.8 * h + 371.2;
  if (a < 18) return 8.365 * w + 465 * h + 200;
  if (a < 30) return 13.623 * w + 630;
  if (a < 60) return 9.082 * w + 658.5;
  return 8.126 * w + 845.6;
}

function bmiClass(bmi: number, eth: Ethnicity): BmiClass {
  if (eth === "asi") {
    if (bmi < 18.5) return { label: "Underweight", color: "b" };
    if (bmi < 23) return { label: "Normal Weight", color: "g" };
    if (bmi < 27.5) return { label: "Overweight", color: "a" };
    return { label: "Obese", color: "r" };
  }
  if (bmi < 18.5) return { label: "Underweight", color: "b" };
  if (bmi < 25) return { label: "Normal Weight", color: "g" };
  if (bmi < 30) return { label: "Overweight", color: "a" };
  if (bmi < 35) return { label: "Obese Class I", color: "r" };
  if (bmi < 40) return { label: "Obese Class II", color: "r" };
  return { label: "Obese Class III", color: "r" };
}

function healthScore(
  bmi: number,
  bf: number | null,
  whtr: number | null,
  gender: Gender,
): number {
  let s = 100;
  if (bmi >= 18.5 && bmi < 25) s -= 0;
  else if (bmi < 18.5) s -= 22;
  else if (bmi < 27) s -= 8;
  else if (bmi < 30) s -= 16;
  else if (bmi < 35) s -= 26;
  else s -= 40;

  if (whtr) {
    if (whtr < 0.5) s -= 0;
    else if (whtr < 0.55) s -= 10;
    else if (whtr < 0.6) s -= 20;
    else s -= 30;
  }

  if (bf) {
    const ideal = gender === "male" ? [10, 20] : [18, 28];
    if (bf >= ideal[0] && bf <= ideal[1]) s -= 0;
    else if (bf > ideal[1] && bf < ideal[1] + 5) s -= 8;
    else if (bf > ideal[1] + 5) s -= 18;
    else s -= 5;
  }

  return Math.max(0, Math.min(100, Math.round(s)));
}

const ACT_LABELS: Record<string, string> = {
  "1.2": "Sedentary",
  "1.375": "Lightly Active",
  "1.55": "Moderately Active",
  "1.725": "Very Active",
  "1.9": "Extra Active",
};

const COND_LABELS: Record<ClinicalCondition, string> = {
  none: "",
  p1: "Pregnancy — T1",
  p2: "Pregnancy — T2",
  p3: "Pregnancy — T3",
  lac: "Lactation",
  ckd: "CKD",
  hd: "Hemodialysis",
  dm: "Type 2 Diabetes",
  old: "Elderly",
  ath: "Athlete",
};

export function calculateMetrics(input: CalculatorInput): CalculatorResults {
  const {
    age,
    gender,
    activity: act,
    condition: cond,
    ethnicity: eth,
    heightCm: hCm,
    weightKg: wKg,
    waistCm,
    hipCm,
    neckCm,
    wristCm,
    muacCm,
    bodyFatPct: bfK,
    ubwKg,
  } = input;

  const hM = hCm / 100;
  const hIn = hCm / 2.54;
  const o5 = hIn - 60;

  const bmi = wKg / (hM * hM);
  const bmiC = bmiClass(bmi, eth);

  let estBF = bfK;
  let bfMeth = "Known";
  if (!bfK) {
    if (neckCm && waistCm && (gender === "male" || hipCm)) {
      estBF =
        gender === "male"
          ? 86.01 * Math.log10(waistCm - neckCm) -
            70.041 * Math.log10(hCm) +
            36.76
          : 163.205 * Math.log10(waistCm + (hipCm ?? 0) - neckCm) -
            97.684 * Math.log10(hCm) -
            78.387;
      bfMeth = "US Navy";
    } else {
      estBF = 1.2 * bmi + 0.23 * age - 10.8 * (gender === "male" ? 1 : 0) - 5.4;
      bfMeth = "Deurenberg";
    }
  }
  estBF = Math.max(3, Math.min(estBF ?? 0, 70));

  const fatM = wKg * (estBF / 100);
  const ffm = wKg - fatM;
  const lbm =
    gender === "male"
      ? 0.407 * wKg + 0.267 * hCm - 19.2
      : 0.252 * wKg + 0.473 * hCm - 48.3;
  const bsa = Math.sqrt((hCm * wKg) / 3600);

  let frame = "Medium";
  if (wristCm) {
    frame =
      gender === "male"
        ? wristCm < (hCm > 170 ? 17 : 16.5)
          ? "Small"
          : wristCm > (hCm > 170 ? 19 : 18)
            ? "Large"
            : "Medium"
        : wristCm < 14
          ? "Small"
          : wristCm > 15.9
            ? "Large"
            : "Medium";
  }

  const ibwH = Math.max(30, gender === "male" ? 48 + 2.7 * o5 : 45.5 + 2.2 * o5);
  const ibwD = Math.max(30, gender === "male" ? 50 + 2.3 * o5 : 45.5 + 2.3 * o5);
  const ibwR = Math.max(30, gender === "male" ? 52 + 1.9 * o5 : 49 + 1.7 * o5);
  const ibwM = Math.max(30, gender === "male" ? 56.2 + 1.41 * o5 : 53.1 + 1.36 * o5);
  const adjBW = bmi >= 30 ? ibwH + 0.4 * (wKg - ibwH) : null;
  const pIBW = (wKg / ibwH) * 100;
  const pUBW = ubwKg ? (wKg / ubwKg) * 100 : null;
  const wtChg = ubwKg ? wKg - ubwKg : null;

  const bmrHB =
    gender === "male"
      ? 88.362 + 13.397 * wKg + 4.799 * hCm - 5.677 * age
      : 447.593 + 9.247 * wKg + 3.098 * hCm - 4.33 * age;
  const bmrMS =
    gender === "male"
      ? 10 * wKg + 6.25 * hCm - 5 * age + 5
      : 10 * wKg + 6.25 * hCm - 5 * age - 161;
  const bmrSc = schofield(wKg, hM, age, gender);
  const bmrKM = 370 + 21.6 * lbm;
  const teeMS = bmrMS * act;

  let condX = 0;
  if (cond === "p2") condX = 340;
  else if (cond === "p3") condX = 452;
  else if (cond === "lac") condX = 500;

  const teeAdj = teeMS + condX;
  const teeLoss = teeMS - 500;
  const teeGain = teeMS + 500;

  let ppk = 1.2;
  if (cond === "ath") ppk = 1.8;
  else if (cond === "old") ppk = 1.4;
  else if (cond === "ckd") ppk = 0.6;
  else if (cond === "hd") ppk = 1.2;
  else if (["p1", "p2", "p3"].includes(cond)) ppk = 1.3;
  else if (cond === "lac") ppk = 1.5;

  const useW = cond === "ckd" || cond === "hd" ? ibwH : wKg;
  const protG = ppk * useW;
  const protKc = protG * 4;
  const totalKc = teeAdj;
  const protPct = Math.round((protKc / totalKc) * 100);
  const fatPct = 32;
  const actualCarbPct = Math.max(30, 100 - protPct - fatPct);
  const carbG = (totalKc * actualCarbPct) / 100 / 4;
  const fatG = (totalKc * fatPct) / 100 / 9;
  const satFatG = Math.round((totalKc * 0.1) / 9);
  const fib = gender === "male" ? (age > 50 ? 30 : 38) : age > 50 ? 21 : 25;
  const nit = protG / 6.25;

  const fl30 = wKg * 30;
  const fl35 = wKg * 35;
  const flHS =
    wKg <= 10 ? wKg * 100 : wKg <= 20 ? 1000 + (wKg - 10) * 50 : 1500 + (wKg - 20) * 20;

  const whr = waistCm && hipCm ? waistCm / hipCm : null;
  const whtr = waistCm ? waistCm / hCm : null;
  const wcRisk = waistCm
    ? gender === "male"
      ? waistCm >= 102
        ? "High"
        : waistCm >= 94
          ? "Increased"
          : "Low Risk"
      : waistCm >= 88
        ? "High"
        : waistCm >= 80
          ? "Increased"
          : "Low Risk"
    : "";
  const bodyShape =
    waistCm && hipCm
      ? whr! > (gender === "male" ? 0.9 : 0.85)
        ? "Apple — Central"
        : "Pear — Peripheral"
      : null;
  const muacStatus = muacCm
    ? gender === "male"
      ? muacCm < 23
        ? "Malnutrition risk"
        : muacCm > 32
          ? "Overweight"
          : "Normal"
      : muacCm < 22
        ? "Malnutrition risk"
        : muacCm > 30
          ? "Overweight"
          : "Normal"
    : null;

  const hScore = healthScore(bmi, estBF, whtr, gender);
  const hColor = scoreColor(hScore);
  const hLabel = scoreLabel(hScore);
  const actLabel = ACT_LABELS[act.toString()] ?? "";
  const cLbl = COND_LABELS[cond] ?? "";
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    age,
    gender,
    hCm,
    wKg,
    bmi: rnd(bmi)!,
    bmiClass: bmiC,
    estBF: rnd(estBF)!,
    bfMethod: bfMeth,
    fatM: rnd(fatM)!,
    ffm: rnd(ffm)!,
    lbm: rnd(lbm)!,
    bsa: rnd(bsa, 3)!,
    frame,
    ibwH: rnd(ibwH)!,
    ibwD: rnd(ibwD)!,
    ibwR: rnd(ibwR)!,
    ibwM: rnd(ibwM)!,
    adjBW: adjBW ? rnd(adjBW)! : null,
    pIBW: rnd(pIBW)!,
    pUBW: pUBW ? rnd(pUBW)! : null,
    wtChg: wtChg ? rnd(wtChg)! : null,
    bmrHB: rnd(bmrHB, 0)!,
    bmrMS: rnd(bmrMS, 0)!,
    bmrSc: rnd(bmrSc, 0)!,
    bmrKM: rnd(bmrKM, 0)!,
    teeMS: rnd(teeMS, 0)!,
    teeAdj: rnd(teeAdj, 0)!,
    teeLoss: rnd(teeLoss, 0)!,
    teeGain: rnd(teeGain, 0)!,
    condX,
    ppk,
    protG: rnd(protG, 0)!,
    carbG: rnd(carbG, 0)!,
    fatG: rnd(fatG, 0)!,
    protPct,
    fatPct,
    actualCarbPct,
    satFatG,
    fib,
    nit: rnd(nit, 1)!,
    fl30: rnd(fl30, 0)!,
    fl35: rnd(fl35, 0)!,
    flHS: rnd(flHS, 0)!,
    whr: whr ? rnd(whr, 3)! : null,
    whtr: whtr ? rnd(whtr, 3)! : null,
    wcRisk,
    bodyShape,
    muacStatus,
    hScore,
    hColor,
    hLabel,
    actLabel,
    cLbl,
    dateStr,
  };
}
