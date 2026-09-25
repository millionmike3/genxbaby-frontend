import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedOwnerPortal() {
  console.log("Seeding Owner Portal...");

  // 1. Create 10 owner users
  const owners = [];
  for (let i = 1; i <= 10; i++) {
    const owner = await prisma.user.create({
      data: {
        email: `owner${i}@example.com`,
        password: "password123",
        role: "owner",
        fullName: `Owner ${i}`,
      },
    });
    owners.push(owner);
  }

  // 2. Create Ownership Entities (LLCs)
  const entities = [];
  for (const owner of owners) {
    const entity = await prisma.ownershipEntity.create({
      data: {
        ownerId: owner.id,
        name: `${owner.fullName} Holdings LLC`,
        ein: `12-34567${owner.id}`,
        type: "LLC",
        ownershipPercent: 100,
      },
    });
    entities.push(entity);
  }

  // 3. Create Properties (2 per LLC)
  const properties = [];
  for (const entity of entities) {
    for (let i = 1; i <= 2; i++) {
      const prop = await prisma.property.create({
        data: {
          ownershipEntityId: entity.id,
          address: `${100 + i} Main St`,
          city: "New York",
          state: "NY",
          zip: "10001",
          type: i % 2 === 0 ? "SFR" : "MF",
          purchasePrice: 300000 + i * 50000,
          currentValue: 350000 + i * 60000,
          acquisitionDate: new Date("2020-01-01"),
        },
      });
      properties.push(prop);
    }
  }

  // 4. Rent Roll (2 units per property)
  for (const prop of properties) {
    for (let u = 1; u <= 2; u++) {
      await prisma.rentRoll.create({
        data: {
          propertyId: prop.id,
          unitNumber: `Unit ${u}`,
          rent: 1500 + u * 200,
          leaseStart: new Date("2023-01-01"),
          leaseEnd: new Date("2024-01-01"),
          tenantName: `Tenant ${u}`,
        },
      });
    }
  }

  // 5. Property Financials
  for (const prop of properties) {
    await prisma.propertyFinancials.create({
      data: {
        propertyId: prop.id,
        noi: 24000,
        capRate: 6.5,
        expenses: 8000,
        taxes: 5000,
        insurance: 1200,
        maintenance: 1500,
      },
    });
  }

  // 6. Owner Equity
  for (const prop of properties) {
    await prisma.ownerEquity.create({
      data: {
        propertyId: prop.id,
        equityAmount: 120000,
        equityPercent: 35,
      },
    });
  }

  // 7. Mortgage Assets (1 per owner)
  const mortgageAssets = [];
  for (const owner of owners) {
    const asset = await prisma.mortgageAsset.create({
      data: {
        ownerId: owner.id,
        borrowerId: null, // optional borrower link
        loanAmount: 250000,
        interestRate: 4.75,
        termMonths: 360,
        status: "active",
        currentBalance: 240000,
      },
    });
    mortgageAssets.push(asset);
  }

  // 8. Payment History (5 per mortgage)
  for (const asset of mortgageAssets) {
    for (let p = 1; p <= 5; p++) {
      await prisma.paymentHistory.create({
        data: {
          mortgageAssetId: asset.id,
          amount: 1800,
          date: new Date(2024, p, 1),
          principal: 500,
          interest: 1300,
        },
      });
    }
  }

  // 9. Mortgage Performance
  for (const asset of mortgageAssets) {
    await prisma.mortgagePerformance.create({
      data: {
        mortgageAssetId: asset.id,
        dti: 0.32,
        ltv: 0.78,
        cltv: 0.80,
        riskScore: 6.4,
        behaviorScore: 7.1,
      },
    });
  }

  console.log("Owner Portal seed complete.");
}

seedOwnerPortal()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
