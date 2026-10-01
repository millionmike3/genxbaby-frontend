// /lib/blockchain.ts

import { createPublicClient, createWalletClient, http } from "viem";
import { polygon } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import type { Hex } from "viem";

export const CONTRACT_ADDRESS = process.env.CHECKREGISTRY_CONTRACT!;

// Load private key safely
const rawKey = process.env.DEPLOYER_PRIVATE_KEY;

if (!rawKey) {
  throw new Error("DEPLOYER_PRIVATE_KEY is missing from environment variables");
}

// Normalize private key
const normalizedKey = rawKey.startsWith("0x") ? rawKey : `0x${rawKey}`;

// Explicitly cast to Hex so TypeScript is satisfied
const adminPrivateKey = normalizedKey as Hex;

// Admin signer
export const adminAccount = privateKeyToAccount(adminPrivateKey);

// Public client (read-only)
export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

// Wallet client (write)
export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
  account: adminAccount,
});
