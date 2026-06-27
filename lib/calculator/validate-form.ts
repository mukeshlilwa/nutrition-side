import type { FieldUnits, FormState } from "./types";
import { getHeightCm, parseNum, toKg } from "./utils";

export type RequiredFieldErrors = {
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
};

export function validateRequiredFields(
  form: FormState,
  units: FieldUnits,
): RequiredFieldErrors {
  const errors: RequiredFieldErrors = {};

  const age = parseNum(form.age);
  if (!form.age.trim()) {
    errors.age = "Age is required.";
  } else if (age === null) {
    errors.age = "Enter a valid age.";
  } else if (age < 1 || age > 120) {
    errors.age = "Age must be between 1 and 120 years.";
  }

  if (!form.gender) {
    errors.gender = "Please select a gender.";
  }

  const hCm = getHeightCm(units, form.heightCm, form.heightFt, form.heightIn);
  if (units.height === "cm") {
    if (!form.heightCm.trim()) {
      errors.height = "Height is required.";
    } else if (!hCm || hCm < 50 || hCm > 250) {
      errors.height = "Enter a valid height between 50 and 250 cm.";
    }
  } else if (!form.heightFt.trim() && !form.heightIn.trim()) {
    errors.height = "Height is required.";
  } else if (!hCm) {
    errors.height = "Enter a valid height in feet and inches.";
  }

  const weightVal = parseNum(form.weight);
  if (!form.weight.trim()) {
    errors.weight = "Weight is required.";
  } else if (weightVal === null || !toKg(weightVal, units.weight)) {
    errors.weight = "Enter a valid weight.";
  }

  return errors;
}

export function hasFieldErrors(errors: RequiredFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
