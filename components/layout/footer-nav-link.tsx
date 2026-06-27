"use client";

import Link from "next/link";
import { ProtectedLink } from "@/components/auth/protected-link";

const linkClass =
  "text-[13px] text-oxford-blue-400 transition-colors hover:text-logo-green-600";

type FooterNavLinkProps = {
  href: string;
  label: string;
  protected?: boolean;
};

export function FooterNavLink({ href, label, protected: isProtected }: FooterNavLinkProps) {
  if (isProtected) {
    return (
      <ProtectedLink href={href} className={linkClass}>
        {label}
      </ProtectedLink>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}
