-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'INVESTOR', 'BORROWER');

-- CreateTable
CREATE TABLE "BluetoothAlert" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT,
    "message" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BluetoothAlert_pkey" PRIMARY KEY ("id")
);
