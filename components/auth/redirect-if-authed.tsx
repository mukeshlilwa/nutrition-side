"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { resolveReturnTo } from "@/config/routes";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { hasValidSession } from "@/lib/auth/session";

type RedirectIfAuthedProps = {
  children: ReactNode;
};

export function RedirectIfAuthed({ children }: RedirectIfAuthedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    function sync() {
      if (hasValidSession()) {
        const returnTo = searchParams.get("returnTo");
        router.replace(resolveReturnTo(returnTo));
        return;
      }

      setShowContent(true);
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, sync);
  }, [router, searchParams]);

  if (!showContent) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-logo-green-600" />
      </div>
    );
  }

  return children;
}
