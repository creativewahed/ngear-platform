// Base Entity Types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

// Multi-tenant Types
export interface TenantEntity extends BaseEntity {
  tenantId: string;
}

// User Types
export interface User extends TenantEntity {
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  roles: Role[];
}

export interface Role extends TenantEntity {
  name: string;
  description?: string;
  permissions: Permission[];
  isSystemRole: boolean;
}

export interface Permission extends BaseEntity {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

// Tenant Types
export interface Tenant extends BaseEntity {
  name: string;
  subdomain: string;
  domain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  isActive: boolean;
  subscription: TenantSubscription;
  settings: TenantSettings;
}

export interface TenantSubscription extends BaseEntity {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  maxUsers: number;
  maxTransactions: number;
}

export interface TenantSettings extends BaseEntity {
  features: string[];
  integrations: Record<string, any>;
  branding: BrandingSettings;
  security: SecuritySettings;
}

export interface BrandingSettings {
  logo?: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  customCSS?: string;
}

export interface SecuritySettings {
  mfaRequired: boolean;
  passwordPolicy: PasswordPolicy;
  sessionTimeout: number;
  ipWhitelist?: string[];
}

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  maxAge: number;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  meta?: ResponseMeta;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// Wallet Types
export interface Wallet extends TenantEntity {
  userId: string;
  currency: string;
  balance: number;
  lockedBalance: number;
  type: WalletType;
  isActive: boolean;
}

export interface Transaction extends TenantEntity {
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  referenceId?: string;
  metadata?: Record<string, any>;
  status: TransactionStatus;
}

// Rewards Types
export interface RewardRule extends TenantEntity {
  name: string;
  description?: string;
  isActive: boolean;
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  validFrom?: Date;
  validTo?: Date;
  usageLimit?: number;
  usageCount: number;
}

export interface RuleCondition {
  field: string;
  operator: ConditionOperator;
  value: any;
  type: ConditionType;
}

export interface RuleAction {
  type: ActionType;
  value: any;
  metadata?: Record<string, any>;
}

// Configuration Types
export interface Configuration extends TenantEntity {
  key: string;
  value: any;
  type: ConfigurationType;
  description?: string;
  isSecret: boolean;
  validationSchema?: Record<string, any>;
}

// Import enums for type definitions
import { 
  SubscriptionPlan, 
  SubscriptionStatus, 
  WalletType, 
  TransactionType, 
  TransactionStatus, 
  ConditionOperator, 
  ConditionType, 
  ActionType, 
  ConfigurationType 
} from '../enums';