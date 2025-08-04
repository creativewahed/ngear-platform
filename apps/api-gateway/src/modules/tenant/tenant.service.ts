import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from '@ngear/database';
import { TenantStatus } from '@ngear/types';
import { PaginationUtils, PaginatedResponse } from '@ngear/shared';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
  ) {}

  async findAll(paginationParams: any): Promise<PaginatedResponse<TenantEntity>> {
    const { page, limit, skip } = PaginationUtils.calculatePagination(paginationParams);
    
    const [tenants, total] = await this.tenantRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return PaginationUtils.createPaginatedResponse(tenants, total, page, limit);
  }

  async findById(id: string): Promise<TenantEntity> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    
    return tenant;
  }

  async create(createTenantDto: any): Promise<TenantEntity> {
    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      status: TenantStatus.PENDING,
    });
    
    return this.tenantRepository.save(tenant);
  }

  async update(id: string, updateTenantDto: any): Promise<TenantEntity> {
    await this.tenantRepository.update(id, updateTenantDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.tenantRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException('Tenant not found');
    }
  }

  async activate(id: string): Promise<TenantEntity> {
    await this.tenantRepository.update(id, { status: TenantStatus.ACTIVE });
    return this.findById(id);
  }

  async deactivate(id: string): Promise<TenantEntity> {
    await this.tenantRepository.update(id, { status: TenantStatus.INACTIVE });
    return this.findById(id);
  }
}