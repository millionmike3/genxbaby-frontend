const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ficoBuckets = [760, 740, 720, 700, 680, 660, 640, 620];
const ltvBuckets = [60, 70, 75, 80, 85, 90, 95];

function calcAdj(fico, ltv) {
  const ficoPenalty = ((760 - fico) / 40) * 0.10;
  const ltvPenalty = ((ltv - 60) / 5) * 0.05;
  return Number((ficoPenalty + ltvPenalty).toFixed(3));
}

async function main() {
  // 1. Seed LlpaGrid (your high-level LLPA definition)
  await prisma.llpaGrid.create({
    data: {
      investor: "FNMA",
      productType: "FRM30",
      purpose: "purchase",
      occupancy: "owner",
      ficoMin: 740,
      ficoMax: 760,
      ltvMin: 0.80,
      ltvMax: 0.95,
      termMonths: 360,
      llpaBps: 25,
    },
  });

  // 2. Seed LlpaGridRow (your granular LLPA rows)
  const rows = [];

  for (const fico of ficoBuckets) {
    for (const ltv of ltvBuckets) {
      rows.push({
        pricingSheetId: null, // optional
        creditScore: fico,
        ltv: ltv / 100, // convert 80 → 0.80
        llpaFactor: calcAdj(fico, ltv),
        metadata: {
          source: "FNMA",
          productType: "FRM30",
          purpose: "purchase",
          occupancy: "owner",
        },
      });
    }
  }

  await prisma.llpaGridRow.createMany({ data: rows });

  console.log("LLPA grid + LLPA rows seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
