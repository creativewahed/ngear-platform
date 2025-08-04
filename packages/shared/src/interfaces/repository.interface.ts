import { BaseEntity } from './base.interface';

export interface Repository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  findAll(filters?: Record<string, unknown>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
}

export interface TenantAwareRepository<T extends BaseEntity> extends Repository<T> {
  findByTenant(tenantId: string, filters?: Record<string, unknown>): Promise<T[]>;
  countByTenant(tenantId: string, filters?: Record<string, unknown>): Promise<number>;
}