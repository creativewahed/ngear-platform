export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN: 'Password must be at least 8 characters long',
  PASSWORD_MAX: 'Password cannot exceed 128 characters',
  SUBDOMAIN_MIN: 'Subdomain must be at least 3 characters long',
  SUBDOMAIN_MAX: 'Subdomain cannot exceed 30 characters',
  INVALID_UUID: 'Please provide a valid UUID',
} as const;