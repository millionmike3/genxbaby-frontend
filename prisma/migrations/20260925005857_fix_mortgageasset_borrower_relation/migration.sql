-- CreateTable
CREATE TABLE "OwnershipEntity" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ein" TEXT,
    "type" TEXT NOT NULL,
    "ownershipPercent" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnershipEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "ownershipEntityId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "purchasePrice" INTEGER NOT NULL,
    "currentValue" INTEGER,
    "acquisitionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentRoll" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "unitNumber" TEXT,
    "rent" INTEGER NOT NULL,
    "leaseStart" TIMESTAMP(3),
    "leaseEnd" TIMESTAMP(3),
    "tenantName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentRoll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyFinancials" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "noi" INTEGER,
    "capRate" DOUBLE PRECISION,
    "expenses" INTEGER,
    "taxes" INTEGER,
    "insurance" INTEGER,
    "maintenance" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyFinancials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerEquity" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "equityAmount" INTEGER NOT NULL,
    "equityPercent" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnerEquity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MortgageAsset" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "borrowerId" TEXT,
    "loanAmount" INTEGER NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "termMonths" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "currentBalance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MortgageAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "mortgageAssetId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "principal" INTEGER,
    "interest" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MortgagePerformance" (
    "id" SERIAL NOT NULL,
    "mortgageAssetId" INTEGER NOT NULL,
    "dti" DOUBLE PRECISION,
    "ltv" DOUBLE PRECISION,
    "cltv" DOUBLE PRECISION,
    "riskScore" DOUBLE PRECISION,
    "behaviorScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MortgagePerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyFinancials_propertyId_key" ON "PropertyFinancials"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerEquity_propertyId_key" ON "OwnerEquity"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "MortgagePerformance_mortgageAssetId_key" ON "MortgagePerformance"("mortgageAssetId");

-- AddForeignKey
ALTER TABLE "OwnershipEntity" ADD CONSTRAINT "OwnershipEntity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownershipEntityId_fkey" FOREIGN KEY ("ownershipEntityId") REFERENCES "OwnershipEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentRoll" ADD CONSTRAINT "RentRoll_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyFinancials" ADD CONSTRAINT "PropertyFinancials_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerEquity" ADD CONSTRAINT "OwnerEquity_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortgageAsset" ADD CONSTRAINT "MortgageAsset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortgageAsset" ADD CONSTRAINT "MortgageAsset_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "Borrower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_mortgageAssetId_fkey" FOREIGN KEY ("mortgageAssetId") REFERENCES "MortgageAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortgagePerformance" ADD CONSTRAINT "MortgagePerformance_mortgageAssetId_fkey" FOREIGN KEY ("mortgageAssetId") REFERENCES "MortgageAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
