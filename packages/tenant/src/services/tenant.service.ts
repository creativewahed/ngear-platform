import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from '../entities/tenant.entity';
import {
  CreateTenantDto,
  UpdateTenantDto,
  PaginationQuery,
  ApiResponse,
  TenantStatus,
  Tenant,
  CryptoUtils,
} from '@ngear/shared';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {}

  async findAll(query: PaginationQuery): Promise<ApiResponse<Tenant[]>> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'desc' } = query;
    
    const queryBuilder = this.tenantRepository.createQueryBuilder('tenant');

    if (search) {
      queryBuilder.where(
        'tenant.name ILIKE :search OR tenant.subdomain ILIKE :search',
        { search: `%${search}%` }
      );
    }

    queryBuilder.orderBy(`tenant.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    const [tenants, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      success: true,
      data: tenants,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<ApiResponse<Tenant>> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return {
      success: true,
      data: tenant,
    };
  }

  async findBySubdomain(subdomain: string): Promise<ApiResponse<Tenant>> {
    const tenant = await this.tenantRepository.findOne({ where: { subdomain } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return {
      success: true,
      data: tenant,
    };
  }

  async create(createTenantDto: CreateTenantDto): Promise<ApiResponse<Tenant>> {
    // Check if subdomain already exists
    const existingTenant = await this.tenantRepository.findOne({
      where: { subdomain: createTenantDto.subdomain },
    });

    if (existingTenant) {
      throw new ConflictException('Subdomain already exists');
    }

    // Check if domain already exists (if provided)
    if (createTenantDto.domain) {
      const existingDomain = await this.tenantRepository.findOne({
        where: { domain: createTenantDto.domain },
      });

      if (existingDomain) {
        throw new ConflictException('Domain already exists');
      }
    }

    const tenant = this.tenantRepository.create({
      id: CryptoUtils.generateUUID(),
      ...createTenantDto,
    });

    const savedTenant = await this.tenantRepository.save(tenant);

    return {
      success: true,
      data: savedTenant,
      message: 'Tenant created successfully',
    };
  }

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<ApiResponse<Tenant>> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Check if domain already exists (if being changed)
    if (updateTenantDto.domain && updateTenantDto.domain !== tenant.domain) {
      const existingDomain = await this.tenantRepository.findOne({
        where: { domain: updateTenantDto.domain },
      });

      if (existingDomain) {
        throw new ConflictException('Domain already exists');
      }
    }

    Object.assign(tenant, updateTenantDto);
    const updatedTenant = await this.tenantRepository.save(tenant);

    return {
      success: true,
      data: updatedTenant,
      message: 'Tenant updated successfully',
    };
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    await this.tenantRepository.remove(tenant);

    return {
      success: true,
      message: 'Tenant deleted successfully',
    };
  }

  async activate(id: string): Promise<ApiResponse<Tenant>> {
    return this.updateStatus(id, TenantStatus.ACTIVE);
  }

  async suspend(id: string): Promise<ApiResponse<Tenant>> {
    return this.updateStatus(id, TenantStatus.SUSPENDED);
  }

  private async updateStatus(id: string, status: TenantStatus): Promise<ApiResponse<Tenant>> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    tenant.status = status;
    const updatedTenant = await this.tenantRepository.save(tenant);

    return {
      success: true,
      data: updatedTenant,
      message: `Tenant ${status} successfully`,
    };
  }
}