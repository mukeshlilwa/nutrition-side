export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  is_active: boolean;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type RefreshTokenRequest = {
  refresh_token: string;
};

export type ValidationErrorItem = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export type HTTPValidationError = {
  detail?: ValidationErrorItem[];
};

export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export type Goal = "lose_weight" | "maintain" | "gain_muscle";

export type ProfileUpdate = {
  age?: number | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  activity_level?: ActivityLevel | null;
  goal?: Goal | null;
};

export type ProfileResponse = {
  age?: number | null;
  weight_kg?: number | null;
  height_cm?: number | null;
  activity_level?: ActivityLevel | null;
  goal?: Goal | null;
  daily_calories?: number | null;
  protein_g?: number | null;
  carbs_g?: number | null;
  fat_g?: number | null;
};
