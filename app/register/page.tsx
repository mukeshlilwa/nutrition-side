import type { Metadata } from "next";
import { RegisterModal } from "@/components/auth";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your professional account on The Nutrition Side.",
};

export default function RegisterPage() {
  return <RegisterModal />;
}
