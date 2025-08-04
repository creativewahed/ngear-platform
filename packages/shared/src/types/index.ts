// Base Entity Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  version: number;
}

// Multi-tenant Types
export interface TenantAware {
  tenantId: string;
}

// User Types
export interface User extends BaseEntity, TenantAware {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  roles: Role[];
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

// Role and Permission Types
export interface Role extends BaseEntity, TenantAware {
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

export interface Permission extends BaseEntity {
  name: string;
  resource: string;
  action: string;
  conditions?: PermissionCondition[];
}

export interface PermissionCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains';
  value: any;
}

// Tenant Types
export interface Tenant extends BaseEntity {
  name: string;
  slug: string;
  domain?: string;
  isActive: boolean;
  plan: TenantPlan;
  settings: TenantSettings;
  branding: TenantBranding;
  apiKeys: ApiKey[];
}

export interface TenantPlan {
  name: string;
  features: string[];
  limits: {
    users: number;
    apiCalls: number;
    storage: number;
  };
}

export interface TenantSettings {
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  sessionTimeout: number;
  passwordPolicy: PasswordPolicy;
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
  preventReuse: number;
}

export interface TenantBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  customCss?: string;
  favicon?: string;
}

export interface ApiKey extends BaseEntity, TenantAware {
  name: string;
  key: string;
  lastUsedAt?: Date;
  isActive: boolean;
  scopes: string[];
  rateLimit: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  path: string;
}

export interface ApiMeta {
  pagination?: PaginationMeta;
  filters?: FilterMeta;
  sort?: SortMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface FilterMeta {
  [key: string]: any;
}

export interface SortMeta {
  field: string;
  order: 'asc' | 'desc';
}

// Request Types
export interface PaginationRequest {
  page?: number;
  limit?: number;
}

export interface FilterRequest {
  [key: string]: any;
}

export interface SortRequest {
  field: string;
  order: 'asc' | 'desc';
}

// Event Types
export interface BaseEvent {
  id: string;
  type: string;
  source: string;
  timestamp: Date;
  tenantId: string;
  userId?: string;
  data: any;
  metadata?: any;
}

// Audit Types
export interface AuditLog extends BaseEntity, TenantAware {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: AuditChange[];
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditChange {
  field: string;
  oldValue: any;
  newValue: any;
}

// Configuration Types
export interface ConfigSchema {
  [key: string]: ConfigField;
}

export interface ConfigField {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  default?: any;
  validation?: ConfigValidation;
  description?: string;
}

export interface ConfigValidation {
  min?: number;
  max?: number;
  pattern?: string;
  enum?: any[];
}

// Wallet Types
export interface Wallet extends BaseEntity, TenantAware {
  userId: string;
  type: 'prepaid' | 'postpaid';
  currency: string;
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  isActive: boolean;
  limits: WalletLimits;
}

export interface WalletLimits {
  dailySpend: number;
  monthlySpend: number;
  maxBalance: number;
}

export interface Transaction extends BaseEntity, TenantAware {
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  reference: string;
  description: string;
  metadata?: any;
}

// Rule Engine Types
export interface Rule extends BaseEntity, TenantAware {
  name: string;
  description: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: number;
  validFrom?: Date;
  validTo?: Date;
}

export interface RuleCondition {
  field: string;
  operator: string;
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  type: string;
  parameters: any;
}