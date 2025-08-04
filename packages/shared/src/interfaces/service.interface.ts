import { ApiResponse, PaginationOptions } from '../types';

/**
 * Base service interface with common operations
 */
export interface IBaseService<T, CreateDto, UpdateDto> {
  create(tenantId: string, createDto: CreateDto): Promise<T>;
  findById(tenantId: string, id: string): Promise<T | null>;
  findAll(tenantId: string, options?: PaginationOptions): Promise<ApiResponse<T[]>>;
  update(tenantId: string, id: string, updateDto: UpdateDto): Promise<T>;
  delete(tenantId: string, id: string): Promise<void>;
  softDelete(tenantId: string, id: string): Promise<void>;
}

/**
 * Authentication service interface
 */
export interface IAuthService {
  login(email: string, password: string, tenantId: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
  }>;
  register(userData: any, tenantId: string): Promise<any>;
  refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
  logout(userId: string, tenantId: string): Promise<void>;
  forgotPassword(email: string, tenantId: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}

/**
 * Tenant service interface
 */
export interface ITenantService {
  createTenant(tenantData: any): Promise<any>;
  getTenant(identifier: string): Promise<any>;
  updateTenant(tenantId: string, updateData: any): Promise<any>;
  deactivateTenant(tenantId: string): Promise<void>;
  getTenantBySubdomain(subdomain: string): Promise<any>;
}

/**
 * User service interface
 */
export interface IUserService extends IBaseService<any, any, any> {
  findByEmail(tenantId: string, email: string): Promise<any>;
  updatePassword(tenantId: string, userId: string, newPassword: string): Promise<void>;
  assignRole(tenantId: string, userId: string, roleId: string): Promise<void>;
  removeRole(tenantId: string, userId: string, roleId: string): Promise<void>;
  getUserPermissions(tenantId: string, userId: string): Promise<string[]>;
}

/**
 * Configuration service interface
 */
export interface IConfigService {
  get<T>(tenantId: string, key: string, defaultValue?: T): Promise<T>;
  set<T>(tenantId: string, key: string, value: T): Promise<void>;
  delete(tenantId: string, key: string): Promise<void>;
  getAll(tenantId: string): Promise<Record<string, any>>;
  validateConfiguration(tenantId: string, config: Record<string, any>): Promise<boolean>;
}

/**
 * Wallet service interface
 */
export interface IWalletService {
  createWallet(tenantId: string, userId: string, currency: string): Promise<any>;
  getWallet(tenantId: string, walletId: string): Promise<any>;
  getUserWallets(tenantId: string, userId: string): Promise<any[]>;
  credit(tenantId: string, walletId: string, amount: number, description: string): Promise<any>;
  debit(tenantId: string, walletId: string, amount: number, description: string): Promise<any>;
  transfer(tenantId: string, fromWalletId: string, toWalletId: string, amount: number): Promise<any>;
  getBalance(tenantId: string, walletId: string): Promise<number>;
  getTransactionHistory(tenantId: string, walletId: string, options?: PaginationOptions): Promise<ApiResponse<any[]>>;
}