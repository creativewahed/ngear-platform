import { SetMetadata } from '@nestjs/common';

// Custom decorators for permissions and roles
export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSIONS_KEY, permissions);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const TENANT_KEY = 'tenant';
export const TenantRequired = () => SetMetadata(TENANT_KEY, true);