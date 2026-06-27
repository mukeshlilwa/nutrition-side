import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getEmailConfig } from "@/config/email";
import {
  buildTeamNotificationEmail,
  buildUserConfirmationEmail,
} from "@/lib/email/contact-emails";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const lastName = typeof data.lastName === "string" ? data.lastName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!firstName || !lastName || !email || !message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return { firstName, lastName, email, message };
}

export async function POST(request: Request) {
  let payload: ContactPayload | null;

  try {
    payload = parsePayload(await request.json());
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { message: "Please fill in all fields with a valid email address." },
      { status: 400 },
    );
  }

  try {
    const { apiKey, from, to } = getEmailConfig();
    const resend = new Resend(apiKey);
    const teamEmail = buildTeamNotificationEmail(payload);
    const userEmail = buildUserConfirmationEmail(payload);

    const teamResult = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: teamEmail.subject,
      text: teamEmail.text,
      html: teamEmail.html,
    });

    if (teamResult.error || !teamResult.data?.id) {
      console.error(
        "Resend team notification error:",
        teamResult.error ?? "Missing email id in response",
      );
      return NextResponse.json(
        { message: "Unable to send your message. Please try again later." },
        { status: 502 },
      );
    }

    console.info(
      `Contact notification queued: id=${teamResult.data.id} to=${to}`,
    );

    const userResult = await resend.emails.send({
      from,
      to: [payload.email],
      subject: userEmail.subject,
      text: userEmail.text,
      html: userEmail.html,
    });

    if (userResult.error || !userResult.data?.id) {
      console.error(
        "Resend user confirmation error:",
        userResult.error ?? "Missing email id in response",
      );
    } else {
      console.info(
        `Contact confirmation queued: id=${userResult.data.id} to=${payload.email}`,
      );
    }

    return NextResponse.json({
      message:
        "Thanks for reaching out. We will get back to you as soon as possible.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Unable to send your message. Please try again later." },
      { status: 500 },
    );
  }
}
