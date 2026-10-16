/*
  Warnings:

  - The primary key for the `MortgageAsset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Owner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MortgageAsset" DROP CONSTRAINT "MortgageAsset_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "MortgagePerformance" DROP CONSTRAINT "MortgagePerformance_mortgageAssetId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentHistory" DROP CONSTRAINT "PaymentHistory_mortgageAssetId_fkey";

-- DropIndex
DROP INDEX "Owner_email_key";

-- AlterTable
ALTER TABLE "MortgageAsset" DROP CONSTRAINT "MortgageAsset_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MortgageAsset_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MortgageAsset_id_seq";

-- AlterTable
ALTER TABLE "MortgagePerformance" ALTER COLUMN "mortgageAssetId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "createdAt",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fullName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" ALTER COLUMN "mortgageAssetId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_userId_key" ON "Owner"("userId");

-- AddForeignKey
ALTER TABLE "MortgageAsset" ADD CONSTRAINT "MortgageAsset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_mortgageAssetId_fkey" FOREIGN KEY ("mortgageAssetId") REFERENCES "MortgageAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MortgagePerformance" ADD CONSTRAINT "MortgagePerformance_mortgageAssetId_fkey" FOREIGN KEY ("mortgageAssetId") REFERENCES "MortgageAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
