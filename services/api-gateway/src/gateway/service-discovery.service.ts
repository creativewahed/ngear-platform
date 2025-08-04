import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceDiscoveryService {
  private readonly logger = new Logger(ServiceDiscoveryService.name);
  
  private readonly serviceMap = new Map<string, string>();

  constructor(private readonly configService: ConfigService) {
    this.initializeServices();
  }

  private initializeServices() {
    // Initialize service URLs from environment variables or default values
    const services = {
      auth: this.configService.get('AUTH_SERVICE_URL', 'http://auth-service:3001'),
      tenant: this.configService.get('TENANT_SERVICE_URL', 'http://tenant-service:3002'),
      user: this.configService.get('USER_SERVICE_URL', 'http://user-service:3003'),
      wallet: this.configService.get('WALLET_SERVICE_URL', 'http://wallet-service:3004'),
      'rule-engine': this.configService.get('RULE_ENGINE_SERVICE_URL', 'http://rule-engine-service:3005'),
      notification: this.configService.get('NOTIFICATION_SERVICE_URL', 'http://notification-service:3006'),
      analytics: this.configService.get('ANALYTICS_SERVICE_URL', 'http://analytics-service:3007'),
    };

    // For development, use localhost URLs
    if (this.configService.get('NODE_ENV') === 'development') {
      services.auth = 'http://localhost:3001';
      services.tenant = 'http://localhost:3002';
      services.user = 'http://localhost:3003';
      services.wallet = 'http://localhost:3004';
      services['rule-engine'] = 'http://localhost:3005';
      services.notification = 'http://localhost:3006';
      services.analytics = 'http://localhost:3007';
    }

    Object.entries(services).forEach(([name, url]) => {
      this.serviceMap.set(name, url);
      this.logger.log(`Registered service: ${name} -> ${url}`);
    });
  }

  async getServiceUrl(serviceName: string): Promise<string | null> {
    const url = this.serviceMap.get(serviceName);
    
    if (!url) {
      this.logger.warn(`Service ${serviceName} not found in service registry`);
      return null;
    }

    // In a production environment, you might want to add health checks here
    // to ensure the service is actually available
    if (await this.isServiceHealthy(url)) {
      return url;
    }

    this.logger.warn(`Service ${serviceName} at ${url} is not healthy`);
    return null;
  }

  async isServiceHealthy(serviceUrl: string): Promise<boolean> {
    try {
      // Simple health check - you could make this more sophisticated
      // For now, we'll assume all configured services are healthy
      // In production, you might want to make an HTTP request to the health endpoint
      return true;
    } catch (error) {
      this.logger.error(`Health check failed for ${serviceUrl}:`, error);
      return false;
    }
  }

  registerService(name: string, url: string): void {
    this.serviceMap.set(name, url);
    this.logger.log(`Registered service: ${name} -> ${url}`);
  }

  unregisterService(name: string): void {
    this.serviceMap.delete(name);
    this.logger.log(`Unregistered service: ${name}`);
  }

  getRegisteredServices(): Record<string, string> {
    return Object.fromEntries(this.serviceMap);
  }
}