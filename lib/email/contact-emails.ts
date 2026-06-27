import { siteConfig } from "@/config/site";

type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildTeamNotificationEmail(payload: ContactDetails) {
  const fullName = `${payload.firstName} ${payload.lastName}`;
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return {
    subject: `New contact message from ${fullName}`,
    text: [
      `Name: ${fullName}`,
      `Email: ${payload.email}`,
      "",
      "Message:",
      payload.message,
    ].join("\n"),
    html: `
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `.trim(),
  };
}

export function buildUserConfirmationEmail(payload: ContactDetails) {
  const firstName = payload.firstName;

  return {
    subject: `Thanks for contacting ${siteConfig.name}`,
    text: [
      `Hi ${firstName},`,
      "",
      `Thank you for contacting ${siteConfig.name}.`,
      "We have received your message and our team will reply as soon as possible.",
      "",
      `Best regards,`,
      `The ${siteConfig.name} Team`,
    ].join("\n"),
    html: `
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thank you for contacting <strong>${escapeHtml(siteConfig.name)}</strong>.</p>
      <p>We have received your message and our team will reply as soon as possible.</p>
      <p>
        Best regards,<br />
        The ${escapeHtml(siteConfig.name)} Team
      </p>
    `.trim(),
  };
}
