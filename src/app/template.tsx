import type { ReactNode } from "react";
import { PageTransition } from "@/components/ui/motion";

export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
