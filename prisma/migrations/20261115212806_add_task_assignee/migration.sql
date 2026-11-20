/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `LoanOfficer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `LoanOfficer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `LoanOfficer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `LoanOfficer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoanOfficer" DROP COLUMN "passwordHash",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "branch" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "licenseState" TEXT,
ADD COLUMN     "licenseStatus" TEXT,
ADD COLUMN     "nmlsId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assigneeId" INTEGER;

-- CreateTable
CREATE TABLE "StaffProfile" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "employeeNumber" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "jobTitle" TEXT,
    "department" TEXT,
    "employmentStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    "managerUserId" INTEGER,
    "location" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessorProfile" (
    "id" TEXT NOT NULL,
    "staffProfileId" TEXT NOT NULL,
    "processorCode" TEXT,
    "specialization" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "maxActiveFiles" INTEGER NOT NULL DEFAULT 25,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_userId_key" ON "StaffProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_employeeNumber_key" ON "StaffProfile"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessorProfile_staffProfileId_key" ON "ProcessorProfile"("staffProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessorProfile_processorCode_key" ON "ProcessorProfile"("processorCode");

-- CreateIndex
CREATE UNIQUE INDEX "LoanOfficer_userId_key" ON "LoanOfficer"("userId");

-- AddForeignKey
ALTER TABLE "LoanOfficer" ADD CONSTRAINT "LoanOfficer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffProfile" ADD CONSTRAINT "StaffProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffProfile" ADD CONSTRAINT "StaffProfile_managerUserId_fkey" FOREIGN KEY ("managerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessorProfile" ADD CONSTRAINT "ProcessorProfile_staffProfileId_fkey" FOREIGN KEY ("staffProfileId") REFERENCES "StaffProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
