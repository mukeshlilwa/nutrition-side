import type { HTTPValidationError } from "@/types/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(getErrorMessage(status, data));
    this.name = "ApiError";
  }
}

function getErrorMessage(status: number, data: unknown): string {
  if (status === 422) {
    const validation = data as HTTPValidationError;
    const first = validation.detail?.[0];
    if (first) return first.msg;
  }

  if (
    data &&
    typeof data === "object" &&
    "detail" in data &&
    typeof (data as { detail: unknown }).detail === "string"
  ) {
    const detail = (data as { detail: string }).detail;
    if (detail === "Not authenticated") {
      return "Please log in to use the calculator.";
    }
    return detail;
  }

  if (status === 401) return "Invalid email or password.";
  if (status === 409) return "An account with this email already exists.";

  return "Something went wrong. Please try again.";
}

export function getFieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiError) || error.status !== 422) return {};

  const validation = error.data as HTTPValidationError;
  const errors: Record<string, string> = {};

  for (const item of validation.detail ?? []) {
    const field = item.loc[item.loc.length - 1];
    if (typeof field === "string") {
      errors[field] = item.msg;
    }
  }

  return errors;
}
