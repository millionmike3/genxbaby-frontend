import { getPrisma } from "@/lib/prisma";
import SubmitClient from "./SubmitClient";

export default async function SubmitPage({ params }: { params: { applicationId: string } }) {
  const prisma = getPrisma();
  const applicationId = params.applicationId;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: {
      status: true,
    },
  });

  if (!application) {
    return <div className="text-red-400">Application not found.</div>;
  }

  return (
    <SubmitClient
      applicationId={applicationId}
      status={application.status}
    />
  );
}
