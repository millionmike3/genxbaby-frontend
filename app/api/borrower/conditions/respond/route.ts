import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const conditionId = String(data.get("conditionId"));
  const file = data.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload file to storage
  const url = await prisma.fileStorage.upload(buffer, file.name);

  // Save condition response
  await prisma.conditionResponse.create({
    data: {
      conditionId,
      url,
      name: file.name,
    },
  });

  // Notify processor automatically
  await prisma.notification.create({
    data: {
      type: "CONDITION_RESPONSE",
      message: `Borrower submitted a response for condition ${conditionId}`,
    },
  });

  return NextResponse.redirect("/borrower/conditions");
}
