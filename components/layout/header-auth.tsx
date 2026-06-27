"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { clearSession, getStoredUser } from "@/lib/auth/session";
import { SESSION_CHANGE_EVENT } from "@/lib/auth/navigation";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserResponse } from "@/types/api";

type HeaderAuthProps = {
  variant?: "bar" | "menu";
  onNavigate?: () => void;
};

export function HeaderAuth({ variant = "bar", onNavigate }: HeaderAuthProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function syncUser() {
      setUser(getStoredUser());
      setReady(true);
    }

    syncUser();
    window.addEventListener(SESSION_CHANGE_EVENT, syncUser);

    return () => {
      window.removeEventListener(SESSION_CHANGE_EVENT, syncUser);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen || variant !== "bar") return;

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, variant]);

  function handleLogout() {
    clearSession();
    setUser(null);
    setMenuOpen(false);
    onNavigate?.();
    router.replace("/");
    router.refresh();
  }

  if (!ready) {
    if (variant === "menu") return null;
    return <div className="h-9 w-9 shrink-0 lg:w-24" aria-hidden />;
  }

  if (variant === "menu") {
    if (user) {
      return (
        <div className="space-y-1 border-t border-report-divider pt-2">
          <div className="rounded-xl px-3 py-2.5">
            <p className="truncate text-[13px] font-semibold text-oxford-blue-500">{user.name}</p>
            <p className="text-body-sm mt-0.5 truncate text-[12px]">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-oxford-blue-400 transition-colors hover:bg-un-blue-50/60 hover:text-chocolate-cosmos-500"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Log out
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2 border-t border-report-divider pt-2">
        <Link
          href="/login"
          onClick={onNavigate}
          className="rounded-xl px-3 py-2.5 text-[13px] font-semibold text-oxford-blue-400 transition-colors hover:bg-un-blue-50/60 hover:text-logo-green-600"
        >
          Log in
        </Link>
        <Link href="/register" onClick={onNavigate} className={cn(buttonClassName("default", "sm"), "w-full justify-center")}>
          <span className="relative z-[1]">Get Started</span>
        </Link>
      </div>
    );
  }

  if (user) {
    return (
      <div ref={menuRef} className="relative hidden shrink-0 lg:block">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            "inline-flex h-9 max-w-[160px] cursor-pointer items-center gap-1.5 rounded-full border border-clinical bg-gradient-icon px-3.5 text-[13px] font-semibold text-oxford-blue-500 transition-colors sm:max-w-[180px]",
            "hover:border-un-blue-200 hover:bg-un-blue-50",
            menuOpen && "border-un-blue-200 bg-un-blue-50",
          )}
        >
          <span className="truncate">{user.name}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-un-blue-500 transition-transform",
              menuOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="header-glass absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl py-1"
          >
            <div className="border-b border-report-divider px-4 py-3">
              <p className="truncate text-[13px] font-semibold text-oxford-blue-500">
                {user.name}
              </p>
              <p className="text-body-sm mt-0.5 truncate text-[12px]">{user.email}</p>
            </div>

            <div className="p-1">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-oxford-blue-400 transition-colors hover:bg-un-blue-50 hover:text-chocolate-cosmos-500"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden shrink-0 items-center gap-2 sm:gap-3 lg:flex">
      <Link
        href="/login"
        className="cursor-pointer text-[13px] font-semibold text-oxford-blue-400 transition-colors hover:text-logo-green-600"
      >
        Log in
      </Link>
      <Link href="/register" className={cn(buttonClassName("default", "sm"), "sm:px-5")}>
        <span className="relative z-[1]">Get Started</span>
      </Link>
    </div>
  );
}
