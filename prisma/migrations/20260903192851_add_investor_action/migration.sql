/*
  Warnings:

  - Added the required column `action` to the `InvestorBehavior` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvestorAction" AS ENUM ('QUOTE_REQUEST', 'LOGIN', 'VIEWED_DASHBOARD');

-- AlterTable
ALTER TABLE "InvestorBehavior" ADD COLUMN     "action" TEXT NOT NULL;
