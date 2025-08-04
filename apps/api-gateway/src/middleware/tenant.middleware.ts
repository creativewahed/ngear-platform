import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { db } from '@ngear/database';
import { TenantNotFoundError } from '@ngear/shared';

export interface RequestWithTenant extends Request {
  tenant?: any;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: RequestWithTenant, res: Response, next: NextFunction) {
    try {
      // Extract tenant from subdomain or header
      let tenantIdentifier = req.headers['x-tenant-id'] as string;
      
      if (!tenantIdentifier) {
        const host = req.headers.host;
        if (host) {
          const subdomain = host.split('.')[0];
          tenantIdentifier = subdomain;
        }
      }

      if (!tenantIdentifier) {
        tenantIdentifier = 'system'; // Default to system tenant
      }

      // Skip tenant resolution for health checks and docs
      if (req.path.includes('/health') || req.path.includes('/api/docs')) {
        return next();
      }

      // Resolve tenant
      const tenant = await db.getTenantBySubdomain(tenantIdentifier);
      
      if (!tenant) {
        throw new TenantNotFoundError(`Tenant with identifier '${tenantIdentifier}' not found`);
      }

      // Check tenant status
      if (tenant.status !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          error: {
            code: 'TENANT_INACTIVE',
            message: 'Tenant account is not active',
          },
        });
      }

      // Attach tenant to request
      req.tenant = tenant;
      
      next();
    } catch (error) {
      if (error instanceof TenantNotFoundError) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'TENANT_NOT_FOUND',
            message: error.message,
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'TENANT_RESOLUTION_ERROR',
          message: 'Failed to resolve tenant',
        },
      });
    }
  }
}