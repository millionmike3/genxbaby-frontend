// lib/contract.ts
import { Abi } from "viem";

// Contract address from environment
export const CHECK_REGISTRY_ADDRESS =
  process.env.NEXT_PUBLIC_CHECK_REGISTRY_ADDRESS as `0x${string}`;

// Fully typed ABI for CheckRegistry
export const CHECK_REGISTRY_ABI: Abi = [
  //
  // ─── READ: latestAuditRoot() ───────────────────────────────────────────────
  //
  {
    type: "function",
    name: "latestAuditRoot",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bytes32" }],
  },

  //
  // ─── EVENT: AuditRootAnchored(bytes32 root, uint256 timestamp, address actor)
  //
  {
    type: "event",
    name: "AuditRootAnchored",
    inputs: [
      { name: "root", type: "bytes32", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "actor", type: "address", indexed: true },
    ],
  },

  //
  // ─── EVENT: CheckRegistered(string checkNumber, uint256 amount, string memo, address actor)
  //
  {
    type: "event",
    name: "CheckRegistered",
    inputs: [
      { name: "checkNumber", type: "string", indexed: false },
      { name: "amount", type: "uint256", indexed: false },
      { name: "memo", type: "string", indexed: false },
      { name: "actor", type: "address", indexed: true },
    ],
  },

  //
  // ─── EVENT: CheckVoided(string checkNumber, address actor)
  //
  {
    type: "event",
    name: "CheckVoided",
    inputs: [
      { name: "checkNumber", type: "string", indexed: false },
      { name: "actor", type: "address", indexed: true },
    ],
  },
];
