import { ApiResponse, PaginationQuery } from '../types/api.types';

export interface CrudService<T, CreateDto, UpdateDto> {
  findAll(query?: PaginationQuery): Promise<ApiResponse<T[]>>;
  findById(id: string): Promise<ApiResponse<T>>;
  create(createDto: CreateDto): Promise<ApiResponse<T>>;
  update(id: string, updateDto: UpdateDto): Promise<ApiResponse<T>>;
  delete(id: string): Promise<ApiResponse<void>>;
}

export interface TenantAwareService<T, CreateDto, UpdateDto> extends CrudService<T, CreateDto, UpdateDto> {
  findByTenant(tenantId: string, query?: PaginationQuery): Promise<ApiResponse<T[]>>;
}