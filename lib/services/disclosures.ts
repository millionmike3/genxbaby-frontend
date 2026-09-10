import { PDFDocument, StandardFonts } from "pdf-lib";
import { supabaseServer } from "@/lib/supabase/server";

const BUCKET = process.env.SUPABASE_BUCKET!;

export async function generateInitialDisclosures(app: any) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page = pdfDoc.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();

  const drawText = (text: string, x: number, y: number, size = 10) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: pdfDoc.embedColor([0, 0, 0]),
    });
  };

  // Header
  drawText("GENXBABY - Initial Disclosures", 50, height - 50, 14);

  // Borrower info
  drawText(`Borrower: ${app.fullName}`, 50, height - 90);
  drawText(`Email: ${app.email}`, 50, height - 110);
  drawText(`Property: ${app.propertyAddress}`, 50, height - 130);

  // Loan info (placeholder fields)
  drawText(`Loan Amount: ${app.loanAmount}`, 50, height - 170);
  drawText(`Product: ${app.productType}`, 50, height - 190);
  drawText(`Rate: ${app.noteRate}%`, 50, height - 210);

  // Basic disclosures (simplified)
  drawText("ECOA Notice:", 50, height - 250, 12);
  drawText(
    "We do not discriminate on the basis of race, color, religion, national origin, sex, marital status, age...",
    50,
    height - 270
  );

  drawText("Privacy Notice:", 50, height - 310, 12);
  drawText(
    "We collect and share information as permitted by law to process your application and service your loan.",
    50,
    height - 330
  );

  drawText("Servicing Disclosure:", 50, height - 370, 12);
  drawText(
    "Your loan may be transferred to another servicer. You will be notified in writing if this occurs.",
    50,
    height - 390
  );

  // Signature placeholders
  drawText("Borrower Signature: _______________________", 50, 120, 12);
  drawText("Date: ___________________", 50, 100, 12);

  const pdfBytes = await pdfDoc.save();

  const filePath = `disclosures/${app.id}/initial-${Date.now()}.pdf`;

  const { data, error } = await supabaseServer.storage
    .from(BUCKET)
    .upload(filePath, pdfBytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabaseServer.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}
