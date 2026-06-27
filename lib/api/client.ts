import { apiConfig } from "@/config/api";
import { ApiError } from "@/lib/api/errors";
import { notifySessionChange } from "@/lib/auth/navigation";
import {
  getAccessToken,
  getRefreshToken,
  saveSession,
} from "@/lib/auth/session";
import type { TokenResponse } from "@/types/api";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  auth?: boolean;
};

type FormRequestOptions = Omit<RequestInit, "body"> & {
  body: URLSearchParams;
  auth?: boolean;
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(response.status, data);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function getAuthHeaders(auth: boolean): Record<string, string> {
  if (!auth) return {};

  const token = getAccessToken();
  if (!token) return {};

  return { Authorization: `Bearer ${token}` };
}

async function tryRefreshSession(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${apiConfig.baseUrl}/api/auth/refresh`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return false;

    const tokens = (await response.json()) as TokenResponse;
    saveSession(tokens);
    notifySessionChange();
    return true;
  } catch {
    return false;
  }
}

async function executeRequest(
  url: string,
  init: RequestInit,
  auth: boolean,
  retried = false,
): Promise<Response> {
  const response = await fetch(url, init);

  if (!auth || response.status !== 401 || retried) {
    return response;
  }

  const refreshed = await tryRefreshSession();
  if (!refreshed) {
    return response;
  }

  const headers = new Headers(init.headers);
  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  } else {
    headers.delete("Authorization");
  }

  return executeRequest(url, { ...init, headers }, auth, true);
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, auth = false, headers, ...rest } = options;

  const response = await executeRequest(
    `${apiConfig.baseUrl}${path}`,
    {
      ...rest,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...getAuthHeaders(auth),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    auth,
  );

  return parseResponse<T>(response);
}

export async function apiFormRequest<T>(
  path: string,
  options: FormRequestOptions,
): Promise<T> {
  const { body, auth = false, headers, ...rest } = options;

  const response = await executeRequest(
    `${apiConfig.baseUrl}${path}`,
    {
      ...rest,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        ...getAuthHeaders(auth),
        ...headers,
      },
      body: body.toString(),
    },
    auth,
  );

  return parseResponse<T>(response);
}
