import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export interface AuthUser {
  id: string;
  email: string;
  tenantId: string;
  roles: string[];
  permissions: string[];
}

export interface TokenPayload {
  sub: string;
  email: string;
  tenantId: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  expiresIn: number;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsOptional()
  @IsUUID()
  tenantId?: string;
}

export class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken!: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  @IsUUID()
  tenantId?: string;
}