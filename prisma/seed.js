const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create a BankProfile
  const bank = await prisma.bankProfile.create({
    data: {
      bankName: "Test Bank",
      routingNumber: "123456789",
      accountNumber: "987654321",
      accountType: "checking",
      signerName: "John Doe"
    }
  });

  // Create a Signer
  const signer = await prisma.signer.create({
    data: {
      name: "John Doe",
      title: "Treasurer",
      bankProfileId: bank.id
    }
  });

  // Create a Check
  await prisma.check.create({
    data: {
      checkNumber: "1001",
      amount: 500,
      memo: "Seed Check",
      payee: "Seed Vendor",
      status: "PENDING",
      bankProfileId: bank.id,
      signerId: signer.id
    }
  });
}

main()
  .then(() => {
    console.log("Seed complete");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
