/*
  Warnings:

  - Added the required column `metadata` to the `InvestorBehavior` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestorBehavior" ADD COLUMN     "metadata" JSONB NOT NULL;
