import type { Metadata } from "next";
import { RequireAuth } from "@/components/auth/require-auth";
import { CalculatorClient } from "@/components/calculator";

export const metadata: Metadata = {
  title: "TNS Calculator",
  description:
    "Clinical nutrition calculator with evidence-based equations for BMI, BMR, macros, fluid requirements, and more.",
};

export default function CalculatorPage() {
  return (
    <RequireAuth>
      <CalculatorClient />
    </RequireAuth>
  );
}
