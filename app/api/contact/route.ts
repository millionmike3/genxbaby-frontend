import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const body = await req.json();

  const { name, email, message } = body;

  // Save message in DB
  await prisma.adminMessage.create({
    data: { name, email, message },
  });

  // Email notification to YOU
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Form Submission",
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
  });

  return NextResponse.json({ ok: true });
}
