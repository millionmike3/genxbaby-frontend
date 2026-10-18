import nodemailer from "nodemailer";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailSMTP({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@genxbaby.com",
    to,
    subject,
    html,
  });
}

export async function sendApplicationCopy(application) {
  await resend.emails.send({
    from: "GenXBaby <noreply@genxbaby.com>",
    to: "info@genxbaby.com",
    subject: `New Mortgage Application — ${application.fullName}`,
    html: `
      <h2>New Mortgage Application Submitted</h2>
      <p><strong>Name:</strong> ${application.fullName}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Phone:</strong> ${application.phone}</p>
      <p><strong>Loan Type:</strong> ${application.loanType}</p>
      <p><strong>Created:</strong> ${application.createdAt}</p>
    `,
  });
}
