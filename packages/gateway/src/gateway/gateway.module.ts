import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from '../controllers/gateway.controller';
import { ProxyService } from '../services/proxy.service';
import { HealthController } from '../controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    HttpModule,
  ],
  controllers: [GatewayController, HealthController],
  providers: [ProxyService],
})
export class GatewayModule {}