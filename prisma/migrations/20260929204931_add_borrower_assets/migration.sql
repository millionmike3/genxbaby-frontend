-- CreateTable
CREATE TABLE "BorrowerAssets" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "checkingBalance" INTEGER,
    "savingsBalance" INTEGER,
    "cashOnHand" INTEGER,
    "retirementBalance" INTEGER,
    "investmentBalance" INTEGER,
    "otherAssets" INTEGER,
    "totalAssets" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerAssets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerAssets" ADD CONSTRAINT "BorrowerAssets_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerAssets" ADD CONSTRAINT "BorrowerAssets_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
