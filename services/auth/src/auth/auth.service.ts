import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { PasswordReset } from '../entities/password-reset.entity';
import { LoginAttempt } from '../entities/login-attempt.entity';
import { RegisterDto } from '@ngear/shared';

@Injectable()
export class AuthService {
  private readonly maxFailedAttempts = 5;
  private readonly lockoutDuration = 15 * 60 * 1000; // 15 minutes

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
    @InjectRepository(LoginAttempt)
    private readonly loginAttemptRepository: Repository<LoginAttempt>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string, tenantId?: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email, tenantId: tenantId || 'default' },
    });

    if (!user) {
      return null;
    }

    // Check if user is locked
    if (user.isLocked) {
      throw new UnauthorizedException('Account is temporarily locked');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is disabled');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      await this.handleFailedLogin(user);
      return null;
    }

    // Reset failed attempts on successful login
    if (user.failedLoginAttempts > 0) {
      await this.userRepository.update(user.id, {
        failedLoginAttempts: 0,
        lockedUntil: null,
      });
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any, ipAddress: string, userAgent: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(user.id, ipAddress, userAgent);

    // Update last login
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });

    // Log successful login attempt
    await this.logLoginAttempt({
      userId: user.id,
      email: user.email,
      ipAddress,
      userAgent,
      isSuccessful: true,
    });

    return {
      user,
      accessToken,
      refreshToken: refreshToken.token,
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
    };
  }

  async register(registerDto: RegisterDto, ipAddress: string, userAgent: string) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email, tenantId: registerDto.tenantId },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Validate password confirmation
    if (registerDto.password !== registerDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(registerDto.password, 12);

    // Create user
    const user = this.userRepository.create({
      email: registerDto.email,
      passwordHash,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phoneNumber: registerDto.phoneNumber,
      tenantId: registerDto.tenantId,
      preferences: {
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          sms: true,
          push: true,
          inApp: true,
        },
        theme: 'light',
      },
    });

    const savedUser = await this.userRepository.save(user);

    // Generate tokens
    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
      tenantId: savedUser.tenantId,
      roles: savedUser.roles,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = await this.generateRefreshToken(savedUser.id, ipAddress, userAgent);

    const { passwordHash: _, ...userResponse } = savedUser;

    return {
      user: userResponse,
      accessToken,
      refreshToken: refreshToken.token,
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
    };
  }

  async refreshToken(token: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!refreshToken || !refreshToken.isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = {
      sub: refreshToken.user.id,
      email: refreshToken.user.email,
      tenantId: refreshToken.user.tenantId,
      roles: refreshToken.user.roles,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '1h'),
    };
  }

  async logout(userId: string, refreshToken: string) {
    await this.refreshTokenRepository.update(
      { userId, token: refreshToken },
      { isRevoked: true },
    );

    return { message: 'Logout successful' };
  }

  async forgotPassword(email: string, ipAddress: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists
      return { message: 'If the email exists, a reset link has been sent' };
    }

    // Generate reset token
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const passwordReset = this.passwordResetRepository.create({
      email,
      token: resetToken,
      expiresAt,
      ipAddress,
    });

    await this.passwordResetRepository.save(passwordReset);

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordResetEmail(email, resetToken);

    return { message: 'If the email exists, a reset link has been sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: { token },
    });

    if (!passwordReset || !passwordReset.isValid) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const user = await this.userRepository.findOne({
      where: { email: passwordReset.email },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update user password
    await this.userRepository.update(user.id, {
      passwordHash,
      failedLoginAttempts: 0,
      lockedUntil: null,
    });

    // Mark reset token as used
    await this.passwordResetRepository.update(passwordReset.id, {
      isUsed: true,
    });

    // Revoke all refresh tokens
    await this.refreshTokenRepository.update(
      { userId: user.id },
      { isRevoked: true },
    );

    return { message: 'Password reset successful' };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    await this.userRepository.update(userId, { passwordHash });

    return { message: 'Password changed successfully' };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { passwordHash, ...profile } = user;
    return profile;
  }

  async verifyEmail(token: string) {
    // TODO: Implement email verification logic
    return { message: 'Email verified successfully' };
  }

  async resendEmailVerification(userId: string) {
    // TODO: Implement resend email verification logic
    return { message: 'Verification email sent' };
  }

  private async generateRefreshToken(userId: string, ipAddress: string, userAgent: string): Promise<RefreshToken> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  private async handleFailedLogin(user: User) {
    const failedAttempts = user.failedLoginAttempts + 1;
    const updateData: Partial<User> = { failedLoginAttempts: failedAttempts };

    if (failedAttempts >= this.maxFailedAttempts) {
      updateData.lockedUntil = new Date(Date.now() + this.lockoutDuration);
    }

    await this.userRepository.update(user.id, updateData);
  }

  private async logLoginAttempt(data: {
    userId?: string;
    email: string;
    ipAddress: string;
    userAgent?: string;
    isSuccessful: boolean;
    failureReason?: string;
  }) {
    const loginAttempt = this.loginAttemptRepository.create(data);
    await this.loginAttemptRepository.save(loginAttempt);
  }
}