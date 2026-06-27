import { apiFormRequest, apiRequest } from "@/lib/api/client";
import type {
  RefreshTokenRequest,
  TokenResponse,
  UserLogin,
  UserRegister,
  UserResponse,
} from "@/types/api";

export function registerUser(data: UserRegister) {
  return apiRequest<UserResponse>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

/** OAuth2 form login — primary endpoint (username = email). */
export function loginUser(data: UserLogin) {
  const form = new URLSearchParams();
  form.set("username", data.email);
  form.set("password", data.password);

  return apiFormRequest<TokenResponse>("/api/auth/login", { body: form });
}

/** JSON login — alternative endpoint for non-form clients. */
export function loginUserJson(data: UserLogin) {
  return apiRequest<TokenResponse>("/api/auth/login/json", {
    method: "POST",
    body: data,
  });
}

export function refreshAccessToken(data: RefreshTokenRequest) {
  return apiRequest<TokenResponse>("/api/auth/refresh", {
    method: "POST",
    body: data,
  });
}

export function getCurrentUser() {
  return apiRequest<UserResponse>("/api/auth/me", {
    method: "GET",
    auth: true,
  });
}
