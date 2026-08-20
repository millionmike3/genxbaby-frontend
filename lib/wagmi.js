import { http, createConfig } from "wagmi";
import { polygonAmoy } from "@/lib/chains/polygonAmoy";


export const config = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http()
  }
});
