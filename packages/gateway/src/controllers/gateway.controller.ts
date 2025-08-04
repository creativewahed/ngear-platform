import { Controller, All, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../services/proxy.service';

@ApiTags('gateway')
@Controller()
export class GatewayController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: 'Proxy requests to auth service' })
  @ApiResponse({ status: 200, description: 'Request proxied successfully' })
  @All('auth/*')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyRequest('auth', req, res);
  }

  @ApiOperation({ summary: 'Proxy requests to tenant service' })
  @ApiResponse({ status: 200, description: 'Request proxied successfully' })
  @All('tenants/*')
  async proxyTenant(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyRequest('tenant', req, res);
  }

  @ApiOperation({ summary: 'Proxy requests to user service' })
  @ApiResponse({ status: 200, description: 'Request proxied successfully' })
  @All('users/*')
  async proxyUser(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyRequest('user', req, res);
  }

  @ApiOperation({ summary: 'Proxy requests to config service' })
  @ApiResponse({ status: 200, description: 'Request proxied successfully' })
  @All('config/*')
  async proxyConfig(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.proxyRequest('config', req, res);
  }
}