// app/admin/audit/page.tsx

import { requireRole } from "@/lib/authz";
import { publicClient } from "@/lib/viem";
import {
  CHECK_REGISTRY_ADDRESS,
  CHECK_REGISTRY_ABI,
} from "@/lib/contract";
import { Hex, decodeEventLog } from "viem";

import { logAudit } from "@/lib/logAudit";
import { getAuditTimeline } from "@/lib/server/getAuditTimeline";
import { buildHeatmap } from "@/lib/server/buildHeatmap";

import {
  getFraudScores,
} from "./server/getFraudScores";
import {
  buildFraudHeatmap,
} from "./server/buildFraudHeatmap";
import {
  getAdminScores,
} from "./server/getAdminScores";
import {
  getAnomalyScores,
} from "./server/getAnomalyScores";
import {
  getActorRiskScores,
} from "./server/getActorRiskScores";
import {
  getActorRelationships,
} from "./server/getActorRelationships";

import AuditConsole from "./AuditConsole";

const CONTRACT_ADDRESS = CHECK_REGISTRY_ADDRESS as `0x${string}`;
// -----------------------------
// Fetch: Latest Audit Root
// -----------------------------
async function fetchLatestAuditRoot() {
  try {
    const root = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CHECK_REGISTRY_ABI,
      functionName: "latestAuditRoot",
    });

    await logAudit("FETCH_LATEST_AUDIT_ROOT", { root });
    return root as Hex;
  } catch (err) {
    console.error("Error fetching latestAuditRoot:", err);
    return null;
  }
}

// -----------------------------
// Fetch: AuditRootAnchored Events
// -----------------------------
async function fetchAuditRootAnchoredEvents() {
  try {
    const logs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: {
        type: "event",
        name: "AuditRootAnchored",
        inputs: [
          { name: "root", type: "bytes32", indexed: false },
          { name: "timestamp", type: "uint256", indexed: false },
          { name: "actor", type: "address", indexed: true },
        ],
      },
      fromBlock: 0n,
      toBlock: "latest",
    });

    const decodedLogs = logs.map((log) => {
      const decoded = decodeEventLog({
        abi: CHECK_REGISTRY_ABI,
        data: log.data,
        topics: log.topics,
      });

      return { ...log, args: decoded.args };
    });

    await logAudit("FETCH_AUDIT_ROOT_EVENTS", {
      count: decodedLogs.length,
    });

    return decodedLogs;
  } catch (err) {
    console.error("Error fetching AuditRootAnchored logs:", err);
    return [];
  }
}

// -----------------------------
// Fetch: CheckRegistered + CheckVoided Events
// -----------------------------
async function fetchCheckEvents() {
  try {
    const registeredLogs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: {
        type: "event",
        name: "CheckRegistered",
        inputs: [
          { name: "checkNumber", type: "string", indexed: false },
          { name: "amount", type: "uint256", indexed: false },
          { name: "memo", type: "string", indexed: false },
          { name: "actor", type: "address", indexed: true },
        ],
      },
      fromBlock: 0n,
      toBlock: "latest",
    });

    const voidedLogs = await publicClient.getLogs({
      address: CONTRACT_ADDRESS,
      event: {
        type: "event",
        name: "CheckVoided",
        inputs: [
          { name: "checkNumber", type: "string", indexed: false },
          { name: "actor", type: "address", indexed: true },
        ],
      },
      fromBlock: 0n,
      toBlock: "latest",
    });

    const registered = registeredLogs.map((log) => {
      const decoded = decodeEventLog({
        abi: CHECK_REGISTRY_ABI,
        data: log.data,
        topics: log.topics,
      });
      return { ...log, args: decoded.args };
    });

    const voided = voidedLogs.map((log) => {
      const decoded = decodeEventLog({
        abi: CHECK_REGISTRY_ABI,
        data: log.data,
        topics: log.topics,
      });
      return { ...log, args: decoded.args };
    });

    await logAudit("FETCH_CHECK_EVENTS", {
      registered: registered.length,
      voided: voided.length,
    });

    return { registered, voided };
  } catch (err) {
    console.error("Error fetching check logs:", err);
    return { registered: [], voided: [] };
  }
}
// -----------------------------
// PAGE EXPORT (SERVER COMPONENT)
// -----------------------------
export default async function AuditAdminPage() {
  // Enforce admin role
  await requireRole(["admin"]);

  // Fetch blockchain data
  const latestRoot = await fetchLatestAuditRoot();
  const auditEvents = await fetchAuditRootAnchoredEvents();
  const checkEvents = await fetchCheckEvents();

  // Unified timeline (Prisma + chain)
  const timeline = await getAuditTimeline();

  // Heatmaps
  const heatmap = buildHeatmap(timeline);
  const fraudScores = getFraudScores(timeline);
  const fraudHeatmap = buildFraudHeatmap(timeline, fraudScores);

  // Scores
  const adminScores = getAdminScores(timeline);
  const anomalyScores = getAnomalyScores(timeline);
  const actorRiskScores = getActorRiskScores(timeline);

  // Relationship graph
  const actorGraph = getActorRelationships(timeline);

  // Page-level audit log
  await logAudit("VIEW_AUDIT_DASHBOARD", {
    latestRoot,
    auditEventCount: auditEvents.length,
    registeredCount: checkEvents.registered.length,
    voidedCount: checkEvents.voided.length,
    unifiedTimelineCount: timeline.length,
  });
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Unified Audit Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">
              Blockchain + Prisma audit logs merged into a single timeline.
            </p>
          </div>
        </header>

        {/* Unified Audit Console */}
        <AuditConsole
          initialTimeline={timeline}
          heatmap={heatmap}
          fraudHeatmap={fraudHeatmap}
          fraudScores={fraudScores}
          adminScores={adminScores}
          anomalyScores={anomalyScores}
          actorRiskScores={actorRiskScores}
          actorGraph={actorGraph}
          userRole="admin"
        />

      </div>
    </main>
  );
}
