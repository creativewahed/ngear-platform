import { PaginationRequest, FilterRequest, SortRequest } from '../types';

// Repository Interfaces
export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(options?: QueryOptions): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  count(filters?: FilterRequest): Promise<number>;
}

export interface QueryOptions {
  pagination?: PaginationRequest;
  filters?: FilterRequest;
  sort?: SortRequest;
  relations?: string[];
}

// Service Interfaces
export interface IUserService {
  createUser(userData: any): Promise<any>;
  getUserById(id: string): Promise<any>;
  updateUser(id: string, userData: any): Promise<any>;
  deleteUser(id: string): Promise<void>;
  getUsersByTenant(tenantId: string): Promise<any[]>;
}

export interface ITenantService {
  createTenant(tenantData: any): Promise<any>;
  getTenantById(id: string): Promise<any>;
  getTenantBySlug(slug: string): Promise<any>;
  updateTenant(id: string, tenantData: any): Promise<any>;
  activateTenant(id: string): Promise<any>;
  deactivateTenant(id: string): Promise<any>;
}

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResult>;
  register(userData: any): Promise<AuthResult>;
  refreshToken(token: string): Promise<AuthResult>;
  logout(token: string): Promise<void>;
  verifyToken(token: string): Promise<any>;
  resetPassword(email: string): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}

export interface AuthResult {
  user: any;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IWalletService {
  createWallet(walletData: any): Promise<any>;
  getWalletById(id: string): Promise<any>;
  getWalletsByUser(userId: string): Promise<any[]>;
  updateBalance(walletId: string, amount: number, type: 'credit' | 'debit'): Promise<any>;
  transferFunds(fromWalletId: string, toWalletId: string, amount: number): Promise<any>;
  getTransactionHistory(walletId: string, options?: QueryOptions): Promise<any[]>;
}

export interface IRuleEngineService {
  evaluateRules(context: any): Promise<RuleResult[]>;
  createRule(ruleData: any): Promise<any>;
  updateRule(id: string, ruleData: any): Promise<any>;
  deleteRule(id: string): Promise<void>;
  activateRule(id: string): Promise<any>;
  deactivateRule(id: string): Promise<any>;
}

export interface RuleResult {
  ruleId: string;
  matched: boolean;
  actions: any[];
  executedAt: Date;
}

export interface INotificationService {
  sendEmail(to: string, subject: string, content: string, templateId?: string): Promise<void>;
  sendSMS(to: string, message: string): Promise<void>;
  sendPushNotification(userId: string, title: string, body: string, data?: any): Promise<void>;
  sendInAppNotification(userId: string, title: string, content: string, type?: string): Promise<void>;
}

export interface IAnalyticsService {
  trackEvent(event: any): Promise<void>;
  generateReport(reportType: string, parameters: any): Promise<any>;
  getDashboardData(tenantId: string, dateRange: DateRange): Promise<any>;
  getKPIs(tenantId: string, kpiNames: string[]): Promise<any>;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Event Interfaces
export interface IEventPublisher {
  publish(eventType: string, data: any, tenantId: string): Promise<void>;
}

export interface IEventHandler {
  handle(event: any): Promise<void>;
}

// Cache Interfaces
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  exists(key: string): Promise<boolean>;
}

// Queue Interfaces
export interface IQueueService {
  addJob(queueName: string, data: any, options?: JobOptions): Promise<void>;
  processJob(queueName: string, processor: JobProcessor): void;
}

export interface JobOptions {
  delay?: number;
  attempts?: number;
  priority?: number;
}

export type JobProcessor = (data: any) => Promise<void>;

// Configuration Interfaces
export interface IConfigService {
  get<T>(key: string, defaultValue?: T): T;
  set(key: string, value: any): void;
  has(key: string): boolean;
  getAll(): Record<string, any>;
}

// Database Interfaces
export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getConnection(): any;
}

export interface IMigrationService {
  runMigrations(): Promise<void>;
  rollbackMigration(version: string): Promise<void>;
  getMigrationStatus(): Promise<MigrationStatus[]>;
}

export interface MigrationStatus {
  version: string;
  name: string;
  executedAt?: Date;
  status: 'pending' | 'executed' | 'failed';
}

// Security Interfaces
export interface ISecurityService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
  generateToken(payload: any, expiresIn?: string): string;
  verifyToken(token: string): any;
  encryptData(data: string): string;
  decryptData(encryptedData: string): string;
}

// File Storage Interfaces
export interface IFileStorageService {
  uploadFile(file: Buffer, fileName: string, mimeType: string): Promise<string>;
  downloadFile(fileId: string): Promise<Buffer>;
  deleteFile(fileId: string): Promise<void>;
  getFileUrl(fileId: string): string;
}

// Logging Interfaces
export interface ILogger {
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  debug(message: string, meta?: any): void;
}

// Validation Interfaces
export interface IValidator<T> {
  validate(data: T): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}