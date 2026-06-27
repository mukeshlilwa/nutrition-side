"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { getLoginHref } from "@/config/routes";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, isAuthed } = useAuth();

  useEffect(() => {
    if (!ready || isAuthed) return;
    router.replace(getLoginHref(pathname));
  }, [ready, isAuthed, pathname, router]);

  if (!ready || !isAuthed) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-logo-green-600" />
      </div>
    );
  }

  return children;
}
