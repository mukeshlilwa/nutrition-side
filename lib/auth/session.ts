import type { TokenResponse, UserResponse } from "@/types/api";

const ACCESS_TOKEN_KEY = "tns_access_token";
const REFRESH_TOKEN_KEY = "tns_refresh_token";
const USER_KEY = "tns_user";

export function saveSession(tokens: TokenResponse, user?: UserResponse) {
  if (typeof window === "undefined") return;

  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function saveUser(user: UserResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser(): UserResponse | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserResponse;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken());
}

/** True when the user has both a token and profile — matches header logged-in state. */
export function hasValidSession(): boolean {
  return Boolean(getAccessToken() && getStoredUser());
}
