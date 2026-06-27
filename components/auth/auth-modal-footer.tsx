"use client";

import Link from "next/link";

export function AuthModalFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="text-oxford-blue-500">
      {text}{" "}
      <Link
        href={href}
        className="font-semibold text-logo-green-600 transition-colors hover:text-logo-green-700"
      >
        {linkText}
      </Link>
    </p>
  );
}
