/** Default destination after login when no returnTo is specified. */
export const DEFAULT_AUTHED_ROUTE = "/calculator";

/** App routes that require an authenticated session. */
export const PROTECTED_ROUTES = ["/calculator"] as const;

export type ProtectedRoute = (typeof PROTECTED_ROUTES)[number];

export function isProtectedPath(path: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
}

export function getLoginHref(returnTo: string): string {
  const safeReturnTo =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : DEFAULT_AUTHED_ROUTE;
  return `/login?returnTo=${encodeURIComponent(safeReturnTo)}`;
}

export function resolveReturnTo(returnTo?: string | null): string {
  if (returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return DEFAULT_AUTHED_ROUTE;
}
