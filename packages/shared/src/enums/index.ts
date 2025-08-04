// Subscription Plans
export enum SubscriptionPlan {
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom',
}

// Subscription Status
export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

// User Status
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}

// Wallet Types
export enum WalletType {
  MAIN = 'main',
  BONUS = 'bonus',
  CASHBACK = 'cashback',
  VOUCHER = 'voucher',
}

// Transaction Types
export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  TRANSFER = 'transfer',
  REFUND = 'refund',
  ADJUSTMENT = 'adjustment',
}

// Transaction Status
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REVERSED = 'reversed',
}

// Rule Condition Operators
export enum ConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  IN = 'in',
  NOT_IN = 'not_in',
  BETWEEN = 'between',
  REGEX = 'regex',
}

// Rule Condition Types
export enum ConditionType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  ARRAY = 'array',
  OBJECT = 'object',
}

// Rule Action Types
export enum ActionType {
  AWARD_POINTS = 'award_points',
  AWARD_CASHBACK = 'award_cashback',
  APPLY_MULTIPLIER = 'apply_multiplier',
  SEND_NOTIFICATION = 'send_notification',
  CREATE_VOUCHER = 'create_voucher',
  UNLOCK_TIER = 'unlock_tier',
  TRIGGER_WEBHOOK = 'trigger_webhook',
}

// Configuration Types
export enum ConfigurationType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
  ARRAY = 'array',
}

// Log Levels
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
}

// Notification Types
export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  WEBHOOK = 'webhook',
}

// Notification Status
export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  BOUNCED = 'bounced',
}

// API Integration Types
export enum IntegrationType {
  REST = 'rest',
  GRAPHQL = 'graphql',
  WEBHOOK = 'webhook',
  DATABASE = 'database',
  FILE = 'file',
  QUEUE = 'queue',
}

// Data Source Types
export enum DataSourceType {
  API = 'api',
  DATABASE = 'database',
  FILE = 'file',
  STREAM = 'stream',
}

// Authentication Types
export enum AuthenticationType {
  JWT = 'jwt',
  OAUTH2 = 'oauth2',
  API_KEY = 'api_key',
  BASIC = 'basic',
  BEARER = 'bearer',
}

// Cache Types
export enum CacheType {
  MEMORY = 'memory',
  REDIS = 'redis',
  DATABASE = 'database',
}

// Environment Types
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}