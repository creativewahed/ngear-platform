import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GatewayController } from './gateway.controller';
import { ProxyService } from './proxy.service';
import { ServiceDiscoveryService } from './service-discovery.service';

@Module({
  imports: [HttpModule],
  controllers: [GatewayController],
  providers: [ProxyService, ServiceDiscoveryService],
  exports: [ProxyService, ServiceDiscoveryService],
})
export class GatewayModule {}