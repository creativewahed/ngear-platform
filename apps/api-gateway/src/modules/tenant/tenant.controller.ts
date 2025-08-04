import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '@ngear/auth';
import { Roles, PERMISSIONS } from '@ngear/shared';
import { TenantService } from './tenant.service';
import { CreateTenantDto, UpdateTenantDto, PaginationQueryDto } from './dto';

@ApiTags('Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  @Roles('super_admin', 'platform_admin')
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({ status: 200, description: 'Tenants retrieved successfully' })
  async findAll(@Query() query: PaginationQueryDto) {
    return this.tenantService.findAll(query);
  }

  @Get(':id')
  @Roles('super_admin', 'platform_admin', 'tenant_admin')
  @ApiOperation({ summary: 'Get tenant by ID' })
  @ApiResponse({ status: 200, description: 'Tenant retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async findById(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Post()
  @Roles('super_admin', 'platform_admin')
  @ApiOperation({ summary: 'Create new tenant' })
  @ApiResponse({ status: 201, description: 'Tenant created successfully' })
  async create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Put(':id')
  @Roles('super_admin', 'platform_admin', 'tenant_admin')
  @ApiOperation({ summary: 'Update tenant' })
  @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @Roles('super_admin')
  @ApiOperation({ summary: 'Delete tenant' })
  @ApiResponse({ status: 204, description: 'Tenant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async delete(@Param('id') id: string) {
    await this.tenantService.delete(id);
  }

  @Put(':id/activate')
  @Roles('super_admin', 'platform_admin')
  @ApiOperation({ summary: 'Activate tenant' })
  @ApiResponse({ status: 200, description: 'Tenant activated successfully' })
  async activate(@Param('id') id: string) {
    return this.tenantService.activate(id);
  }

  @Put(':id/deactivate')
  @Roles('super_admin', 'platform_admin')
  @ApiOperation({ summary: 'Deactivate tenant' })
  @ApiResponse({ status: 200, description: 'Tenant deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.tenantService.deactivate(id);
  }
}