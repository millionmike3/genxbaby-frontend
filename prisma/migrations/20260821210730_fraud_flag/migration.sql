/*
  Warnings:

  - You are about to drop the column `reason` on the `FraudFlag` table. All the data in the column will be lost.
  - Added the required column `message` to the `FraudFlag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FraudFlag" DROP COLUMN "reason",
ADD COLUMN     "message" TEXT NOT NULL;
