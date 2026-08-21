-- CreateTable
CREATE TABLE "PipelineDeal" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PipelineDeal_pkey" PRIMARY KEY ("id")
);
