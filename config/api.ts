export const apiConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    "https://nutrition-api-production-e1d2.up.railway.app",
} as const;
