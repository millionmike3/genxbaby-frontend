import { createPublicClient, createWalletClient, http } from "viem";
import { polygonAmoy } from "@/lib/chains/polygonAmoy";
import { privateKeyToAccount } from "viem/accounts";

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

// Ensure ADMIN_PRIVATE_KEY is a hex string
const rawKey = process.env.ADMIN_PRIVATE_KEY;
if (!rawKey) {
  throw new Error("ADMIN_PRIVATE_KEY is missing from environment variables");
}
if (!rawKey.startsWith("0x")) {
  throw new Error("ADMIN_PRIVATE_KEY must start with 0x");
}
const adminPrivateKey = rawKey as `0x${string}`;
const adminAccount = privateKeyToAccount(adminPrivateKey);


export const walletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
  account: adminAccount,
});
