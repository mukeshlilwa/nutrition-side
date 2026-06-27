export const contactFieldLimits = {
  firstName: 80,
  lastName: 80,
  email: 254,
  message: 2000,
} as const;

export const contactRateLimit = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
} as const;
