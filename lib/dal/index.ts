// lib/dal/index.ts
import { getPrisma } from "@/lib/db/prisma";

export async function getDAL() {
  const prisma = await getPrisma();
  return { prisma };
}

/**
 * ID helpers
 * All public DAL methods accept string IDs.
 * We only convert to number where Prisma expects Int (User.id, userId).
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
 * DAL
 */
export const DAL = {
  // ------------------------------------------------------------
  // USER DOMAIN
  // ------------------------------------------------------------
  User: {
    Basic: {
      async getById(userId: string) {
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

      async getByEmail(email: string) {
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

      async listAdmins() {
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
      async getRiskScore(userId: string) {
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

      async getScoreRecord(userId: string) {
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

      async getAllScoresForUser(userId: string) {
        const uid = toUserId(userId);
        return prisma.scoreRecord.findMany({
          where: { userId: uid },
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
      async getFraudProfile(userId: string) {
        const uid = toUserId(userId);
        return prisma.user.findUnique({
          where: { id: uid },
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
      async getBehaviorProfile(userId: string) {
        const uid = toUserId(userId);
        return prisma.behaviorProfile.findMany({
          where: { userId: uid },
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

      async getBehaviorEvents(userId: string) {
        const uid = toUserId(userId);
        return prisma.behaviorEvent.findMany({
          where: { userId: uid },
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

    Bluetooth: {
      async getBluetoothEvents(userId: string) {
        const uid = toUserId(userId);
        return prisma.bluetoothEvent.findMany({
          where: { userId: uid },
          select: {
            id: true,
            eventType: true,
            deviceId: true,
            rssi: true,
            metadata: true,
            createdAt: true,
          },
        });
      },

      async getBluetoothAlerts(userId: string) {
        const uid = toUserId(userId);
        return prisma.bluetoothAlert.findMany({
          where: { userId: uid },
          select: {
            id: true,
            alertType: true,
            deviceId: true,
            rssi: true,
            metadata: true,
            createdAt: true,
          },
        });
      },

      async getBluetoothRiskEvents(userId: string) {
        const uid = toUserId(userId);
        return prisma.bluetoothRiskEvent.findMany({
          where: { userId: uid },
          select: {
            id: true,
            riskScore: true,
            signals: true,
            metadata: true,
            createdAt: true,
          },
        });
      },
    },

    Pipeline: {
      async getUserPipelineScores(userId: string) {
        const uid = toUserId(userId);
        return prisma.user.findUnique({
          where: { id: uid },
          select: {
            id: true,
            email: true,
            scoreRecords: {
              select: {
                id: true,
                applicationId: true,
                fraudScore: true,
                riskScore: true,
                impulsivenessScore: true,
                signals: true,
                factors: true,
                metadata: true,
                createdAt: true,
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
            },
          },
        });
      },
    },
  },

  // ------------------------------------------------------------
  // BORROWER DOMAIN
  // ------------------------------------------------------------
  Borrower: {
    Basic: {
      async getById(borrowerId: string) {
        return prisma.borrower.findUnique({
          where: { id: borrowerId },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            employer: true,
            email: true,
            fullName: true,
            phone: true,
            userId: true,
            riskScore: {
              select: {
                id: true,
                score: true,
                factors: true,
                metadata: true,
              },
            },
            behaviorScore: {
              select: {
                id: true,
                behaviorScore: true,
                patterns: true,
                metadata: true,
              },
            },
            financialScore: {
              select: {
                id: true,
                financialScore: true,
                metrics: true,
                metadata: true,
              },
            },
          },
        });
      },

      async getByEmail(email: string) {
        return prisma.borrower.findUnique({
          where: { email },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            employer: true,
            email: true,
            fullName: true,
            phone: true,
            userId: true,
          },
        });
      },
    },

    Applications: {
      async getWithApplications(borrowerId: string) {
        return prisma.borrower.findUnique({
          where: { id: borrowerId },
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            createdAt: true,
            applications: {
              select: {
                id: true,
                status: true,
                loanAmount: true,
                propertyAddress: true,
                purchasePrice: true,
                behaviorScore: true,
                fraudScore: true,
                routingScore: true,
                underwritingScore: true,
                createdAt: true,
                timelineEvents: {
                  select: {
                    id: true,
                    type: true,
                    message: true,
                    createdAt: true,
                  },
                },
                documents: {
                  select: {
                    id: true,
                    type: true,
                    url: true,
                    fraudScore: true,
                    embedColor: true,
                    metadata: true,
                  },
                },
                disclosures: {
                  select: {
                    id: true,
                    type: true,
                    title: true,
                    url: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        });
      },
    },

    Scores: {
      async getAnalytics(borrowerId: string) {
        return prisma.borrower.findUnique({
          where: { id: borrowerId },
          select: {
            id: true,
            fullName: true,
            email: true,
            BorrowerBehavioralRiskLayer: {
              select: {
                id: true,
                riskScore: true,
                factors: true,
                metadata: true,
              },
            },
            BorrowerBehavioralDrift: {
              select: {
                id: true,
                driftScore: true,
                drift: true,
                metadata: true,
              },
            },
            BorrowerRepaymentResilience: {
              select: {
                id: true,
                resilienceScore: true,
                factors: true,
                metadata: true,
              },
            },
            BorrowerRetentionAnalytics: {
              select: {
                id: true,
                retentionScore: true,
                signals: true,
                metadata: true,
              },
            },
            BorrowerHardshipAnalytics: {
              select: {
                id: true,
                hardshipScore: true,
                indicators: true,
                metadata: true,
              },
            },
            BorrowerFinancialStability: {
              select: {
                id: true,
                stabilityScore: true,
                factors: true,
                metadata: true,
              },
            },
            BorrowerFinancialDrift: {
              select: {
                id: true,
                driftScore: true,
                drift: true,
                metadata: true,
              },
            },
            BorrowerMacroRiskExposure: {
              select: {
                id: true,
                macroFactors: true,
                exposureScore: true,
                metadata: true,
              },
            },
          },
        });
      },
    },
  },

  // ------------------------------------------------------------
  // INVESTOR DOMAIN
  // ------------------------------------------------------------
  Investor: {
    Basic: {
      async getById(investorId: string) {
        return prisma.investor.findUnique({
          where: { id: investorId },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            investorPotentialScore: true,
            investorPotentialBand: true,
            notes: true,
            pricingSheet: {
              select: {
                id: true,
                effectiveAt: true,
                programName: true,
                baseRate: true,
                adjustments: true,
              },
            },
          },
        });
      },

      async listAll() {
        return prisma.investor.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            investorPotentialScore: true,
            investorPotentialBand: true,
            createdAt: true,
          },
        });
      },
    },

    Scores: {
      async getScores(investorId: string) {
        return prisma.investor.findUnique({
          where: { id: investorId },
          select: {
            id: true,
            name: true,
            InvestorRiskScore: {
              select: {
                id: true,
                score: true,
                factors: true,
                metadata: true,
              },
            },
            InvestorBehaviorScore: {
              select: {
                id: true,
                behaviorScore: true,
                patterns: true,
                metadata: true,
              },
            },
            InvestorLiquidityScore: {
              select: {
                id: true,
                liquidityScore: true,
                metrics: true,
                metadata: true,
              },
            },
            scoringResults: {
              select: {
                id: true,
                fraudScore: true,
                riskScore: true,
                impulsivenessScore: true,
                signals: true,
                factors: true,
                metadata: true,
                createdAt: true,
              },
            },
          },
        });
      },
    },

    Analytics: {
      async getAnalytics(investorId: string) {
        return prisma.investor.findUnique({
          where: { id: investorId },
          select: {
            id: true,
            name: true,
            InvestorLiquidity: {
              select: {
                id: true,
                liquidityScore: true,
                factors: true,
                metadata: true,
              },
            },
            InvestorPerformanceSnapshot: {
              select: {
                id: true,
                metrics: true,
                metadata: true,
                createdAt: true,
              },
            },
            InvestorRiskBandHistory: {
              select: {
                id: true,
                band: true,
                timestamp: true,
                metadata: true,
              },
            },
            InvestorCapitalFlow: {
              select: {
                id: true,
                flowAmount: true,
                flowType: true,
                metadata: true,
                createdAt: true,
              },
            },
            InvestorAllocationDynamics: {
              select: {
                id: true,
                allocation: true,
                dynamics: true,
                metadata: true,
              },
            },
            InvestorDiversificationAnalytics: {
              select: {
                id: true,
                diversificationScore: true,
                factors: true,
                metadata: true,
              },
            },
          },
        });
      },
    },

    Pipeline: {
      async getPipelineDeals(investorId: string) {
        return prisma.pipelineDeal.findMany({
          where: { investorId },
          select: {
            id: true,
            name: true,
            status: true,
            metadata: true,
            createdAt: true,
            application: {
              select: {
                id: true,
                status: true,
                loanAmount: true,
                behaviorScore: true,
                fraudScore: true,
                underwritingScore: true,
              },
            },
          },
        });
      },
    },
  },

  // ------------------------------------------------------------
  // LEAD DOMAIN
  // ------------------------------------------------------------
  Lead: {
    Basic: {
      async getById(leadId: string) {
        return prisma.lead.findUnique({
          where: { id: leadId },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            scores: true,
            userId: true,
          },
        });
      },

      async listRecent(limit = 50) {
        return prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            scores: true,
          },
        });
      },
    },

    Scores: {
      async getScoring(leadId: string) {
        return prisma.leadScoringResult.findMany({
          where: { leadId },
          select: {
            id: true,
            leadId: true,
            userId: true,
            fraudScore: true,
            riskScore: true,
            impulsivenessScore: true,
            signals: true,
            factors: true,
            metadata: true,
            createdAt: true,
          },
        });
      },
    },

    Events: {
      async getEvents(leadId: string) {
        return prisma.leadEvent.findMany({
          where: { leadId },
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

      async getContactAttempts(leadId: string) {
        return prisma.contactAttempt.findMany({
          where: { leadId },
          select: {
            id: true,
            timestamp: true,
            notes: true,
            channel: true,
            outcome: true,
          },
        });
      },
    },

    Behavior: {
      async getBehaviorProfiles(leadId: string) {
        return prisma.behaviorProfile.findMany({
          where: { leadId },
          select: {
            id: true,
            profileType: true,
            metrics: true,
            metadata: true,
            createdAt: true,
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
    },
  },

  // ------------------------------------------------------------
  // APPLICATION DOMAIN (heavy, deep includes)
  // ------------------------------------------------------------
  Application: {
    Basic: {
      async getById(applicationId: string) {
        return prisma.application.findUnique({
          where: { id: applicationId },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            loanType: true,
            loanAmount: true,
            propertyAddress: true,
            purchasePrice: true,
            incomeAnnual: true,
            assetsLiquid: true,
            behaviorScore: true,
            fraudScore: true,
            routingScore: true,
            underwritingScore: true,
            borrowerId: true,
            borrower: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              },
            },
          },
        });
      },

      async listRecent(limit = 50) {
        return prisma.application.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
          select: {
            id: true,
            createdAt: true,
            status: true,
            loanAmount: true,
            propertyAddress: true,
            behaviorScore: true,
            fraudScore: true,
            underwritingScore: true,
            borrower: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });
      },
    },

    Full: {
      async getFull(applicationId: string) {
        return prisma.application.findUnique({
          where: { id: applicationId },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            loanType: true,
            loanAmount: true,
            propertyAddress: true,
            purchasePrice: true,
            incomeAnnual: true,
            assetsLiquid: true,
            behaviorScore: true,
            fraudScore: true,
            routingScore: true,
            underwritingScore: true,
            borrower: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                employer: true,
              },
            },
                        underwriting: {
              select: {
                id: true,
                status: true,
                dti: true,
                ltv: true,
                llpa: true,
                riskFactors: true,
                decision: true,
                rationale: true,
                createdAt: true,
                updatedAt: true,
              },
            },

            pricing: {
              select: {
                id: true,
                baseRate: true,
                llpa: true,
                riskAdjustments: true,
                fraudAdjustments: true,
                finalRate: true,
                rationale: true,
                createdAt: true,
                updatedAt: true,
              },
            },

            fraud: {
              select: {
                id: true,
                fraudScore: true,
                signals: true,
                anomalies: true,
                deviceCount: true,
                bluetoothDensity: true,
                environmentRisk: true,
                createdAt: true,
                updatedAt: true,
              },
            },

            scoring: {
              select: {
                id: true,
                riskScore: true,
                fraudScore: true,
                impulsivenessScore: true,
                behavior: true,
                createdAt: true,
                updatedAt: true,
              },
            },

            timelineEvents: {
              select: {
                id: true,
                type: true,
                message: true,
                createdAt: true,
              },
            },

            documents: {
              select: {
                id: true,
                type: true,
                url: true,
                metadata: true,
                createdAt: true,
              },
            },
          },
        });
      },
    },
  },
};
