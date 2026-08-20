import { createPublicClient, createWalletClient, http } from "viem";
import { polygonAmoy } from "@/lib/chains/polygonAmoy";
import { privateKeyToAccount } from "viem/accounts";

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
});

const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY!;
const adminAccount = privateKeyToAccount(adminPrivateKey);

export const walletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL!),
  account: adminAccount,
});
