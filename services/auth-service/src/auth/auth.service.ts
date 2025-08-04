import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';

export interface AuthResult {
  user: Omit<User, 'passwordHash'>;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersService.create({
      ...registerDto,
      role: 'tenant-user',
      status: 'pending',
    });

    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account is temporarily locked');
    }

    const isValidPassword = await this.usersService.validatePassword(user, loginDto.password);
    if (!isValidPassword) {
      await this.usersService.incrementLoginAttempts(user.id);
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.usersService.updateLoginInfo(user.id);
    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResult> {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken);
      const user = await this.usersService.findOne(payload.sub);
      
      if (user.status !== 'active') {
        throw new UnauthorizedException('Account is not active');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, password reset instructions have been sent' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.usersService.update(user.id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    // TODO: Send email with reset token
    console.log(`Password reset token for ${user.email}: ${resetToken}`);

    return { message: 'If email exists, password reset instructions have been sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(''); // This would need to find by reset token
    if (!user || !user.passwordResetToken || user.passwordResetExpires < new Date()) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // TODO: Implement password reset logic
    
    return { message: 'Password has been reset successfully' };
  }

  async validateUser(payload: any): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async generateTokens(user: User): Promise<AuthResult> {
    const payload = {
      email: user.email,
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role,
      permissions: user.permissions,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const { passwordHash, ...userResult } = user;

    return {
      user: userResult,
      accessToken,
      refreshToken,
    };
  }
}