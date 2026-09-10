import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const type = formData.get("type") as string | null;

  if (!file || !type) {
    return NextResponse.json(
      { error: "Missing file or type" },
      { status: 400 }
    );
  }

  // TODO: upload to S3 / storage; placeholder URL:
  const url = `https://storage.example.com/${session.user.id}/${file.name}`;

  const application = await prisma.application.findFirst({
    where: { borrower: { userId: session.user.id } },
    orderBy: { createdAt: "desc" },
  });

  if (!application) {
    return NextResponse.json(
      { error: "No application found" },
      { status: 404 }
    );
  }

  await prisma.document.create({
    data: {
      applicationId: application.id,
      type,
      url,
    },
  });

  await prisma.timelineEvent.create({
    data: {
      applicationId: application.id,
      type: "document_upload",
      message: `${type} uploaded`,
    },
  });

  return NextResponse.json({ url });
}
