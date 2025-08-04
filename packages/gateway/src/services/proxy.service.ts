import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  private readonly serviceUrls: Record<string, string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.serviceUrls = {
      auth: this.configService.get<string>('AUTH_SERVICE_URL') || 'http://localhost:3001',
      tenant: this.configService.get<string>('TENANT_SERVICE_URL') || 'http://localhost:3002',
      user: this.configService.get<string>('USER_SERVICE_URL') || 'http://localhost:3003',
      config: this.configService.get<string>('CONFIG_SERVICE_URL') || 'http://localhost:3004',
    };
  }

  async proxyRequest(service: string, req: Request, res: Response): Promise<void> {
    const serviceUrl = this.serviceUrls[service];
    
    if (!serviceUrl) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    try {
      // Remove the service prefix from the path
      const path = req.url.replace(new RegExp(`^/${service}`), '');
      const targetUrl = `${serviceUrl}${path}`;

      // Forward headers (excluding host)
      const forwardHeaders = { ...req.headers };
      delete forwardHeaders.host;

      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method as any,
          url: targetUrl,
          data: req.body,
          headers: forwardHeaders,
          params: req.query,
          timeout: 30000,
          validateStatus: () => true, // Don't throw on non-2xx status codes
        }),
      );

      // Forward response headers
      Object.keys(response.headers).forEach(key => {
        res.setHeader(key, response.headers[key]);
      });

      // Set status and send response
      res.status(response.status).send(response.data);
    } catch (error) {
      console.error(`Proxy error for service ${service}:`, error);
      
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException(
          `Service ${service} is unavailable`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}