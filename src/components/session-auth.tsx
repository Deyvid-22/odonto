"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export function SessionAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
