// lib/server/getAuditTimeline.ts
import { prisma } from "@/lib/prisma";
import { publicClient } from "@/lib/viem";
import { CHECK_REGISTRY_ADDRESS, CHECK_REGISTRY_ABI } from "@/lib/contract";
import { decodeEventLog } from "viem";

const CONTRACT_ADDRESS = CHECK_REGISTRY_ADDRESS as `0x${string}`;

// Typed interface for both DB + chain details
interface AuditDetails {
  checkNumber?: string | number;
  wallet?: string;
  actor?: string;
  address?: string;
  email?: string;
  [key: string]: any; // prevents TS from collapsing to {}
}

export async function getAuditTimeline() {
  // ---------------------------------------------
  // Fetch DB audit logs
  // ---------------------------------------------
  const dbLogs = await prisma.audit.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  // ---------------------------------------------
  // Fetch blockchain logs
  // ---------------------------------------------
  const chainLogsRaw = await publicClient.getLogs({
    address: CONTRACT_ADDRESS,
    fromBlock: 0n,
    toBlock: "latest",
  });

  const chainLogs = chainLogsRaw.map((log) => {
    const decoded = decodeEventLog({
      abi: CHECK_REGISTRY_ABI,
      data: log.data,
      topics: log.topics,
    });

    // Force details into a typed object
    const details = (decoded.args ?? {}) as AuditDetails;

    const correlationKey =
      details.checkNumber ||
      details.wallet ||
      details.actor ||
      details.address ||
      null;

    return {
      source: "chain",
      action: decoded.eventName,
      details,
      correlationKey,
      createdAt: new Date(Number(log.blockNumber) * 1000),
    };
  });

  // ---------------------------------------------
  // DB timeline with correlation keys
  // ---------------------------------------------
  const dbTimeline = dbLogs.map((log) => {
    const details = (log.details ?? {}) as AuditDetails;

    const correlationKey =
      details.checkNumber ||
      details.wallet ||
      details.actor ||
      details.email ||
      null;

    return {
      source: "db",
      action: log.action,
      details,
      correlationKey,
      createdAt: log.createdAt,
    };
  });

  // ---------------------------------------------
  // Merge + sort newest → oldest
  // ---------------------------------------------
  const merged = [...dbTimeline, ...chainLogs].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return merged;
}
