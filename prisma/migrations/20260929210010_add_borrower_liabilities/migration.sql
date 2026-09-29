-- CreateTable
CREATE TABLE "BorrowerLiabilities" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "creditCardPayments" INTEGER,
    "autoLoanPayments" INTEGER,
    "studentLoanPayments" INTEGER,
    "personalLoanPayments" INTEGER,
    "collectionsPayments" INTEGER,
    "otherDebtPayments" INTEGER,
    "totalMonthlyDebt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerLiabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerLiabilities" ADD CONSTRAINT "BorrowerLiabilities_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerLiabilities" ADD CONSTRAINT "BorrowerLiabilities_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
