// lib/dal/index.ts
import { getPrisma } from "@/lib/db/prisma";

/**
 * ID helpers
 */
const toUserId = (id: string | null | undefined): number | undefined => {
  if (!id) return undefined;
  const n = Number(id);
  return Number.isNaN(n) ? undefined : n;
};

const toStringId = (id: string | null | undefined): string | undefined => {
  if (!id) return undefined;
  return id;
};

/**
 * DAL Factory
 * Every call gets a fresh prisma instance.
 */
export async function DAL() {
  const prisma = await getPrisma();

  return {
    User: {
      Basic: {
        getById(userId: string) {
          return prisma.user.findUnique({
            where: { id: toUserId(userId) },
            select: {
              id: true,
              email: true,
              username: true,
              phone: true,
              role: true,
              walletAddress: true,
              ownerId: true,
              xp: true,
              createdAt: true,
            },
          });
        },

        getByEmail(email: string) {
          return prisma.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              username: true,
              phone: true,
              role: true,
              walletAddress: true,
              ownerId: true,
              xp: true,
              createdAt: true,
            },
          });
        },

        listAdmins() {
          return prisma.user.findMany({
            where: { role: "ADMIN" },
            select: {
              id: true,
              email: true,
              username: true,
              phone: true,
              createdAt: true,
            },
          });
        },
      },

      Scores: {
        getRiskScore(userId: string) {
          return prisma.userRiskScore.findUnique({
            where: { userId: toUserId(userId) },
            select: {
              id: true,
              userId: true,
              fraudScore: true,
              riskScore: true,
              impulsivenessScore: true,
              signals: true,
              factors: true,
              metadata: true,
              createdAt: true,
              updatedAt: true,
            },
          });
        },

        getScoreRecord(userId: string) {
          return prisma.scoreRecord.findUnique({
            where: { userId: toUserId(userId) },
            select: {
              id: true,
              userId: true,
              applicationId: true,
              fraudScore: true,
              riskScore: true,
              impulsivenessScore: true,
              signals: true,
              factors: true,
              metadata: true,
              createdAt: true,
              updatedAt: true,
              application: {
                select: {
                  id: true,
                  status: true,
                  loanAmount: true,
                  behaviorScore: true,
                  fraudScore: true,
                  routingScore: true,
                  underwritingScore: true,
                  createdAt: true,
                },
              },
            },
          });
        },

        getAllScoresForUser(userId: string) {
          return prisma.scoreRecord.findMany({
            where: { userId: toUserId(userId) },
            select: {
              id: true,
              userId: true,
              applicationId: true,
              fraudScore: true,
              riskScore: true,
              impulsivenessScore: true,
              signals: true,
              factors: true,
              metadata: true,
              createdAt: true,
              updatedAt: true,
              application: {
                select: {
                  id: true,
                  status: true,
                  loanAmount: true,
                  behaviorScore: true,
                  fraudScore: true,
                  routingScore: true,
                  underwritingScore: true,
                  createdAt: true,
                },
              },
            },
          });
        },
      },

      Fraud: {
        getFraudProfile(userId: string) {
          return prisma.user.findUnique({
            where: { id: toUserId(userId) },
            select: {
              id: true,
              email: true,
              createdAt: true,
              fraudEvents: {
                select: {
                  id: true,
                  eventType: true,
                  signal: true,
                  payload: true,
                  metadata: true,
                  applicationId: true,
                  createdAt: true,
                },
              },
              fraudScores: {
                select: {
                  id: true,
                  score: true,
                  factors: true,
                  metadata: true,
                  createdAt: true,
                },
              },
              fraudSignals: {
                select: {
                  id: true,
                  signalType: true,
                  strength: true,
                  metadata: true,
                  createdAt: true,
                },
              },
              FraudCaseHistory: {
                select: {
                  id: true,
                  caseType: true,
                  details: true,
                  metadata: true,
                  createdAt: true,
                },
              },
              FraudFlag: {
                select: {
                  id: true,
                  flagType: true,
                  reason: true,
                  metadata: true,
                  checkId: true,
                  createdAt: true,
                  check: {
                    select: {
                      id: true,
                      amount: true,
                      checkNumber: true,
                      status: true,
                      bankProfileId: true,
                    },
                  },
                },
              },
              SuspiciousActivityReport: {
                select: {
                  id: true,
                  reportType: true,
                  details: true,
                  metadata: true,
                  checkId: true,
                  createdAt: true,
                },
              },
            },
          });
        },
      },

      Behavior: {
        getBehaviorProfile(userId: string) {
          return prisma.behaviorProfile.findMany({
            where: { userId: toUserId(userId) },
            select: {
              id: true,
              profileType: true,
              metrics: true,
              metadata: true,
              createdAt: true,
              updatedAt: true,
              events: {
                select: {
                  id: true,
                  eventType: true,
                  page: true,
                  element: true,
                  description: true,
                  responseTimeMs: true,
                  lateNight: true,
                  metadata: true,
                  createdAt: true,
                },
              },
            },
          });
        },

        getBehaviorEvents(userId: string) {
          return prisma.behaviorEvent.findMany({
            where: { userId: toUserUserId(userId) },
            select: {
              id: true,
              eventType: true,
              page: true,
              element: true,
              description: true,
              responseTimeMs: true,
              lateNight: true,
              metadata: true,
              createdAt: true,
            },
          });
        },
      },

      // … and so on for Borrower, Investor, Lead, Application, etc.
    },
  };
}
