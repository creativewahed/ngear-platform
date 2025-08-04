import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TENANT_KEY } from '@ngear/shared';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireTenant = this.reflector.getAllAndOverride<boolean>(TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requireTenant) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    
    if (!user || !user.tenantId) {
      throw new ForbiddenException('Tenant context required');
    }
    
    // Add tenant validation logic here
    // For example, validate tenant is active, user has access to tenant, etc.
    
    return true;
  }
}