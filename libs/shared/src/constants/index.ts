// Application constants
export const APP_CONFIG = {
  NAME: 'NGEAR Platform',
  VERSION: '1.0.0',
  DESCRIPTION: 'Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform',
  API_VERSION: 'v1',
  DEFAULT_TIMEZONE: 'UTC',
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Database constants
export const DATABASE_CONFIG = {
  DEFAULT_CONNECTION_POOL_SIZE: 10,
  CONNECTION_TIMEOUT: 30000,
  QUERY_TIMEOUT: 10000,
  MIGRATION_TABLE: '__migrations',
  SEED_TABLE: '__seeds',
} as const;

// Authentication constants
export const AUTH_CONFIG = {
  JWT_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900000, // 15 minutes in milliseconds
  VERIFICATION_TOKEN_EXPIRES_IN: '24h',
  RESET_TOKEN_EXPIRES_IN: '1h',
} as const;

// Cache constants
export const CACHE_CONFIG = {
  DEFAULT_TTL: 300, // 5 minutes
  USER_SESSION_TTL: 1800, // 30 minutes
  TENANT_CONFIG_TTL: 3600, // 1 hour
  RULE_CACHE_TTL: 600, // 10 minutes
  ANALYTICS_CACHE_TTL: 300, // 5 minutes
} as const;

// Rate limiting constants
export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 900000, // 15 minutes
  MAX_REQUESTS: 100,
  SKIP_SUCCESSFUL_REQUESTS: false,
  SKIP_FAILED_REQUESTS: false,
} as const;

// Pagination constants
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// File upload constants
export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  UPLOAD_PATH: 'uploads',
  TEMP_PATH: 'temp',
} as const;

// Validation constants
export const VALIDATION_CONFIG = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  SLUG_REGEX: /^[a-z0-9-]+$/,
  UUID_REGEX: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
} as const;

// Error codes
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  
  // Authorization errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  TENANT_ACCESS_DENIED: 'TENANT_ACCESS_DENIED',
  RESOURCE_ACCESS_DENIED: 'RESOURCE_ACCESS_DENIED',
  
  // Validation errors
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT: 'INVALID_FORMAT',
  VALUE_OUT_OF_RANGE: 'VALUE_OUT_OF_RANGE',
  
  // Resource errors
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  
  // Business logic errors
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  RULE_EVALUATION_FAILED: 'RULE_EVALUATION_FAILED',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
  
  // System errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_CONNECTION_FAILED: 'DATABASE_CONNECTION_FAILED',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
} as const;

// Event types for event-driven architecture
export const EVENT_TYPES = {
  // User events
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  
  // Tenant events
  TENANT_CREATED: 'tenant.created',
  TENANT_UPDATED: 'tenant.updated',
  TENANT_ACTIVATED: 'tenant.activated',
  TENANT_DEACTIVATED: 'tenant.deactivated',
  
  // Transaction events
  TRANSACTION_CREATED: 'transaction.created',
  TRANSACTION_COMPLETED: 'transaction.completed',
  TRANSACTION_FAILED: 'transaction.failed',
  TRANSACTION_REFUNDED: 'transaction.refunded',
  
  // Wallet events
  WALLET_CREATED: 'wallet.created',
  WALLET_CREDITED: 'wallet.credited',
  WALLET_DEBITED: 'wallet.debited',
  WALLET_BALANCE_LOW: 'wallet.balance_low',
  
  // Reward events
  REWARD_EARNED: 'reward.earned',
  REWARD_REDEEMED: 'reward.redeemed',
  REWARD_EXPIRED: 'reward.expired',
  
  // Notification events
  NOTIFICATION_SENT: 'notification.sent',
  NOTIFICATION_DELIVERED: 'notification.delivered',
  NOTIFICATION_FAILED: 'notification.failed',
} as const;

// HTTP headers
export const HTTP_HEADERS = {
  AUTHORIZATION: 'Authorization',
  TENANT_ID: 'X-Tenant-ID',
  USER_ID: 'X-User-ID',
  REQUEST_ID: 'X-Request-ID',
  API_VERSION: 'X-API-Version',
  RATE_LIMIT_REMAINING: 'X-RateLimit-Remaining',
  RATE_LIMIT_RESET: 'X-RateLimit-Reset',
} as const;

// Microservice names
export const SERVICES = {
  API_GATEWAY: 'api-gateway',
  AUTH_SERVICE: 'auth-service',
  TENANT_SERVICE: 'tenant-service',
  USER_SERVICE: 'user-service',
  CONFIG_SERVICE: 'config-service',
  NOTIFICATION_SERVICE: 'notification-service',
  WALLET_SERVICE: 'wallet-service',
  RULE_ENGINE: 'rule-engine',
  ANALYTICS_SERVICE: 'analytics-service',
} as const;

// Queue names for message broker
export const QUEUE_NAMES = {
  USER_EVENTS: 'user.events',
  TENANT_EVENTS: 'tenant.events',
  TRANSACTION_EVENTS: 'transaction.events',
  NOTIFICATION_EVENTS: 'notification.events',
  ANALYTICS_EVENTS: 'analytics.events',
  RULE_EVALUATION: 'rule.evaluation',
} as const;

// Default role names
export const DEFAULT_ROLES = {
  SUPER_ADMIN: 'super_admin',
  TENANT_ADMIN: 'tenant_admin',
  USER_MANAGER: 'user_manager',
  CONTENT_MANAGER: 'content_manager',
  ANALYST: 'analyst',
  END_USER: 'end_user',
} as const;