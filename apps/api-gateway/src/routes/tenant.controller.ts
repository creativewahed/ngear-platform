import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../middleware/auth.guard';
import { TenantService } from './tenant.service';

@ApiTags('tenants')
@Controller('tenants')
@UseGuards(AuthGuard)
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get('current')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current tenant information' })
  async getCurrentTenant(@Request() req: any) {
    return this.tenantService.getCurrentTenant(req.tenant);
  }

  @Get('settings')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tenant settings' })
  async getTenantSettings(@Request() req: any) {
    return this.tenantService.getTenantSettings(req.tenant);
  }
}