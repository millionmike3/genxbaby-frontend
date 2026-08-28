import { walletClient } from "./viem";

/**
 * Anchors a Merkle root to the blockchain using the CheckRegistry contract.
 * This function MUST remain a simple utility module with a single default export.
 * Turbopack requires this structure for correct static analysis.
 */
export default async function anchorMerkleRoot(merkleRoot: string) {
  try {
    // Send transaction to the CheckRegistry contract
    const txHash = await walletClient.sendTransaction({
      to: process.env.CHECK_REGISTRY_ADDRESS as `0x${string}`,
      data: merkleRoot.startsWith("0x")
     ? (merkleRoot as `0x${string}`)
     : (`0x${merkleRoot}` as `0x${string}`),
     // Merkle root already encoded as hex string
    });

    return {
      anchored: true,
      txHash,
      timestamp: Date.now(),
    };
  } catch (err: any) {
    console.error("ANCHOR MERKLE ROOT ERROR:", err);

    return {
      anchored: false,
      error: err?.message ?? "Unknown error",
    };
  }
}
