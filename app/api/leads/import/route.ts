import { NextResponse } from "next/server";
import Papa from "papaparse";
import { createLead } from "@/lib/db/leads";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const text = await file.text();
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });

    let count = 0;

    for (const row of parsed.data as any[]) {
      await createLead({
        id: crypto.randomUUID(),
        name: row.name,
        email: row.email,
        phone: row.phone,
        propertyAddress: row.propertyAddress,
        loanBalance: Number(row.loanBalance),
        equityEstimate: Number(row.equityEstimate),
        borrowerType: row.borrowerType || "unknown",
        hardshipScore: Number(row.hardshipScore || 0),
        hardshipBand: row.hardshipBand || "low",
        investorPotentialScore: Number(row.investorPotentialScore || 0),
        investorPotentialBand: row.investorPotentialBand || "low",
        impulsivityScore: Number(row.impulsivityScore || 0),
        impulsivityBand: row.impulsivityBand || "low",
        status: "new",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      count++;
    }

    return NextResponse.json({ success: true, count });
  } catch (err) {
    console.error("CSV import failed:", err);
    return NextResponse.json({ error: "Failed to import CSV" }, { status: 500 });
  }
}
