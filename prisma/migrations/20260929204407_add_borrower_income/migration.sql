-- CreateTable
CREATE TABLE "BorrowerIncome" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "w2IncomeAnnual" INTEGER,
    "w2IncomeMonthly" INTEGER,
    "contractorIncomeAnnual" INTEGER,
    "contractorIncomeMonthly" INTEGER,
    "selfEmploymentIncomeAnnual" INTEGER,
    "selfEmploymentIncomeMonthly" INTEGER,
    "otherIncomeAnnual" INTEGER,
    "otherIncomeMonthly" INTEGER,
    "totalIncomeMonthly" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerIncome_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerIncome" ADD CONSTRAINT "BorrowerIncome_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerIncome" ADD CONSTRAINT "BorrowerIncome_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
