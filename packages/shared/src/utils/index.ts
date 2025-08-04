import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApiResponse, ValidationError } from '../types';

/**
 * Generate UUID v4
 */
export const generateId = (): string => uuidv4();

/**
 * Hash password using bcrypt
 */
export const hashPassword = async (password: string, saltRounds = 12): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Generate JWT token
 */
export const generateToken = (
  payload: Record<string, any>,
  secret: string,
  options?: jwt.SignOptions
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: '24h',
    ...options,
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string, secret: string): any => {
  return jwt.verify(token, secret);
};

/**
 * Create standardized API response
 */
export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  errors?: ValidationError[]
): ApiResponse<T> => {
  return {
    success,
    data,
    message,
    errors,
  };
};

/**
 * Create success response
 */
export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  return createApiResponse(true, data, message);
};

/**
 * Create error response
 */
export const createErrorResponse = (
  message: string,
  errors?: ValidationError[]
): ApiResponse<null> => {
  return createApiResponse(false, null, message, errors);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Sanitize string for SQL injection prevention
 */
export const sanitizeString = (input: string): string => {
  return input.replace(/['";\\]/g, '');
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Parse query parameters for pagination
 */
export const parsePaginationParams = (query: any) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const offset = (page - 1) * limit;
  
  return {
    page,
    limit,
    offset,
    sortBy: query.sortBy || 'createdAt',
    sortOrder: query.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
  };
};

/**
 * Sleep utility for async operations
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
  
  throw lastError!;
};

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Remove undefined values from object
 */
export const removeUndefined = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  
  return result;
};