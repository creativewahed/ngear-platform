import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../user/entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Tenant } from '../../tenant/entities/tenant.entity';
import {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from '../dto/auth.dto';
import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
  generateRandomString,
} from '@ngear/shared';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    // Find tenant
    let tenant: Tenant;
    if (loginDto.tenantId) {
      tenant = await this.tenantRepository.findOne({
        where: { id: loginDto.tenantId, isActive: true },
      });
    } else if (loginDto.subdomain) {
      tenant = await this.tenantRepository.findOne({
        where: { subdomain: loginDto.subdomain, isActive: true },
      });
    } else {
      throw new BadRequestException('Tenant ID or subdomain is required');
    }

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
        tenantId: tenant.id,
        isActive: true,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if account is locked
    if (user.isLocked) {
      throw new UnauthorizedException('Account is temporarily locked due to too many failed login attempts');
    }

    // Verify password
    const isPasswordValid = await comparePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      user.incrementLoginAttempts();
      await this.userRepository.save(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset login attempts on successful login
    user.resetLoginAttempts();
    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user, tenant);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        roles: user.roles?.map(role => ({
          id: role.id,
          name: role.name,
          permissions: role.permissions?.map(p => p.fullPermission) || [],
        })) || [],
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        logo: tenant.logo,
        settings: tenant.settings,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    // Find tenant
    let tenant: Tenant;
    if (registerDto.tenantId) {
      tenant = await this.tenantRepository.findOne({
        where: { id: registerDto.tenantId, isActive: true },
      });
    } else if (registerDto.subdomain) {
      tenant = await this.tenantRepository.findOne({
        where: { subdomain: registerDto.subdomain, isActive: true },
      });
    } else {
      throw new BadRequestException('Tenant ID or subdomain is required');
    }

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
        tenantId: tenant.id,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(registerDto.password);
    if (!passwordValidation.isValid) {
      throw new BadRequestException(passwordValidation.errors.join(', '));
    }

    // Hash password
    const hashedPassword = await hashPassword(registerDto.password);

    // Create user
    const user = this.userRepository.create({
      id: uuidv4(),
      tenantId: tenant.id,
      email: registerDto.email,
      username: registerDto.username,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
      isActive: true,
      isEmailVerified: false,
      emailVerificationToken: generateRandomString(32),
    });

    await this.userRepository.save(user);

    // TODO: Send verification email

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      message: 'Registration successful. Please check your email for verification.',
    };
  }

  async refresh(refreshToken: string) {
    const tokenRecord = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user', 'user.roles'],
    });

    if (!tokenRecord || !tokenRecord.isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Find tenant
    const tenant = await this.tenantRepository.findOne({
      where: { id: tokenRecord.tenantId },
    });

    if (!tenant) {
      throw new UnauthorizedException('Tenant not found');
    }

    // Revoke old token
    tokenRecord.isRevoked = true;
    await this.refreshTokenRepository.save(tokenRecord);

    // Generate new tokens
    const tokens = await this.generateTokens(tokenRecord.user, tenant);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(userId: string, tenantId: string) {
    await this.refreshTokenRepository.update(
      { userId, tenantId },
      { isRevoked: true },
    );
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    // Find tenant
    let tenant: Tenant;
    if (forgotPasswordDto.tenantId) {
      tenant = await this.tenantRepository.findOne({
        where: { id: forgotPasswordDto.tenantId },
      });
    } else if (forgotPasswordDto.subdomain) {
      tenant = await this.tenantRepository.findOne({
        where: { subdomain: forgotPasswordDto.subdomain },
      });
    } else {
      throw new BadRequestException('Tenant ID or subdomain is required');
    }

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: {
        email: forgotPasswordDto.email,
        tenantId: tenant.id,
      },
    });

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const resetToken = generateRandomString(32);
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await this.userRepository.save(user);

    // TODO: Send password reset email
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        passwordResetToken: resetPasswordDto.token,
      },
    });

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(resetPasswordDto.newPassword);
    if (!passwordValidation.isValid) {
      throw new BadRequestException(passwordValidation.errors.join(', '));
    }

    // Update password
    user.password = await hashPassword(resetPasswordDto.newPassword);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    user.loginAttempts = 0;
    user.lockedUntil = null;

    await this.userRepository.save(user);
  }

  async changePassword(userId: string, tenantId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId, tenantId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(changePasswordDto.newPassword);
    if (!passwordValidation.isValid) {
      throw new BadRequestException(passwordValidation.errors.join(', '));
    }

    // Update password
    user.password = await hashPassword(changePasswordDto.newPassword);
    await this.userRepository.save(user);
  }

  async getProfile(userId: string, tenantId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId, tenantId },
      relations: ['roles', 'roles.permissions'],
      select: ['id', 'email', 'username', 'firstName', 'lastName', 'avatar', 'lastLoginAt', 'createdAt'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      roles: user.roles?.map(role => ({
        id: role.id,
        name: role.name,
        permissions: role.permissions?.map(p => p.fullPermission) || [],
      })) || [],
    };
  }

  private async generateTokens(user: User, tenant: Tenant) {
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: tenant.id,
      roles: user.roles?.map(role => role.name) || [],
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });

    const refreshTokenValue = uuidv4();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(
      refreshTokenExpiry.getDate() + 
      parseInt(this.configService.get('JWT_REFRESH_EXPIRES_DAYS', '7'))
    );

    // Save refresh token
    const refreshToken = this.refreshTokenRepository.create({
      id: uuidv4(),
      userId: user.id,
      tenantId: tenant.id,
      token: refreshTokenValue,
      expiresAt: refreshTokenExpiry,
    });

    await this.refreshTokenRepository.save(refreshToken);

    return {
      accessToken,
      refreshToken: refreshTokenValue,
    };
  }
}