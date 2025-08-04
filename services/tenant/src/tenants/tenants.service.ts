import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as slug from 'slug';

import { Tenant } from '../entities/tenant.entity';
import { TenantUser } from '../entities/tenant-user.entity';
import { CreateTenantDto, UpdateTenantDto, PaginationDto, generateId } from '@ngear/shared';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    @InjectRepository(TenantUser)
    private readonly tenantUserRepository: Repository<TenantUser>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Generate slug if not provided
    const tenantSlug = createTenantDto.slug || slug(createTenantDto.name, { lower: true });

    // Check if tenant with slug already exists
    const existingTenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug },
    });

    if (existingTenant) {
      throw new ConflictException('Tenant with this slug already exists');
    }

    // Check if domain is already taken
    if (createTenantDto.domain) {
      const existingDomain = await this.tenantRepository.findOne({
        where: { domain: createTenantDto.domain },
      });

      if (existingDomain) {
        throw new ConflictException('Domain is already taken');
      }
    }

    // Create tenant with default settings
    const tenant = this.tenantRepository.create({
      name: createTenantDto.name,
      slug: tenantSlug,
      domain: createTenantDto.domain,
      status: 'trial',
      settings: {
        allowRegistration: true,
        requireEmailVerification: true,
        requirePhoneVerification: false,
        sessionTimeout: 3600, // 1 hour
        maxUsers: 10,
        features: ['basic_auth', 'user_management'],
        integrations: {
          email: true,
          sms: false,
          analytics: false,
          customDomain: false,
        },
        security: {
          mfaRequired: false,
          passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: false,
            maxAge: 90, // days
            preventReuse: 5,
          },
          sessionPolicy: {
            maxConcurrentSessions: 3,
            idleTimeout: 1800, // 30 minutes
            absoluteTimeout: 28800, // 8 hours
          },
        },
      },
      branding: {
        primaryColor: '#3B82F6',
        secondaryColor: '#6B7280',
        accentColor: '#10B981',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      contactInfo: {
        companyName: createTenantDto.name,
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'US',
        },
        phone: '',
        email: '',
        timezone: 'UTC',
        currency: 'USD',
        locale: 'en-US',
      },
      metadata: {
        onboardingCompleted: false,
        tags: [],
      },
      trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
    });

    const savedTenant = await this.tenantRepository.save(tenant);

    // Emit tenant created event
    this.eventEmitter.emit('tenant.created', {
      tenantId: savedTenant.id,
      tenant: savedTenant,
    });

    return savedTenant;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [tenants, total] = await this.tenantRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['subscriptions'],
    });

    return {
      data: tenants,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async search(query: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [tenants, total] = await this.tenantRepository.findAndCount({
      where: [
        { name: ILike(`%${query}%`) },
        { slug: ILike(`%${query}%`) },
        { domain: ILike(`%${query}%`) },
      ],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: tenants,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { id },
      relations: ['subscriptions', 'apiKeys'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findBySlug(slug: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { slug },
      relations: ['subscriptions', 'apiKeys'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findByIdOrSlug(identifier: string): Promise<Tenant> {
    // Try to find by ID first (UUID format)
    if (identifier.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      return this.findById(identifier);
    }

    // Otherwise, find by slug
    return this.findBySlug(identifier);
  }

  async findByDomain(domain: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({
      where: { domain },
      relations: ['subscriptions'],
    });

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findById(id);

    // Check if domain is being changed and is available
    if (updateTenantDto.domain && updateTenantDto.domain !== tenant.domain) {
      const existingDomain = await this.tenantRepository.findOne({
        where: { domain: updateTenantDto.domain },
      });

      if (existingDomain && existingDomain.id !== id) {
        throw new ConflictException('Domain is already taken');
      }
    }

    await this.tenantRepository.update(id, {
      ...updateTenantDto,
      updatedAt: new Date(),
      version: tenant.version + 1,
    });

    const updatedTenant = await this.findById(id);

    // Emit tenant updated event
    this.eventEmitter.emit('tenant.updated', {
      tenantId: id,
      tenant: updatedTenant,
      changes: updateTenantDto,
    });

    return updatedTenant;
  }

  async remove(id: string): Promise<void> {
    const tenant = await this.findById(id);

    // Soft delete
    await this.tenantRepository.update(id, {
      deletedAt: new Date(),
      isActive: false,
    });

    // Emit tenant deleted event
    this.eventEmitter.emit('tenant.deleted', {
      tenantId: id,
      tenant,
    });
  }

  async activate(id: string): Promise<Tenant> {
    await this.tenantRepository.update(id, {
      isActive: true,
      status: 'active',
      suspendedAt: null,
      suspensionReason: null,
      updatedAt: new Date(),
    });

    const tenant = await this.findById(id);

    // Emit tenant activated event
    this.eventEmitter.emit('tenant.activated', {
      tenantId: id,
      tenant,
    });

    return tenant;
  }

  async deactivate(id: string): Promise<Tenant> {
    await this.tenantRepository.update(id, {
      isActive: false,
      status: 'suspended',
      updatedAt: new Date(),
    });

    const tenant = await this.findById(id);

    // Emit tenant deactivated event
    this.eventEmitter.emit('tenant.deactivated', {
      tenantId: id,
      tenant,
    });

    return tenant;
  }

  async suspend(id: string, reason?: string): Promise<Tenant> {
    await this.tenantRepository.update(id, {
      status: 'suspended',
      suspendedAt: new Date(),
      suspensionReason: reason,
      updatedAt: new Date(),
    });

    const tenant = await this.findById(id);

    // Emit tenant suspended event
    this.eventEmitter.emit('tenant.suspended', {
      tenantId: id,
      tenant,
      reason,
    });

    return tenant;
  }

  async unsuspend(id: string): Promise<Tenant> {
    await this.tenantRepository.update(id, {
      status: 'active',
      suspendedAt: null,
      suspensionReason: null,
      updatedAt: new Date(),
    });

    const tenant = await this.findById(id);

    // Emit tenant unsuspended event
    this.eventEmitter.emit('tenant.unsuspended', {
      tenantId: id,
      tenant,
    });

    return tenant;
  }

  async getTenantUsers(tenantId: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 20 } = paginationDto;
    const skip = (page - 1) * limit;

    const [tenantUsers, total] = await this.tenantUserRepository.findAndCount({
      where: { tenantId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: tenantUsers,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async addUser(tenantId: string, userId: string, roles: string[], permissions?: string[]): Promise<TenantUser> {
    // Check if user is already part of the tenant
    const existingTenantUser = await this.tenantUserRepository.findOne({
      where: { tenantId, userId },
    });

    if (existingTenantUser) {
      throw new ConflictException('User is already part of this tenant');
    }

    const tenantUser = this.tenantUserRepository.create({
      tenantId,
      userId,
      roles,
      permissions: permissions || [],
      joinedAt: new Date(),
      preferences: {
        notifications: true,
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
      },
    });

    const savedTenantUser = await this.tenantUserRepository.save(tenantUser);

    // Emit user added event
    this.eventEmitter.emit('tenant.user.added', {
      tenantId,
      userId,
      tenantUser: savedTenantUser,
    });

    return savedTenantUser;
  }

  async updateUser(
    tenantId: string,
    userId: string,
    updateData: { roles?: string[]; permissions?: string[]; isActive?: boolean },
  ): Promise<TenantUser> {
    const tenantUser = await this.tenantUserRepository.findOne({
      where: { tenantId, userId },
    });

    if (!tenantUser) {
      throw new NotFoundException('User not found in this tenant');
    }

    await this.tenantUserRepository.update(
      { tenantId, userId },
      {
        ...updateData,
        updatedAt: new Date(),
      },
    );

    const updatedTenantUser = await this.tenantUserRepository.findOne({
      where: { tenantId, userId },
    });

    // Emit user updated event
    this.eventEmitter.emit('tenant.user.updated', {
      tenantId,
      userId,
      tenantUser: updatedTenantUser,
      changes: updateData,
    });

    return updatedTenantUser;
  }

  async removeUser(tenantId: string, userId: string): Promise<void> {
    const tenantUser = await this.tenantUserRepository.findOne({
      where: { tenantId, userId },
    });

    if (!tenantUser) {
      throw new NotFoundException('User not found in this tenant');
    }

    await this.tenantUserRepository.delete({ tenantId, userId });

    // Emit user removed event
    this.eventEmitter.emit('tenant.user.removed', {
      tenantId,
      userId,
      tenantUser,
    });
  }

  async getStats(tenantId: string) {
    const tenant = await this.findById(tenantId);

    const userCount = await this.tenantUserRepository.count({
      where: { tenantId, isActive: true },
    });

    const totalUsers = await this.tenantUserRepository.count({
      where: { tenantId },
    });

    return {
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        status: tenant.status,
        isActive: tenant.isActive,
        createdAt: tenant.createdAt,
        trialEndsAt: tenant.trialEndsAt,
        daysUntilTrialExpiry: tenant.daysUntilTrialExpiry,
      },
      users: {
        active: userCount,
        total: totalUsers,
        limit: tenant.settings.maxUsers,
      },
      subscription: tenant.subscriptions?.[0] || null,
    };
  }
}