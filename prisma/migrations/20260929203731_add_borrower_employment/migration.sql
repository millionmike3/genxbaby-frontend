-- CreateTable
CREATE TABLE "BorrowerEmployment" (
    "id" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "employerName" TEXT NOT NULL,
    "jobTitle" TEXT,
    "employmentType" TEXT,
    "startDate" TIMESTAMP(3),
    "yearsInProfession" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BorrowerEmployment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowerEmployment" ADD CONSTRAINT "BorrowerEmployment_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowerEmployment" ADD CONSTRAINT "BorrowerEmployment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
