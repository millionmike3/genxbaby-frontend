-- CreateTable
CREATE TABLE "BorrowerProperty" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "propertyCity" TEXT NOT NULL,
    "propertyState" TEXT NOT NULL,
    "propertyZip" TEXT NOT NULL,
    "occupancyType" TEXT,
    "propertyType" TEXT,
    "purchasePrice" INTEGER,
    "estimatedValue" INTEGER,
    "loanAmount" INTEGER,
    "downPayment" INTEGER,
    "downPaymentSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerProperty" ADD CONSTRAINT "BorrowerProperty_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerProperty" ADD CONSTRAINT "BorrowerProperty_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
