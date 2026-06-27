import type { Metadata } from "next";
import { LoginModal } from "@/components/auth";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your Nutrition Side professional account.",
};

export default function LoginPage() {
  return <LoginModal />;
}
