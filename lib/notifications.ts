export async function sendEmailNotification(to: string, subject: string, body: string) {
  // Plug in your provider (SendGrid, SES, Resend, etc.)
  console.log("EMAIL →", { to, subject, body });
}

export async function sendSmsNotification(to: string, body: string) {
  // Plug in Twilio or similar
  console.log("SMS →", { to, body });
}
