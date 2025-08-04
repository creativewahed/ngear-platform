import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '@ngear/shared';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredPermissions) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      return false;
    }
    
    // Get user permissions from roles and direct permissions
    const userPermissions = new Set<string>();
    
    // Add permissions from roles
    if (user.roles) {
      user.roles.forEach((role: any) => {
        if (role.permissions) {
          role.permissions.forEach((permission: any) => {
            userPermissions.add(permission.name);
          });
        }
      });
    }
    
    // Add direct permissions
    if (user.permissions) {
      user.permissions.forEach((permission: any) => {
        userPermissions.add(permission.name);
      });
    }
    
    return requiredPermissions.every((permission) => 
      userPermissions.has(permission)
    );
  }
}