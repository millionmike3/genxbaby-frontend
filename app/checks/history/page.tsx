import prisma from "@/lib/prisma";
import CheckHistoryClient from "./CheckHistoryClient";
import { CheckHistoryItem } from "./types";


export default async function CheckHistoryPage() {
  const checks = await prisma.check.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      bankProfile: true,
      signer: true,
      fraudFlags: true,
    },
  });

  const typedChecks: CheckHistoryItem[] = checks as unknown as CheckHistoryItem[];

  return <CheckHistoryClient checks={typedChecks} />;
}

