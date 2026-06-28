"use client";

import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FormAlert } from "@/components/auth/form-alert";
import { Button, Container, Input, Label, Textarea } from "@/components/ui";

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const initialForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export function ContactSection() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setFormError(
          data?.message ??
            "Unable to send your message. Please try again later.",
        );
        return;
      }

      setSuccessMessage(
        data?.message ??
          "Thanks for reaching out. We will get back to you as soon as possible.",
      );
      setForm(initialForm);
    } catch {
      setFormError("Unable to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-gradient-section-soft py-14 lg:py-20">
      <Container size="wide">
        <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative min-h-[280px] md:min-h-0 md:h-full">
            <div className="absolute -left-4 top-6 h-40 w-40 rounded-full bg-logo-green-200/40" />
            <div className="absolute -right-2 bottom-8 z-10 h-24 w-24 rounded-full bg-un-blue-100/70" />
            <div className="shadow-clinical absolute inset-0 overflow-hidden rounded-2xl border border-clinical">
              <Image
                src="/images/contact.jpg"
                alt="Nutritionist consulting with a client"
                fill
                quality={75}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford-blue-500/50 via-oxford-blue-500/10 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-eyebrow">Contact Us</p>
            <h1 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-oxford-blue-500 sm:text-[36px] lg:text-[40px]">
              Get in <span className="text-accent-gradient">Touch</span>
            </h1>
            <p className="text-body mt-4 max-w-lg">
              Have a question about our platform, need support, or ready to
              transform your practice? Send us a message and our team will get
              back to you within one business day.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              noValidate
            >
              {formError && <FormAlert>{formError}</FormAlert>}
              {successMessage && (
                <FormAlert variant="success">{successMessage}</FormAlert>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
