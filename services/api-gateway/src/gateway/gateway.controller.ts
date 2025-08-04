import { Controller, All, Req, Res, Next, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

import { ProxyService } from './proxy.service';

@ApiTags('Gateway')
@Controller()
export class GatewayController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  @ApiOperation({ summary: 'Proxy requests to Auth Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyAuth(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('auth', req, res, next);
  }

  @All('tenants/*')
  @ApiOperation({ summary: 'Proxy requests to Tenant Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyTenants(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('tenant', req, res, next);
  }

  @All('users/*')
  @ApiOperation({ summary: 'Proxy requests to User Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyUsers(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('user', req, res, next);
  }

  @All('wallets/*')
  @ApiOperation({ summary: 'Proxy requests to Wallet Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyWallets(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('wallet', req, res, next);
  }

  @All('rules/*')
  @ApiOperation({ summary: 'Proxy requests to Rule Engine Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyRules(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('rule-engine', req, res, next);
  }

  @All('notifications/*')
  @ApiOperation({ summary: 'Proxy requests to Notification Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyNotifications(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('notification', req, res, next);
  }

  @All('analytics/*')
  @ApiOperation({ summary: 'Proxy requests to Analytics Service' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request proxied successfully' })
  async proxyAnalytics(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return this.proxyService.proxy('analytics', req, res, next);
  }
}