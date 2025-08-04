// User-related types
export interface User {
  id: string;
  tenantId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  roles: UserRole[];
  permissions: Permission[];
  metadata?: Record<string, any>;
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystemRole: boolean;
  tenantId: string;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

// Tenant-related types
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  subdomain?: string;
  logoUrl?: string;
  brandColors?: BrandColors;
  isActive: boolean;
  subscription: TenantSubscription;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
}

export interface TenantSubscription {
  plan: string;
  status: 'active' | 'inactive' | 'suspended' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  features: string[];
  limits: Record<string, number>;
}

export interface TenantSettings {
  timezone: string;
  currency: string;
  language: string;
  dateFormat: string;
  numberFormat: string;
  features: Record<string, boolean>;
  integrations: Record<string, any>;
  customFields: CustomField[];
}

export interface CustomField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'json';
  required: boolean;
  defaultValue?: any;
  validation?: Record<string, any>;
}

// API-related types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Configuration types
export interface DatabaseConfig {
  type: 'postgres' | 'mongodb' | 'redis';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  pool?: {
    min: number;
    max: number;
  };
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
  issuer: string;
  audience: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  keyPrefix: string;
}

// Wallet and Rewards types
export interface Wallet {
  id: string;
  userId: string;
  tenantId: string;
  balance: number;
  currency: string;
  type: 'points' | 'cashback' | 'voucher';
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  reference?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface RewardRule {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  priority: number;
  validFrom?: Date;
  validTo?: Date;
  metadata?: Record<string, any>;
}

export interface RuleCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains';
  value: any;
  logicalOperator?: 'and' | 'or';
}

export interface RuleAction {
  type: 'award_points' | 'award_cashback' | 'send_notification' | 'trigger_webhook';
  parameters: Record<string, any>;
}