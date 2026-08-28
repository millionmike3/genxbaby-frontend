/*
  Warnings:

  - Added the required column `reason` to the `FraudFlag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FraudFlag" ADD COLUMN     "reason" TEXT NOT NULL;
