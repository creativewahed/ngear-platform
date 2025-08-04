import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

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
        tenantIdentifier = 'demo'; // Default to demo tenant
      }

      // Skip tenant resolution for health checks and docs
      if (req.path.includes('/health') || req.path.includes('/api/docs')) {
        return next();
      }

      // Mock tenant for demo
      const mockTenant = {
        id: 'demo-tenant-1',
        name: 'Demo Company',
        subdomain: tenantIdentifier,
        status: 'ACTIVE',
        plan: 'PROFESSIONAL',
        settings: {
          branding: {
            theme: 'light',
            primaryColor: '#10B981',
            secondaryColor: '#059669',
          },
          features: {
            maxUsers: 100,
            maxApiCalls: 100000,
            advancedAnalytics: true,
            customIntegrations: false,
          },
        }
      };

      // Attach tenant to request
      req.tenant = mockTenant;
      
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: {
          code: 'TENANT_RESOLUTION_ERROR',
          message: 'Failed to resolve tenant (demo mode)',
        },
      });
    }
  }
}