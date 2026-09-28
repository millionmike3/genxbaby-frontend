import { getPrisma } from "@/lib/db/prisma";

export const UserDAL = {
  // ------------------------------------------------------------
  // BASIC USER FETCH
  // ------------------------------------------------------------
  getUserById: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  getUserWithProfile: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        borrower: true,
        investor: true,
        lead: true,
      },
    });
  },

  // ------------------------------------------------------------
  // USER + SCORE RECORDS (GLOBAL SCORING)
  // ------------------------------------------------------------
  getUserWithScores: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        scoreRecords: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            applicationId: true,
            userId: true,

            fraudScore: true,
            riskScore: true,
            impulsivenessScore: true,
            factors: true,
            signals: true,
            metadata: true,
          },
        },
      },
    });
  },

  getLatestScore: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.scoreRecord.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        applicationId: true,
        userId: true,

        fraudScore: true,
        riskScore: true,
        impulsivenessScore: true,
        factors: true,
        signals: true,
        metadata: true,
      },
    });
  },

  // ------------------------------------------------------------
  // USER + APPLICATIONS
  // ------------------------------------------------------------
  getUserWithApplications: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        borrower: {
          include: {
            applications: {
              orderBy: { createdAt: "desc" },
              include: {
                underwriting: true,
                documents: true,
                disclosures: true,
                timeline: {
                  orderBy: { createdAt: "desc" },
                },
                scoreRecords: {
                  orderBy: { createdAt: "desc" },
                  select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    applicationId: true,
                    userId: true,

                    fraudScore: true,
                    riskScore: true,
                    impulsivenessScore: true,
                    factors: true,
                    signals: true,
                    metadata: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  // ------------------------------------------------------------
  // USER + FRAUD EVENTS
  // ------------------------------------------------------------
  getUserWithFraudEvents: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        fraudEvents: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  // ------------------------------------------------------------
  // USER + SERVICING SIGNALS
  // ------------------------------------------------------------
  getUserWithServicingSignals: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        ServicingEventScore: true,
        ServicingRiskSignal: true,
      },
    });
  },

  // ------------------------------------------------------------
  // USER + UNDERWRITING
  // ------------------------------------------------------------
  getUserWithUnderwriting: async (userId: string) => {
    const prisma = await getPrisma();

    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        borrower: {
          include: {
            applications: {
              include: {
                underwriting: true,
              },
            },
          },
        },
      },
    });
  },
};
