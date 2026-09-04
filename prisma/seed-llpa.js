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
  const rows = [];

  for (const fico of ficoBuckets) {
    for (const ltv of ltvBuckets) {
      rows.push({
        agency: "FNMA",
        productType: "FIXED",
        occupancy: "OWNER",
        propertyType: "SFR",
        purpose: "PURCHASE",
        ficoBucket: fico,
        ltvBucket: ltv,
        adjustment: calcAdj(fico, ltv),
      });
    }
  }

  await prisma.llpaGridRow.createMany({ data: rows });
  console.log("LLPA grid seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
