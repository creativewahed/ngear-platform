import { SetMetadata } from '@nestjs/common';

// Role-based access control decorators
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) => 
  SetMetadata(PERMISSIONS_KEY, permissions);

// Tenant context decorator
export const TENANT_KEY = 'tenant';
export const TenantRequired = () => SetMetadata(TENANT_KEY, true);

// Rate limiting decorator
export const RATE_LIMIT_KEY = 'rateLimit';
export const RateLimit = (maxRequests: number, windowMs: number) =>
  SetMetadata(RATE_LIMIT_KEY, { maxRequests, windowMs });

// Audit logging decorator
export const AUDIT_KEY = 'audit';
export const Audit = (action: string, resource: string) =>
  SetMetadata(AUDIT_KEY, { action, resource });

// Public endpoint decorator (skip authentication)
export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

// Cache decorator
export const CACHE_KEY = 'cache';
export const Cache = (ttl: number = 300) => SetMetadata(CACHE_KEY, { ttl });

// Validation decorator
export const VALIDATE_TENANT = 'validateTenant';
export const ValidateTenant = () => SetMetadata(VALIDATE_TENANT, true);