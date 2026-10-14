import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { classifyDocument } from "@/lib/documents/classifier";
import { runFraudScan } from "@/lib/fraud/scan";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const mortgageId = Number(data.get("mortgageId"));
  const type = String(data.get("type"));
  const file = data.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload file to storage
  const url = await prisma.fileStorage.upload(buffer, file.name);

  // Classification
  const classification = await classifyDocument(buffer);

  // Create document record
  const doc = await prisma.document.create({
    data: {
      mortgageId,
      type,
      name: file.name,
      url,
      classification,
      status: "PENDING",
    },
  });

  // Fraud scan
  await runFraudScan(doc.id);

  return NextResponse.redirect("/borrower");
}
