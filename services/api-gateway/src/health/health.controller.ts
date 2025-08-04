import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check with downstream services' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  @HealthCheck()
  check() {
    const checks = [
      // Memory checks
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      
      // Disk check
      () => this.disk.checkStorage('storage', { thresholdPercent: 0.9, path: '/' }),
    ];

    // Add downstream service checks in development
    if (this.configService.get('NODE_ENV') === 'development') {
      checks.push(
        () => this.http.pingCheck('auth-service', 'http://localhost:3001/api/v1/health/live'),
        () => this.http.pingCheck('tenant-service', 'http://localhost:3002/api/v1/health/live'),
      );
    }

    return this.health.check(checks);
  }

  @Get('live')
  @ApiOperation({ summary: 'Liveness probe' })
  @ApiResponse({ status: 200, description: 'Service is alive' })
  live() {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
      version: '1.0.0',
    };
  }

  @Get('ready')
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiResponse({ status: 200, description: 'Service is ready' })
  @HealthCheck()
  ready() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  @Get('services')
  @ApiOperation({ summary: 'Check downstream services status' })
  @ApiResponse({ status: 200, description: 'Services status retrieved' })
  async services() {
    const services = {
      'auth-service': 'http://localhost:3001/api/v1/health/live',
      'tenant-service': 'http://localhost:3002/api/v1/health/live',
      'user-service': 'http://localhost:3003/api/v1/health/live',
      'wallet-service': 'http://localhost:3004/api/v1/health/live',
      'rule-engine-service': 'http://localhost:3005/api/v1/health/live',
      'notification-service': 'http://localhost:3006/api/v1/health/live',
      'analytics-service': 'http://localhost:3007/api/v1/health/live',
    };

    const results = {};
    
    for (const [name, url] of Object.entries(services)) {
      try {
        const check = await this.http.pingCheck(name, url);
        results[name] = { status: 'healthy', details: check };
      } catch (error) {
        results[name] = { status: 'unhealthy', error: error.message };
      }
    }

    return {
      timestamp: new Date().toISOString(),
      services: results,
    };
  }
}