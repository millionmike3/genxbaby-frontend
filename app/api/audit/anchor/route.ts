import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { keccak256, stringToBytes } from "viem";
import { walletClient, CONTRACT_ADDRESS } from "@/lib/blockchain";

function hashLeaf(data: any) {
  return keccak256(stringToBytes(JSON.stringify(data)));
}

function buildMerkleRoot(leaves: string[]) {
  if (leaves.length === 0) return keccak256(stringToBytes(""));

  let level = [...leaves];

  while (level.length > 1) {
    const next: string[] = [];

    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] ?? left; // duplicate last if odd count

      next.push(keccak256(stringToBytes(left + right)));
    }

    level = next;
  }

  return level[0];
}

export async function POST() {
  // 1. Load audit logs
  const logs = await prisma.audit.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 2. Build Merkle tree
  const leaves = logs.map((l) => hashLeaf(l));
  const root = buildMerkleRoot(leaves);

  // 3. Anchor on-chain
  const tx = await walletClient.writeContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: [
      {
        name: "anchor",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "root", type: "bytes32" }],
        outputs: [],
      },
    ],
    functionName: "anchor",
    args: [`0x${root}`],

  });

  // 4. Save anchor record
  await prisma.anchorRecord.create({
    data: {
      merkleRoot: root,
      txHash: tx,
    },
  });

  return NextResponse.json({ root, txHash: tx.hash });
}
