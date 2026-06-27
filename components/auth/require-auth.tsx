"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { getLoginHref } from "@/config/routes";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { hasValidSession } from "@/lib/auth/session";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    function sync() {
      if (hasValidSession()) {
        setAllowed(true);
        return;
      }

      setAllowed(false);
      router.replace(getLoginHref(pathname));
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, sync);
  }, [pathname, router]);

  if (allowed !== true) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-logo-green-600" />
      </div>
    );
  }

  return children;
}
