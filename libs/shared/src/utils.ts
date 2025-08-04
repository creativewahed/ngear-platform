import { ApiResponse } from './types';

/**
 * Creates a successful API response
 */
export function createSuccessResponse<T>(data: T, pagination?: any): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(pagination && { pagination }),
  };
}

/**
 * Creates an error API response
 */
export function createErrorResponse(code: string, message: string, details?: any): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
  };
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random string
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Formats date to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Validates password strength
 */
export function isStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

/**
 * Sanitizes input string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}