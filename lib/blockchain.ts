// /lib/blockchain.ts

import { createPublicClient, createWalletClient, http } from "viem";
import { polygon } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import type { Hex } from "viem";

export const CONTRACT_ADDRESS = process.env.CHECKREGISTRY_CONTRACT!;

// Normalize private key
const rawKey = process.env.DEPLOYER_PRIVATE_KEY!;
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
