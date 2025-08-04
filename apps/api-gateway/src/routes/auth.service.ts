import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { db } from '@ngear/database';
import { LoginDto, RegisterDto } from './auth.dto';

// Temporary utility functions until @ngear/shared is properly integrated
class TempUtils {
  static async hashPassword(password: string): Promise<string> {
    // Simple hash for development - replace with proper bcrypt in production
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password + 'salt').digest('hex');
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hashedPassword;
  }

  static createSuccessResponse<T>(data: T, meta?: any): any {
    return {
      success: true,
      data,
      meta,
    };
  }
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto, tenant: any) {
    const user = await db.getUserByEmail(tenant.id, loginDto.email);
    
    if (!user || !(await TempUtils.comparePassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    const tokens = await this.generateTokens(user);

    // Create session
    const sessionExpiry = new Date();
    sessionExpiry.setDate(sessionExpiry.getDate() + 7); // 7 days
    await db.createSession(user.id, tokens.refreshToken, sessionExpiry);

    return TempUtils.createSuccessResponse({
      user: this.sanitizeUser(user),
      tokens,
    });
  }

  async register(registerDto: RegisterDto, tenant: any) {
    // Check if user already exists
    const existingUser = await db.getUserByEmail(tenant.id, registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await TempUtils.hashPassword(registerDto.password);

    // Create user
    const user = await db.createUser({
      tenantId: tenant.id,
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
      status: 'PENDING',
      profile: {
        timezone: registerDto.timezone || 'UTC',
        language: registerDto.language || 'en',
        preferences: {},
      },
      roles: [],
      permissions: [],
    });

    // Create wallet for user
    await db.createWallet(user.id, tenant.id);

    const tokens = await this.generateTokens(user);

    // Create session
    const sessionExpiry = new Date();
    sessionExpiry.setDate(sessionExpiry.getDate() + 7);
    await db.createSession(user.id, tokens.refreshToken, sessionExpiry);

    return TempUtils.createSuccessResponse({
      user: this.sanitizeUser(user),
      tokens,
    });
  }

  async getProfile(user: any) {
    const fullUser = await db.getUserById(user.id);
    return TempUtils.createSuccessResponse({
      user: this.sanitizeUser(fullUser),
    });
  }

  async logout(user: any) {
    // In a real implementation, you'd invalidate all user sessions
    // For now, we'll just return success
    return TempUtils.createSuccessResponse({
      message: 'Logged out successfully',
    });
  }

  async refresh(refreshToken: string) {
    const session = await db.getSession(refreshToken);
    
    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = await this.generateTokens(session.user);

    // Update session token
    await db.deleteSession(refreshToken);
    const sessionExpiry = new Date();
    sessionExpiry.setDate(sessionExpiry.getDate() + 7);
    await db.createSession(session.user.id, tokens.refreshToken, sessionExpiry);

    return TempUtils.createSuccessResponse({
      tokens,
    });
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private sanitizeUser(user: any) {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}