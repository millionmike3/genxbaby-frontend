import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req: Request) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const userId = 0;

  const fullName = String(data.get("fullName"));
  const email = String(data.get("email"));
  const phone = String(data.get("phone"));

  const ownershipDoc = data.get("ownershipDoc") as File;
  const propertyAddress = data.get("propertyAddress")
    ? String(data.get("propertyAddress"))
    : null;

  const buffer = Buffer.from(await ownershipDoc.arrayBuffer());
  const docUrl = await prisma.fileStorage.upload(buffer, ownershipDoc.name);

  // Upsert owner record
  const owner = await prisma.owner.upsert({
    where: { userId },
    update: {
      fullName,
      email,
      phone,
      ownershipVerified: true,
      ownershipDocUrl: docUrl,
    },
    create: {
      userId,
      fullName,
      email,
      phone,
      ownershipVerified: true,
      ownershipDocUrl: docUrl,
    },
  });

  // Optional: Create property record
  if (propertyAddress) {
    await prisma.ownerProperty.create({
      data: {
        ownerId: owner.id,
        address: propertyAddress,
      },
    });
  }

  // Fraud trigger
  await prisma.fraudEvent.create({
    data: {
      ownerId: owner.id,
      eventType: "OWNER_ONBOARDING",
      metadata: {
        fullName,
        email,
        phone,
        propertyAddress,
      },
    },
  });

  return NextResponse.redirect("/owner");
}
