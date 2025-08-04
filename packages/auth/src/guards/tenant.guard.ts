import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TENANT_KEY } from '@ngear/shared';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTenant = this.reflector.getAllAndOverride<string | boolean>(TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredTenant) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // If requiredTenant is true, just check if user has a tenantId
    if (requiredTenant === true) {
      if (!user.tenantId) {
        throw new ForbiddenException('Tenant context required');
      }
      return true;
    }

    // If requiredTenant is a specific tenant ID, check if user belongs to that tenant
    if (typeof requiredTenant === 'string') {
      if (user.tenantId !== requiredTenant) {
        throw new ForbiddenException('Access denied for this tenant');
      }
      return true;
    }

    return true;
  }
}