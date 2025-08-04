// Core entity interfaces

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  subdomain: string;
  status: TenantStatus;
  config: TenantConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantConfig {
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    theme: string;
  };
  features: {
    rewards: boolean;
    merchandise: boolean;
    vouchers: boolean;
    cashback: boolean;
    analytics: boolean;
  };
  limits: {
    maxUsers: number;
    maxTransactions: number;
    maxRules: number;
  };
}

export enum TenantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  status: UserStatus;
  roles: Role[];
  permissions: Permission[];
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
}

export interface Role {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

// Wallet and Transaction interfaces
export interface Wallet {
  id: string;
  userId: string;
  tenantId: string;
  type: WalletType;
  currency: string;
  balance: number;
  availableBalance: number;
  lockedBalance: number;
  status: WalletStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum WalletType {
  POINTS = 'points',
  CASH = 'cash',
  CREDITS = 'credits',
}

export enum WalletStatus {
  ACTIVE = 'active',
  FROZEN = 'frozen',
  CLOSED = 'closed',
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  tenantId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
  reference: string;
  description: string;
  metadata: Record<string, any>;
  createdAt: Date;
  processedAt?: Date;
}

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
  REWARD = 'reward',
  REDEMPTION = 'redemption',
  REFUND = 'refund',
  TRANSFER = 'transfer',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Reward Rule interfaces
export interface RewardRule {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority: number;
  status: RuleStatus;
  validFrom: Date;
  validTo?: Date;
  maxUsage?: number;
  currentUsage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RuleCondition {
  type: ConditionType;
  field: string;
  operator: ConditionOperator;
  value: any;
  logicalOperator?: LogicalOperator;
}

export enum ConditionType {
  TRANSACTION = 'transaction',
  USER = 'user',
  PRODUCT = 'product',
  TIME = 'time',
  CUSTOM = 'custom',
}

export enum ConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  IN = 'in',
  BETWEEN = 'between',
}

export enum LogicalOperator {
  AND = 'and',
  OR = 'or',
}

export interface RuleAction {
  type: ActionType;
  parameters: Record<string, any>;
}

export enum ActionType {
  AWARD_POINTS = 'award_points',
  AWARD_CASHBACK = 'award_cashback',
  SEND_NOTIFICATION = 'send_notification',
  ASSIGN_BADGE = 'assign_badge',
  APPLY_DISCOUNT = 'apply_discount',
}

export enum RuleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  EXPIRED = 'expired',
}

// API and Integration interfaces
export interface APIIntegration {
  id: string;
  tenantId: string;
  name: string;
  type: IntegrationType;
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  authentication: AuthConfig;
  mapping: DataMapping[];
  status: IntegrationStatus;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum IntegrationType {
  REST = 'rest',
  GRAPHQL = 'graphql',
  WEBHOOK = 'webhook',
  DATABASE = 'database',
  FILE = 'file',
}

export interface AuthConfig {
  type: AuthType;
  credentials: Record<string, any>;
}

export enum AuthType {
  NONE = 'none',
  API_KEY = 'api_key',
  BEARER_TOKEN = 'bearer_token',
  BASIC_AUTH = 'basic_auth',
  OAUTH2 = 'oauth2',
}

export interface DataMapping {
  sourceField: string;
  targetField: string;
  transformation?: string;
  required: boolean;
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  TESTING = 'testing',
}

// Product and Catalog interfaces
export interface Product {
  id: string;
  tenantId: string;
  vendorId?: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  currency: string;
  pointsPrice?: number;
  inventory: number;
  status: ProductStatus;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
}

// Event and Analytics interfaces
export interface Event {
  id: string;
  tenantId: string;
  userId?: string;
  type: string;
  data: Record<string, any>;
  timestamp: Date;
  sessionId?: string;
  source: string;
}

// Common interfaces
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: Record<string, any>;
}