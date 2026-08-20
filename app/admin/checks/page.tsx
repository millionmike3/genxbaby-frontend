import { requireRole } from "@/lib/authz";
import { publicClient } from "@/lib/viem";
import {
  CHECK_REGISTRY_ADDRESS,
} from "@/lib/contract";

// ⭐ CUSTOM LOG TYPE THAT ALWAYS HAS args
type EventLog = {
  args: Record<string, any>;
  blockHash?: string;
  blockNumber?: bigint;
  data?: string;
  logIndex?: number;
  removed?: boolean;
  topics?: string[];
  transactionHash?: string;
  transactionIndex?: number;
};

async function fetchCheckEvents(): Promise<{
  registered: EventLog[];
  voided: EventLog[];
}> {
  const registered = await publicClient.getLogs({
    address: CHECK_REGISTRY_ADDRESS,
    event: {
      type: "event",
      name: "CheckRegistered",
      inputs: [
        { name: "checkNumber", type: "string" },
        { name: "amount", type: "uint256" },
        { name: "memo", type: "string" },
        { name: "actor", type: "address", indexed: true },
      ],
    },
    fromBlock: 0n,
    toBlock: "latest",
  });

  const voided = await publicClient.getLogs({
    address: CHECK_REGISTRY_ADDRESS,
    event: {
      type: "event",
      name: "CheckVoided",
      inputs: [
        { name: "checkNumber", type: "string" },
        { name: "actor", type: "address", indexed: true },
      ],
    },
    fromBlock: 0n,
    toBlock: "latest",
  });

  // ⭐ FORCE CAST TO OUR SAFE TYPE
  return {
    registered: registered as unknown as EventLog[],
    voided: voided as unknown as EventLog[],
  };
}

export default async function AdminChecksPage() {
  await requireRole(["admin"]);

  const checks = await fetchCheckEvents();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-semibold">Check Management</h1>

        {/* Registered Checks */}
        <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
          <h2 className="text-xl font-semibold mb-4">Registered Checks</h2>

          {checks.registered.length === 0 ? (
            <p className="text-slate-400">No registered checks found.</p>
          ) : (
            <div className="space-y-3">
              {checks.registered.slice().reverse().map((log, idx) => {
                const num = log.args.checkNumber;
                const amount = Number(log.args.amount);
                const memo = log.args.memo;
                const actor = log.args.actor;

                return (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-lg p-4 bg-slate-900/80 text-sm"
                  >
                    <p><span className="font-semibold">Check #:</span> {num}</p>
                    <p><span className="font-semibold">Amount:</span> {amount}</p>
                    <p><span className="font-semibold">Memo:</span> {memo}</p>
                    <p><span className="font-semibold">Actor:</span> {actor}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Voided Checks */}
        <section className="border border-slate-800 rounded-xl p-6 bg-slate-900/70">
          <h2 className="text-xl font-semibold mb-4">Voided Checks</h2>

          {checks.voided.length === 0 ? (
            <p className="text-slate-400">No voided checks found.</p>
          ) : (
            <div className="space-y-3">
              {checks.voided.slice().reverse().map((log, idx) => {
                const num = log.args.checkNumber;
                const actor = log.args.actor;

                return (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-lg p-4 bg-slate-900/80 text-sm"
                  >
                    <p><span className="font-semibold">Check #:</span> {num}</p>
                    <p><span className="font-semibold">Actor:</span> {actor}</p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
