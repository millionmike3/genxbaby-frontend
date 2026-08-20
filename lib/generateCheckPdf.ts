import PDFDocument from "pdfkit";

export function generateCheckPdf({
  payee,
  amount,
  memo,
}: {
  payee: string;
  amount: number;
  memo?: string;
}) {
  const doc = new PDFDocument({ size: "LETTER", margin: 40 });
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(20).text("Certified Check", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Payee: ${payee}`);
  doc.text(`Amount: $${amount.toFixed(2)}`);
  if (memo) doc.text(`Memo: ${memo}`);

  doc.end();

  return Buffer.concat(chunks);
}
