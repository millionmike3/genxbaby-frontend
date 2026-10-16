"use client";

import { usePathname } from "next/navigation";

export default function ActivePath({ children }: { children: (pathname: string) => React.ReactNode }) {
  const pathname = usePathname();
  return <>{children(pathname)}</>;
}
