/*
  Warnings:

  - Added the required column `dob` to the `Borrower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Borrower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Borrower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ssn` to the `Borrower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borrower" ADD COLUMN     "citizenship" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT,
ADD COLUMN     "ssn" TEXT NOT NULL;
