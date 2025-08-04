import { IsEmail, IsString, IsOptional, IsArray, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'tenant-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'tenant-user' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: ['user:read', 'user:update'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiProperty({ enum: ['active', 'inactive', 'pending'] })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'pending'])
  status?: 'active' | 'inactive' | 'pending';
}

export class UpdateUserDto {
  @ApiProperty({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'tenant-admin' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: ['user:read', 'user:update', 'user:delete'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @ApiProperty({ enum: ['active', 'inactive', 'pending'] })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'pending'])
  status?: 'active' | 'inactive' | 'pending';

  @ApiProperty()
  @IsOptional()
  profile?: Record<string, any>;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  currentPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}