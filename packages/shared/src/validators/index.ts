import { IsEmail, IsString, IsOptional, IsBoolean, IsNumber, Min, Max, Length, Matches } from 'class-validator';

// User Validation DTOs
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  password: string;

  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  @Length(1, 50)
  lastName: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s\-\(\)]{10,}$/)
  phoneNumber?: string;

  @IsString()
  tenantId: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[\d\s\-\(\)]{10,}$/)
  phoneNumber?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Tenant Validation DTOs
export class CreateTenantDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 50)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens'
  })
  slug: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  planName?: string;
}

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// Wallet Validation DTOs
export class CreateWalletDto {
  @IsString()
  userId: string;

  @IsString()
  type: 'prepaid' | 'postpaid';

  @IsString()
  @Length(3, 3)
  currency: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  initialBalance?: number;

  @IsString()
  tenantId: string;
}

export class TransactionDto {
  @IsString()
  walletId: string;

  @IsString()
  type: 'credit' | 'debit';

  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  reference: string;

  @IsString()
  description: string;

  @IsOptional()
  metadata?: any;
}

// Rule Validation DTOs
export class CreateRuleDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsString()
  tenantId: string;

  conditions: RuleConditionDto[];
  actions: RuleActionDto[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  priority?: number;

  @IsOptional()
  validFrom?: Date;

  @IsOptional()
  validTo?: Date;
}

export class RuleConditionDto {
  @IsString()
  field: string;

  @IsString()
  operator: string;

  value: any;

  @IsOptional()
  @IsString()
  logicalOperator?: 'AND' | 'OR';
}

export class RuleActionDto {
  @IsString()
  type: string;

  parameters: any;
}

// Authentication DTOs
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  tenantSlug?: string;
}

export class RegisterDto extends CreateUserDto {
  @IsString()
  confirmPassword: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  tenantSlug?: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  newPassword: string;

  @IsString()
  confirmPassword: string;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
  })
  newPassword: string;

  @IsString()
  confirmPassword: string;
}

// Query DTOs
export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class SortDto {
  @IsString()
  field: string;

  @IsString()
  order: 'asc' | 'desc' = 'asc';
}

// Configuration DTOs
export class ConfigDto {
  @IsString()
  key: string;

  value: any;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;
}

// Notification DTOs
export class EmailNotificationDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @IsOptional()
  templateData?: any;
}

export class SMSNotificationDto {
  @IsString()
  @Matches(/^\+?[\d\s\-\(\)]{10,}$/)
  to: string;

  @IsString()
  @Length(1, 160)
  message: string;
}

export class PushNotificationDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  data?: any;
}