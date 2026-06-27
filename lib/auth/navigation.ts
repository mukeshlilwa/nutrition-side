import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { TokenResponse, UserResponse } from "@/types/api";
import { resolveReturnTo } from "@/config/routes";
import { saveSession } from "@/lib/auth/session";

export const SESSION_CHANGE_EVENT = "tns:session-change";

export function notifySessionChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SESSION_CHANGE_EVENT));
}

/** Close login/register modals and return to the homepage. */
export function dismissAuthModal(router: AppRouterInstance) {
  if (typeof window === "undefined") {
    router.replace("/");
    return;
  }

  const onAuthRoute =
    window.location.pathname === "/login" ||
    window.location.pathname === "/register";

  if (onAuthRoute) {
    router.replace("/");
    return;
  }

  if (window.history.length > 1) {
    router.back();
  } else {
    router.replace("/");
  }
}

export function completeAuthSuccess(
  router: AppRouterInstance,
  tokens: TokenResponse,
  user: UserResponse,
  returnTo?: string,
) {
  saveSession(tokens, user);
  notifySessionChange();
  router.replace(resolveReturnTo(returnTo));
}
