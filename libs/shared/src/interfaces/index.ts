// Authentication and authorization interfaces
export interface IAuthService {
  authenticate(credentials: LoginCredentials): Promise<AuthResult>;
  register(userData: RegisterData): Promise<User>;
  refreshToken(refreshToken: string): Promise<AuthResult>;
  logout(userId: string): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  tenantId?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Tenant management interfaces
export interface ITenantService {
  createTenant(tenantData: CreateTenantData): Promise<Tenant>;
  getTenant(id: string): Promise<Tenant>;
  updateTenant(id: string, updates: Partial<Tenant>): Promise<Tenant>;
  deleteTenant(id: string): Promise<void>;
  listTenants(query: PaginationQuery): Promise<PaginatedResult<Tenant>>;
}

export interface CreateTenantData {
  name: string;
  slug: string;
  domain?: string;
  adminEmail: string;
  adminPassword: string;
  subscription?: Partial<TenantSubscription>;
  settings?: Partial<TenantSettings>;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: ResponseMeta;
}

// User management interfaces
export interface IUserService {
  createUser(userData: CreateUserData): Promise<User>;
  getUser(id: string): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  listUsers(tenantId: string, query: PaginationQuery): Promise<PaginatedResult<User>>;
  assignRole(userId: string, roleId: string): Promise<void>;
  removeRole(userId: string, roleId: string): Promise<void>;
}

export interface CreateUserData {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  roleIds?: string[];
  isActive?: boolean;
}

// Configuration interfaces
export interface IConfigService {
  get<T>(key: string, defaultValue?: T): T;
  set(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
  getByTenant<T>(tenantId: string, key: string, defaultValue?: T): T;
  setByTenant(tenantId: string, key: string, value: any): Promise<void>;
}

// Notification interfaces
export interface INotificationService {
  sendEmail(notification: EmailNotification): Promise<void>;
  sendSMS(notification: SMSNotification): Promise<void>;
  sendPush(notification: PushNotification): Promise<void>;
  sendInApp(notification: InAppNotification): Promise<void>;
}

export interface EmailNotification {
  to: string[];
  subject: string;
  template: string;
  data: Record<string, any>;
  tenantId: string;
}

export interface SMSNotification {
  to: string[];
  message: string;
  tenantId: string;
}

export interface PushNotification {
  to: string[];
  title: string;
  body: string;
  data?: Record<string, any>;
  tenantId: string;
}

export interface InAppNotification {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  data?: Record<string, any>;
  tenantId: string;
}

// Wallet interfaces
export interface IWalletService {
  createWallet(walletData: CreateWalletData): Promise<Wallet>;
  getWallet(id: string): Promise<Wallet>;
  getUserWallets(userId: string, tenantId: string): Promise<Wallet[]>;
  credit(walletId: string, amount: number, description: string): Promise<Transaction>;
  debit(walletId: string, amount: number, description: string): Promise<Transaction>;
  getBalance(walletId: string): Promise<number>;
  getTransactions(walletId: string, query: PaginationQuery): Promise<PaginatedResult<Transaction>>;
}

export interface CreateWalletData {
  userId: string;
  tenantId: string;
  currency: string;
  type: 'points' | 'cashback' | 'voucher';
  initialBalance?: number;
}

// Rule engine interfaces
export interface IRuleEngine {
  evaluateRules(tenantId: string, context: Record<string, any>): Promise<RuleAction[]>;
  createRule(ruleData: CreateRuleData): Promise<RewardRule>;
  updateRule(id: string, updates: Partial<RewardRule>): Promise<RewardRule>;
  deleteRule(id: string): Promise<void>;
  testRule(rule: RewardRule, context: Record<string, any>): Promise<boolean>;
}

export interface CreateRuleData {
  tenantId: string;
  name: string;
  description?: string;
  conditions: RuleCondition[];
  actions: RuleAction[];
  priority?: number;
  validFrom?: Date;
  validTo?: Date;
}

// Database interfaces
export interface IDatabaseService {
  findOne<T>(entity: string, query: Record<string, any>): Promise<T | null>;
  findMany<T>(entity: string, query: Record<string, any>, options?: QueryOptions): Promise<T[]>;
  create<T>(entity: string, data: Record<string, any>): Promise<T>;
  update<T>(entity: string, query: Record<string, any>, updates: Record<string, any>): Promise<T>;
  delete(entity: string, query: Record<string, any>): Promise<void>;
  count(entity: string, query: Record<string, any>): Promise<number>;
}

export interface QueryOptions {
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  populate?: string[];
}

import { User, Tenant, UserRole, Permission, Wallet, Transaction, RewardRule, RuleCondition, RuleAction, PaginationQuery, ResponseMeta } from '../types';