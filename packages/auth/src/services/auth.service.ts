import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  AuthUser,
  AuthResponse,
  LoginDto,
  RegisterDto,
  TokenPayload,
  UserRole,
  UserStatus,
  ApiResponse,
  CryptoUtils,
} from '@ngear/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthUser | null> {
    // TODO: Replace with actual database lookup
    const mockUser = {
      id: 'user-123',
      email: 'admin@ngear.com',
      hashedPassword: await CryptoUtils.hashPassword('admin123'),
      tenantId: 'tenant-123',
      roles: [UserRole.SUPER_ADMIN],
      status: UserStatus.ACTIVE,
    };

    if (email === mockUser.email && await CryptoUtils.comparePassword(password, mockUser.hashedPassword)) {
      return {
        id: mockUser.id,
        email: mockUser.email,
        tenantId: mockUser.tenantId,
        roles: mockUser.roles,
        permissions: this.getPermissionsForRoles(mockUser.roles),
      };
    }

    return null;
  }

  async login(user: AuthUser): Promise<ApiResponse<AuthResponse>> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
    });

    const authResponse: AuthResponse = {
      accessToken,
      refreshToken,
      user,
      expiresIn: 15 * 60, // 15 minutes
    };

    return {
      success: true,
      data: authResponse,
      message: 'Login successful',
    };
  }

  async register(registerDto: RegisterDto): Promise<ApiResponse<AuthResponse>> {
    // TODO: Check if user already exists in database
    const existingUser = false; // Replace with actual DB check
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // TODO: Create user in database
    const hashedPassword = await CryptoUtils.hashPassword(registerDto.password);
    const userId = CryptoUtils.generateUUID();

    const user: AuthUser = {
      id: userId,
      email: registerDto.email,
      tenantId: registerDto.tenantId || 'default-tenant',
      roles: [UserRole.USER],
      permissions: this.getPermissionsForRoles([UserRole.USER]),
    };

    // Return login response
    return this.login(user);
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newPayload: TokenPayload = {
        sub: payload.sub,
        email: payload.email,
        tenantId: payload.tenantId,
        roles: payload.roles,
      };

      const accessToken = this.jwtService.sign(newPayload);

      return {
        success: true,
        data: { accessToken },
        message: 'Token refreshed successfully',
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getProfile(userId: string): Promise<ApiResponse<AuthUser>> {
    // TODO: Get user from database
    const user: AuthUser = {
      id: userId,
      email: 'admin@ngear.com',
      tenantId: 'tenant-123',
      roles: [UserRole.SUPER_ADMIN],
      permissions: this.getPermissionsForRoles([UserRole.SUPER_ADMIN]),
    };

    return {
      success: true,
      data: user,
      message: 'Profile retrieved successfully',
    };
  }

  async logout(userId: string): Promise<ApiResponse<void>> {
    // TODO: Add token to blacklist in Redis
    return {
      success: true,
      message: 'Logout successful',
    };
  }

  private getPermissionsForRoles(roles: UserRole[]): string[] {
    const permissions: Set<string> = new Set();

    for (const role of roles) {
      switch (role) {
        case UserRole.SUPER_ADMIN:
          permissions.add('*'); // All permissions
          break;
        case UserRole.TENANT_ADMIN:
          permissions.add('tenant:read');
          permissions.add('tenant:write');
          permissions.add('user:read');
          permissions.add('user:write');
          break;
        case UserRole.ADMIN:
          permissions.add('user:read');
          permissions.add('user:write');
          break;
        case UserRole.MANAGER:
          permissions.add('user:read');
          break;
        case UserRole.USER:
          permissions.add('profile:read');
          permissions.add('profile:write');
          break;
        case UserRole.VIEWER:
          permissions.add('profile:read');
          break;
      }
    }

    return Array.from(permissions);
  }
}