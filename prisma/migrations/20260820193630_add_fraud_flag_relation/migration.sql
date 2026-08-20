-- CreateTable
CREATE TABLE "FraudFlag" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkId" TEXT NOT NULL,

    CONSTRAINT "FraudFlag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FraudFlag" ADD CONSTRAINT "FraudFlag_checkId_fkey" FOREIGN KEY ("checkId") REFERENCES "Check"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
