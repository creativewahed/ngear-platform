// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  TENANT_NOT_FOUND: 'TENANT_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
} as const;

// Default Roles
export const DEFAULT_ROLES = {
  SUPER_ADMIN: 'super_admin',
  PLATFORM_ADMIN: 'platform_admin',
  TENANT_ADMIN: 'tenant_admin',
  USER_MANAGER: 'user_manager',
  PROGRAM_MANAGER: 'program_manager',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
  END_USER: 'end_user',
} as const;

// Default Permissions
export const PERMISSIONS = {
  // Tenant management
  CREATE_TENANT: 'create:tenant',
  READ_TENANT: 'read:tenant',
  UPDATE_TENANT: 'update:tenant',
  DELETE_TENANT: 'delete:tenant',
  
  // User management
  CREATE_USER: 'create:user',
  READ_USER: 'read:user',
  UPDATE_USER: 'update:user',
  DELETE_USER: 'delete:user',
  
  // Role management
  CREATE_ROLE: 'create:role',
  READ_ROLE: 'read:role',
  UPDATE_ROLE: 'update:role',
  DELETE_ROLE: 'delete:role',
  ASSIGN_ROLE: 'assign:role',
  
  // Reward rules
  CREATE_RULE: 'create:rule',
  READ_RULE: 'read:rule',
  UPDATE_RULE: 'update:rule',
  DELETE_RULE: 'delete:rule',
  ACTIVATE_RULE: 'activate:rule',
  
  // Wallet management
  READ_WALLET: 'read:wallet',
  UPDATE_WALLET: 'update:wallet',
  TRANSFER_FUNDS: 'transfer:funds',
  
  // Analytics
  READ_ANALYTICS: 'read:analytics',
  EXPORT_DATA: 'export:data',
  
  // System administration
  MANAGE_INTEGRATIONS: 'manage:integrations',
  MANAGE_CONFIGURATION: 'manage:configuration',
  VIEW_LOGS: 'view:logs',
} as const;

// Event Types
export const EVENT_TYPES = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  
  TENANT_CREATED: 'tenant.created',
  TENANT_UPDATED: 'tenant.updated',
  TENANT_ACTIVATED: 'tenant.activated',
  TENANT_DEACTIVATED: 'tenant.deactivated',
  
  TRANSACTION_CREATED: 'transaction.created',
  TRANSACTION_COMPLETED: 'transaction.completed',
  TRANSACTION_FAILED: 'transaction.failed',
  
  RULE_CREATED: 'rule.created',
  RULE_UPDATED: 'rule.updated',
  RULE_ACTIVATED: 'rule.activated',
  RULE_DEACTIVATED: 'rule.deactivated',
  RULE_EXECUTED: 'rule.executed',
  
  REWARD_EARNED: 'reward.earned',
  REWARD_REDEEMED: 'reward.redeemed',
  
  INTEGRATION_CONNECTED: 'integration.connected',
  INTEGRATION_DISCONNECTED: 'integration.disconnected',
  INTEGRATION_ERROR: 'integration.error',
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER_PERMISSIONS: (userId: string) => `user:permissions:${userId}`,
  TENANT_CONFIG: (tenantId: string) => `tenant:config:${tenantId}`,
  ACTIVE_RULES: (tenantId: string) => `rules:active:${tenantId}`,
  USER_PROFILE: (userId: string) => `user:profile:${userId}`,
} as const;

// Queue Names
export const QUEUE_NAMES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH_NOTIFICATION: 'push-notification',
  REWARD_PROCESSING: 'reward-processing',
  ANALYTICS: 'analytics',
  AUDIT: 'audit',
  INTEGRATION_SYNC: 'integration-sync',
} as const;

// File Upload Constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/csv', 'application/json'],
} as const;