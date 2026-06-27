import { NextResponse } from "next/server";
import { contactRateLimit } from "@/config/contact";
import { getEmailConfig } from "@/config/email";
import { parseContactPayload } from "@/lib/contact/validate";
import {
  buildTeamNotificationEmail,
  buildUserConfirmationEmail,
} from "@/lib/email/contact-emails";
import { getResendClient } from "@/lib/email/resend";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp, contactRateLimit.maxRequests, contactRateLimit.windowMs)) {
    return NextResponse.json(
      { message: "Too many messages sent. Please try again later." },
      { status: 429 },
    );
  }

  let payload;

  try {
    payload = parseContactPayload(await request.json());
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
    const { from, to } = getEmailConfig();
    const resend = getResendClient();
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
