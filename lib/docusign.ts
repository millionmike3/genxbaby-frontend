export async function sendDocuSignEnvelope(
  applicationId: string,
  recipientEmail: string,
  recipientName: string,
  docs: { name: string; url: string }[]
) {
  // Plug in DocuSign REST API here.
  console.log("DocuSign envelope →", {
    applicationId,
    recipientEmail,
    recipientName,
    docs,
  });
}
