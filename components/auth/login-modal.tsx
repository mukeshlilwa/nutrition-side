import { Suspense } from "react";
import { AuthModalFooterLink } from "@/components/auth/auth-modal-footer";
import { AuthModal } from "@/components/auth/auth-modal";
import { LoginForm } from "@/components/auth/login-form";
import { RedirectIfAuthed } from "@/components/auth/redirect-if-authed";

export function LoginModal() {
  return (
    <AuthModal
      eyebrow="Welcome Back"
      title={
        <>
          Log in to your <span className="text-accent-gradient">account</span>
        </>
      }
      description="Sign in to access your clinical nutrition workspace."
      footer={
        <AuthModalFooterLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/register"
        />
      }
    >
      <Suspense fallback={null}>
        <RedirectIfAuthed>
          <LoginForm />
        </RedirectIfAuthed>
      </Suspense>
    </AuthModal>
  );
}
