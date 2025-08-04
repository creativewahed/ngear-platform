import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { db } from '@ngear/database';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async getHealth() {
    const dbHealthy = await db.health();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealthy ? 'healthy' : 'unhealthy',
      },
    };
  }

  @Public()
  @Get('ready')
  @ApiOperation({ summary: 'Readiness check endpoint' })
  async getReadiness() {
    const dbHealthy = await db.health();
    
    if (!dbHealthy) {
      throw new Error('Database is not ready');
    }
    
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }
}