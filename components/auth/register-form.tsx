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
  registerUser,
} from "@/lib/api";
import { saveSession } from "@/lib/auth/session";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setFormError(null);
  }

  function validateClient(): boolean {
    const errors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    if (form.name.trim().length > 100) {
      errors.name = "Name must be 100 characters or fewer.";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    }

    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateClient()) return;

    setIsSubmitting(true);
    setFormError(null);

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      await registerUser(payload);

      const tokens = await loginUser({
        email: payload.email,
        password: payload.password,
      });

      saveSession(tokens);

      const user = await getCurrentUser();
      completeAuthSuccess(router, tokens, user, resolveReturnTo(returnTo));
    } catch (error) {
      if (error instanceof ApiError) {
        setFieldErrors(getFieldErrors(error));
        setFormError(error.message);
      } else {
        setFormError("Unable to create your account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      {formError && <FormAlert>{formError}</FormAlert>}

      <div className="space-y-1.5">
        <Label htmlFor="register-name">Name</Label>
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          placeholder="Dr. Sarah Johnson"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          disabled={isSubmitting}
          minLength={2}
          maxLength={100}
          required
        />
        <FieldError message={fieldErrors.name} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@clinic.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          disabled={isSubmitting}
          required
        />
        <FieldError message={fieldErrors.email} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="register-password">Password</Label>
          <PasswordInput
            id="register-password"
            name="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
            disabled={isSubmitting}
            minLength={8}
            required
          />
          <FieldError message={fieldErrors.password} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="register-confirm-password">Confirm Password</Label>
          <PasswordInput
            id="register-confirm-password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter password"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            aria-invalid={Boolean(fieldErrors.confirmPassword)}
            disabled={isSubmitting}
            required
          />
          <FieldError message={fieldErrors.confirmPassword} />
        </div>
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
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
