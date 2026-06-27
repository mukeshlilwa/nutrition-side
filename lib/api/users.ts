import { apiRequest } from "@/lib/api/client";
import type { ProfileResponse, ProfileUpdate, UserResponse } from "@/types/api";

export function getUserProfile() {
  return apiRequest<UserResponse>("/api/users/me", {
    method: "GET",
    auth: true,
  });
}

export function updateUserProfile(data: ProfileUpdate) {
  return apiRequest<ProfileResponse>("/api/users/me/profile", {
    method: "PUT",
    body: data,
    auth: true,
  });
}
