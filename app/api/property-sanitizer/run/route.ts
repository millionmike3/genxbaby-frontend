import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";
import { runPropertySanitizer } from "@/lib/sanitizer/property";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const propertyId = Number(data.get("propertyId"));

  const report = await runPropertySanitizer(propertyId);

  await prisma.sanitizerReport.upsert({
    where: { propertyId },
    update: report,
    create: {
      propertyId,
      ...report,
    },
  });

  return NextResponse.redirect(`/property-sanitizer/${propertyId}`);
}
