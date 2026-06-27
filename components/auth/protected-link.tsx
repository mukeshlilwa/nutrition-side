"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { getLoginHref, isProtectedPath } from "@/config/routes";

type ProtectedLinkProps = ComponentProps<typeof Link>;

function getPath(href: ProtectedLinkProps["href"]) {
  return typeof href === "string" ? href : (href.pathname ?? "/");
}

export function ProtectedLink({ href, prefetch, ...props }: ProtectedLinkProps) {
  const { ready, isAuthed } = useAuth();
  const path = getPath(href);
  const protectedRoute = isProtectedPath(path);

  const resolvedHref =
    ready && protectedRoute && !isAuthed ? getLoginHref(path) : href;

  const shouldPrefetch =
    prefetch ?? (ready && (!protectedRoute || isAuthed));

  return <Link href={resolvedHref} prefetch={shouldPrefetch} {...props} />;
}
