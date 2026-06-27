function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getEmailConfig() {
  const fromName = requireEnv("RESEND_FROM_NAME");
  const fromEmail = requireEnv("RESEND_FROM_EMAIL");
  const toEmail =
    process.env.RESEND_TO_EMAIL?.trim() || requireEnv("RESEND_FROM_EMAIL");

  return {
    apiKey: requireEnv("RESEND_API_KEY"),
    from: `${fromName} <${fromEmail}>`,
    to: toEmail,
  } as const;
}
