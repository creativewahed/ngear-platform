import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        database: 'pending', // Will be 'healthy' when DB is configured
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }

  @Public()
  @Get('ready')
  @ApiOperation({ summary: 'Readiness check endpoint' })
  async getReadiness() {
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
      message: 'NGEAR Platform API Gateway is ready to serve requests'
    };
  }
}