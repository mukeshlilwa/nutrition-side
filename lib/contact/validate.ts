import { contactFieldLimits } from "@/config/contact";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trimField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function parseContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const firstName = trimField(data.firstName, contactFieldLimits.firstName);
  const lastName = trimField(data.lastName, contactFieldLimits.lastName);
  const email = trimField(data.email, contactFieldLimits.email).toLowerCase();
  const message = trimField(data.message, contactFieldLimits.message);

  if (!firstName || !lastName || !email || !message) return null;
  if (!emailPattern.test(email)) return null;

  return { firstName, lastName, email, message };
}
