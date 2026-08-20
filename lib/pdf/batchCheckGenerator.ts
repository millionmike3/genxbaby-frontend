import PDFDocument from "pdfkit";

export function generateBatchChecksPdf(checks: Array<any>) {
  const doc = new PDFDocument({ size: "LETTER", margin: 40 });
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {});

  doc.fontSize(20).text("Batch Check Packet", { align: "center" });
  doc.moveDown(2);

  checks.forEach((check, index) => {
    doc.fontSize(14).text(`Check #${index + 1}`, { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(`Payee: ${check.payee}`);
    doc.text(`Amount: $${check.amount}`);
    doc.text(`Memo: ${check.memo}`);
    doc.text(`Date: ${check.date}`);
    doc.moveDown();

    if (index < checks.length - 1) {
      doc.addPage();
    }
  });

  doc.end();

  return Buffer.concat(chunks);
}
