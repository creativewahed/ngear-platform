import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { ServiceDiscoveryService } from './service-discovery.service';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly serviceDiscovery: ServiceDiscoveryService,
  ) {}

  async proxy(serviceName: string, req: Request, res: Response, next: NextFunction) {
    try {
      const serviceUrl = await this.serviceDiscovery.getServiceUrl(serviceName);
      
      if (!serviceUrl) {
        return res.status(503).json({
          success: false,
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: `Service ${serviceName} is not available`,
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
      }

      const proxyMiddleware = createProxyMiddleware({
        target: serviceUrl,
        changeOrigin: true,
        pathRewrite: {
          [`^/api/v1/${this.getServicePath(serviceName)}`]: '/api/v1',
        },
        onProxyReq: (proxyReq, req, res) => {
          // Add correlation ID for tracing
          const correlationId = req.headers['x-correlation-id'] || this.generateCorrelationId();
          proxyReq.setHeader('X-Correlation-ID', correlationId);

          // Add original host
          proxyReq.setHeader('X-Forwarded-Host', req.headers.host);

          // Log the proxied request
          this.logger.log(`Proxying ${req.method} ${req.path} to ${serviceName} (${serviceUrl})`);
        },
        onError: (err, req, res) => {
          this.logger.error(`Proxy error for ${serviceName}:`, err);
          
          if (!res.headersSent) {
            res.status(502).json({
              success: false,
              error: {
                code: 'PROXY_ERROR',
                message: 'Failed to connect to upstream service',
                timestamp: new Date().toISOString(),
                path: req.path,
              },
            });
          }
        },
        onProxyRes: (proxyRes, req, res) => {
          // Add response headers
          proxyRes.headers['X-Powered-By'] = 'NGEAR Platform';
          proxyRes.headers['X-Service'] = serviceName;
          
          // Log response
          this.logger.log(`Response from ${serviceName}: ${proxyRes.statusCode}`);
        },
        timeout: 30000, // 30 seconds timeout
        proxyTimeout: 30000,
      });

      proxyMiddleware(req, res, next);
    } catch (error) {
      this.logger.error(`Failed to proxy request to ${serviceName}:`, error);
      
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Internal gateway error',
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
      }
    }
  }

  private getServicePath(serviceName: string): string {
    const pathMap = {
      'auth': 'auth',
      'tenant': 'tenants',
      'user': 'users',
      'wallet': 'wallets',
      'rule-engine': 'rules',
      'notification': 'notifications',
      'analytics': 'analytics',
    };

    return pathMap[serviceName] || serviceName;
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}