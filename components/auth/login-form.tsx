"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { FieldError, FormAlert } from "@/components/auth/form-alert";
import { Button, Input, Label, PasswordInput } from "@/components/ui";
import { completeAuthSuccess } from "@/lib/auth/navigation";
import { resolveReturnTo } from "@/config/routes";
import {
  ApiError,
  getCurrentUser,
  getFieldErrors,
  loginUser,
} from "@/lib/api";
import { saveSession } from "@/lib/auth/session";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? undefined;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const tokens = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      saveSession(tokens);

      const user = await getCurrentUser();
      completeAuthSuccess(router, tokens, user, resolveReturnTo(returnTo));
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(getFieldErrors(error));
        setFormError(error.message);
      } else {
        setFormError("Unable to sign in. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {formError && <FormAlert>{formError}</FormAlert>}

      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@clinic.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          disabled={isSubmitting}
          required
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={Boolean(fieldErrors.password)}
          disabled={isSubmitting}
          required
        />
        <FieldError message={fieldErrors.password} />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full shadow-logo"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
}
