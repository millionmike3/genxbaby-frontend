-- CreateTable
CREATE TABLE "BorrowerDeclarations" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "bankruptcy" BOOLEAN,
    "foreclosure" BOOLEAN,
    "judgments" BOOLEAN,
    "delinquentFederalDebt" BOOLEAN,
    "alimonyChildSupport" BOOLEAN,
    "coMakerEndorser" BOOLEAN,
    "ownershipInterest" BOOLEAN,
    "outstandingLiens" BOOLEAN,
    "citizenshipStatus" TEXT,
    "militaryService" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerDeclarations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerDeclarations" ADD CONSTRAINT "BorrowerDeclarations_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerDeclarations" ADD CONSTRAINT "BorrowerDeclarations_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
