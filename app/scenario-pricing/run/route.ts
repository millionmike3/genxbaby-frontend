import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/db/prisma";

export async function POST(req) {
  const prisma = await getPrisma();
  const data = await req.formData();

  const creditScore = Number(data.get("creditScore"));
  const ltv = Number(data.get("ltv"));
  const cltv = Number(data.get("cltv"));
  const dti = Number(data.get("dti"));
  const loanAmount = Number(data.get("loanAmount"));
  const product = String(data.get("product"));
  const term = Number(data.get("term"));
  const occupancy = String(data.get("occupancy"));
  const purpose = String(data.get("purpose"));

  // 1. Base Rate
  const baseRate = await prisma.baseRate.findFirst({
    where: { product, term },
  });

  if (!baseRate) {
    return NextResponse.json({ error: "No base rate found" });
  }

  // 2. LLPA
  const llpa = await prisma.llpaGrid.findFirst({
    where: {
      creditBucket: { lte: creditScore },
      ltvBucket: { gte: ltv },
    },
  });

  const llpaBps = llpa?.adjustmentBps ?? 0;

  // 3. Overlays
  const overlays = await prisma.pricingOverlay.findMany();
  let overlayBps = 0;

  overlays.forEach((o) => {
    if (
      (o.type === "DTI" && dti > 45) ||
      (o.type === "LTV" && ltv > 80) ||
      (o.type === "CLTV" && cltv > 90) ||
      (o.type === "CREDIT" && creditScore < 660) ||
      (o.type === "OCCUPANCY" && occupancy !== "Primary") ||
      (o.type === "PURPOSE" && purpose === "Cash-Out")
    ) {
      overlayBps += o.adjustmentBps;
    }
  });

  // 4. Margin Controls
  const margins = await prisma.marginControl.findMany();
  let marginBps = 0;

  margins.forEach((m) => {
    marginBps += m.marginBps;
  });

  // 5. Delivery Pricing
  const delivery = await prisma.deliveryPricing.findFirst({
    where: { deliveryWindowDays: 30 },
  });

  const deliveryBps = delivery?.adjustmentBps ?? 0;

  // 6. Exceptions
  const exceptions = await prisma.pricingException.findMany();
  let exceptionBps = 0;

  exceptions.forEach((ex) => {
    exceptionBps += ex.adjustmentBps;
  });

  // Final Rate Calculation
  const finalRate =
    baseRate.rate +
    (llpaBps + overlayBps + marginBps + deliveryBps + exceptionBps) / 10000;

  return NextResponse.json({
    baseRate: baseRate.rate,
    llpaBps,
    overlayBps,
    marginBps,
    deliveryBps,
    exceptionBps,
    finalRate,
  });
}
