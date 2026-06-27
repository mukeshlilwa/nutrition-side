import { Suspense } from "react";
import { AuthModalFooterLink } from "@/components/auth/auth-modal-footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { RegisterForm } from "@/components/auth/register-form";
import { RedirectIfAuthed } from "@/components/auth/redirect-if-authed";

export function RegisterModal() {
  return (
    <AuthModal
      eyebrow="Create Account"
      title={
        <>
          Join <span className="text-accent-gradient">The Nutrition Side</span>
        </>
      }
      description="Create your account with name, email, and password."
      footer={
        <AuthModalFooterLink
          text="Already have an account?"
          linkText="Log in"
          href="/login"
        />
      }
    >
      <Suspense fallback={null}>
        <RedirectIfAuthed>
          <RegisterForm />
        </RedirectIfAuthed>
      </Suspense>
    </AuthModal>
  );
}
