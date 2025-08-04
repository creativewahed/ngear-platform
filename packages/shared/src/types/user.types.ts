import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsArray, IsUUID } from 'class-validator';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  TENANT_ADMIN = 'tenant_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  timezone?: string;
  language?: string;
}

export interface User {
  id: string;
  email: string;
  tenantId: string;
  profile: UserProfile;
  roles: UserRole[];
  status: UserStatus;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsUUID()
  @IsNotEmpty()
  tenantId!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  phone?: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles!: UserRole[];
}

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  timezone?: string;

  @IsOptional()
  language?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}