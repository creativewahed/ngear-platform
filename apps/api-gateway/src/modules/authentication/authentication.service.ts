import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, TenantEntity } from '@ngear/database';
import { EncryptionUtils } from '@ngear/shared';
import { UserStatus } from '@ngear/types';
import config from '@ngear/config';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    tenantId: string;
  };
}

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'roles.permissions', 'permissions'],
      select: ['id', 'email', 'firstName', 'lastName', 'password', 'tenantId', 'status'],
    });

    if (!user || !(await EncryptionUtils.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User account is not active');
    }

    // Update last login
    await this.userRepository.update(user.id, { lastLoginAt: new Date() });

    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantId: string;
  }): Promise<LoginResult> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email, tenantId: userData.tenantId },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const tenant = await this.tenantRepository.findOne({
      where: { id: userData.tenantId },
    });

    if (!tenant) {
      throw new UnauthorizedException('Invalid tenant');
    }

    const hashedPassword = await EncryptionUtils.hashPassword(userData.password);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      status: UserStatus.ACTIVE, // In production, this might be PENDING_VERIFICATION
    });

    await this.userRepository.save(user);

    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: config.jwt.refreshSecret,
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
        relations: ['roles', 'roles.permissions', 'permissions'],
      });

      if (!user || user.status !== UserStatus.ACTIVE) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessToken = await this.generateAccessToken(user);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: UserEntity): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(user: UserEntity): Promise<string> {
    const roles = user.roles?.map(role => role.name) || [];
    const permissions = this.extractPermissions(user);

    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      roles,
      permissions,
    };

    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(user: UserEntity): Promise<string> {
    const payload = {
      sub: user.id,
      type: 'refresh',
    };

    return this.jwtService.sign(payload, {
      secret: config.jwt.refreshSecret,
      expiresIn: config.jwt.refreshExpiresIn,
    });
  }

  private extractPermissions(user: UserEntity): string[] {
    const permissions = new Set<string>();

    // Add permissions from roles
    if (user.roles) {
      user.roles.forEach(role => {
        if (role.permissions) {
          role.permissions.forEach(permission => {
            permissions.add(permission.name);
          });
        }
      });
    }

    // Add direct permissions
    if (user.permissions) {
      user.permissions.forEach(permission => {
        permissions.add(permission.name);
      });
    }

    return Array.from(permissions);
  }
}