// API Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_EMAIL: 'INVALID_EMAIL',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  
  // Resource errors
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  
  // Tenant errors
  TENANT_NOT_FOUND: 'TENANT_NOT_FOUND',
  TENANT_INACTIVE: 'TENANT_INACTIVE',
  TENANT_LIMIT_EXCEEDED: 'TENANT_LIMIT_EXCEEDED',
  
  // User errors
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_INACTIVE: 'USER_INACTIVE',
  
  // Permission errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  ROLE_NOT_FOUND: 'ROLE_NOT_FOUND',
  
  // System errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;

// Default Roles
export const DEFAULT_ROLES = {
  PLATFORM_ADMIN: 'platform-admin',
  PLATFORM_OPERATOR: 'platform-operator',
  TENANT_ADMIN: 'tenant-admin',
  TENANT_USER: 'tenant-user',
  CLIENT_USER: 'client-user',
  VENDOR_USER: 'vendor-user',
} as const;

// Permissions
export const PERMISSIONS = {
  // Tenant management
  TENANT_CREATE: 'tenant:create',
  TENANT_READ: 'tenant:read',
  TENANT_UPDATE: 'tenant:update',
  TENANT_DELETE: 'tenant:delete',
  
  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // Role management
  ROLE_CREATE: 'role:create',
  ROLE_READ: 'role:read',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',
  
  // Configuration
  CONFIG_READ: 'config:read',
  CONFIG_UPDATE: 'config:update',
  
  // Analytics
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_EXPORT: 'analytics:export',
} as const;

// Environment
export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;