"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { HeaderAuth } from "@/components/layout/header-auth";
import { navLinks } from "@/config/site";
import { isProtectedPath } from "@/config/routes";
import { ProtectedLink } from "@/components/auth/protected-link";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  hasDropdown,
  pathname,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  hasDropdown?: boolean;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = isActivePath(pathname, href);
  const linkClassName = cn(
    "group relative inline-flex items-center gap-1 px-1 py-1.5 text-[13px] font-semibold transition-colors",
    active
      ? "text-oxford-blue-500"
      : "text-oxford-blue-400 hover:text-logo-green-600",
    className,
  );

  const content = (
    <>
      {label}
      {hasDropdown && (
        <ChevronDown className="h-3.5 w-3.5 text-un-blue-500 transition-transform group-hover:translate-y-px" />
      )}
      {active && (
        <span
          className="absolute -bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-logo-green-500"
          aria-hidden
        />
      )}
    </>
  );

  if (isProtectedPath(href)) {
    return (
      <ProtectedLink href={href} className={linkClassName} onClick={onNavigate}>
        {content}
      </ProtectedLink>
    );
  }

  return (
    <Link href={href} className={linkClassName} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    startTransition(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            hasDropdown={"hasDropdown" in link ? Boolean(link.hasDropdown) : false}
            pathname={pathname}
          />
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((open) => !open)}
        className="ml-auto inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-clinical bg-gradient-icon text-oxford-blue-500 transition-colors hover:border-un-blue-200 hover:bg-un-blue-50 lg:hidden"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 top-[5.5rem] z-40 bg-oxford-blue-500/20 backdrop-blur-[1px] lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="header-glass absolute left-0 right-0 top-[calc(100%+0.625rem)] z-50 max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-2xl p-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  hasDropdown={"hasDropdown" in link ? Boolean(link.hasDropdown) : false}
                  pathname={pathname}
                  onNavigate={closeMobileMenu}
                  className="w-full rounded-xl px-3 py-2.5 hover:bg-un-blue-50/60"
                />
              ))}
            </nav>
            <HeaderAuth variant="menu" onNavigate={closeMobileMenu} />
          </div>
        </>
      )}
    </>
  );
}
