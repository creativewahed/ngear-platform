// Core tenant types
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: TenantStatus;
  plan: TenantPlan;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export enum TenantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum TenantPlan {
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom',
}

export interface TenantSettings {
  branding: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    theme?: 'light' | 'dark';
  };
  features: {
    maxUsers: number;
    maxApiCalls: number;
    advancedAnalytics: boolean;
    customIntegrations: boolean;
  };
  compliance: {
    gdprEnabled: boolean;
    soc2Compliant: boolean;
    pciDssCompliant: boolean;
  };
}

// User and role types
export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
  roles: Role[];
  permissions: Permission[];
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  tenantId: string;
  isSystemRole: boolean;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export interface UserProfile {
  avatar?: string;
  timezone?: string;
  language?: string;
  preferences: Record<string, any>;
}

// API Integration types
export interface ApiIntegration {
  id: string;
  tenantId: string;
  name: string;
  type: IntegrationType;
  config: IntegrationConfig;
  status: IntegrationStatus;
  lastSync?: Date;
}

export enum IntegrationType {
  REST = 'rest',
  GRAPHQL = 'graphql',
  WEBHOOK = 'webhook',
  DATABASE = 'database',
  FILE = 'file',
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  SYNCING = 'syncing',
}

export interface IntegrationConfig {
  endpoint?: string;
  authentication: {
    type: 'api_key' | 'oauth2' | 'basic' | 'bearer';
    credentials: Record<string, string>;
  };
  mapping: DataMapping[];
  schedule?: {
    type: 'realtime' | 'interval' | 'cron';
    value?: string;
  };
}

export interface DataMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'format' | 'range' | 'custom';
  value?: any;
  message?: string;
}

// Rewards and Wallet types
export interface RewardRule {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  status: RuleStatus;
  priority: number;
  validFrom?: Date;
  validTo?: Date;
}

export enum RuleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  EXPIRED = 'expired',
}

export interface RuleCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'contains';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface RuleAction {
  type: 'award_points' | 'award_cashback' | 'send_notification' | 'trigger_webhook';
  parameters: Record<string, any>;
}

export interface Wallet {
  id: string;
  userId: string;
  tenantId: string;
  balances: WalletBalance[];
  status: WalletStatus;
  type: WalletType;
}

export enum WalletStatus {
  ACTIVE = 'active',
  FROZEN = 'frozen',
  CLOSED = 'closed',
}

export enum WalletType {
  PREPAID = 'prepaid',
  POSTPAID = 'postpaid',
  CREDIT = 'credit',
}

export interface WalletBalance {
  currency: string;
  amount: number;
  lockedAmount: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  metadata: Record<string, any>;
  status: TransactionStatus;
  createdAt: Date;
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  TRANSFER = 'transfer',
  REFUND = 'refund',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Analytics types
export interface AnalyticsEvent {
  id: string;
  tenantId: string;
  userId?: string;
  eventType: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId?: string;
}

export interface AnalyticsQuery {
  metrics: string[];
  dimensions: string[];
  filters: AnalyticsFilter[];
  dateRange: {
    start: Date;
    end: Date;
  };
  groupBy?: string[];
  orderBy?: OrderBy[];
}

export interface AnalyticsFilter {
  field: string;
  operator: string;
  value: any;
}

export interface OrderBy {
  field: string;
  direction: 'asc' | 'desc';
}

// Common response types
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

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}