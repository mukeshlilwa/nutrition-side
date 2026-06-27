"use client";

import { useAuth } from "@/components/auth/auth-provider";

export function AuthSlot({ children }: { children: React.ReactNode }) {
  const { ready, hasToken } = useAuth();

  if (ready && hasToken) {
    return null;
  }

  return children;
}
