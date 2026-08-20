import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { BankProfile } from "@prisma/client";

type CertifiedCheckInput = {
  profile: BankProfile;
  payee: string;
  amount: number;
  memo?: string;
};

export async function generateCertifiedCheckPdf({
  profile,
  payee,
  amount,
  memo,
}: CertifiedCheckInput): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 396]); // 8.5" x 5.5" check size

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();

  // === BORDER ===
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
  });

  // === BANK INFO ===
  page.drawText(profile.bankName, {
    x: 40,
    y: height - 60,
    size: 16,
    font: boldFont,
  });

  page.drawText(`Routing: ${profile.routingNumber}`, {
    x: 40,
    y: height - 85,
    size: 11,
    font,
  });

  page.drawText(`Account: ${profile.accountNumber}`, {
    x: 40,
    y: height - 105,
    size: 11,
    font,
  });

  // === CHECK NUMBER (TOP RIGHT) ===
  page.drawText(`Check No.: ${profile.nextCheckNumber}`, {
    x: width - 180,
    y: height - 60,
    size: 14,
    font: boldFont,
  });

  // === PAYEE ===
  page.drawText("Pay to the Order of:", {
    x: 40,
    y: height - 150,
    size: 11,
    font,
  });

  page.drawText(payee, {
    x: 180,
    y: height - 150,
    size: 13,
    font: boldFont,
  });

  // === AMOUNT ===
  const amountStr = `$${amount.toFixed(2)}`;

  page.drawText(amountStr, {
    x: width - 180,
    y: height - 150,
    size: 13,
    font: boldFont,
  });

  // === AMOUNT IN WORDS (placeholder) ===
  page.drawText("Amount:", {
    x: 40,
    y: height - 180,
    size: 11,
    font,
  });

  page.drawText(amountStr, {
    x: 110,
    y: height - 180,
    size: 12,
    font,
  });

  // === MEMO ===
  if (memo) {
    page.drawText("Memo:", {
      x: 40,
      y: height - 210,
      size: 11,
      font,
    });

    page.drawText(memo, {
      x: 100,
      y: height - 210,
      size: 11,
      font,
    });
  }

  // === SIGNATURE LINE ===
  page.drawLine({
    start: { x: width - 240, y: 100 },
    end: { x: width - 40, y: 100 },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText("Authorized Signature", {
    x: width - 230,
    y: 85,
    size: 9,
    font,
  });

  // === MICR LINE ===
  const micrLine = `${profile.routingNumber}   ${profile.accountNumber}   ${profile.nextCheckNumber}`;

  page.drawText(micrLine, {
    x: 60,
    y: 40,
    size: 14,
    font: boldFont,
  });

  // === EXPORT PDF ===
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
