"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentProps } from "react";
import { getLoginHref, isProtectedPath } from "@/config/routes";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { hasValidSession } from "@/lib/auth/session";

type ProtectedLinkProps = ComponentProps<typeof Link>;

export function ProtectedLink({ href, ...props }: ProtectedLinkProps) {
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    function sync() {
      const path = typeof href === "string" ? href : href.pathname ?? "/";
      if (hasValidSession() || !isProtectedPath(path)) {
        setResolvedHref(href);
        return;
      }

      setResolvedHref(getLoginHref(path));
    }

    sync();
    window.addEventListener(SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(SESSION_CHANGE_EVENT, sync);
  }, [href]);

  return <Link href={resolvedHref} {...props} />;
}
