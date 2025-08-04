import { IsNotEmpty, IsOptional, IsEnum, IsObject } from 'class-validator';

export enum TenantStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  TRIAL = 'trial',
  EXPIRED = 'expired'
}

export enum TenantPlan {
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}

export interface TenantSettings {
  branding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    customCss?: string;
  };
  features?: {
    multiCurrency?: boolean;
    advancedAnalytics?: boolean;
    apiAccess?: boolean;
    whiteLabel?: boolean;
  };
  limits?: {
    maxUsers?: number;
    maxTransactions?: number;
    apiCallsPerMonth?: number;
  };
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  domain?: string;
  status: TenantStatus;
  plan: TenantPlan;
  settings: TenantSettings;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTenantDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  subdomain!: string;

  @IsOptional()
  domain?: string;

  @IsEnum(TenantPlan)
  @IsNotEmpty()
  plan!: TenantPlan;

  @IsOptional()
  @IsObject()
  settings?: TenantSettings;
}

export class UpdateTenantDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  domain?: string;

  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;

  @IsOptional()
  @IsEnum(TenantPlan)
  plan?: TenantPlan;

  @IsOptional()
  @IsObject()
  settings?: TenantSettings;
}