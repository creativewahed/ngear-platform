import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Types (will be imported from types package when it's built)
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  roles: any[];
  permissions: any[];
  profile: any;
  createdAt: Date;
  updatedAt: Date;
}

// Utility functions
export class Utils {
  static generateId(): string {
    return uuidv4();
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateJWT(payload: any, secret: string, expiresIn: string = '24h'): string {
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
  }

  static verifyJWT(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  static createSuccessResponse<T>(data: T, meta?: any): ApiResponse<T> {
    return {
      success: true,
      data,
      meta,
    };
  }

  static createErrorResponse(code: string, message: string, details?: any): ApiResponse {
    return {
      success: false,
      error: {
        code,
        message,
        details,
      },
    };
  }

  static paginate<T>(items: T[], params: PaginationParams): { data: T[]; meta: any } {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: items.slice(start, end),
      meta: {
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit),
      },
    };
  }

  static isValidEmail(email: string): boolean {
    const emailSchema = z.string().email();
    return emailSchema.safeParse(email).success;
  }

  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  static formatDate(date: Date, locale: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  static sanitizeObject(obj: any, allowedFields: string[]): any {
    const sanitized: any = {};
    allowedFields.forEach((field) => {
      if (obj[field] !== undefined) {
        sanitized[field] = obj[field];
      }
    });
    return sanitized;
  }

  static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Validation schemas
export const ValidationSchemas = {
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number, and special character'
  ),
  tenantName: z.string().min(2, 'Tenant name must be at least 2 characters').max(50),
  subdomain: z.string().min(3, 'Subdomain must be at least 3 characters').max(20).regex(
    /^[a-z0-9-]+$/,
    'Subdomain can only contain lowercase letters, numbers, and hyphens'
  ),
  pagination: z.object({
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(100).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
};

// Constants
export const Constants = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  JWT_EXPIRY: '24h',
  REFRESH_TOKEN_EXPIRY: '7d',
  PASSWORD_RESET_EXPIRY: '1h',
  EMAIL_VERIFICATION_EXPIRY: '24h',
  TENANT_SUBDOMAIN_MIN_LENGTH: 3,
  TENANT_SUBDOMAIN_MAX_LENGTH: 20,
  DEFAULT_CURRENCY: 'USD',
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'],
  DEFAULT_LOCALE: 'en-US',
  SUPPORTED_LOCALES: ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'ja-JP'],
  SYSTEM_USER_ID: 'system',
  AUDIT_LOG_RETENTION_DAYS: 365,
};

// Error classes
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = 'Insufficient permissions') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class TenantNotFoundError extends Error {
  constructor(message: string = 'Tenant not found') {
    super(message);
    this.name = 'TenantNotFoundError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

// Logger interface
export interface Logger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

// Simple console logger implementation
export class ConsoleLogger implements Logger {
  info(message: string, meta?: any): void {
    console.log(`[INFO] ${message}`, meta || '');
  }

  warn(message: string, meta?: any): void {
    console.warn(`[WARN] ${message}`, meta || '');
  }

  error(message: string, meta?: any): void {
    console.error(`[ERROR] ${message}`, meta || '');
  }

  debug(message: string, meta?: any): void {
    console.debug(`[DEBUG] ${message}`, meta || '');
  }
}

// Rate limiter
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000 // 1 minute
  ) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Cache interface
export interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Simple in-memory cache implementation
export class MemoryCache implements Cache {
  private cache: Map<string, { value: any; expires: number | null }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (item.expires && Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const expires = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expires });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}