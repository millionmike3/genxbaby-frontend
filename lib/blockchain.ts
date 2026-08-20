// /lib/blockchain.ts

import { createPublicClient, createWalletClient, http } from "viem";
import { polygon } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const CONTRACT_ADDRESS = process.env.CHECKREGISTRY_CONTRACT!;

// Admin signer
const adminPrivateKey = process.env.DEPLOYER_PRIVATE_KEY!;
const adminAccount = privateKeyToAccount(adminPrivateKey);

// Public client (read-only)
export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!), // Amoy RPC URL
});

// Wallet client (write)
export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!), // Amoy RPC URL
  account: adminAccount,
});
