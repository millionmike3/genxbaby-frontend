// lib/constants.ts

// ⭐ Ensure the address is typed as a hex string
export const CHECK_REGISTRY_ADDRESS =
  (process.env.NEXT_PUBLIC_CHECK_REGISTRY_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

// ⭐ Minimal ABI for CheckCreated event
export const CHECK_REGISTRY_ABI = [
  {
    type: "event",
    name: "CheckCreated",
    inputs: [
      { indexed: true, name: "id", type: "string" },
      { indexed: false, name: "checkNumber", type: "uint256" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "memo", type: "string" },
      { indexed: false, name: "payee", type: "string" },
      { indexed: false, name: "date", type: "uint256" }
    ]
  }
];
