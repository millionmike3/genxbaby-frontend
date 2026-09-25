import { prisma } from "@/lib/prisma";

export class InvestorService {
  // ------------------------------------------------------------
  // GET ONE INVESTOR
  // ------------------------------------------------------------
  static async getById(id: string) {
    return prisma.investor.findUnique({
      where: { id },
      include: {
        documents: true,
        behaviorEvents: true,
        scoringResults: true,
      },
    });
  }

  // ------------------------------------------------------------
  // GET ALL INVESTORS
  // ------------------------------------------------------------
  static async getAll(limit = 100) {
    return prisma.investor.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        documents: true,
        scoringResults: true,
      },
    });
  }

  // ------------------------------------------------------------
  // CREATE INVESTOR
  // ------------------------------------------------------------
  static async create(data: {
    name: string;
    email: string;
    phone?: string;
    metadata?: any;
  }) {
    return prisma.investor.create({
      data: {
        ...data,
        metadata: data.metadata ?? {},
      },
    });
  }

  // ------------------------------------------------------------
  // UPDATE INVESTOR
  // ------------------------------------------------------------
  static async update(id: string, data: any) {
    return prisma.investor.update({
      where: { id },
      data,
    });
  }

  // ------------------------------------------------------------
  // DELETE INVESTOR
  // ------------------------------------------------------------
  static async delete(id: string) {
    return prisma.investor.delete({
      where: { id },
    });
  }

  // ------------------------------------------------------------
  // ADD DOCUMENT TO INVESTOR
  // ------------------------------------------------------------
  static async addDocument(
    investorId: string,
    doc: {
      name: string;
      type: string;
      url: string;
      metadata?: any;
    }
  ) {
    return prisma.document.create({
      data: {
        investorId,
        name: doc.name,
        type: doc.type,
        url: doc.url,
        metadata: doc.metadata ?? {},
      },
    });
  }

  // ------------------------------------------------------------
  // ADD BEHAVIOR EVENT
  // ------------------------------------------------------------
  static async addBehaviorEvent(
    investorId: string,
    event: { type: string; metadata?: any }
  ) {
    return prisma.behaviorEvent.create({
      data: {
        investorId,
        type: event.type,
        metadata: event.metadata ?? {},
      },
    });
  }

  // ------------------------------------------------------------
  // ADD SCORING RESULT
  // ------------------------------------------------------------
  static async addScoringResult(
    investorId: string,
    scoring: {
      fraudScore: number;
      riskScore: number;
      impulsivenessScore: number;
      metadata?: any;
    }
  ) {
    return prisma.scoringResult.create({
      data: {
        investorId,
        fraudScore: scoring.fraudScore,
        riskScore: scoring.riskScore,
        impulsivenessScore: scoring.impulsivenessScore,
        metadata: scoring.metadata ?? {},
      },
    });
  }
}
