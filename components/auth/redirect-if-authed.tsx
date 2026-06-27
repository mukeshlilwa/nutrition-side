"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { resolveReturnTo } from "@/config/routes";

type RedirectIfAuthedProps = {
  children: ReactNode;
};

export function RedirectIfAuthed({ children }: RedirectIfAuthedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, isAuthed } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (isAuthed) {
      const returnTo = searchParams.get("returnTo");
      router.replace(resolveReturnTo(returnTo));
    }
  }, [ready, isAuthed, router, searchParams]);

  if (!ready || isAuthed) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-logo-green-600" />
      </div>
    );
  }

  return children;
}
