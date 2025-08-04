import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto, PaginationDto } from '@ngear/shared';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({ status: 201, description: 'Tenant created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Tenant already exists' })
  async create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tenants' })
  @ApiResponse({ status: 200, description: 'Tenants retrieved successfully' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.tenantsService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search tenants' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  async search(@Query('q') query: string, @Query() paginationDto: PaginationDto) {
    return this.tenantsService.search(query, paginationDto);
  }

  @Get(':identifier')
  @ApiOperation({ summary: 'Get tenant by ID or slug' })
  @ApiResponse({ status: 200, description: 'Tenant retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async findOne(@Param('identifier') identifier: string) {
    return this.tenantsService.findByIdOrSlug(identifier);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update tenant' })
  @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tenant' })
  @ApiResponse({ status: 200, description: 'Tenant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  async remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate tenant' })
  @ApiResponse({ status: 200, description: 'Tenant activated successfully' })
  async activate(@Param('id') id: string) {
    return this.tenantsService.activate(id);
  }

  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate tenant' })
  @ApiResponse({ status: 200, description: 'Tenant deactivated successfully' })
  async deactivate(@Param('id') id: string) {
    return this.tenantsService.deactivate(id);
  }

  @Post(':id/suspend')
  @ApiOperation({ summary: 'Suspend tenant' })
  @ApiResponse({ status: 200, description: 'Tenant suspended successfully' })
  async suspend(@Param('id') id: string, @Body() body: { reason?: string }) {
    return this.tenantsService.suspend(id, body.reason);
  }

  @Post(':id/unsuspend')
  @ApiOperation({ summary: 'Unsuspend tenant' })
  @ApiResponse({ status: 200, description: 'Tenant unsuspended successfully' })
  async unsuspend(@Param('id') id: string) {
    return this.tenantsService.unsuspend(id);
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Get tenant users' })
  @ApiResponse({ status: 200, description: 'Tenant users retrieved successfully' })
  async getTenantUsers(@Param('id') id: string, @Query() paginationDto: PaginationDto) {
    return this.tenantsService.getTenantUsers(id, paginationDto);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Add user to tenant' })
  @ApiResponse({ status: 201, description: 'User added to tenant successfully' })
  async addUser(
    @Param('id') id: string,
    @Body() body: { userId: string; roles: string[]; permissions?: string[] },
  ) {
    return this.tenantsService.addUser(id, body.userId, body.roles, body.permissions);
  }

  @Patch(':id/users/:userId')
  @ApiOperation({ summary: 'Update tenant user' })
  @ApiResponse({ status: 200, description: 'Tenant user updated successfully' })
  async updateUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() body: { roles?: string[]; permissions?: string[]; isActive?: boolean },
  ) {
    return this.tenantsService.updateUser(id, userId, body);
  }

  @Delete(':id/users/:userId')
  @ApiOperation({ summary: 'Remove user from tenant' })
  @ApiResponse({ status: 200, description: 'User removed from tenant successfully' })
  async removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    return this.tenantsService.removeUser(id, userId);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get tenant statistics' })
  @ApiResponse({ status: 200, description: 'Tenant statistics retrieved successfully' })
  async getStats(@Param('id') id: string) {
    return this.tenantsService.getStats(id);
  }
}