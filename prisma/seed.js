const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // ---------------------------------------------
  // 1. Existing Bank / Signer / Check seed
  // ---------------------------------------------
  const bank = await prisma.bankProfile.create({
    data: {
      bankName: "Test Bank",
      routingNumber: "123456789",
      accountNumber: "987654321",
      accountType: "checking",
      signerName: "John Doe",
    },
  });

  const signer = await prisma.signer.create({
    data: {
      name: "John Doe",
      bankProfileId: bank.id,
    },
  });

  await prisma.check.create({
    data: {
      checkNumber: "1001",
      amount: 500,
      memo: "Seed Check",
      payee: "Seed Vendor",
      status: "PENDING",
      bankProfileId: bank.id,
      signerId: signer.id,
    },
  });

  // ---------------------------------------------
  // 2. Seed Users (10 borrowers, 10 investors, 10 owners)
  // ---------------------------------------------
  const SEED_PASSWORD = "GenXBaby!2026";
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);

  const borrowerUsers = [];
  const investorUsers = [];
  const ownerUsers = [];

  for (let i = 1; i <= 10; i++) {
    const borrower = await prisma.user.upsert({
      where: { email: `borrower${i}@genxbaby.com` },
      update: {},
      create: {
        email: `borrower${i}@genxbaby.com`,
        username: `borrower${i}`,
        role: "borrower",
        passwordHash,
      },
    });
    borrowerUsers.push(borrower);
  }

  for (let i = 1; i <= 10; i++) {
    const investor = await prisma.user.upsert({
      where: { email: `investor${i}@genxbaby.com` },
      update: {},
      create: {
        email: `investor${i}@genxbaby.com`,
        username: `investor${i}`,
        role: "investor",
        passwordHash,
      },
    });
    investorUsers.push(investor);
  }

  for (let i = 1; i <= 10; i++) {
    const owner = await prisma.user.upsert({
      where: { email: `owner${i}@genxbaby.com` },
      update: {},
      create: {
        email: `owner${i}@genxbaby.com`,
        username: `owner${i}`,
        role: "owner",
        passwordHash,
      },
    });
    ownerUsers.push(owner);
  }

  // ---------------------------------------------
  // 3. Borrowers + Applications + Underwriting + Fraud + Documents
  // ---------------------------------------------
  const loanTypes = ["Conventional", "FHA", "Non-QM", "Hard Money"];

  const sampleProperties = [
    {
      address: "123 Maple Ave, Mount Vernon, NY 10550",
      purchasePrice: 650000,
      propertyValue: 660000,
      loanAmount: 520000,
      totalLiens: 520000,
      incomeAnnual: 145000,
      assetsLiquid: 85000,
      incomeMonthly: 12000,
      debtsMonthly: 2500,
      pitiMonthly: 3200,
      noteRate: 6.25,
    },
    {
      address: "45-12 160th St, Flushing, NY 11358",
      purchasePrice: 780000,
      propertyValue: 800000,
      loanAmount: 624000,
      totalLiens: 624000,
      incomeAnnual: 165000,
      assetsLiquid: 95000,
      incomeMonthly: 13750,
      debtsMonthly: 3200,
      pitiMonthly: 3900,
      noteRate: 6.75,
    },
    {
      address: "89 Lenox Rd, Brooklyn, NY 11226",
      purchasePrice: 550000,
      propertyValue: 560000,
      loanAmount: 440000,
      totalLiens: 440000,
      incomeAnnual: 120000,
      assetsLiquid: 60000,
      incomeMonthly: 10000,
      debtsMonthly: 2100,
      pitiMonthly: 2900,
      noteRate: 7.1,
    },
    {
      address: "210 W 122nd St, New York, NY 10027",
      purchasePrice: 900000,
      propertyValue: 920000,
      loanAmount: 720000,
      totalLiens: 720000,
      incomeAnnual: 190000,
      assetsLiquid: 120000,
      incomeMonthly: 15800,
      debtsMonthly: 3800,
      pitiMonthly: 4600,
      noteRate: 8.25,
    },
  ];

  for (let i = 0; i < borrowerUsers.length; i++) {
    const user = borrowerUsers[i];
    const prop = sampleProperties[i % sampleProperties.length];
    const loanType = loanTypes[i % loanTypes.length];

    // Borrower record linked to User
    const borrower = await prisma.borrower.create({
      data: {
        employer: "GenXBaby Borrower Employer",
        email: user.email,
        fullName: `Borrower ${i + 1}`,
        phone: "555-111-0000",
        userId: user.id,
      },
    });

    const dti =
      (prop.debtsMonthly + prop.pitiMonthly) / prop.incomeMonthly;
    const ltv = prop.loanAmount / prop.propertyValue;
    const cltv = prop.totalLiens / prop.propertyValue;

    const behaviorScore = 0.7 + (Math.random() - 0.5) * 0.2;
    const fraudScore = 0.1 + (Math.random() - 0.5) * 0.1;
    const routingScore = 0.75 + (Math.random() - 0.5) * 0.15;
    const underwritingScore = 80 + Math.floor(Math.random() * 10);

    const app = await prisma.application.create({
      data: {
        borrowerId: borrower.id,
        employer: borrower.employer,
        underwritingStatus: "in_review",
        noteRate: prop.noteRate,
        liquidAssets: prop.assetsLiquid,
        status: "submitted",
        loanType,
        behaviorScore,
        fraudScore,
        routingScore,
        propertyAddress: prop.address,
        purchasePrice: prop.purchasePrice,
        incomeAnnual: prop.incomeAnnual,
        assetsLiquid: prop.assetsLiquid,
        underwritingScore,
        incomeMonthly: prop.incomeMonthly,
        debtsMonthly: prop.debtsMonthly,
        pitiMonthly: prop.pitiMonthly,
        propertyValue: prop.propertyValue,
        loanAmount: prop.loanAmount,
        totalLiens: prop.totalLiens,
      },
    });

    await prisma.underwritingCase.create({
      data: {
        applicationId: app.id,
        dti,
        ltv,
        cltv,
        reservesMonths: 6 + Math.random() * 6,
        riskScore: underwritingScore,
        fraudScore,
        investorDecision: ltv < 0.85 && dti < 0.45 ? "approve" : "review",
        llpa: ltv > 0.8 ? 1.25 : 0.75,
        finalRate: prop.noteRate + (fraudScore > 0.15 ? 0.5 : 0.0),
        reasons: {
          dti,
          ltv,
          cltv,
          reservesMonths: 6,
        },
        investorReasons: {
          band: ltv < 0.8 ? "prime" : "near-prime",
        },
        status: "in_review",
        notes: "Seed underwriting case for simulation.",
      },
    });

    await prisma.fraudScore.create({
      data: {
        userId: user.id,
        score: fraudScore,
        factors: {
          ipReputation: "clean",
          deviceConsistency: "stable",
          docAnomalies: "none",
        },
        metadata: {
          seed: true,
          environment: "dev",
        },
      },
    });

    await prisma.fraudEvent.create({
      data: {
        userId: user.id,
        applicationId: app.id,
        anchorTxHash: `seed-tx-${user.id}`,
        eventType: "identity_check",
        signal: {
          idMatch: true,
          addressMatch: true,
          phoneMatch: true,
        },
        payload: {
          source: "KYC provider",
          confidence: 0.97,
        },
        metadata: {
          seed: true,
        },
      },
    });

    await prisma.fraudSignal.create({
      data: {
        userId: user.id,
        signalType: "low_risk",
        strength: 0.1,
        metadata: {
          seed: true,
          reason: "clean history, stable behavior",
        },
      },
    });

    // Documents for the application
    const idDoc = await prisma.document.create({
      data: {
        applicationId: app.id,
        type: "id_verification",
        url: "https://example.com/docs/borrower-id.pdf",
        fraudScore: 0.02,
        fraudSignals: {
          mismatch: false,
        },
        embedColor: "#22c55e",
      },
    });

    const bankStmtDoc = await prisma.document.create({
      data: {
        applicationId: app.id,
        type: "bank_statement",
        url: "https://example.com/docs/bank-statement.pdf",
        fraudScore: 0.05,
        fraudSignals: {
          unusualActivity: false,
        },
        embedColor: "#3b82f6",
      },
    });

    await prisma.documentClassification.create({
      data: {
        documentId: idDoc.id,
        category: "ID",
        confidence: 0.99,
        metadata: { seed: true },
      },
    });

    await prisma.documentOcrExtraction.create({
      data: {
        documentId: bankStmtDoc.id,
        text: "Sample bank statement OCR text",
        fields: {
          accountNumber: "987654321",
          balance: 85000,
        },
        confidence: 0.96,
        metadata: { seed: true },
      },
    });

    await prisma.documentEmbedding.create({
      data: {
        documentId: bankStmtDoc.id,
        vector: { dim: 768, values: "seed-vector-placeholder" },
        metadata: { seed: true },
      },
    });

    await prisma.documentRiskSignal.create({
      data: {
        documentId: bankStmtDoc.id,
        signalType: "low_risk",
        strength: 0.08,
        metadata: { seed: true },
      },
    });
  }

  // ---------------------------------------------
  // 4. Investors + Scoring + Liquidity + Positions
  // ---------------------------------------------
  for (let i = 0; i < investorUsers.length; i++) {
    const user = investorUsers[i];

    const investor = await prisma.investor.create({
      data: {
        name: `Investor ${i + 1}`,
        email: user.email,
        phone: "555-000-0000",
        userId: user.id,
        notes: "Seed investor for portfolio simulation.",
      },
    });

    await prisma.investorRiskScore.create({
      data: {
        investorId: investor.id,
        score: 0.65 + (Math.random() - 0.5) * 0.2,
        factors: {
          volatility: "moderate",
          diversification: "medium",
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorBehaviorScore.create({
      data: {
        investorId: investor.id,
        behaviorScore: 0.7 + (Math.random() - 0.5) * 0.2,
        patterns: {
          rebalancingFrequency: "quarterly",
          riskAppetite: "balanced",
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorLiquidityScore.create({
      data: {
        investorId: investor.id,
        liquidityScore: 0.8 + (Math.random() - 0.5) * 0.1,
        metrics: {
          cashOnHand: 250000 + Math.floor(Math.random() * 250000),
          creditLines: 500000,
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorLiquidity.create({
      data: {
        investorId: investor.id,
        liquidityScore: 0.8,
        factors: {
          cash: "strong",
          accessToCapital: "high",
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorPerformanceSnapshot.create({
      data: {
        investorId: investor.id,
        metrics: {
          irr: 0.11 + (Math.random() - 0.5) * 0.02,
          realizedYield: 0.09,
          unrealizedGain: 0.04,
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorRiskBandHistory.create({
      data: {
        investorId: investor.id,
        band: "medium",
        timestamp: new Date(),
        metadata: { seed: true },
      },
    });

    await prisma.investorCapitalFlow.create({
      data: {
        investorId: investor.id,
        flowAmount: 250000 + Math.floor(Math.random() * 250000),
        flowType: "inflow",
        metadata: { seed: true },
      },
    });

    await prisma.investorAllocationDynamics.create({
      data: {
        investorId: investor.id,
        allocation: {
          conventional: 0.4,
          fha: 0.2,
          nonqm: 0.25,
          hardMoney: 0.15,
        },
        dynamics: {
          shiftTowardNonQM: true,
        },
        metadata: { seed: true },
      },
    });

    await prisma.investorDiversificationAnalytics.create({
      data: {
        investorId: investor.id,
        diversificationScore: 0.78,
        factors: {
          geographySpread: "tri-state",
          productMix: "multi-program",
        },
        metadata: { seed: true },
      },
    });

    // Positions tied to investor user (Position.investorId -> User.id)
    await prisma.position.create({
      data: {
        investorId: user.id,
        note: "Conventional 30-year fixed",
        amount: 250000,
        yield: "7.25%",
      },
    });

    await prisma.position.create({
      data: {
        investorId: user.id,
        note: "Non-QM DSCR loan",
        amount: 400000,
        yield: "9.50%",
      },
    });
  }

  console.log(
    "Seed complete: Bank, Signer, Check, 10 Borrowers + Applications + Underwriting + Fraud + Documents, 10 Investors + Scoring + Positions, 10 Owners (users only)."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
