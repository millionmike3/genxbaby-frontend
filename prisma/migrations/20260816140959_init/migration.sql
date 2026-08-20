/*
  Warnings:

  - The primary key for the `BankProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BankProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bankProfileId` column on the `Check` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Audit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Audit" DROP CONSTRAINT "Audit_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Check" DROP CONSTRAINT "Check_bankProfileId_fkey";

-- AlterTable
ALTER TABLE "BankProfile" DROP CONSTRAINT "BankProfile_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "BankProfile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "bankProfileId",
ADD COLUMN     "bankProfileId" INTEGER;

-- DropTable
DROP TABLE "Audit";

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "adminId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_bankProfileId_fkey" FOREIGN KEY ("bankProfileId") REFERENCES "BankProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
