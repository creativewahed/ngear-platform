// User status enums
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
  BLOCKED = 'blocked'
}

// Tenant status enums
export enum TenantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  TRIAL = 'trial'
}

// Permission actions
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  MANAGE = 'manage',
  EXECUTE = 'execute'
}

// Permission resources
export enum PermissionResource {
  USER = 'user',
  ROLE = 'role',
  TENANT = 'tenant',
  WALLET = 'wallet',
  TRANSACTION = 'transaction',
  REWARD_RULE = 'reward_rule',
  NOTIFICATION = 'notification',
  CONFIGURATION = 'configuration',
  ANALYTICS = 'analytics',
  API_KEY = 'api_key'
}

// Transaction types
export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  REFUND = 'refund',
  ADJUSTMENT = 'adjustment'
}

// Wallet types
export enum WalletType {
  POINTS = 'points',
  CASHBACK = 'cashback',
  VOUCHER = 'voucher',
  LOYALTY = 'loyalty'
}

// Notification types
export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  WEBHOOK = 'webhook'
}

// Notification priority
export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Rule operators
export enum RuleOperator {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  GREATER_THAN = 'gt',
  GREATER_THAN_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_EQUAL = 'lte',
  IN = 'in',
  NOT_IN = 'nin',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  STARTS_WITH = 'starts_with',
  ENDS_WITH = 'ends_with'
}

// Logical operators
export enum LogicalOperator {
  AND = 'and',
  OR = 'or',
  NOT = 'not'
}

// Rule action types
export enum RuleActionType {
  AWARD_POINTS = 'award_points',
  AWARD_CASHBACK = 'award_cashback',
  AWARD_VOUCHER = 'award_voucher',
  SEND_NOTIFICATION = 'send_notification',
  TRIGGER_WEBHOOK = 'trigger_webhook',
  UPDATE_USER_TIER = 'update_user_tier',
  CREATE_REWARD = 'create_reward'
}

// API response status codes
export enum ApiStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  INTERNAL_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

// Environment types
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

// Log levels
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose'
}

// Cache TTL (Time To Live) in seconds
export enum CacheTTL {
  SHORT = 300, // 5 minutes
  MEDIUM = 1800, // 30 minutes
  LONG = 3600, // 1 hour
  VERY_LONG = 86400 // 24 hours
}

// Database connection types
export enum DatabaseType {
  POSTGRES = 'postgres',
  MONGODB = 'mongodb',
  REDIS = 'redis',
  ELASTICSEARCH = 'elasticsearch'
}

// Integration types
export enum IntegrationType {
  PAYMENT_GATEWAY = 'payment_gateway',
  EMAIL_SERVICE = 'email_service',
  SMS_SERVICE = 'sms_service',
  ANALYTICS = 'analytics',
  CRM = 'crm',
  ERP = 'erp',
  ECOMMERCE = 'ecommerce'
}

// Subscription plans
export enum SubscriptionPlan {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}