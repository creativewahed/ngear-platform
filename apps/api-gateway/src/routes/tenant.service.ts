import { Injectable } from '@nestjs/common';

// Temporary utility functions
class TempUtils {
  static createSuccessResponse<T>(data: T, meta?: any): any {
    return {
      success: true,
      data,
      meta,
    };
  }
}

@Injectable()
export class TenantService {
  async getCurrentTenant(tenant: any) {
    return TempUtils.createSuccessResponse({
      tenant: {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        status: tenant.status,
        plan: tenant.plan,
        settings: tenant.settings,
      },
    });
  }

  async getTenantSettings(tenant: any) {
    return TempUtils.createSuccessResponse({
      settings: tenant.settings,
    });
  }
}