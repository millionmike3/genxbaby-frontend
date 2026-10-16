"use server";

import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ClientView from "./ClientView";

export default async function MortgageDetailPage({ params }) {
  await requireRole(["ADMIN"]);

  const loan = await prisma.mortgage.findUnique({
    where: { id: Number(params.id) },
    include: {
      borrower: true,
      property: true,
      pricing: true,
      fraud: true,
      underwriting: true,
      documents: true,
      conditions: true,
    },
  });

  if (!loan) {
    return <div className="text-white p-10">Loan not found</div>;
  }

  // ⭐ IMPORTANT: Only return the ClientView
  return <ClientView loan={loan} />;
}
