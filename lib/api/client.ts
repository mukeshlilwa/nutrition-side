import { apiConfig } from "@/config/api";
import { ApiError } from "@/lib/api/errors";
import { getAccessToken } from "@/lib/auth/session";

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

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, auth = false, headers, ...rest } = options;

  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...getAuthHeaders(auth),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return parseResponse<T>(response);
}

export async function apiFormRequest<T>(
  path: string,
  options: FormRequestOptions,
): Promise<T> {
  const { body, auth = false, headers, ...rest } = options;

  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    ...rest,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      ...getAuthHeaders(auth),
      ...headers,
    },
    body: body.toString(),
  });

  return parseResponse<T>(response);
}
